"""
Inclusive AI Learning Assistant – Sri Lanka
Backend API: FastAPI Server with SQLite
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any, Optional
import json
import uuid

from database import init_db, get_connection
from ai_service import get_ai_service

app = FastAPI(
    title="Inclusive AI Learning Assistant – Sri Lanka API",
    description="Backend API for inclusive Sri Lankan school lesson adaptations",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def startup():
    init_db()

class ProcessLessonRequest(BaseModel):
    title: str
    grade: str
    subject: str
    text: str

class QuizAttemptSubmitRequest(BaseModel):
    lesson_id: str
    student_code: str  # e.g. "ST001"
    score: int
    total_questions: int
    answers: List[Dict[str, Any]]

@app.get("/")
def health_check():
    return {"status": "online", "system": "Inclusive AI Learning Assistant – Sri Lanka", "version": "1.0.0"}

@app.post("/api/process-lesson")
def process_lesson(req: ProcessLessonRequest):
    ai = get_ai_service("mock")
    result = ai.process_lesson(req.title, req.grade, req.subject, req.text)
    return result

@app.get("/api/lessons")
def get_lessons():
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM lessons ORDER BY created_at DESC")
    rows = cursor.fetchall()
    lessons = []
    for r in rows:
        lessons.append({
            "id": r["id"],
            "grade": r["grade"],
            "subject": r["subject"],
            "title": r["title"],
            "originalText": r["original_text"],
            "content": json.loads(r["content_json"]),
            "createdAt": r["created_at"]
        })
    conn.close()
    return lessons

@app.post("/api/quiz-attempts")
def submit_attempt(req: QuizAttemptSubmitRequest):
    conn = get_connection()
    cursor = conn.cursor()
    attempt_id = str(uuid.uuid4())
    cursor.execute("""
        INSERT INTO quiz_attempts (id, lesson_id, student_code, score, total_questions, answers_json)
        VALUES (?, ?, ?, ?, ?, ?)
    """, (attempt_id, req.lesson_id, req.student_code, req.score, req.total_questions, json.dumps(req.answers)))
    conn.commit()
    conn.close()
    return {"status": "saved", "attempt_id": attempt_id}

@app.get("/api/results")
def get_results():
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("""
        SELECT q.id, q.lesson_id, l.title as lesson_title, q.student_code, q.score, q.total_questions, q.completed_at
        FROM quiz_attempts q
        LEFT JOIN lessons l ON q.lesson_id = l.id
        ORDER BY q.completed_at DESC
    """)
    rows = cursor.fetchall()
    results = [dict(r) for r in rows]
    conn.close()
    return results
