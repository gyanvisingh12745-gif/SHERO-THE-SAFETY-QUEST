import { MissionSceneData } from '../types';

export const a8_the_party: MissionSceneData = {
  id: 'mission-8',
  part: 'A',
  code: 'A8',
  number: 8,
  titleEn: 'The Campus Party',
  titleHi: 'कॉलेज पार्टी और सतर्कता',
  taglineEn: 'Music is loud, the crowd is dense, and someone hands over an unsealed, unattended drink.',
  taglineHi: 'तेज संगीत और भीड़भरे माहौल में कोई {hero} को पहले से खुला हुआ ड्रिंक थमाता है।',
  environmentName: 'cafe_terrace',
  badgeName: 'SOCIAL VIGILANCE',
  badgeIcon: 'Wine',
  introPanels: [
    {
      id: 'p1',
      title: 'College Fest Afterparty',
      titleHi: 'फेस्ट के बाद की पार्टी',
      captionEn: "The annual youth fest celebration is underway at a packed rooftop lounge.",
      captionHi: "कॉलेज फेस्ट के बाद रूफटॉप लाउंज में दोस्तों की पार्टी चल रही है।",
      visualKey: 'party_rooftop',
      badge: 'FESTIVITY',
      soundEffect: 'party_music'
    },
    {
      id: 'p2',
      title: 'The Unattended Glass',
      titleHi: 'खुला हुआ ग्लास',
      captionEn: "{hero} stepped away to take a call. When she returns, an open beverage is pushed toward her.",
      captionHi: "{hero} थोड़ी देर फोन पर बात करने गई थी, लौटते ही कोई उसके हाथ में खुला ग्लास थमा देता है।",
      visualKey: 'party_drink_handed',
      badge: 'BEWARE',
      soundEffect: 'suspense'
    },
    {
      id: 'p3',
      title: 'Peer Pressure Rising',
      titleHi: 'साथियों का दबाव',
      captionEn: "'Come on {hero}, don't be a party pooper, drink up!' a loud acquaintance chants.",
      captionHi: "'अरे {hero}, नाटक मत करो, सब पी रहे हैं तुम भी पियो!' कुछ लोग दबाव बनाने लगते हैं।",
      visualKey: 'party_pressure',
      badge: 'PRESSURE',
      soundEffect: 'crowd_cheer'
    }
  ],
  startNodeId: 'node_1',
  nodes: {
    node_1: {
      id: 'node_1',
      decisionNumber: 1,
      backgroundKey: 'cafe_terrace',
      lighting: 'neon_rain',
      weather: 'clear',
      situationEn: 'You were away from your table for 10 minutes. An open drink is placed in your hand, and an acquaintance insists you chug it.',
      situationHi: 'आप 10 मिनट के लिए टेबल से दूर थीं। वापस आने पर कोई खुला हुआ ड्रिंक आपके हाथ में देकर तुरंत पीने की जिद करता है।',
      speakerId: 'stranger',
      speakerName: 'Loud Party Guest',
      speakerExpression: 'annoyed',
      speakerDialogueEn: "Drink it down, {hero}! I mixed it specially for you while you were outside talking on the phone. Don't waste it!",
      speakerDialogueHi: "पी लो {hero}! जब तुम फोन पर थीं तब मैंने खास तुम्हारे लिए बनाया है। मना मत करो!",
      heroExpression: 'determined',
      heroThoughtEn: "Never consume an open drink that was left unattended or prepared out of sight. Drink spiking is real.",
      heroThoughtHi: "जो ड्रिंक मेरी गैरहाजिरी में तैयार हुआ या खुला छूटा, उसे कभी नहीं पीना चाहिए। इसमें कुछ भी मिला हो सकता है।",
      heroResponseDialogueEn: "Thanks, but I only drink beverages opened directly in front of me. I'll get fresh water myself.",
      heroResponseDialogueHi: "धन्यवाद, लेकिन मैं सिर्फ वही ड्रिंक लेती हूँ जो मेरे सामने खुले। मैं खुद पानी ले लूंगी।",
      mangaEffect: 'glow_focus',
      mangaBadge: 'BEWARE!',
      crowd: [
        { id: 'meera', name: 'Meera', role: 'Trusted friend', position: 'left_far', expression: 'hopeful' },
        { id: 'aanya', name: 'Aanya', role: 'Designated driver', position: 'right_far', expression: 'neutral' }
      ],
      questionEn: 'You are handed a drink that was left unattended or poured while you were away. What is the smartest safety rule?',
      questionHi: 'गैरहाजिरी में रखे गए या खुले छोड़े गए ड्रिंक को लेकर सबसे सही सुरक्षा नियम क्या है?',
      choices: [
        {
          id: 'c1',
          textEn: 'Politely decline the drink, discard it safely, and fetch a freshly sealed bottle or drink poured directly in your sight.',
          textHi: 'पीने से साफ मना करें, उसे अलग रखें और खुद अपने सामने सीलबंद बोतल या ड्रिंक लें।',
          isCorrect: true,
          feedbackEn: 'Golden rule of social safety! Never consume beverages that left your sight, and always watch your drink being poured.',
          feedbackHi: 'पार्टी सुरक्षा का सबसे अहम नियम! जो ड्रिंक आपकी नजरों से दूर रहा हो उसे कभी न पिएं।',
          educationalTipEn: 'Drink spiking can happen in seconds. Always hold your drink, use bottle caps/covers, and watch bartenders directly.',
          educationalTipHi: 'ड्रिंक में मिलावट पलक झपकते हो सकती है। हमेशा अपनी ड्रिंक पर नजर रखें या सीलबंद बोतल चुनें।',
          safetyDelta: 25,
          boundariesDelta: 20
        },
        {
          id: 'c2',
          textEn: 'Check in with your trusted buddy (Meera), confirm your exit plan, and leave if you feel uncomfortable.',
          textHi: 'अपनी दोस्त मीरा से संपर्क करें, वापस जाने की योजना तय करें और असहज लगने पर तुरंत निकलें।',
          isCorrect: true,
          feedbackEn: 'Awesome buddy-system execution. Sticking together with trusted friends prevents isolation and ensures safe return.',
          feedbackHi: 'सच्ची दोस्ती और सजगता! दोस्तों के साथ ग्रुप में रहना और वापसी तय रखना हर खतरे से बचाता है।',
          educationalTipEn: 'The buddy system ensures you never leave an event alone or in compromised circumstances.',
          educationalTipHi: 'बडी सिस्टम सुनिश्चित करता है कि कोई भी दोस्त अकेले या असुरक्षित स्थिति में न छूटे।',
          safetyDelta: 25,
          supportDelta: 25
        },
        {
          id: 'c3',
          textEn: 'Chug the drink completely so people do not think you are boring or rude.',
          textHi: 'लोग बोरिंग न समझें इसलिए एक सांस में पूरा ड्रिंक पी जाएं।',
          isCorrect: false,
          feedbackEn: 'Dangerous surrender to peer pressure. Consuming an unmonitored drink exposes you to sedation, poisoning, or assault.',
          feedbackHi: 'दबाव में लिया गया खतरनाक फैसला। अनजाने ड्रिंक से बेहोशी या गंभीर अपराध का शिकार होने का खतरा रहता है।',
          educationalTipEn: 'Your physical safety is far more important than arbitrary social peer approval.',
          educationalTipHi: 'आपकी सुरक्षा और स्वास्थ्य किसी की झूठी तारीफ से कहीं ज्यादा जरूरी है।',
          safetyDelta: -30,
          boundariesDelta: -25
        }
      ],
      winningNextNodeId: 'VICTORY'
    }
  },
  takeawayEn: {
    title: 'Key Takeaways — Social Gatherings & Party Safety',
    checklist: [
      'Watch your drink: Never leave glasses unattended or accept open cups from strangers.',
      'Prefer factory-sealed bottles or cans that you open yourself.',
      'Use the Buddy System: Arrive together, check in frequently, and leave together.',
      'Pre-book your return ride before the party starts.',
      'If you suddenly feel unusually dizzy or disoriented, immediately alert your trusted friend or staff.'
    ],
    motto: 'Have Fun • Watch Your Back • Be SHERO'
  },
  takeawayHi: {
    title: 'मुख्य सीख — पार्टियों और समारोहों में सुरक्षा',
    checklist: [
      'ड्रिंक पर नजर रखें: कभी ग्लास अकेला न छोड़ें और अनजान व्यक्ति से खुला कप न लें।',
      'सीलबंद बोतल या कैन को प्राथमिकता दें जिसे आप खुद खोलें।',
      'बडी सिस्टम अपनाएं: दोस्तों के साथ जाएं, साथ रहें और साथ ही लौटें।',
      'पार्टी शुरू होने से पहले ही घर वापसी की सुरक्षित टैक्सी तय कर लें।',
      'अचानक चक्कर या असामान्य कमजोरी महसूस हो, तो तुरंत भरोसेमंद दोस्त या स्टाफ को बताएं।'
    ],
    motto: 'आनंद लें • सतर्क रहें • SHERO बनें'
  }
};
