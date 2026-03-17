# TruthLens — Fake News Detection System

Multilingual fake news detection using XLM-RoBERTa, RSS verification,
and Google Fact Check API. Supports English and Nepali.

**B.Sc. CSIT Project — Mount Annapurna Campus, Tribhuvan University**
Team: Pawan Gurung, Rupesh Pradhan, Bhesh Bahadur Saru

---

## Setup for teammates

### 1. Clone the repo
git clone https://github.com/YOUR_USERNAME/fake-news-detection.git
cd fake-news-detection

### 2. Backend setup
cd backend
python -m venv venv
venv\Scripts\activate        # Windows
source ../venv/bin/activate  # Mac/Linux

pip install django djangorestframework django-cors-headers python-dotenv \
    transformers torch requests feedparser keybert \
    sentence-transformers lime scikit-learn

# Create your own .env file (ask Pawan for the API key)
copy .env.example .env

python manage.py migrate
python manage.py runserver

### 3. Frontend setup
cd ../frontend
npm install
npm run dev
```

Also create `backend/.env.example` — a safe template teammates can copy:
```
SECRET_KEY=django-insecure-changethislater123456789
DEBUG=True
GOOGLE_FACT_CHECK_API_KEY=get_this_from_pawan