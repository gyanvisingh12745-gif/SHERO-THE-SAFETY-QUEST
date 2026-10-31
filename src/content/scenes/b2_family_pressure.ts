import { MissionSceneData } from '../types';

export const b2_family_pressure: MissionSceneData = {
  id: 'episode-2',
  part: 'B',
  code: 'B2',
  number: 11,
  titleEn: 'Family & In-Law Pressure',
  titleHi: 'पारिवारिक दबाव और मर्यादा',
  taglineEn: 'Traditional expectations clash with self-respect as in-laws demand {helpedWoman} quit her career.',
  taglineHi: 'पारंपरिक रूढ़िवादिता और आत्मसम्मान का टकराव, जब ससुराल वाले {helpedWoman} पर नौकरी छोड़ने का दबाव डालते हैं।',
  environmentName: 'cozy_apartment',
  badgeName: 'VOICE OF DIGNITY',
  badgeIcon: 'Users',
  introPanels: [
    {
      id: 'p1',
      title: 'The Living Room Summit',
      titleHi: 'बैठक में फैसला',
      captionEn: "The extended family gathers in the drawing room. The mood is tense and judgmental.",
      captionHi: "ड्रॉइंग रूम में सब इकट्ठा हैं। माहौल भारी और तनावरहित नहीं है।",
      visualKey: 'b2_family_living_room',
      badge: 'COUNCIL',
      soundEffect: 'suspense'
    },
    {
      id: 'p2',
      title: 'Surrender Your Career',
      titleHi: 'नौकरी छोड़ने का फरमान',
      captionEn: "Sunita Aunty announces: 'Our family honor requires our daughter-in-law to stay at home and serve.'",
      captionHi: "सुनीता आंटी फरमान सुनाती हैं: 'हमारे खानदान की बहुएं बाहर नौकरी नहीं करतीं, घर संभालती हैं।'",
      visualKey: 'b2_quit_job_demand',
      badge: 'TRADITION',
      soundEffect: 'sigh'
    },
    {
      id: 'p3',
      title: 'Hand Over the Passbook',
      titleHi: 'बैंक खाते पर कब्जा',
      captionEn: "They demand {helpedWoman} hand over her salary account ATM card and passbook to the household head.",
      captionHi: "वे {helpedWoman} का बैंक पासबुक और एटीएम कार्ड सास-ससुर के हवाले करने की मांग करते हैं।",
      visualKey: 'b2_passbook_demand',
      badge: 'FINANCIAL',
      soundEffect: 'heartbeat'
    }
  ],
  startNodeId: 'node_1',
  nodes: {
    node_1: {
      id: 'node_1',
      decisionNumber: 1,
      backgroundKey: 'cozy_apartment',
      lighting: 'amber_interior',
      weather: 'clear',
      situationEn: 'Sunita Aunty and {husband} corner {helpedWoman}, asserting that continuing her job is ruining family honor and demanding she resign by tomorrow.',
      situationHi: 'सुनीता आंटी और {husband} {helpedWoman} पर दबाव बनाते हैं कि नौकरी करना खानदान की नाक कटवाने जैसा है और कल ही इस्तीफा देना होगा।',
      speakerId: 'sunita_aunty',
      speakerName: 'Sunita Aunty (Mother-in-Law)',
      speakerExpression: 'angry',
      speakerDialogueEn: "Bahu, four generations of women in our household adjusted silently! Your job is giving you wings and arrogance. Resign tomorrow and hand your savings to the house fund.",
      speakerDialogueHi: "बहू, हमारे खानदान की औरतों ने चार पीढ़ियों से चुपचाप तालमेल बिठाया है! नौकरी ने तुम्हें घमंडी बना दिया है। कल इस्तीफा दो और सारे पैसे घर में जमा करो।",
      heroExpression: 'determined',
      heroThoughtEn: "Emotional blackmail using 'tradition' is economic and psychological coercion. {helpedWoman} earned her education and career.",
      heroThoughtHi: "'खानदान की इज्जत' के नाम पर किसी की आर्थिक आजादी छीनना और मानसिक प्रताड़ना देना घरेलू हिंसा का हिस्सा है।",
      heroResponseDialogueEn: "Aunty ji, earning with dignity and pursuing a profession is not disrespect. A daughter-in-law is an equal partner, not an unpaid subordinate.",
      heroResponseDialogueHi: "आंटी जी, सम्मान के साथ नौकरी करना और आत्मनिर्भर रहना कोई अपमान नहीं है। बहू एक बराबर की इंसान है, कोई नौकरानी नहीं।",
      mangaEffect: 'impact_burst',
      mangaBadge: 'STOP!',
      crowd: [
        { id: 'rohan', name: '{husband}', role: 'Husband siding with mother', position: 'right_far', expression: 'annoyed' },
        { id: 'anjali', name: '{helpedWoman} Didi', role: 'Distressed protagonist', position: 'left_far', expression: 'sad' }
      ],
      questionEn: 'In-laws use guilt and generational tradition to force a woman to abandon financial independence and surrender her earnings. What is the principled action?',
      questionHi: 'ससुराल वाले पारिवारिक परंपरा की दुहाई देकर नौकरी छुड़वाने और पैसे छीनने का दबाव बनाएं, तो क्या कदम उठाना चाहिए?',
      choices: [
        {
          id: 'c1',
          textEn: 'Maintain financial boundaries: Retain sole control of your salary account, calmly assert your legal right to work, and suggest professional family counselling.',
          textHi: 'आर्थिक सीमाओं पर अडिग रहें: अपने खाते पर खुद नियंत्रण रखें, काम करने के हक पर शांत रहकर जोर दें और फैमिली काउंसलर की मदद लें।',
          isCorrect: true,
          feedbackEn: 'Empowered and dignified stance! Financial independence is your strongest safeguard. Surrendering your livelihood leads to complete dependency and deeper vulnerability.',
          feedbackHi: 'सम्मानजनक और सशक्त निर्णय! आर्थिक आत्मनिर्भरता आपकी सबसे बड़ी ताकत है। अपनी आजीविका छोड़ना भविष्य को जोखिम में डालना है।',
          educationalTipEn: 'Economic abuse (denying finances, seizing earnings) is explicitly recognized under Section 3 of the Protection of Women from Domestic Violence Act (PWDVA).',
          educationalTipHi: 'घरेलू हिंसा अधिनियम (PWDVA) की धारा 3 के तहत किसी की कमाई छीनना या आर्थिक रूप से मजबूर करना कानूनन अपराध है।',
          safetyDelta: 25,
          boundariesDelta: 30
        },
        {
          id: 'c2',
          textEn: 'Build an ally circle: Loop in trusted parents/mentors to ensure discussions remain fair, witnessed, and balanced.',
          textHi: 'सपोर्ट सिस्टम को शामिल करें: अपने माता-पिता या समझदार मेंटर्स को बातचीत में शामिल करें ताकि कोई अकेला न दबा सके।',
          isCorrect: true,
          feedbackEn: 'Smart strategic move. Having external supportive witnesses prevents gaslighting and one-sided intimidation.',
          feedbackHi: 'सटीक रणनीति। जब बाहर के समझदार शुभचिंतक मौजूद होते हैं, तो एकतरफा दबाव और ज्यादती रुकती है।',
          educationalTipEn: 'Never let in-laws isolate you from your parental support system when major life ultimatums are delivered.',
          educationalTipHi: 'जब जीवन से जुड़े बड़े फैसले थोपे जा रहे हों, तो अपने मायके या शुभचिंतकों से कभी दूरी न बनाएं।',
          safetyDelta: 20,
          supportDelta: 25
        },
        {
          id: 'c3',
          textEn: 'Resign immediately, surrender all bank OTPs, and apologize for having professional aspirations.',
          textHi: 'तुरंत नौकरी से इस्तीफा दे दें, बैंक के सारे ओटीपी सास को दे दें और करियर सोचने के लिए माफी मांगें।',
          isCorrect: false,
          feedbackEn: 'Devastating surrender! Giving up financial autonomy strips away future security, leaving zero leverage if conditions worsen.',
          feedbackHi: 'अत्यंत नुकसानदेह फैसला! अपनी आर्थिक आजादी गंवाने से भविष्य में आत्मसम्मान और सुरक्षा दोनों खत्म हो जाते हैं।',
          educationalTipEn: 'A career is not a luxury to be bargained away—it is foundational to self-reliance and security.',
          educationalTipHi: 'करियर कोई खैरात नहीं है जिस पर समझौता किया जाए—यह आत्मनिर्भरता और सुरक्षा की नींव है।',
          safetyDelta: -30,
          boundariesDelta: -30
        }
      ],
      winningNextNodeId: 'VICTORY'
    }
  },
  takeawayEn: {
    title: 'Key Takeaways — Resisting In-Law Economic Coercion',
    checklist: [
      'Financial autonomy is your shield: Never hand over salary cards or passwords.',
      '"Adjusting" does not mean surrendering your human rights and dreams.',
      'Document family mediation meetings and involve respected impartial mediators.',
      'Economic abuse is legally recognized under the PWDVA Act 2005.',
      'National Commission for Women (NCW) helpline: 7827170170.'
    ],
    motto: 'Equal Partnership • Economic Freedom • Be SHERO'
  },
  takeawayHi: {
    title: 'मुख्य सीख — पारिवारिक और आर्थिक दबाव का सामना',
    checklist: [
      'आर्थिक आजादी आपकी ढाल है: अपने बैंक कार्ड या पासवर्ड कभी दूसरों को न दें।',
      'समझौते का मतलब अपने बुनियादी अधिकारों और सपनों को कुचलना नहीं होता।',
      'बातचीत में समझदार और निष्पक्ष लोगों को शामिल करें ताकि पारदर्शिता बनी रहे।',
      'घरेलू हिंसा कानून (PWDVA 2005) के तहत आर्थिक शोषण भी गैरकानूनी है।',
      'राष्ट्रीय महिला आयोग (NCW) हेल्पलाइन: 7827170170।'
    ],
    motto: 'बराबरी का सम्मान • आर्थिक स्वतंत्रता • SHERO बनें'
  }
};
