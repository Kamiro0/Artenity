FROM python:3.13-slim

WORKDIR /app

COPY backend/requirements-production.txt ./backend/requirements-production.txt
RUN pip install --no-cache-dir -r backend/requirements-production.txt

COPY backend/*.py ./backend/
COPY backend/isrgrootx1.pem ./backend/isrgrootx1.pem

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

CMD ["sh", "-c", "uvicorn backend.main:app --host 0.0.0.0 --port ${PORT:-8000}"]
