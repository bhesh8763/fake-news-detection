import os
import torch
from transformers import AutoTokenizer, AutoModelForSequenceClassification

MODEL_PATH = os.path.join(os.path.dirname(__file__), '..', 'model')
FALLBACK_MODEL = 'xlm-roberta-base'

tokenizer = None
model = None

def load_model():
    global tokenizer, model
    if model is not None:
        return  # already loaded

    # Use saved checkpoint if it exists, otherwise load base model
    path = MODEL_PATH if os.path.exists(MODEL_PATH) else FALLBACK_MODEL
    print(f"[TruthLens] Loading model from: {path}")

    tokenizer = AutoTokenizer.from_pretrained(path)
    model = AutoModelForSequenceClassification.from_pretrained(
        path,
        num_labels=2,
        ignore_mismatched_sizes=True
    )
    model.eval()
    print("[TruthLens] Model loaded successfully.")

def predict(text: str) -> dict:
    load_model()

    inputs = tokenizer(
        text,
        return_tensors='pt',
        truncation=True,
        padding=True,
        max_length=512
    )

    with torch.no_grad():
        outputs = model(**inputs)
        probs = torch.softmax(outputs.logits, dim=1)[0]

    fake_prob = probs[1].item()   # label 1 = FAKE
    real_prob = probs[0].item()   # label 0 = REAL

    if fake_prob > 0.65:
        verdict = 'FAKE'
    elif real_prob > 0.65:
        verdict = 'REAL'
    else:
        verdict = 'UNCERTAIN'

    return {
        'verdict': verdict,
        'confidence': round(max(fake_prob, real_prob), 4),
        'fake_prob': round(fake_prob, 4),
        'real_prob': round(real_prob, 4),
    }