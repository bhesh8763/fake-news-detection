import os
import json
import feedparser
import requests
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .ml_model import predict

GOOGLE_API_KEY = os.getenv('GOOGLE_FACT_CHECK_API_KEY', '')

# Trusted RSS feeds — mix of English and Nepali sources
RSS_FEEDS = [
    'https://feeds.bbci.co.uk/news/rss.xml',
    'https://rss.cnn.com/rss/edition.rss',
    'https://kathmandupost.com/rss',
    'https://myrepublica.nagariknetwork.com/feed',
    'https://thehimalayantimes.com/feed/',
]

# Simple in-memory RSS cache
_rss_cache = {}

def get_rss_headlines():
    import time
    now = time.time()
    if _rss_cache.get('headlines') and now - _rss_cache.get('ts', 0) < 600:
        return _rss_cache['headlines']

    headlines = []
    for url in RSS_FEEDS:
        try:
            feed = feedparser.parse(url)
            for entry in feed.entries[:10]:
                headlines.append({
                    'title': entry.get('title', ''),
                    'source': feed.feed.get('title', url),
                    'link': entry.get('link', ''),
                })
        except Exception:
            pass

    _rss_cache['headlines'] = headlines
    _rss_cache['ts'] = now
    return headlines

def rss_score(text: str) -> dict:
    headlines = get_rss_headlines()
    text_words = set(text.lower().split())
    matched = []

    for h in headlines:
        title_words = set(h['title'].lower().split())
        overlap = len(text_words & title_words)
        if overlap >= 3:
            matched.append(h['source'])

    unique_sources = list(set(matched))
    score = min(len(unique_sources) / max(len(RSS_FEEDS), 1), 1.0)
    return {
        'rss_score': round(score, 4),
        'matched_sources': unique_sources[:5],
    }

def factcheck_score(text: str) -> dict:
    if not GOOGLE_API_KEY:
        return {
            'api_score': 0.5,
            'api_verdict': 'API key not configured',
        }

    # Use first 100 chars as query
    query = text[:100]
    try:
        url = 'https://factchecktools.googleapis.com/v1alpha1/claims:search'
        params = {'query': query, 'key': GOOGLE_API_KEY, 'languageCode': 'en'}
        res = requests.get(url, params=params, timeout=5)
        data = res.json()

        claims = data.get('claims', [])
        if not claims:
            return {
                'api_score': 0.5,
                'api_verdict': 'No indexed fact-checks found for this claim',
            }

        # Get the first verdict
        review = claims[0].get('claimReview', [{}])[0]
        rating = review.get('textualRating', '').lower()
        publisher = review.get('publisher', {}).get('name', 'Unknown')

        # Normalize rating to a score
        fake_words = ['false', 'fake', 'misleading', 'incorrect', 'wrong', 'fabricated']
        real_words = ['true', 'correct', 'accurate', 'verified', 'confirmed']
        if any(w in rating for w in fake_words):
            api_score = 0.1
        elif any(w in rating for w in real_words):
            api_score = 0.9
        else:
            api_score = 0.5

        return {
            'api_score': api_score,
            'api_verdict': f'{rating.capitalize()} — {publisher}',
        }
    except Exception as e:
        return {
            'api_score': 0.5,
            'api_verdict': f'Fact-check lookup failed: {str(e)}',
        }

def unified_score(model_conf, fake_prob, rss, api) -> int:
    # Formula from proposal: α=0.5, β=0.3, γ=0.2
    alpha, beta, gamma = 0.5, 0.3, 0.2
    score = alpha * fake_prob + beta * (1 - rss) + gamma * (1 - api)
    return round(score * 100)


@api_view(['POST'])
def analyze(request):
    text = request.data.get('text', '').strip()
    if not text or len(text) < 20:
        return Response(
            {'error': 'Please provide at least 20 characters of text.'},
            status=400
        )

    # 1. XLM-RoBERTa classification
    model_result = predict(text)

    # 2. RSS verification
    rss_result = rss_score(text)

    # 3. Google Fact Check API
    fc_result = factcheck_score(text)

    # 4. Unified credibility score
    cred = unified_score(
        model_result['confidence'],
        model_result['fake_prob'],
        rss_result['rss_score'],
        fc_result['api_score'],
    )

    return Response({
        'verdict': model_result['verdict'],
        'confidence': model_result['confidence'],
        'credibility_score': cred,
        'fake_prob': model_result['fake_prob'],
        'real_prob': model_result['real_prob'],
        'rss_score': rss_result['rss_score'],
        'matched_sources': rss_result['matched_sources'],
        'api_score': fc_result['api_score'],
        'api_verdict': fc_result['api_verdict'],
    })


@api_view(['GET'])
def health(request):
    return Response({'status': 'ok', 'message': 'TruthLens API is running'})