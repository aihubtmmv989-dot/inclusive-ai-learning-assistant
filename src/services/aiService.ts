import { Lesson, LessonContent, QuizQuestion } from '../types';

export interface AIProcessResult {
  content: LessonContent;
  questions: QuizQuestion[];
  isMock: boolean;
  providerName: string;
}

export class MockAIService {
  static async processLesson(
    title: string,
    grade: string,
    subject: string,
    text: string
  ): Promise<AIProcessResult> {
    // Simulate real AI processing latency for realistic exhibition experience
    await new Promise((resolve) => setTimeout(resolve, 1400));

    const sentences = text
      .split(/[.!?]+/)
      .map((s) => s.trim())
      .filter((s) => s.length > 5);

    const firstTwo = sentences.slice(0, 2).join('. ') + '.';
    const nextThree = sentences.slice(2, 5).join('. ') || firstTwo;

    // Generate simplified explanation
    const simpleEn = `Here is a clear overview of ${title} for ${grade} ${subject}. ${firstTwo} The key point is understanding how each part works together in everyday life in Sri Lanka.`;
    const simpleSi = `${grade} ${subject} විෂය සඳහා "${title}" පිළිබඳ සරල පැහැදිලි කිරීමක් මෙන්න. ප්‍රධාන කරුණ වන්නේ අපේ රටේ පරිසරය සහ එදිනෙදා ජීවිතය සමඟ මෙය සම්බන්ධ වන ආකාරය වටහා ගැනීමයි.`;
    const simpleTa = `${grade} ${subject} பாடத்திற்கான "${title}" பற்றிய எளிய விளக்கம் இதோ. முக்கிய கருத்து என்னவெனில், நம் அன்றாட வாழ்விலும் சுற்றுப்புறத்திலும் இது எவ்வாறு தொடர்பு கொண்டுள்ளது என்பதைப் புரிந்துகொள்வதாகும்.`;

    // Step by step breakdown
    const steps = [
      {
        stepNumber: 1,
        title: {
          en: '1. The Core Foundation',
          si: '1. මූලික පදනම හඳුනා ගැනීම',
          ta: '1. அடிப்படைக் கருத்தை அறிதல்'
        },
        instruction: {
          en: sentences[0] ? `${sentences[0]}. Notice how this begins the main idea.` : `Start by reading the basic definition of ${title}.`,
          si: `පාඩමේ ආරම්භක සංකල්පය අවධානයෙන් කියවන්න: ${title} පිළිබඳ මූලික අර්ථ දැක්වීම හඳුනා ගන්න.`,
          ta: `பாடத்தின் தொடக்கக் கருத்தை கவனமாக வாசியுங்கள்: ${title} இன் அடிப்படை வரைவிலக்கணத்தைப் புரிந்து கொள்ளுங்கள்.`
        },
        keyClue: {
          en: 'Key Clue: Focus on what happens first.',
          si: 'ප්‍රධාන හෝඩුවාව: පළමුව සිදුවන දේ ගැන අවධානය යොමු කරන්න.',
          ta: 'முக்கிய குறிப்பு: முதலில் என்ன நிகழ்கிறது என்பதில் கவனம் செலுத்துங்கள்.'
        }
      },
      {
        stepNumber: 2,
        title: {
          en: '2. The Main Action or Process',
          si: '2. ප්‍රධාන ක්‍රියාවලිය හෝ සිදුවීම',
          ta: '2. பிரதான செயற்பாடு அல்லது நிகழ்வு'
        },
        instruction: {
          en: sentences[1] ? `${sentences[1]}. Observe how changes happen step by step.` : `Understand the middle action and why it occurs.`,
          si: `මෙහි සිදුවන ප්‍රධාන ක්‍රියාවලිය විමසා බලන්න. එකිනෙකට සම්බන්ධ වන අයුරු බලන්න.`,
          ta: `இதில் நிகழும் முக்கிய செயற்பாட்டைப் பாருங்கள். ஒன்றுடன் ஒன்று எவ்வாறு இணைகிறது என்பதைக் கவனியுங்கள்.`
        },
        keyClue: {
          en: 'Key Clue: Look for cause and effect.',
          si: 'ප්‍රධාන හෝඩුවාව: හේතුව සහ ඵලය සලකා බලන්න.',
          ta: 'முக்கிய குறிப்பு: காரணத்தையும் அதன் விளைவையும் அவதானியுங்கள்.'
        }
      },
      {
        stepNumber: 3,
        title: {
          en: '3. Connecting to Sri Lanka',
          si: '3. ශ්‍රී ලංකාවේ ප්‍රායෝගික උදාහරණය',
          ta: '3. இலங்கையின் நடைமுறை உதாரணம்'
        },
        instruction: {
          en: `Think about how ${title} is seen or used in Sri Lankan communities, schools, or nature.`,
          si: `මෙම පාඩම අපේ ශ්‍රී ලංකාවේ පරිසරයට, ගම්බිම්වලට හෝ එදිනෙදා ජීවිතයට බලපාන අයුරු සිතා බලන්න.`,
          ta: `இப்பாடம் இலங்கையின் சூழல், கிராமங்கள் அல்லது அன்றாட வாழ்வில் எவ்வாறு பயன்படுகிறது எனச் சிந்தியுங்கள்.`
        },
        keyClue: {
          en: 'Key Clue: Relate it to something you see outside.',
          si: 'ප්‍රධාන හෝඩුවාව: ඔබ අවට පරිසරයේ දකින දේ සමඟ ගලපන්න.',
          ta: 'முக்கிய குறிப்பு: உங்களைச் சுற்றியுள்ள விடயங்களுடன் ஒப்பிட்டுப் பாருங்கள்.'
        }
      }
    ];

    // Key concepts
    const keyConcepts = [
      {
        id: 'kc-' + Date.now() + '-1',
        concept: {
          en: `Primary Principle of ${title}`,
          si: `${title} හි මූලික මූලධර්මය`,
          ta: `${title} இன் முதன்மைக் கோட்பாடு`
        },
        summary: {
          en: `The main takeaway from this lesson: ${firstTwo.substring(0, 100)}...`,
          si: `මෙම පාඩමෙන් ලැබෙන ප්‍රධාන අවබෝධය: මූලික ක්‍රියාවලිය නිවැරදිව තේරුම් ගැනීම.`,
          ta: `இப்பாடத்திலிருந்து கிடைக்கும் முக்கிய புரிதல்: அடிப்படை முறையைச் சரியாகப் புரிந்துகொள்ளுதல்.`
        }
      },
      {
        id: 'kc-' + Date.now() + '-2',
        concept: {
          en: 'Cause & Effect Relationship',
          si: 'හේතු-ඵල සම්බන්ධතාවය',
          ta: 'காரண-காரியத் தொடர்பு'
        },
        summary: {
          en: 'Every stage in this topic leads naturally into the next stage.',
          si: 'මෙම මාතෘකාවේ සෑම පියවරක්ම ඊළඟ පියවරට මඟ පාදයි.',
          ta: 'இத்தலைப்பின் ஒவ்வொரு நிலையும் அடுத்த நிலைக்கு வழிவகுக்கிறது.'
        }
      }
    ];

    // Important Vocabulary
    const words = text
      .split(/\s+/)
      .filter((w) => w.length > 5 && /^[A-Za-z]+$/.test(w))
      .slice(0, 3);

    const vocabulary = [
      {
        id: 'voc-1',
        word: {
          en: words[0] || 'System',
          si: words[0] ? `${words[0]} (පද්ධතිය/ක්‍රමය)` : 'පද්ධතිය',
          ta: words[0] ? `${words[0]} (அமைப்பு/முறை)` : 'அமைப்பு'
        },
        meaning: {
          en: 'A set of connected things or parts working together.',
          si: 'එකට එක්ව ක්‍රියා කරන එකිනෙකට බැඳුණු කොටස් සමූහයක්.',
          ta: 'ஒன்றாகச் செயல்படும் இணைக்கப்பட்ட பாகங்களின் தொகுதி.'
        },
        example: {
          en: `Understanding how the ${words[0] || 'system'} operates helps us learn the topic.`,
          si: `මෙම ක්‍රමය ක්‍රියාත්මක වන ආකාරය තේරුම් ගැනීම පාඩමට උපකාරී වේ.`,
          ta: `இந்த அமைப்பு எவ்வாறு இயங்குகிறது என்பதை அறிவது பாடத்திற்கு உதவும்.`
        }
      },
      {
        id: 'voc-2',
        word: {
          en: words[1] || 'Process',
          si: words[1] ? `${words[1]} (ක්‍රියාවලිය)` : 'ක්‍රියාවලිය',
          ta: words[1] ? `${words[1]} (செயல்முறை)` : 'செயல்முறை'
        },
        meaning: {
          en: 'A series of actions or steps taken to achieve an end.',
          si: 'යම් ප්‍රතිඵලයක් ලබා ගැනීම සඳහා ගන්නා පියවර හෝ ක්‍රියා මාලාව.',
          ta: 'ஒரு முடிவை அடைவதற்காக எடுக்கப்படும் தொடர்ச்சியான நடவடிக்கைகள்.'
        },
        example: {
          en: 'Each step in the process has a specific purpose.',
          si: 'මෙම ක්‍රියාවලියේ සෑම පියවරකටම විශේෂිත අරමුණක් ඇත.',
          ta: 'இச்செயல்முறையின் ஒவ்வொரு படிக்கும் ஒரு குறிப்பிட்ட நோக்கமுண்டு.'
        }
      }
    ];

    // Easier practice questions
    const easierPracticeQuestions = [
      {
        id: 'prac-1',
        question: {
          en: `In your own words, what is the most important idea of ${title}?`,
          si: `ඔබේම වචන වලින් "${title}" හි වැදගත්ම අදහස කුමක්දැයි පැහැදිලි කරන්න.`,
          ta: `உங்கள் சொந்த வார்த்தைகளில் "${title}" இன் மிக முக்கியமான கருத்து யாது?`
        },
        hint: {
          en: 'Review the first step in the step-by-step section.',
          si: 'පියවරෙන් පියවර කොටසේ පළමු පියවර නැවත බලන්න.',
          ta: 'படிபடியான விளக்கத்தின் முதற்படியை மீண்டும் கவனியுங்கள்.'
        },
        sampleAnswer: {
          en: `The main idea of ${title} is understanding the foundation and how it works.`,
          si: `මූලික සංකල්පය සහ එය ක්‍රියාත්මක වන අයුරු තේරුම් ගැනීම මෙහි ප්‍රධාන අදහසයි.`,
          ta: `அடிப்படை முறையையும் அது செயல்படும் விதத்தையும் அறிவதே இதன் முக்கிய கருத்தாகும்.`
        }
      },
      {
        id: 'prac-2',
        question: {
          en: 'Give one real-life example from your home or school.',
          si: 'ඔබේ නිවසින් හෝ පාසලෙන් එක් සැබෑ ජීවිත උදාහරණයක් දෙන්න.',
          ta: 'உங்கள் வீடு அல்லது பாடசாலையிலிருந்து ஒரு நேரடி உதாரணத்தைக் கூறுக.'
        },
        hint: {
          en: 'Think about things you observe daily in Sri Lanka.',
          si: 'ශ්‍රී ලංකාවේ ඔබ දිනපතා දකින පරිසරය ගැන සිතන්න.',
          ta: 'இலங்கையில் நீங்கள் தினமும் காணும் விடயங்களை எண்ணிப் பாருங்கள்.'
        },
        sampleAnswer: {
          en: 'A daily example is seeing this concept reflected in local surroundings and activities.',
          si: 'අප අවට පරිසරයේ නිරීක්ෂණය කළ හැකි එදිනෙදා ක්‍රියාවක් උදාහරණයක් ලෙස ගත හැක.',
          ta: 'சுற்றுப்புறத்தில் நாம் அன்றாடம் அவதானிக்கும் நிகழ்வு ஓர் நல்ல உதாரணமாகும்.'
        }
      }
    ];

    // Teacher support info (strictly non-diagnostic)
    const teacherSupport = {
      scaffoldingTips: [
        'Break reading paragraphs into 2-sentence micro-chunks for students with working memory fatigue.',
        'Use the built-in Text-to-Speech audio button so auditory learners can listen while following highlighted text.',
        'Encourage peer pairing: let students discuss the Key Clue before writing full answers.'
      ],
      classroomActivities: [
        'Quick Whiteboard Drawing: Ask students to sketch the 3-step sequence in 2 minutes.',
        'Local Language Discussion: Facilitate bilingual clarification using the Sinhala or Tamil view.'
      ],
      pacingAdvice: 'Recommended allocation: 10 minutes concept exploration, 15 minutes interactive step navigation, 10 minutes self-paced quiz.',
      nonDiagnosticNotice: 'Important Ethical Guardrail: This system provides pedagogical scaffolding to support varied learning paces. It does not diagnose medical or cognitive conditions, nor does it replace teacher professional discernment.'
    };

    // Quiz questions
    const questions: QuizQuestion[] = [
      {
        id: 'gen-q1-' + Date.now(),
        lessonId: 'temp',
        question: {
          en: `What is the primary topic explored in "${title}"?`,
          si: `"${title}" පාඩමෙන් ප්‍රධාන වශයෙන් ගවේෂණය කරන්නේ කුමක්ද?`,
          ta: `"${title}" பாடத்தில் முக்கியமாக ஆராயப்படும் விடயம் யாது?`
        },
        options: {
          en: [
            `Understanding ${title}`,
            'Learning about outer planets',
            'Memorizing random dates',
            'Advanced calculus'
          ],
          si: [
            `${title} පිළිබඳ මූලික අවබෝධය`,
            'ඈත ග්‍රහලෝක පිළිබඳ තොරතුරු',
            'අහඹු දින වකවානු මතක තබා ගැනීම',
            'සංකීර්ණ ගණිත සමීකරණ'
          ],
          ta: [
            `${title} பற்றிய அடிப்படைப் புரிதல்`,
            'வெளிக்கோள்கள் பற்றிய விபரங்கள்',
            'தேதிகளை மனப்பாடம் செய்தல்',
            'கடினமான கணிதச் சமன்பாடுகள்'
          ]
        },
        correctAnswerIndex: 0,
        explanation: {
          en: `The lesson is specifically focused on ${title} and its fundamental steps.`,
          si: `මෙම පාඩම විශේෂයෙන් ${title} සහ එහි මූලික පියවර පිළිබඳව අවධානය යොමු කරයි.`,
          ta: `இப்பாடம் சிறப்பாக ${title} மற்றும் அதன் அடிப்படை படிகளை மையமாகக் கொண்டுள்ளது.`
        },
        conceptTested: 'Main topic comprehension',
        difficulty: 'Easy'
      },
      {
        id: 'gen-q2-' + Date.now(),
        lessonId: 'temp',
        question: {
          en: 'Why is breaking lessons into step-by-step chunks helpful?',
          si: 'පාඩමක් පියවරෙන් පියවර කුඩා කොටස් වලට බෙදා ඉගෙනීම ප්‍රයෝජනවත් වන්නේ ඇයි?',
          ta: 'பாடங்களை படிபடியான சிறு பகுதிகளாகப் பிரித்துக் கற்பது ஏன் உதவியாக உள்ளது?'
        },
        options: {
          en: [
            'It makes complex concepts easier to digest at one\'s own pace',
            'It forces everyone to finish in under 3 minutes',
            'It removes all vocabulary completely',
            'It replaces teachers in the school'
          ],
          si: [
            'සංකීර්ණ අදහස් තමන්ගේම වේගයෙන් පහසුවෙන් තේරුම් ගැනීමට ඉඩ සලසයි',
            'විනාඩි 3ක් තුළ බලෙන් අවසන් කිරීමට බල කරයි',
            'සියලු වචන මාලාව සම්පූර්ණයෙන්ම ඉවත් කරයි',
            'පාසලේ ගුරුවරුන් ප්‍රතිස්ථාපනය කරයි'
          ],
          ta: [
            'கடினமான கருத்துக்களை சொந்த வேகத்தில் எளிதாகப் புரிந்து கொள்ள உதவுகிறது',
            '3 நிமிடங்களுக்குள் அனைவரையும் முடிக்க வற்புறுத்துகிறது',
            'சொற்களஞ்சியத்தை முற்றிலும் நீக்குகிறது',
            'பாடசாலை ஆசிரியர்களை மாற்றியமைக்கிறது'
          ]
        },
        correctAnswerIndex: 0,
        explanation: {
          en: 'Chunking information reduces cognitive load and allows students with diverse learning needs to succeed.',
          si: 'තොරතුරු කුඩා කොටස් වලට බෙදීමෙන් මතකයට ඇතිවන වෙහෙස අඩු වී සැමටම සාර්ථක විය හැක.',
          ta: 'தகவல்களைப் பிரிப்பது நினைவாற்றல் சுமையைக் குறைத்து அனைத்து மாணவர்களுக்கும் வெற்றியைத் தருகிறது.'
        },
        conceptTested: 'Cognitive pacing & scaffolding',
        difficulty: 'Easy'
      }
    ];

    return {
      content: {
        simpleExplanation: { en: simpleEn, si: simpleSi, ta: simpleTa },
        stepByStep: steps,
        keyConcepts,
        vocabulary,
        easierPracticeQuestions,
        teacherSupport
      },
      questions,
      isMock: true,
      providerName: 'Mock AI Engine (Offline / Sri Lanka Exhibition Mode)'
    };
  }
}
