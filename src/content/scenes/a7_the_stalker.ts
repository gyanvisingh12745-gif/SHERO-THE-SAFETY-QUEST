import { MissionSceneData } from '../types';

export const a7_the_stalker: MissionSceneData = {
  id: 'mission-7',
  part: 'A',
  code: 'A7',
  number: 7,
  titleEn: 'The Persistent Stalker',
  titleHi: 'लगातार पीछा करने वाला',
  taglineEn: 'An acquaintance refuses to take "no" for an answer, appearing outside classes and tracking daily routes.',
  taglineHi: 'एक परिचित इंकार सुनने को तैयार नहीं है और कॉलेज के बाहर लगातार पहरा देकर पीछा कर रहा है।',
  environmentName: 'late_night_road',
  badgeName: 'BOUNDARY SHIELD',
  badgeIcon: 'ShieldAlert',
  introPanels: [
    {
      id: 'p1',
      title: 'Everywhere She Goes',
      titleHi: 'हर जगह मौजूदगी',
      captionEn: "Outside the metro gate, near the canteen, at the library exit... he is always standing there watching.",
      captionHi: "मेट्रो स्टेशन, कैंटीन, लाइब्रेरी... वह हर जगह खड़ा होकर लगातार घूरता रहता है।",
      visualKey: 'stalker_canteen',
      badge: 'MONITORING',
      soundEffect: 'suspense'
    },
    {
      id: 'p2',
      title: 'Dozens of Missed Calls',
      titleHi: 'लगातार कॉल्स की बौछार',
      captionEn: "When blocked on WhatsApp, he creates new fake Instagram profiles and calls from burner numbers.",
      captionHi: "व्हाट्सएप पर ब्लॉक करने पर वह फर्जी प्रोफाइल और नए नंबरों से लगातार मैसेज भेजता है।",
      visualKey: 'stalker_messages',
      badge: 'SPAM',
      soundEffect: 'ping'
    },
    {
      id: 'p3',
      title: 'The Direct Confrontation',
      titleHi: 'रास्ते में घेराव',
      captionEn: "Today he blocks the campus exit lane, demanding 'just five minutes to talk alone'.",
      captionHi: "आज उसने कैंपस के गेट पर रास्ता रोक लिया और अकेले में बात करने की जिद करने लगा।",
      visualKey: 'stalker_block',
      badge: 'CONFRONTATION',
      soundEffect: 'impact'
    }
  ],
  startNodeId: 'node_1',
  nodes: {
    node_1: {
      id: 'node_1',
      decisionNumber: 1,
      backgroundKey: 'late_night_road',
      lighting: 'tension_dark',
      weather: 'clear',
      situationEn: 'The pursuer blocks your path near the campus gate, claiming he has a right to an explanation and won’t let you leave.',
      situationHi: 'पीछा करने वाला कैंपस गेट के पास आपका रास्ता रोकता है और कहता है कि जब तक बात नहीं करोगी, जाने नहीं दूंगा।',
      speakerId: 'stalker_ex',
      speakerName: 'Persistent Stalker',
      speakerExpression: 'angry',
      speakerDialogueEn: "You can't just ignore my calls, {hero}! Come sit in my car for five minutes, or I will stand here all night causing a scene.",
      speakerDialogueHi: "तुम मेरे कॉल्स ऐसे इग्नोर नहीं कर सकती {hero}! 5 मिनट मेरी गाड़ी में बैठो, वरना मैं यहीं हंगामा कर दूंगा।",
      heroExpression: 'determined',
      heroThoughtEn: "Emotional coercion and physical blocking are illegal stalking. I will not engage alone or get into his car.",
      heroThoughtHi: "रास्ता रोकना और धमकी देना गैरकानूनी स्टॉकिंग है। मैं अकेले में कोई बात नहीं करूंगी और न ही गाड़ी में बैठूंगी।",
      heroResponseDialogueEn: "Step back. I have clearly said no. Any further approach and I am filing an immediate police complaint under Section 354D / 78 BNS.",
      heroResponseDialogueHi: "पीछे हटिए। मैंने साफ मना किया है। आगे बढ़े तो मैं तुरंत स्टॉकिंग की कानूनी शिकायत दर्ज कराऊंगी।",
      mangaEffect: 'impact_burst',
      mangaBadge: 'STOP!',
      crowd: [
        { id: 'guard', name: 'Campus Security', role: 'Main gate guard', position: 'right_far', expression: 'determined' },
        { id: 'riya', name: 'Riya', role: 'Classmate nearby', position: 'left_far', expression: 'shocked' }
      ],
      questionEn: 'Someone is stalking, monitoring, and attempting to physically intimidate you into talking alone. What is the most effective safety protocol?',
      questionHi: 'अगर कोई लगातार पीछा करे, डराए और जबरन अकेले बात करने का दबाव बनाए, तो सबसे सही कदम क्या है?',
      choices: [
        {
          id: 'c1',
          textEn: 'Firmly state a clear boundary in public earshot, alert campus security/police (1091), and preserve all digital logs as legal evidence.',
          textHi: 'सबके सामने साफ मना करें, सुरक्षा गार्ड और 1091 को सूचित करें और सारे डिजिटल सबूत सुरक्षित रखें।',
          isCorrect: true,
          feedbackEn: 'Courageous and legally sound! Setting a firm boundary publicly and documenting the timeline gives law enforcement clear grounds to intervene.',
          feedbackHi: 'साहसी और कानूनी रूप से सटीक! सार्वजनिक सीमा तय करना और सबूत जुटाना त्वरित कानूनी कार्रवाई सुनिश्चित करता है।',
          educationalTipEn: 'Stalking (physical or digital) is a cognizable offense. Do not delete harassing messages; screenshot, timestamp, and report.',
          educationalTipHi: 'स्टॉकिंग गैरकानूनी अपराध है। मैसेज डिलीट न करें, उनके स्क्रीनशॉट लें और महिला हेल्पलाइन (1091) पर रिपोर्ट करें।',
          safetyDelta: 30,
          boundariesDelta: 30
        },
        {
          id: 'c2',
          textEn: 'Get into his car "just for five minutes" to avoid embarrassing him in public.',
          textHi: 'सार्वजनिक तमाशा न बने इसलिए चुपचाप 5 मिनट के लिए उसकी गाड़ी में बैठ जाएं।',
          isCorrect: false,
          feedbackEn: 'Extremely unsafe! Getting into an enclosed vehicle surrenders physical autonomy and significantly escalates personal vulnerability.',
          feedbackHi: 'अत्यंत असुरक्षित! बंद गाड़ी में बैठने से आपकी व्यक्तिगत सुरक्षा और नियंत्रण पूरी तरह खत्म हो जाता है।',
          educationalTipEn: 'Never enter secluded spaces with someone showing boundary-violating stalking behavior.',
          educationalTipHi: 'सीमाएं लांघने वाले व्यक्ति के साथ कभी भी बंद या एकांत स्थान पर न जाएं।',
          safetyDelta: -35,
          boundariesDelta: -30
        },
        {
          id: 'c3',
          textEn: 'Apologize and promise to reply to his late-night messages just to keep him calm.',
          textHi: 'उसे शांत रखने के लिए माफी मांगें और रात में बात करने का वादा करें।',
          isCorrect: false,
          feedbackEn: 'Yielding reinforces stalking patterns and gives false hope, causing the harassment to escalate further.',
          feedbackHi: 'झुकने से पीछा करने वाले की हिम्मत बढ़ती है और उत्पीड़न और ज्यादा गंभीर हो जाता है।',
          educationalTipEn: 'Clarity and firm disengagement—never appeasement—is the golden standard for dealing with stalkers.',
          educationalTipHi: 'स्टॉकर से निपटने के लिए स्पष्ट इनकार और दूरी सबसे जरूरी है, कभी समझौता न करें।',
          safetyDelta: -20,
          boundariesDelta: -25
        }
      ],
      winningNextNodeId: 'VICTORY'
    }
  },
  takeawayEn: {
    title: 'Key Takeaways — Anti-Stalking Defense',
    checklist: [
      'Say "NO" once clearly in writing: Ambiguity encourages persistent stalkers.',
      'Document everything: Save screenshots, dates, call logs, and eyewitness names.',
      'Never agree to isolated meetings "to clear the air".',
      'Involve institutional authorities (Internal Complaints Committee, Security, HR).',
      'Under law, physical or cyber stalking is punishable by imprisonment. Dial 1091 or 112.'
    ],
    motto: 'Clear Boundaries • Zero Tolerance • Be SHERO'
  },
  takeawayHi: {
    title: 'मुख्य सीख — स्टॉकिंग से बचाव के नियम',
    checklist: [
      'एक बार साफ और लिखित में मना करें: अनिश्चितता स्टॉकर को बढ़ावा देती है।',
      'हर सबूत संभालें: स्क्रीनशॉट, तारीखें, कॉल रिकॉर्ड और गवाहों के नाम।',
      'बात सुलझाने के बहाने कभी किसी सुनसान जगह पर न जाएं।',
      'संस्थागत कमेटियों (ICC, कॉलेज सुरक्षा, पुलिस) को तुरंत शामिल करें।',
      'कानून में स्टॉकिंग एक संज्ञेय अपराध है। हेल्पलाइन 1091 या 112 डायल करें।'
    ],
    motto: 'स्पष्ट सीमाएं • शून्य सहनशीलता • SHERO बनें'
  }
};
