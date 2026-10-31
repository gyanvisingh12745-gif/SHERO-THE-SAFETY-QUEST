import { MissionSceneData } from '../types';

export const a3_suspicious_chat: MissionSceneData = {
  id: 'mission-3',
  part: 'A',
  code: 'A3',
  number: 3,
  titleEn: 'The Suspicious Online Chat',
  titleHi: 'संदिग्ध ऑनलाइन चैट',
  taglineEn: 'Late night messages from an online gamer friend suddenly ask for private photos and home location.',
  taglineHi: 'ऑनलाइन गेमिंग दोस्त अचानक घर का पता और निजी तस्वीरें मांगने लगता है।',
  environmentName: 'cozy_bedroom_chat',
  badgeName: 'CYBER DEFENDER',
  badgeIcon: 'ShieldAlert',
  introPanels: [
    {
      id: 'p1',
      title: 'Gaming Community',
      titleHi: 'गेमिंग चैट',
      captionEn: "{hero} has been chatting with 'ShadowGamer99' for two weeks in a design community.",
      captionHi: "{hero} पिछले दो हफ़्तों से एक ऑनलाइन डिजाइन फोरम पर एक यूज़र से बात कर रही थी।",
      visualKey: 'cozy_bedroom_chat',
      badge: 'DIGITAL CHAT',
      soundEffect: 'ping'
    },
    {
      id: 'p2',
      title: 'Boundary Crossed',
      titleHi: 'सीमा का उल्लंघन',
      captionEn: "The tone abruptly shifts. He asks for her private webcam feed and current house address.",
      captionHi: "बातचीत अचानक बदल जाती है। वह वेबकैम चालू करने और घर का पता मांगने लगता है।",
      visualKey: 'cozy_bedroom_chat',
      badge: 'RED FLAG',
      soundEffect: 'suspense'
    },
    {
      id: 'p3',
      title: 'Taking Action',
      titleHi: 'सही कदम',
      captionEn: "Riya texts {hero}: 'Never share personal coordinates with unverified online profiles.'",
      captionHi: "रिया {hero} को समझाती है: 'अनजान ऑनलाइन प्रोफाइल को कभी निजी जानकारी मत देना।'",
      visualKey: 'cozy_bedroom_chat',
      badge: 'SHIELD',
      soundEffect: 'relief'
    }
  ],
  storyboardTurns: [
    {
      id: 'sb_1',
      speaker: 'Narrator',
      speakerRole: 'narrator',
      bubbleType: 'narration',
      textEn: 'Late at night, {hero} is in her room chatting on a design community forum. She\'s been talking to "ShadowGamer99" for two weeks — he seemed friendly and knowledgeable.',
      textHi: 'देर रात, {hero} अपने कमरे में एक डिज़ाइन फोरम पर चैट कर रही है। "ShadowGamer99" से दो हफ़्तों से बात हो रही थी — वह मिलनसार और जानकार लगता था।',
      mangaBadge: 'NIGHT',
      sfx: 'ambient',
      cameraZoom: 'wide'
    },
    {
      id: 'sb_2',
      speaker: 'ShadowGamer99',
      speakerRole: 'stranger',
      speakerExpression: 'neutral',
      bubbleType: 'phone',
      textEn: 'Hey! I loved your latest design post 🔥 You\'re so talented. I feel like we\'re really close friends now.',
      textHi: 'हे! तुम्हारी नई डिज़ाइन पोस्ट बहुत कमाल है 🔥 तुम बहुत टैलेंटेड हो। लगता है हम बहुत अच्छे दोस्त बन गए हैं।',
      mangaBadge: 'PING!',
      sfx: 'ping',
      cameraZoom: 'normal'
    },
    {
      id: 'sb_3',
      speaker: '{hero}',
      speakerRole: 'hero',
      heroExpression: 'happy',
      bubbleType: 'speech',
      textEn: 'Thanks! Yeah, it\'s nice having someone who gets design. We do chat a lot!',
      textHi: 'शुक्रिया! हाँ, डिज़ाइन समझने वाला कोई मिले तो अच्छा लगता है।',
      mangaBadge: 'CHAT',
      sfx: 'ping',
      cameraZoom: 'close_up'
    },
    {
      id: 'sb_4',
      speaker: 'ShadowGamer99',
      speakerRole: 'stranger',
      speakerExpression: 'annoyed',
      bubbleType: 'phone',
      textEn: 'So... since we\'re such good friends, why don\'t you turn on your webcam? And share your address — maybe I can send you a birthday surprise! 🎁',
      textHi: 'तो... जब हम इतने अच्छे दोस्त हैं तो अपना वेबकैम ऑन करो न? और अपना पता बताओ — शायद मैं बर्थडे पर कुछ भेज सकूँ! 🎁',
      mangaBadge: 'RED FLAG',
      sfx: 'suspense',
      cameraZoom: 'close_up'
    },
    {
      id: 'sb_5',
      speaker: '{hero}',
      speakerRole: 'hero',
      heroExpression: 'shocked',
      bubbleType: 'thought',
      textEn: 'Wait... webcam? Home address? This escalated really fast. Something feels off.',
      textHi: 'रुको... वेबकैम? घर का पता? यह तो एकदम से बहुत आगे बढ़ गया। कुछ गड़बड़ लग रही है।',
      mangaBadge: 'ALERT!',
      sfx: 'gasp',
      cameraZoom: 'close_up'
    },
    {
      id: 'sb_6',
      speaker: 'ShadowGamer99',
      speakerRole: 'stranger',
      speakerExpression: 'angry',
      bubbleType: 'phone',
      textEn: 'Come on, don\'t be shy! If you really trust me, prove it. Send a photo of your room. Otherwise, you\'re not a real friend.',
      textHi: 'अरे, संकोच क्यों? अगर सच में भरोसा है तो साबित करो। अपने कमरे की फोटो भेजो। नहीं तो तुम सच्ची दोस्त नहीं हो।',
      mangaBadge: 'PRESSURE!',
      sfx: 'tension',
      cameraZoom: 'normal'
    },
    {
      id: 'sb_7',
      speaker: 'Riya',
      speakerRole: 'friend',
      bubbleType: 'phone',
      textEn: 'Hey {hero}! Be careful — never share personal info with unverified online profiles. Classic catfishing tactic! 🚩',
      textHi: 'अरे {hero}! सावधान — अनजान ऑनलाइन प्रोफाइल को कभी निजी जानकारी मत देना। यह कैटफिशिंग है! 🚩',
      mangaBadge: 'SHIELD',
      sfx: 'ping',
      cameraZoom: 'normal'
    },
    {
      id: 'sb_8',
      speaker: '{hero}',
      speakerRole: 'hero',
      heroExpression: 'thinking',
      bubbleType: 'thought',
      textEn: 'Riya is right. He\'s using emotional manipulation — guilt-tripping me. I\'ve never even seen his real face.',
      textHi: 'रिया सही कह रही है। वह इमोशनल मैनिपुलेशन कर रहा है — गिल्ट ट्रिप दे रहा है। मैंने उसका असली चेहरा भी नहीं देखा।',
      mangaBadge: 'THINK',
      sfx: 'suspense',
      cameraZoom: 'close_up'
    },
    {
      id: 'sb_9',
      speaker: '{hero}',
      speakerRole: 'hero',
      heroExpression: 'nervous',
      bubbleType: 'thought',
      textEn: 'Should I block him immediately? Take screenshots first? What if he gets angry? I need to decide NOW.',
      textHi: 'क्या मैं उसे तुरंत ब्लॉक करूँ? पहले स्क्रीनशॉट लूँ? अगर वह गुस्सा हो गया तो? मुझे अभी फ़ैसला लेना होगा।',
      mangaBadge: 'DECIDE!',
      sfx: 'heartbeat',
      cameraZoom: 'close_up'
    }
  ],
  startNodeId: 'node_1',
  nodes: {
    node_1: {
      id: 'node_1',
      decisionNumber: 1,
      backgroundKey: 'cozy_bedroom_chat',
      lighting: 'tension_dark',
      weather: 'clear',
      situationEn: "The online contact gets pushy, messaging: 'If you really trust me as a friend, send a photo of your bedroom and your location now.'",
      situationHi: "ऑनलाइन यूजर दबाव बनाते हुए लिखता है: 'अगर तुम मुझे सच्चा दोस्त मानती हो, तो अपने कमरे की तस्वीर और पता भेजो।'",
      speakerId: 'scammer',
      speakerName: 'ShadowGamer99',
      speakerExpression: 'annoyed',
      speakerDialogueEn: "Come on, don't be shy! Proof of friendship. Turn on your webcam or give me your address, otherwise you're not a real friend.",
      speakerDialogueHi: "अरे संकोच क्यों? दोस्ती का सबूत दो। वेबकैम ऑन करो या पता भेजो, नहीं तो तुम सच्ची दोस्त नहीं हो।",
      heroExpression: 'determined',
      heroThoughtEn: "Emotional manipulation! Genuine online friends never demand private access or leverage guilt.",
      heroThoughtHi: "यह भावनात्मक दबाव है! सच्चा दोस्त कभी प्राइवेसी तोड़ने या दबाव बनाने की कोशिश नहीं करता।",
      heroResponseDialogueEn: "I do not share private photos or home coordinates with anyone online. Do not message me again.",
      heroResponseDialogueHi: "मैं किसी के साथ भी निजी फोटो या घर का पता शेयर नहीं करती। मुझे दोबारा मैसेज मत करना।",
      mangaEffect: 'shock_sparks',
      mangaBadge: 'BLOCK!',
      crowd: [
        { id: 'riya', name: 'Riya', role: 'Cyber Aware Friend', position: 'left_far', expression: 'determined' }
      ],
      questionEn: 'An online contact demands private photos or location under the guise of friendship. What is the safest action?',
      questionHi: 'ऑनलाइन दोस्त दोस्ती की आड़ में निजी फोटो या घर का पता मांगे, तो क्या करना चाहिए?',
      choices: [
        {
          id: 'c1',
          textEn: 'Refuse firmly, take screenshots of the chat as evidence, block the user, and report the account.',
          textHi: 'स्पष्ट मना करें, सबूत के लिए चैट का स्क्रीनशॉट लें, यूजर को ब्लॉक करें और रिपोर्ट करें।',
          isCorrect: true,
          feedbackEn: 'Excellent digital boundary! Preserving evidence before blocking ensures you can report harassment while completely cutting off intrusive contact.',
          feedbackHi: 'शानदार कदम! ब्लॉक करने से पहले स्क्रीनशॉट लेना साक्ष्य सुरक्षित रखता है और रिपोर्ट करने में मदद करता है।',
          educationalTipEn: 'Always screenshot boundary violations before blocking so you retain evidence for cybercrime reporting.',
          educationalTipHi: 'ब्लॉक करने से पहले स्क्रीनशॉट हमेशा लें ताकि जरूरत पड़ने पर साइबर सेल में शिकायत की जा सके।',
          safetyDelta: 25,
          boundariesDelta: 25
        },
        {
          id: 'c2',
          textEn: 'Send just one photo to avoid losing the friendship or making them angry.',
          textHi: 'दोस्ती बचाने या उन्हें नाराज न करने के लिए केवल एक फोटो भेज दें।',
          isCorrect: false,
          feedbackEn: 'Sharing private images under pressure invites escalating blackmail and extortion. Never compromise your personal security.',
          feedbackHi: 'दबाव में फोटो भेजना ब्लैकमेलिंग और साइबर अपराध का रास्ता खोलता है। कभी अपनी प्राइवेसी से समझौता न करें।',
          educationalTipEn: 'Giving in to initial demands always leads to larger demands in online extortion.',
          educationalTipHi: 'एक बार झुकने पर ब्लैकमेलर की मांगें और बढ़ जाती हैं।',
          safetyDelta: -30,
          boundariesDelta: -25
        },
        {
          id: 'c3',
          textEn: 'Delete your entire social media account immediately without saving any proof of the conversation.',
          textHi: 'बिना कोई स्क्रीनशॉट लिए तुरंत अपना अकाउंट डिलीट कर दें।',
          isCorrect: false,
          feedbackEn: 'Deleting your account destroys the digital audit trail, making it difficult to report harassment if the person contacts you elsewhere.',
          feedbackHi: 'सबूत मिटाने से साइबर सेल में शिकायत दर्ज कराना कठिन हो जाता है। हमेशा पहले रिकॉर्ड सुरक्षित रखें।',
          educationalTipEn: 'Retain the evidence first; blocking is safer than discarding all records.',
          educationalTipHi: 'पहले स्क्रीनशॉट रखें, फिर ब्लॉक करें।',
          safetyDelta: -10,
          boundariesDelta: 10
        }
      ],
      winningNextNodeId: 'VICTORY'
    }
  },
  takeawayEn: {
    title: 'Key Takeaways — Digital Safety & Privacy',
    checklist: [
      'Never share home address, school/college schedules, or private photos online.',
      'Recognize emotional manipulation: Real friends never demand proof via private media.',
      'Screenshot harassing chats and account handles before blocking.',
      'Report abusive accounts to platform safety teams and 1930 / cybercrime.gov.in.',
      'Keep your social profiles private and review friend lists regularly.'
    ],
    motto: 'Protect Your Pixels • Set Digital Boundaries • Be SHERO'
  },
  takeawayHi: {
    title: 'मुख्य सीख — डिजिटल सुरक्षा और गोपनीयता',
    checklist: [
      'घर का पता, कॉलेज का समय या निजी फोटो कभी ऑनलाइन शेयर न करें।',
      'भावनात्मक दबाव पहचानें: सच्चे दोस्त कभी निजी फोटो की मांग नहीं करते।',
      'ब्लॉक करने से पहले बातचीत का स्क्रीनशॉट जरूर संभाल कर रखें।',
      'साइबर अपराध की शिकायत 1930 और cybercrime.gov.in पर करें।',
      'अपनी सोशल मीडिया प्रोफाइल को प्राइवेट रखें।'
    ],
    motto: 'अपनी प्राइवेसी बचाएं • डिजिटल सीमाएं बनाएं • SHERO बनें'
  }
};
