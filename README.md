# Inclusive AI Learning Assistant – Sri Lanka
**ශ්‍රී ලංකා ඇතුළත් අධ්‍යාපන සහායක • இலங்கை உள்ளடக்கிய கல்வி உதவியாளர்**

An inclusive educational support web application designed for Sri Lankan schools. It enables students with diverse learning needs to study the exact same curriculum lessons through simplified multi-sensory modes, trilingual representations (English, Sinhala, Tamil), and guided quizzes.

---

## 🛡️ Critical Educational Safeguards & Policy
- **Educational Support Only**: This platform is an instructional aid.
- **Strictly Non-Diagnostic**: It does **NOT** diagnose dyslexia, ADHD, autism, or any medical/learning disorder.
- **Zero Student Labeling**: It does not classify or label children.
- **No Placement Decisions**: Teachers remain fully responsible for pedagogical decisions and student support.
- **Anonymous Identifiers**: Uses privacy-safe codes like `ST001`, `ST002` instead of sensitive personal records.

---

## 🌟 The 10 AI Lesson Transformations
When a teacher submits a textbook lesson, the system decomposes it into:
1. **Simple Explanation** (concise sentences, reduced cognitive strain)
2. **Step-by-Step Explanation** (sequential milestones with key memory clues)
3. **Key Concepts** (core foundational principles)
4. **Important Vocabulary** (student-friendly definitions and everyday examples)
5. **English Version**
6. **Tamil Version (தமிழ்)**
7. **Sinhala Version (සිංහල)**
8. **Short Quiz** (multiple-choice questions with answer explanations)
9. **Easier Practice Questions** (with collapsible hints and model answers)
10. **Teacher Support Information** (scaffolding tips, classroom activities, pacing advice)

---

## 📁 Clean Project Architecture
```
├── backend/                  # Python FastAPI Backend & SQLite
│   ├── main.py              # FastAPI server & endpoints
│   ├── database.py          # SQLite database schema (lessons, questions, attempts)
│   ├── ai_service.py        # Pluggable AI service (Mock mode + real AI adapter)
│   └── requirements.txt     # Python dependencies
├── src/
│   ├── components/          # React UI components
│   │   ├── Navbar.tsx
│   │   ├── AccessibilityToolbar.tsx
│   │   ├── EthicalNoticeModal.tsx
│   │   ├── HomePage.tsx
│   │   ├── TeacherDashboard.tsx
│   │   ├── CreateLessonPage.tsx
│   │   ├── AiProcessingPage.tsx
│   │   ├── StudentLessonPage.tsx
│   │   ├── QuizPage.tsx
│   │   └── TeacherResultsPage.tsx
│   ├── data/
│   │   └── sampleLessons.ts # Sri Lankan curriculum demo lessons (Science, History)
│   ├── services/
│   │   ├── aiService.ts     # Mock AI engine (Offline / Exhibition mode)
│   │   └── storage.ts       # Persistence service for lessons & anonymous student quiz attempts
│   ├── types.ts             # Shared TypeScript models & interfaces
│   ├── App.tsx              # Main application router & state controller
│   └── main.tsx             # React entrypoint
├── server.ts                # Express server with Vite middleware
├── package.json
└── README.md
```

---

## 🚀 Beginner Quick Start Guide

### Step 1: What to install
1. **Node.js** (version 18 or higher): Download from [nodejs.org](https://nodejs.org)
2. (Optional for Python backend): **Python** (version 3.10+): Download from [python.org](https://python.org)

### Step 2: How to run the web application
In your terminal, navigate into the project folder and run:
```bash
npm install
npm run dev
```

### Step 3: Open in your browser
Open your browser and visit:
```
http://localhost:3000
```

### Step 4: What you will see
1. The **Exhibition Home Page** with quick-start buttons for Sri Lankan curriculum lessons.
2. The **Accessibility Bar** at the very top (A, A+, A++ font sizing, High Contrast, Wide Spacing).
3. The **Teacher Dashboard** with ready-to-use lessons (e.g. *Grade 7 Science: Water Cycle* and *Grade 8 History: Ancient Irrigation*).
4. The **Student Lesson Page** where you can toggle between **English**, **සිංහල**, and **தமிழ்**, try **Standard**, **Simple**, or **Step-by-Step** modes, and listen via the **Read Aloud** audio button!
5. The **Quiz Page** where students use anonymous IDs like `ST001` and receive instant feedback.
6. The **Teacher Results Page** showing anonymous comprehension analytics to help teachers plan classroom scaffolding.
