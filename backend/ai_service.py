"""
Inclusive AI Learning Assistant – Sri Lanka
AI Service Module: Pluggable AI engine (Mock Mode + Future Real AI adapter)
"""

from typing import Dict, Any, List

class AIServiceProvider:
    """Base interface so the AI provider can be replaced in Version 2."""
    def process_lesson(self, title: str, grade: str, subject: str, text: str) -> Dict[str, Any]:
        raise NotImplementedError

class MockAIService(AIServiceProvider):
    """
    Mock AI mode: Runs locally without any API key.
    Produces high quality trilingual pedagogical structures for Sri Lankan schools.
    """
    def process_lesson(self, title: str, grade: str, subject: str, text: str) -> Dict[str, Any]:
        sentences = [s.strip() for s in text.replace("!", ".").replace("?", ".").split(".") if len(s.strip()) > 5]
        first_sentence = sentences[0] if sentences else title
        second_sentence = sentences[1] if len(sentences) > 1 else first_sentence

        return {
            "provider": "Mock AI Service (Offline Mode)",
            "content": {
                "simpleExplanation": {
                    "en": f"Simple Guide: {title}. {first_sentence}. This is connected to our daily life in Sri Lanka.",
                    "si": f"{grade} {subject} විෂයෙහි '{title}' පිළිබඳ සරල පැහැදිලි කිරීමක්. {first_sentence}",
                    "ta": f"{grade} {subject} பாடத்தில் '{title}' பற்றிய எளிய விளக்கம். {first_sentence}"
                },
                "stepByStep": [
                    {
                        "stepNumber": 1,
                        "title": {
                            "en": "1. Understand the Starting Concept",
                            "si": "1. ආරම්භක සංකල්පය තේරුම් ගැනීම",
                            "ta": "1. ஆரம்பக் கருத்தைப் புரிந்து கொள்ளுதல்"
                        },
                        "instruction": {
                            "en": f"{first_sentence}. Notice what starts this process.",
                            "si": f"මූලික සංකල්පය අවධානයෙන් කියවන්න: {first_sentence}",
                            "ta": f"தொடக்கக் கருத்தைக் கவனமாக வாசியுங்கள்: {first_sentence}"
                        },
                        "keyClue": {
                            "en": "Clue: Focus on the very first event.",
                            "si": "හෝඩුවාව: පළමු සිදුවීම කෙරෙහි අවධානය යොමු කරන්න.",
                            "ta": "குறிப்பு: முதல் நிகழ்வில் கவனம் செலுத்துங்கள்."
                        }
                    },
                    {
                        "stepNumber": 2,
                        "title": {
                            "en": "2. Follow the Core Action",
                            "si": "2. ප්‍රධාන ක්‍රියාවලිය විමසීම",
                            "ta": "2. முக்கிய செயற்பாட்டை அவதானித்தல்"
                        },
                        "instruction": {
                            "en": f"{second_sentence}. See how things connect together.",
                            "si": f"ක්‍රියාවලිය එකිනෙකට සම්බන්ධ වන අයුරු බලන්න: {second_sentence}",
                            "ta": f"செயற்பாடுகள் எவ்வாறு இணைகின்றன எனப் பாருங்கள்: {second_sentence}"
                        },
                        "keyClue": {
                            "en": "Clue: Identify cause and effect.",
                            "si": "හෝඩුවාව: හේතු සහ ඵල සොයන්න.",
                            "ta": "குறிப்பு: காரணத்தையும் விளைவையும் அறியுங்கள்."
                        }
                    }
                ],
                "keyConcepts": [
                    {
                        "id": "c1",
                        "concept": {"en": "Main Theme", "si": "ප්‍රධාන තේමාව", "ta": "முக்கிய கருத்து"},
                        "summary": {"en": first_sentence, "si": first_sentence, "ta": first_sentence}
                    }
                ],
                "vocabulary": [
                    {
                        "id": "v1",
                        "word": {"en": "System", "si": "පද්ධතිය", "ta": "அமைப்பு"},
                        "meaning": {
                            "en": "Parts working together.",
                            "si": "එකට වැඩ කරන කොටස් සමූහයක්.",
                            "ta": "ஒன்றாகச் செயல்படும் பாகங்கள்."
                        },
                        "example": {
                            "en": f"A school lesson on {title} works like a system.",
                            "si": "සෑම පද්ධතියකම කොටස් එකිනෙකට බැඳී පවතී.",
                            "ta": "ஒவ்வொரு அமைப்பிலும் பாகங்கள் இணைந்துள்ளன."
                        }
                    }
                ],
                "easierPracticeQuestions": [
                    {
                        "id": "ep1",
                        "question": {
                            "en": f"What is one thing you learned about {title}?",
                            "si": f"{title} ගැන ඔබ ඉගෙනගත් එක් වැදගත් දෙයක් කුමක්ද?",
                            "ta": f"{title} பற்றி நீங்கள் கற்றுக்கொண்ட ஒரு விடயம் யாது?"
                        },
                        "hint": {
                            "en": "Read the simple explanation first.",
                            "si": "සරල පැහැදිලි කිරීම නැවත බලන්න.",
                            "ta": "எளிய விளக்கத்தை மீண்டும் வாசியுங்கள்."
                        },
                        "sampleAnswer": {
                            "en": first_sentence,
                            "si": first_sentence,
                            "ta": first_sentence
                        }
                    }
                ],
                "teacherSupport": {
                    "scaffoldingTips": [
                        "Provide audio-assisted read aloud for students with low decoding fluency.",
                        "Use bilingual peer discussions in Sinhala or Tamil.",
                        "Break tasks into 5-minute single-step milestones."
                    ],
                    "classroomActivities": [
                        "Quick classroom sketch or diagram.",
                        "Relate to local landmarks, rivers, or historical tanks."
                    ],
                    "pacingAdvice": "Dedicate 15 minutes to step-by-step reading before beginning practice questions.",
                    "nonDiagnosticNotice": "Educational aid only. Not for psychological diagnosis, labeling, or placement."
                }
            },
            "questions": [
                {
                    "id": "q1",
                    "question": {
                        "en": f"What is the focus of '{title}'?",
                        "si": f"'{title}' පාඩමේ මූලික අවධානය කුමක්ද?",
                        "ta": f"'{title}' பாடத்தின் முதன்மை நோக்கம் யாது?"
                    },
                    "options": {
                        "en": [f"Understanding {title}", "Unrelated topic", "Random facts", "External trivia"],
                        "si": [f"{title} තේරුම් ගැනීම", "අදාළ නොවන කරුණක්", "අහඹු තොරතුරු", "බාහිර විනෝදය"],
                        "ta": [f"{title} ஐப் புரிந்துகொள்ளுதல்", "தொடர்பற்ற விடயம்", "சீரற்ற தகவல்கள்", "வெளிப்புற விடயம்"]
                    },
                    "correctAnswerIndex": 0,
                    "explanation": {
                        "en": f"The entire text explains the mechanics of {title}.",
                        "si": f"මුළු පාඩමම {title} පිළිබඳව පැහැදිලි කරයි.",
                        "ta": f"முழுப் பாடமும் {title} பற்றிய விளக்கமாகும்."
                    },
                    "conceptTested": "Core Comprehension",
                    "difficulty": "Easy"
                }
            ]
        }

def get_ai_service(provider_type: str = "mock") -> AIServiceProvider:
    """Factory to swap AI providers between Mock and future Gemini/OpenAI."""
    return MockAIService()
