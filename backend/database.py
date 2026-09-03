"""
Inclusive AI Learning Assistant – Sri Lanka
Database Module: SQLite Initialization and Operations
"""

import sqlite3
import json
import os
from typing import List, Dict, Any, Optional

DB_FILE = os.path.join(os.path.dirname(__file__), "learning_assistant.db")

def get_connection():
    conn = sqlite3.connect(DB_FILE)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_connection()
    cursor = conn.cursor()
    
    # 1. Lessons table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS lessons (
        id TEXT PRIMARY KEY,
        grade TEXT NOT NULL,
        subject TEXT NOT NULL,
        title TEXT NOT NULL,
        original_text TEXT NOT NULL,
        content_json TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    """)

    # 2. Questions table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS questions (
        id TEXT PRIMARY KEY,
        lesson_id TEXT NOT NULL,
        question_json TEXT NOT NULL,
        options_json TEXT NOT NULL,
        correct_answer_index INTEGER NOT NULL,
        explanation_json TEXT NOT NULL,
        concept_tested TEXT NOT NULL,
        difficulty TEXT NOT NULL,
        FOREIGN KEY (lesson_id) REFERENCES lessons(id) ON DELETE CASCADE
    );
    """)

    # 3. Anonymous Students table (strictly anonymous IDs like ST001, ST002)
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS anonymous_students (
        id TEXT PRIMARY KEY,
        student_code TEXT UNIQUE NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    """)

    # 4. Quiz Attempts table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS quiz_attempts (
        id TEXT PRIMARY KEY,
        lesson_id TEXT NOT NULL,
        student_code TEXT NOT NULL,
        score INTEGER NOT NULL,
        total_questions INTEGER NOT NULL,
        answers_json TEXT NOT NULL,
        completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (lesson_id) REFERENCES lessons(id) ON DELETE CASCADE
    );
    """)

    conn.commit()
    conn.close()

if __name__ == "__main__":
    init_db()
    print(f"SQLite database initialized at {DB_FILE}")
