import { Lesson } from '../types';

export const SAMPLE_LESSONS: Lesson[] = [
  {
    id: 'lesson-water-cycle-gr7',
    grade: 'Grade 7',
    subject: 'Science',
    title: 'The Water Cycle and Weather in Sri Lanka',
    originalText: `The water cycle is the continuous movement of water from the Earth's surface to the atmosphere and back again. The sun warms water in the Indian Ocean, tanks (wewas), and rivers across Sri Lanka. This causes evaporation, changing liquid water into water vapour. Plants also release water vapour into the air through transpiration. As water vapour rises into the cooler atmosphere, it cools down and turns into small water droplets, a process called condensation. These droplets gather to form clouds. When the clouds become heavy with condensed droplets, water falls back to the ground as precipitation (rain), feeding our rivers like the Mahaweli and recharging underground reservoirs.`,
    createdAt: '2026-09-01T08:30:00Z',
    content: {
      simpleExplanation: {
        en: 'The water cycle is how water travels in a big circle. The sun warms up water in rivers and seas. The water turns into invisible steam and rises into the sky. High up where it is cool, the steam forms clouds. When clouds get heavy, rain falls back to Sri Lanka\'s land and fills our lakes and rivers again.',
        si: 'ජල චක්‍රය යනු පෘථිවිය මත ජලය නොකඩවා ගමන් කරන ස්වභාවික ක්‍රියාවලියයි. සූර්ය තාපය නිසා මුහුදේ සහ වැව්වල ජලය වාෂ්ප වී අහසට යයි. ඉහළ අහසේදී එය සිසිල් වී වලාකුළු සාදයි. වලාකුළු බර වූ විට වැසි ජලය ලෙස නැවත අපේ මහපොළොවට වැටී ගංගා සහ වැව් පුරවයි.',
        ta: 'நீர்ச் சுழற்சி என்பது நீர் பூமியிலிருந்து வான்வெளிக்கும், மீண்டும் பூமிக்கும் ஒரு வட்ட வடிவில் தொடர்ச்சியாகப் பயணிக்கும் இயற்கையான முறையாகும். சூரிய வெப்பத்தால் ஏரிகள், கடல்களிலுள்ள நீர் நீராவியாக மேலே எழும்புகிறது. குளிர்ந்த வானில் அது மேகங்களாக மாறுகிறது. மேகங்கள் பாரமாகும் போது மழையாக மீண்டும் இலங்கையின் நிலத்தை அடைகிறது.'
      },
      stepByStep: [
        {
          stepNumber: 1,
          title: {
            en: '1. Evaporation (Water to Steam)',
            si: '1. වාෂ්පීභවනය (ජලය වාෂ්ප බවට පත්වීම)',
            ta: '1. ஆவியாதல் (நீர் நீராவியாக மாறுதல்)'
          },
          instruction: {
            en: 'The sun heats water in reservoirs (wewas) and seas. The warm water turns into invisible gas called water vapour and rises into the sky.',
            si: 'සූර්ය රශ්මිය නිසා වැව් සහ මුහුදු වල ජලය රත්වී නොපෙනෙන ජල වාෂ්ප බවට පත්වී ඉහළ අහසට ගමන් කරයි.',
            ta: 'சூரிய வெப்பத்தினால் குளங்கள், கடல்களிலுள்ள நீர் சூடாகி நீராவியாக மாறி வான்நோக்கி உயர்கிறது.'
          },
          keyClue: {
            en: 'Remember: Heat makes liquid rise as steam.',
            si: 'මතක තබා ගන්න: තාපය නිසා ජලය වාෂ්ප වී ඉහළ නගී.',
            ta: 'நினைவில் கொள்க: வெப்பம் நீரை நீராவியாக மேலே உயர்த்துகிறது.'
          }
        },
        {
          stepNumber: 2,
          title: {
            en: '2. Condensation (Clouds Form)',
            si: '2. ඝනීභවනය (වලාකුළු නිර්මාණය වීම)',
            ta: '2. ஒடுங்குதல் (மேகங்கள் உருவாதல்)'
          },
          instruction: {
            en: 'High up in the sky, the air is cold. The water vapour cools down and forms millions of tiny water droplets. These droplets group together to make clouds.',
            si: 'ඉහළ අහසේ වාතය සිසිල්ය. ජල වාෂ්ප සිසිල් වී කුඩා ජල බිඳිති බවට හැරී එකතු වීමෙන් වලාකුළු නිර්මාණය වේ.',
            ta: 'வானில் காற்று குளிர்ச்சியாக இருக்கும். நீராவி குளிர்ந்து நுண்ணிய நீர் துளிகளாகி மேகங்களாக ஒன்றிணைகின்றன.'
          },
          keyClue: {
            en: 'Remember: Cold air turns vapor back into water drops.',
            si: 'මතක තබා ගන්න: සීතල වාතය වාෂ්පය නැවත දිය බිංදු බවට පත් කරයි.',
            ta: 'நினைவில் கொள்க: குளிர்ந்த காற்று நீராவியை மீண்டும் நீர்த்துளிகளாக்குகிறது.'
          }
        },
        {
          stepNumber: 3,
          title: {
            en: '3. Precipitation (Rainfall)',
            si: '3. වර්ෂාපතනය (වැසි වැටීම)',
            ta: '3. மழைவீழ்ச்சி (மழை பெய்தல்)'
          },
          instruction: {
            en: 'When the clouds become too heavy with water, the water falls down as rain. In Sri Lanka, monsoons bring this rain to nourish crops and fill tanks.',
            si: 'වලාකුළු තුළ ජල බිඳිති අධික ලෙස එකතු වී බර වූ විට, ඒවා වැසි ලෙස මහපොළොවට පතිත වේ. අපේ රටේ මෝසම් සුළං මඟින් වැසි රැගෙන එයි.',
            ta: 'மேகங்களில் நீர்த்துளிகள் அதிகரித்து பாரமாகும் போது, அவை மழையாகப் பெய்கின்றன. பருவக்காற்றுகள் இந்த மழையைத் தருகின்றன.'
          },
          keyClue: {
            en: 'Remember: Heavy clouds let water fall back down.',
            si: 'මතක තබා ගන්න: බර වූ වලාකුළු ජලය වැස්සක් ලෙස බිමට හෙළයි.',
            ta: 'நினைவில் கொள்க: பாரமான மேகங்கள் மழையாகப் பொழிகின்றன.'
          }
        },
        {
          stepNumber: 4,
          title: {
            en: '4. Collection (Rivers & Reservoirs)',
            si: '4. එකතු වීම (ගංගා සහ වැව් පිරීම)',
            ta: '4. சேகரிப்பு (ஆறுகள், குளங்களில் சேருதல்)'
          },
          instruction: {
            en: 'Rainwater flows into rivers like the Kelani and Mahaweli, and into ancient tanks like Parakrama Samudra, ready for the cycle to repeat.',
            si: 'වැසි ජලය මහවැලි, කැළණි වැනි ගංගාවලට සහ පරාක්‍රම සමුද්‍රය වැනි වැව් වලට ගලා ගොස් එකතු වේ. ඉන්පසු චක්‍රය නැවත ආරම්භ වේ.',
            ta: 'மழைநீர் மகாவலி போன்ற ஆறுகளிலும், பராக்கிரம சமுத்திரம் போன்ற குளங்களிலும் சேகரமாகிறது. பின்னர் இச்சுழற்சி மீண்டும் தொடங்குகிறது.'
          },
          keyClue: {
            en: 'Remember: Water collects and the cycle starts again!',
            si: 'මතක තබා ගන්න: ජලය නැවත එකතු වී චක්‍රය යළිත් ඇරඹේ!',
            ta: 'நினைவில் கொள்க: நீர் மீண்டும் ஒன்றுசேர்ந்து சுழற்சி தொடர்கிறது!'
          }
        }
      ],
      keyConcepts: [
        {
          id: 'c1',
          concept: {
            en: 'Evaporation',
            si: 'වාෂ්පීභවනය',
            ta: 'ஆவியாதல்'
          },
          summary: {
            en: 'Liquid water changes into water vapour gas using solar heat.',
            si: 'සූර්ය තාපය මඟින් ද්‍රව ජලය වාෂ්ප බවට පත්වන ක්‍රියාවලිය.',
            ta: 'சூரிய வெப்பத்தினால் நீர் நீராவியாக மாறும் செயல்முறை.'
          }
        },
        {
          id: 'c2',
          concept: {
            en: 'Condensation',
            si: 'ඝනීභවනය',
            ta: 'ஒடுங்குதல்'
          },
          summary: {
            en: 'Cooling gas changes back into tiny liquid droplets that form clouds.',
            si: 'වාෂ්ප සිසිල් වී වලාකුළු සාදන ජල බිංදු බවට පත්වීම.',
            ta: 'நீராவி குளிர்ந்து மேகங்களை உருவாக்கும் நீர்த்துளிகளாக மாறுதல்.'
          }
        },
        {
          id: 'c3',
          concept: {
            en: 'Precipitation',
            si: 'වර්ෂාපතනය',
            ta: 'மழைவீழ்ச்சி'
          },
          summary: {
            en: 'Water falling from clouds to Earth as rain or dew.',
            si: 'වලාකුළු වලින් වැසි ලෙස ජලය නැවත පොළොවට පතිත වීම.',
            ta: 'மேகங்களிலிருந்து நிலத்திற்கு மழையாக நீர் திரும்பும் நிலை.'
          }
        }
      ],
      vocabulary: [
        {
          id: 'v1',
          word: {
            en: 'Water Vapour',
            si: 'ජල වාෂ්ප',
            ta: 'நீராவி'
          },
          meaning: {
            en: 'Water in the form of an invisible gas in the air.',
            si: 'වාතයේ ඇති නොපෙනෙන වායුමය තත්වයේ ජලය.',
            ta: 'காற்றில் கண்ணுக்குத் தெரியாத வாயு வடிவில் உள்ள நீர்.'
          },
          example: {
            en: 'Steam from a boiling tea kettle is water vapour.',
            si: 'උණු වතුර කේතලයකින් පිටවන දුමාරය ජල වාෂ්ප වලට උදාහරණයකි.',
            ta: 'சூடான தேநீர் கெத்திலியிலிருந்து வரும் ஆவி நீராவியாகும்.'
          }
        },
        {
          id: 'v2',
          word: {
            en: 'Transpiration',
            si: 'උත්ස්වේදනය',
            ta: 'நீராவிப்போக்கு'
          },
          meaning: {
            en: 'How plants breathe out water vapour through their leaves.',
            si: 'ශාක පත්‍ර මඟින් ජල වාෂ්ප වායුගෝලයට මුදා හැරීම.',
            ta: 'தாவரங்கள் இலைகள் வழியாக நீராவியை வெளிவிடும் செயல்முறை.'
          },
          example: {
            en: 'Paddy plants in Sri Lanka release moisture into the breeze.',
            si: 'කුඹුරුවල ගොයම් ගස් සුළඟට තෙතමනය මුදා හරියි.',
            ta: 'நெற்பயிர்கள் காற்றில் ஈரப்பதத்தை வெளிப்படுத்துகின்றன.'
          }
        },
        {
          id: 'v3',
          word: {
            en: 'Monsoon',
            si: 'මෝසම් සුළඟ',
            ta: 'பருவக்காற்று'
          },
          meaning: {
            en: 'Seasonal wind system that brings major rainfall to Sri Lanka.',
            si: 'ශ්‍රී ලංකාවට ප්‍රධාන වශයෙන් වැසි ගෙන එන සෘතුමය සුළං රටාව.',
            ta: 'இலங்கைக்கு முக்கிய மழையைக் கொண்டுவரும் பருவகாலக் காற்று.'
          },
          example: {
            en: 'The Southwest monsoon brings rain to Colombo and Kandy.',
            si: 'නිරිතදිග මෝසම කොළඹට සහ මහනුවරට වැසි ගෙන එයි.',
            ta: 'தென்மேற்கு பருவக்காற்று கொழும்புக்கும் கண்டிக்கும் மழையைக் கொண்டுவருகிறது.'
          }
        }
      ],
      easierPracticeQuestions: [
        {
          id: 'p1',
          question: {
            en: 'What happens to water in a puddle on a hot sunny day?',
            si: 'හොඳින් අව්ව ඇති දිනක පාරේ ඇති වතුර වලක ජලයට සිදුවන්නේ කුමක්ද?',
            ta: 'நல்ல வெயில் நாளில் நிலத்திலுள்ள சிறிய நீர் குட்டையின் நீருக்கு என்ன நிகழும்?'
          },
          hint: {
            en: 'Think about heat turning water into steam (evaporation).',
            si: 'සූර්ය තාපය නිසා ජලය වාෂ්ප වී අතුරුදහන් වීම ගැන සිතන්න.',
            ta: 'வெப்பத்தால் நீர் நீராவியாக மாறுவதைச் சிந்தியுங்கள்.'
          },
          sampleAnswer: {
            en: 'The sun warms the puddle water, causing it to evaporate into the air as vapour.',
            si: 'සූර්ය රශ්මියෙන් ජලය රත් වී වාෂ්පීභවනය වී වාතයට එක්වේ.',
            ta: 'சூரிய வெப்பத்தால் நீர் சூடாகி நீராவியாக காற்றில் கரைகிறது.'
          }
        },
        {
          id: 'p2',
          question: {
            en: 'Why do clouds look like fluffy cotton in the sky?',
            si: 'අහසේ වලාකුළු මෘදු පුළුන් රොදක් මෙන් පෙනෙන්නේ ඇයි?',
            ta: 'வானிலுள்ள மேகங்கள் பஞ்சு போல் தோன்றுவது ஏன்?'
          },
          hint: {
            en: 'Clouds are made of billions of tiny condensed water drops floating together.',
            si: 'වලාකුළු සෑදී ඇත්තේ එකට පාවෙන කුඩා ජල බිඳිති කෝටි ගණනකිනි.',
            ta: 'மேகங்கள் பல்லாயிரக்கணக்கான நுண்ணிய நீர்த்துளிகளால் ஆக்கப்பட்டுள்ளன.'
          },
          sampleAnswer: {
            en: 'Clouds are made of billions of tiny floating water droplets that condensed in cold air.',
            si: 'සිසිල් වාතයේ ඝනීභවනය වූ කුඩා ජල බිඳිති විශාල ප්‍රමාණයක් එකතුවීමෙන් වලාකුළු සෑදේ.',
            ta: 'குளிர்ந்த காற்றில் ஒடுங்கிய கோடிக்கணக்கான நீர்த்துளிகள் ஒன்றிணைந்துள்ளன.'
          }
        }
      ],
      teacherSupport: {
        scaffoldingTips: [
          'Use a simple transparent jar with warm water and ice cubes on top to physically show condensation in the classroom.',
          'Encourage students to act out the cycle: squat for collection, rise up waving hands for evaporation, link arms for clouds, and wiggle fingers downwards for rainfall.',
          'Provide graphic organizers with arrows for students who prefer spatial representation over written paragraphs.'
        ],
        classroomActivities: [
          'Local Reservoir Connection: Ask students to name the nearest tank (wewa) or river in their division.',
          'Rain Gauge Project: Set up an empty plastic bottle in the school garden to measure weekly monsoon rainfall.'
        ],
        pacingAdvice: 'Break the lesson into 2 distinct 20-minute sessions: Session 1 on Evaporation/Condensation, Session 2 on Precipitation and Local Monsoons.',
        nonDiagnosticNotice: 'Notice: This assistive tool offers multi-sensory and simplified representations for pedagogical support. It is not an assessment or diagnostic instrument.'
      }
    },
    questions: [
      {
        id: 'q1',
        lessonId: 'lesson-water-cycle-gr7',
        question: {
          en: 'What provides the primary energy to drive the water cycle on Earth?',
          si: 'පෘථිවියේ ජල චක්‍රය ක්‍රියාත්මක කිරීමට ප්‍රධාන ශක්තිය සපයන්නේ කුමක්ද?',
          ta: 'பூமியில் நீர்ச் சுழற்சியை இயக்குவதற்கான முதன்மை ஆற்றலை வழங்குவது எது?'
        },
        options: {
          en: ['The Sun', 'Ocean Waves', 'Wind Turbines', 'Underground Rocks'],
          si: ['සූර්යයා', 'සාගර රළ', 'සුළං මෝල්', 'භූගත පාෂාණ'],
          ta: ['சூரியன்', 'கடல் அலைகள்', 'காற்றாலைகள்', 'நிலத்தடி பாறைகள்']
        },
        correctAnswerIndex: 0,
        explanation: {
          en: 'The Sun heats water bodies, causing evaporation which starts the whole water cycle.',
          si: 'සූර්යයාගෙන් ලැබෙන තාපය මඟින් ජලය රත් වී වාෂ්ප වීමෙන් ජල චක්‍රය ආරම්භ වේ.',
          ta: 'சூரிய வெப்பமே நீரை ஆவியாக்கி நீர்ச் சுழற்சியைத் தொடக்கி வைக்கிறது.'
        },
        conceptTested: 'Energy source for evaporation',
        difficulty: 'Easy'
      },
      {
        id: 'q2',
        lessonId: 'lesson-water-cycle-gr7',
        question: {
          en: 'What is the process called when water vapour cools to create clouds?',
          si: 'ජල වාෂ්ප සිසිල් වී වලාකුළු සෑදීමේ ක්‍රියාවලිය හඳුන්වන්නේ කුමක් ලෙසද?',
          ta: 'நீராவி குளிர்ந்து மேகங்களை உருவாக்கும் செயல்முறை எவ்வாறு அழைக்கப்படுகிறது?'
        },
        options: {
          en: ['Condensation', 'Evaporation', 'Collection', 'Freezing'],
          si: ['ඝනීභවනය', 'වාෂ්පීභවනය', 'එකතු වීම', 'මිදීම'],
          ta: ['ஒடுங்குதல்', 'ஆவியாதல்', 'சேகரித்தல்', 'உறைதல்']
        },
        correctAnswerIndex: 0,
        explanation: {
          en: 'Condensation happens when warm water vapour meets colder air aloft and turns into water droplets.',
          si: 'වාෂ්ප වූ වාතය සිසිල් වාතය සමඟ ගැටී නැවත කුඩා දිය බිඳිති බවට පත්වීම ඝනීභවනයයි.',
          ta: 'வெப்பமான நீராவி குளிர்ந்த காற்றை சந்தித்து நீர்த்துளிகளாவது ஒடுங்குதல் ஆகும்.'
        },
        conceptTested: 'Condensation mechanism',
        difficulty: 'Easy'
      },
      {
        id: 'q3',
        lessonId: 'lesson-water-cycle-gr7',
        question: {
          en: 'When water falls from clouds to the ground as rain in Sri Lanka, what is this stage called?',
          si: 'වලාකුළු වලින් වැසි ලෙස ජලය පොළොවට වැටෙන අවස්ථාව හඳුන්වන්නේ කුමන නමකින්ද?',
          ta: 'மேகங்களிலிருந்து நிலத்திற்கு மழையாக நீர் விழும் நிலை எவ்வாறு அழைக்கப்படுகிறது?'
        },
        options: {
          en: ['Precipitation', 'Transpiration', 'Filtration', 'Sedimentation'],
          si: ['වර්ෂාපතනය', 'උත්ස්වේදනය', 'පෙරීම', 'අවසාදනය'],
          ta: ['மழைவீழ்ச்சி', 'நீராவிப்போக்கு', 'வடிகட்டுதல்', 'படிதல்']
        },
        correctAnswerIndex: 0,
        explanation: {
          en: 'Precipitation is any liquid or frozen water that forms in the atmosphere and falls back to the Earth.',
          si: 'වායුගෝලයේ ඝනීභවනය වූ ජලය වැසි, පිනි ආදී ලෙස පොළොවට පතිත වීම වර්ෂාපතනයයි.',
          ta: 'வளிமண்டலத்தில் உருவாகி பூமியை வந்தடையும் நீர் மழைவீழ்ச்சி எனப்படும்.'
        },
        conceptTested: 'Precipitation definition',
        difficulty: 'Medium'
      }
    ]
  },
  {
    id: 'lesson-irrigation-gr8',
    grade: 'Grade 8',
    subject: 'History',
    title: 'Ancient Hydraulic Civilization and Tanks of Sri Lanka',
    originalText: `Sri Lanka possesses one of the world's most sophisticated ancient hydraulic civilizations. King Pandukabhaya initiated organized tank construction in Anuradhapura with the Abhaya Wewa. Later kings like Dhatusena built the majestic Kala Wewa, and King Parakramabahu the Great constructed the massive Parakrama Samudra in Polonnaruwa, declaring that not even a single drop of water from rain should flow into the ocean without serving human needs. Ancient Sinhalese engineers invented the Bisokotuwa (cistern sluice gate), a miraculous engineering device that controlled water pressure inside deep reservoirs without breaking earthen bunds.`,
    createdAt: '2026-09-02T10:15:00Z',
    content: {
      simpleExplanation: {
        en: 'Long ago, ancient Sri Lankan kings and engineers built giant man-made lakes called "wewas" (tanks). These stored rainwater so farmers could grow rice during dry seasons. King Parakramabahu said no raindrop should reach the ocean without helping people. They also invented the "Bisokotuwa", a clever stone gate that safely controlled powerful water currents.',
        si: 'පුරාණ ශ්‍රී ලංකාවේ රජවරු සහ ඉංජිනේරුවෝ වැසි ජලය රැස් කිරීමට මහා වැව් ඉදිකළහ. ඒ නියං කාලයේදී ගොවිතැන් කිරීමටය. මහා පරාක්‍රමබාහු රජු පැවසුවේ "අහසින් වැටෙන එකදු දිය බිඳක්වත් මිනිසාගේ ප්‍රයෝජනයට නොගෙන මුහුදට ගලා යාමට ඉඩ නොදිය යුතුය" කියායි. වේලි කැඩී යාම වැළැක්වීමට ඔවුහු බිසෝකොටුව නමැති අගනා තාක්ෂණය නිපදවූහ.',
        ta: 'பண்டைய இலங்கையின் மன்னர்களும் பொறியியலாளர்களும் மழைநீரைச் சேமிக்க பிரம்மாண்டமான குளங்களைக் கட்டினார்கள். வறட்சிக் காலத்தில் விவசாயம் செய்ய இது உதவியது. "வானிலிருந்து விழும் ஒரு துளி நீரும் மனிதனுக்குப் பயன்படாமல் கடலுக்குச் செல்லக்கூடாது" என்று மகா பராக்கிரமபாகு மன்னர் கூறினார். அவர்கள் மதகுகளைப் பாதுகாப்பாக இயக்க பிசோகொட்டுவ என்ற நீர் ஒழுங்குபடுத்தும் வழியைக் கண்டுபிடித்தனர்.'
      },
      stepByStep: [
        {
          stepNumber: 1,
          title: {
            en: '1. Catching the Rain',
            si: '1. වැසි ජලය අල්ලා ගැනීම',
            ta: '1. மழைநீரைப் பிடித்தல்'
          },
          instruction: {
            en: 'Ancient builders chose natural valleys and created long soil dams (bunds) to block seasonal monsoon rainwater and hold it in a lake.',
            si: 'ස්වභාවික නිම්න තෝරාගෙන දිගු පස් බැමි බැඳ මෝසම් වැසි ජලය රඳවා තබා ගන්නා ලදී.',
            ta: 'இயற்கையான பள்ளத்தாக்குகளைத் தேர்ந்தெடுத்து மண் அணைகளைக் கட்டி மழைநீரைத் தேக்கினார்கள்.'
          },
          keyClue: {
            en: 'A tank is a human-made lake built across waterways.',
            si: 'වැවක් යනු ජලය රඳවන මිනිසා විසින් සාදන ලද විලකි.',
            ta: 'குளம் என்பது மனிதனால் கட்டப்பட்ட நீர்நிலையாகும்.'
          }
        },
        {
          stepNumber: 2,
          title: {
            en: '2. The Bisokotuwa (Water Regulator)',
            si: '2. බිසෝකොටුව (දිය පාලක කුටීරය)',
            ta: '2. பிசோகொட்டுவ (நீர்க் கட்டுப்பாட்டறை)'
          },
          instruction: {
            en: 'Water pressure in deep tanks was huge. Ancient engineers built square stone chambers called Bisokotuwa to slow down water pressure before releasing it into canals.',
            si: 'මහා වැව්වල ජල පීඩනය වැව් බැම්ම බිඳ හෙළිය හැකි විය. ඒ නිසා ජල පීඩනය පාලනය කර ඇළ මාර්ග වෙත ජලය මුදාහැරීමට බිසෝකොටුව ඉදි කරන ලදී.',
            ta: 'ஆழமான குளங்களில் நீரின் அழுத்தம் அதிகமாக இருந்தது. அணைகள் உடைவதைத் தடுக்க நீரின் அழுத்தத்தைக் குறைக்கும் பிசோகொட்டுவ என்ற கல்துளை அறையை அமைத்தனர்.'
          },
          keyClue: {
            en: 'The Bisokotuwa safely relieves extreme water pressure.',
            si: 'බිසෝකොටුව මඟින් ප්‍රචණ්ඩ ජල පීඩනය සන්සුන් කරයි.',
            ta: 'பிசோகொட்டுவ அதிக நீர் அழுத்தத்தைச் சீராக்குகிறது.'
          }
        },
        {
          stepNumber: 3,
          title: {
            en: '3. Yoda Ela (Canals to Fields)',
            si: '3. යෝධ ඇළ (කුඹුරුවලට ජලය ගෙන යාම)',
            ta: '3. யோத எல (வயல்களுக்கு நீர் பாய்ச்சும் கால்வாய்)'
          },
          instruction: {
            en: 'Water traveled gently along long stone canals like the Yoda Ela (Giant\'s Canal), which sloped just a few inches per mile to prevent erosion, feeding village paddy fields.',
            si: 'ජය ගඟ හෙවත් යෝධ ඇළ වැනි ඇළ මාර්ග ඔස්සේ ඉතා මන්දගාමී බෑවුමක් සහිතව සැතපුම් ගණනාවක් ඈත කුඹුරු වෙත ජලය බෙදා හරින ලදී.',
            ta: 'யோத எல போன்ற பிரம்மாண்டக் கால்வாய்கள் மிகக் குறைந்த சரிவில் மண்ணரிப்பு ஏற்படாமல் நீர் தூரத்து வயல்களுக்குப் பாய உதவின.'
          },
          keyClue: {
            en: 'Canals carry water calmly to farmer fields.',
            si: 'ඇළ මාර්ග මඟින් ගොවීන්ගේ කුඹුරු වෙත සන්සුන්ව ජලය සපයයි.',
            ta: 'கால்வாய்கள் அமைதியாக வயல்களுக்கு நீரைக் கொண்டுசெல்கின்றன.'
          }
        }
      ],
      keyConcepts: [
        {
          id: 'hc1',
          concept: {
            en: 'Hydraulic Civilization',
            si: 'වාරි ශිෂ්ටාචාරය',
            ta: 'நீர்ப்பாசன நாகரிகம்'
          },
          summary: {
            en: 'A society organized around master-level management, storage, and sharing of water resources.',
            si: 'ජල සම්පත කළමනාකරණය සහ සංරක්ෂණය පදනම් කරගත් දියුණු සමාජ ක්‍රමයක්.',
            ta: 'நீர்வள முகாமைத்துவத்தையும் சேமிப்பையும் மையமாகக் கொண்ட நாகரிகம்.'
          }
        },
        {
          id: 'hc2',
          concept: {
            en: 'Bisokotuwa (Cistern Sluice)',
            si: 'බිසෝකොටුව',
            ta: 'பிசோகொட்டுவ'
          },
          summary: {
            en: 'The world\'s earliest water pressure regulator invention created by Sri Lankan engineers.',
            si: 'වැව් බැම්ම ආරක්ෂා කරමින් ජල පීඩනය පාලනය කළ පුරාණ ශ්‍රී ලාංකේය තාක්ෂණික සොයාගැනීම.',
            ta: 'நீரின் வேகத்தை மட்டுப்படுத்தி அணையைக் காக்க உருவாக்கப்பட்ட பண்டைய கண்டுபிடிப்பு.'
          }
        }
      ],
      vocabulary: [
        {
          id: 'hv1',
          word: {
            en: 'Wewa (Tank)',
            si: 'වැව',
            ta: 'குளம்'
          },
          meaning: {
            en: 'An artificial reservoir built to conserve rainwater for irrigation.',
            si: 'වගා කටයුතු සඳහා වැසි ජලය රඳවා තබා ගැනීමට තැනූ කෘත්‍රිම ජලාශය.',
            ta: 'விவசாயத்திற்காக மழைநீரைத் தேக்கிவைக்கும் செயற்கை நீர்நிலை.'
          },
          example: {
            en: 'Kala Wewa was constructed by King Dhatusena.',
            si: 'කලා වැව ධාතුසේන රජු විසින් කරවන ලද්දකි.',
            ta: 'கலா வாவி தாதுசேன மன்னரால் கட்டப்பட்டது.'
          }
        },
        {
          id: 'hv2',
          word: {
            en: 'Yoda Ela',
            si: 'යෝධ ඇළ',
            ta: 'யோத எல'
          },
          meaning: {
            en: 'A canal engineered with an extremely subtle slope to carry water across long distances.',
            si: 'ඉතා සියුම් බැවුමකින් යුතුව දුර බැහැරට ජලය ගෙන යාමට තැනූ මහා ඇළ.',
            ta: 'நீண்ட தூரத்திற்கு நீரைக் கொண்டுசெல்ல மெல்லிய சரிவுடன் வெட்டப்பட்ட வாய்க்கால்.'
          },
          example: {
            en: 'The Yoda Ela connected Kala Wewa with Tissa Wewa in Anuradhapura.',
            si: 'යෝධ ඇළ කලා වැවේ සිට අනුරාධපුර තිසා වැව දක්වා ජලය රැගෙන ගියේය.',
            ta: 'யோத எல கலா வாவியிலிருந்து அனுராதபுர திஸா வாவி வரை நீரை இணைத்தது.'
          }
        }
      ],
      easierPracticeQuestions: [
        {
          id: 'hp1',
          question: {
            en: 'What did King Parakramabahu say about raindrops in Sri Lanka?',
            si: 'ශ්‍රී ලංකාවේ වැසි බිංදු පිළිබඳව මහා පරාක්‍රමබාහු රජු පැවසුවේ කුමක්ද?',
            ta: 'மழைத்துளிகள் பற்றி மகா பராக்கிரமபாகு மன்னர் என்ன கூறினார்?'
          },
          hint: {
            en: 'Think about not letting water flow into the sea without helping people.',
            si: 'මිනිසාට ප්‍රයෝජනවත් නොවී කිසිදු ජල බිඳක් මුහුදට යා නොදිය යුතුය යන්න සිහිපත් කරන්න.',
            ta: 'எந்த ஒரு துளி நீரும் மனிதனுக்குப் பயன்படாமல் கடலுக்குச் செல்லக்கூடாது என்பதை நினையுங்கள்.'
          },
          sampleAnswer: {
            en: 'He declared that not even a single drop of rain should flow into the ocean without serving mankind.',
            si: 'අහසින් වැටෙන එකදු දිය බිඳක්වත් මිනිසාගේ ප්‍රයෝජනයට නොගෙන මුහුදට ගලා යාමට ඉඩ නොදිය යුතුය.',
            ta: 'மனித குலத்திற்குப் பயன்படாமல் ஒரு துளி நீரும் கடலில் கலக்க அனுமதிக்கக்கூடாது என்றார்.'
          }
        }
      ],
      teacherSupport: {
        scaffoldingTips: [
          'Show a cross-section drawing of a wewa bund with the Bisokotuwa chamber so learners can see where the stone sluice sits.',
          'Connect the lesson to local food security: ask students what happens to rice harvests when rains fail if tanks did not exist.'
        ],
        classroomActivities: [
          'Model Construction: Have small groups build a mini clay/sand bund with a plastic pipe and observe water regulation.',
          'Map Reading: Trace the course of the Yoda Ela on an ancient map of the Dry Zone.'
        ],
        pacingAdvice: 'Teach the king\'s vision first (historical context), followed by the engineering breakdown of the Bisokotuwa.',
        nonDiagnosticNotice: 'Notice: This assistive tool is built for learning engagement and varied learning pacing. Not for psychological or diagnostic categorization.'
      }
    },
    questions: [
      {
        id: 'hq1',
        lessonId: 'lesson-irrigation-gr8',
        question: {
          en: 'Which ingenious invention allowed ancient Sri Lankan engineers to safely regulate intense water pressure inside deep reservoirs?',
          si: 'ගැඹුරු මහා වැව් තුළ ඇතිවන අධික ජල පීඩනය ආරක්ෂිතව පාලනය කිරීමට පුරාණ ඉංජිනේරුවන් නිපදවූ විශිෂ්ට උපක්‍රමය කුමක්ද?',
          ta: 'ஆழமான குளங்களில் ஏற்படும் தீவிர நீர் அழுத்தத்தைப் பாதுகாப்பாகக் கட்டுப்படுத்த பண்டைய பொறியியலாளர்கள் உருவாக்கிய சிறந்த சாதனம் எது?'
        },
        options: {
          en: ['Bisokotuwa (Cistern Sluice)', 'Electric Pump', 'Wooden Wheel', 'Iron Gate'],
          si: ['බිසෝකොටුව', 'විදුලි පොම්පය', 'ලී රෝදය', 'යකඩ දොරටුව'],
          ta: ['பிசோகொட்டுவ (மதகு அறை)', 'மின்சார பம்ப்', 'மர சக்கரம்', 'இரும்பு கதவு']
        },
        correctAnswerIndex: 0,
        explanation: {
          en: 'The Bisokotuwa was an enclosed stone chamber that absorbed and dampened water pressure so the earth bund would not break.',
          si: 'බිසෝකොටුව මඟින් ජලයේ ප්‍රචණ්ඩ පීඩනය අවශෝෂණය කර පාලනය කළ බැවින් වැව් බැම්ම කැඩී යාම වැළකුණි.',
          ta: 'பிசோகொட்டுவ என்பது நீர் அழுத்தத்தைத் தாங்கி குறைத்து அணை உடைவதைத் தடுக்கும் கல்துளை அமைப்பாகும்.'
        },
        conceptTested: 'Bisokotuwa mechanism',
        difficulty: 'Easy'
      },
      {
        id: 'hq2',
        lessonId: 'lesson-irrigation-gr8',
        question: {
          en: 'Which famous monarch built the colossal Parakrama Samudra reservoir in Polonnaruwa?',
          si: 'පොළොන්නරුවේ පිහිටි දැවැන්ත පරාක්‍රම සමුද්‍රය නිර්මාණය කළ කීර්තිමත් රජු කවුද?',
          ta: 'பொலன்னறுவையில் பிரம்மாண்டமான பராக்கிரம சமுத்திரத்தைக் கட்டிய புகழ்பெற்ற மன்னர் யார்?'
        },
        options: {
          en: ['King Parakramabahu the Great', 'King Dutugemunu', 'King Devanampiyatissa', 'King Kasyapa'],
          si: ['මහා පරාක්‍රමබාහු රජු', 'දුටුගැමුණු රජු', 'දේවානම්පියතිස්ස රජු', 'කාශ්‍යප රජු'],
          ta: ['மகா பராக்கிரமபாகு மன்னர்', 'துட்டகைமுனு மன்னர்', 'தேவாநம்பியதீசன் மன்னர்', 'காசியப்ப மன்னர்']
        },
        correctAnswerIndex: 0,
        explanation: {
          en: 'King Parakramabahu I constructed the Parakrama Samudra by combining multiple water bodies in Polonnaruwa.',
          si: 'මහා පරාක්‍රමබාහු රජු ජලාශ කිහිපයක් එක් කරමින් පරාක්‍රම සමුද්‍රය නිර්මාණය කළේය.',
          ta: 'முதலாம் பராக்கிரமபாகு மன்னர் பல நீர்நிலைகளை ஒன்றிணைத்து பராக்கிரம சமுத்திரத்தை அமைத்தார்.'
        },
        conceptTested: 'Historical ruler attribution',
        difficulty: 'Easy'
      }
    ]
  }
];
