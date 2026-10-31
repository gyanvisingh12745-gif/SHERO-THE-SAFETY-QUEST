import { MissionSceneData } from '../types';

export const a5_late_night_walk: MissionSceneData = {
  id: 'mission-5',
  part: 'A',
  code: 'A5',
  number: 5,
  titleEn: 'Late-Night Footsteps',
  titleHi: 'देर रात के कदम',
  taglineEn: 'Walking back from the library, {hero} senses someone matching her pace from behind.',
  taglineHi: 'लाइब्रेरी से लौटते वक्त {hero} को पीछे से किसी के कदमों की आहट सुनाई देती है।',
  environmentName: 'late_night_road',
  badgeName: 'STREET SMART',
  badgeIcon: 'Eye',
  introPanels: [
    {
      id: 'p1',
      title: 'Midnight Crossing',
      titleHi: 'आधी रात का मोड़',
      captionEn: "Exam week ended late. {hero} is on the 10-minute stretch back to her apartment.",
      captionHi: "परीक्षा की तैयारी देर तक चली। {hero} अपने कमरे के रास्ते पर है।",
      visualKey: 'late_walk_crossing',
      badge: 'NIGHT OWL',
      soundEffect: 'footsteps'
    },
    {
      id: 'p2',
      title: 'Synchronized Steps',
      titleHi: 'पीछे से आहट',
      captionEn: "Whenever she speeds up, the footsteps behind accelerate to match her rhythm.",
      captionHi: "जैसे ही वह अपनी रफ्तार बढ़ाती है, पीछे कदमों की आवाज़ भी तेज हो जाती है।",
      visualKey: 'late_walk_shadow',
      badge: 'ALERT',
      soundEffect: 'heartbeat'
    },
    {
      id: 'p3',
      title: 'The Dark Shortcut Ahead',
      titleHi: 'सुनसान शॉर्टकट',
      captionEn: "Ahead lies a pitch-black shortcut alley versus an open, well-lit all-night pharmacy.",
      captionHi: "सामने एक अंधेरी शॉर्टकट गली है और दूसरी तरफ 24 घंटे खुली मेडिकल शॉप।",
      visualKey: 'late_walk_dilemma',
      badge: 'CHOICE',
      soundEffect: 'suspense'
    }
  ],
  storyboardTurns: [
    {
      id: 'sb_1',
      speaker: 'Narrator',
      speakerRole: 'narrator',
      bubbleType: 'narration',
      textEn: 'Exam week is finally over. {hero} stayed late at the library reviewing notes. The campus is nearly empty as she begins the 10-minute walk home.',
      textHi: 'परीक्षा का हफ़्ता खत्म हुआ। {hero} लाइब्रेरी में देर तक नोट्स दोहराती रही। कैंपस लगभग खाली है जब वह घर की ओर 10 मिनट की पैदल यात्रा शुरू करती है।',
      mangaBadge: 'MIDNIGHT',
      sfx: 'footsteps',
      cameraZoom: 'wide'
    },
    {
      id: 'sb_2',
      speaker: '{hero}',
      speakerRole: 'hero',
      heroExpression: 'neutral',
      bubbleType: 'thought',
      textEn: 'It\'s darker than usual tonight. The streetlight near the crossing is out again.',
      textHi: 'आज रात कुछ ज़्यादा ही अंधेरा है। चौराहे वाली स्ट्रीटलाइट फिर बंद है।',
      mangaBadge: 'DARK',
      sfx: 'ambient',
      cameraZoom: 'pan_slow'
    },
    {
      id: 'sb_3',
      speaker: 'Narrator',
      speakerRole: 'narrator',
      bubbleType: 'narration',
      textEn: 'Behind her, barely audible at first, footsteps begin to echo on the empty sidewalk. They match her pace exactly.',
      textHi: 'उसके पीछे, पहले हल्की सी, फिर साफ़ — कदमों की आहट सुनाई देने लगती है। क़दम उसकी रफ़्तार से हूबहू मेल खाते हैं।',
      mangaBadge: 'TAP TAP',
      sfx: 'footsteps',
      cameraZoom: 'pan_slow'
    },
    {
      id: 'sb_4',
      speaker: '{hero}',
      speakerRole: 'hero',
      heroExpression: 'nervous',
      bubbleType: 'thought',
      textEn: 'Those footsteps... they speed up when I speed up. They slow down when I slow down. Someone is following me.',
      textHi: 'वो कदम... मैं तेज़ चलूँ तो वो भी तेज़। मैं धीमी हो जाऊँ तो वो भी। कोई मेरा पीछा कर रहा है।',
      mangaBadge: 'THUMP!',
      sfx: 'heartbeat',
      cameraZoom: 'close_up'
    },
    {
      id: 'sb_5',
      speaker: 'Shadowy Follower',
      speakerRole: 'stranger',
      speakerExpression: 'annoyed',
      bubbleType: 'speech',
      textEn: 'Hey, walking all by yourself so late? Wait up, let me walk with you.',
      textHi: 'अरे, इतनी देर रात अकेले? रुको, मैं तुम्हारे साथ चलता हूँ।',
      mangaBadge: 'DANGER',
      sfx: 'tension',
      cameraZoom: 'normal'
    },
    {
      id: 'sb_6',
      speaker: '{hero}',
      speakerRole: 'hero',
      heroExpression: 'scared',
      bubbleType: 'thought',
      textEn: 'My skin is crawling. He\'s getting closer. I can see a 24-hour pharmacy 30 meters ahead with lights on...',
      textHi: 'मेरे रोंगटे खड़े हो गए। वो और क़रीब आ रहा है। 30 मीटर आगे 24 घंटे खुली मेडिकल शॉप दिख रही है...',
      mangaBadge: 'SHIVER',
      sfx: 'shiver',
      cameraZoom: 'close_up'
    },
    {
      id: 'sb_7',
      speaker: 'Narrator',
      speakerRole: 'narrator',
      bubbleType: 'narration',
      textEn: 'To the left, a pitch-black shortcut alley disappears into shadow. Ahead, the pharmacy glows warmly, a security guard visible at the counter.',
      textHi: 'बाईं तरफ़ घुप्प अंधेरी गली अंधेरे में गुम है। सामने, मेडिकल शॉप की रोशनी गर्मजोशी से जल रही है, काउंटर पर गार्ड दिख रहा है।',
      mangaBadge: 'FORK',
      sfx: 'suspense',
      cameraZoom: 'wide'
    },
    {
      id: 'sb_8',
      speaker: 'Mahima',
      speakerRole: 'friend',
      bubbleType: 'phone',
      textEn: '{hero}? You haven\'t reached yet? I\'m tracking your location — you seem stopped. Is everything okay?!',
      textHi: '{hero}? तू अभी तक नहीं पहुँची? मैं तेरी लोकेशन ट्रैक कर रही हूँ — तू रुकी हुई लग रही है। सब ठीक है?!',
      mangaBadge: 'CALL',
      sfx: 'ping',
      cameraZoom: 'normal'
    },
    {
      id: 'sb_9',
      speaker: '{hero}',
      speakerRole: 'hero',
      heroExpression: 'nervous',
      bubbleType: 'thought',
      textEn: 'I have seconds to decide. Dark shortcut to lose him? Or run toward the lit pharmacy? Every second counts!',
      textHi: 'मेरे पास सेकंड हैं फ़ैसला लेने के लिए। अंधेरी गली से उसे चकमा दूँ? या रोशनी वाली दुकान की तरफ़ भागूँ? हर पल कीमती है!',
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
      backgroundKey: 'late_night_road',
      lighting: 'tension_dark',
      weather: 'passing_lights',
      situationEn: 'The footsteps behind you are clearly matching your pace. A dark alley is on your left, while a brightly lit 24-hour medical store is 30 meters ahead.',
      situationHi: 'पीछे चलने वाला व्यक्ति लगातार आपकी रफ्तार से ताल मिला रहा है। बाईं ओर सुनसान गली है, जबकि 30 मीटर आगे 24 घंटे खुली मेडिकल शॉप है।',
      speakerId: 'stranger',
      speakerName: 'Shadowy Follower',
      speakerExpression: 'annoyed',
      speakerDialogueEn: "Hey, walking all by yourself so late? Wait up, let me walk with you.",
      speakerDialogueHi: "अरे, इतनी देर रात अकेले? रुको, मैं तुम्हारे साथ चलता हूँ।",
      heroExpression: 'determined',
      heroThoughtEn: "Do not take the dark shortcut. Stick to the light where there are cameras and witnesses.",
      heroThoughtHi: "अंधेरी गली में बिल्कुल नहीं जाना है। रोशनी और लोगों वाली मेडिकल शॉप की तरफ ही जाना सुरक्षित है।",
      heroResponseDialogueEn: "Keep your distance. I am stepping right into this pharmacy now.",
      heroResponseDialogueHi: "मुझसे दूर रहिए। मैं अभी इस मेडिकल स्टोर में जा रही हूँ।",
      mangaEffect: 'heartbeat_pulse',
      mangaBadge: 'THUMP THUMP!',
      crowd: [
        { id: 'guard', name: 'Security Guard', role: 'Apartment guard nearby', position: 'right_far', expression: 'neutral' },
        { id: 'mahima', name: 'Mahima', role: 'Roommate on speaker', position: 'left_far', expression: 'nervous' }
      ],
      questionEn: 'You suspect someone is trailing you on a quiet street. What is the safest tactical reaction?',
      questionHi: 'शांत सड़क पर कोई आपका पीछा करता महसूस हो, तो सबसे सुरक्षित प्रतिक्रिया क्या है?',
      choices: [
        {
          id: 'c1',
          textEn: 'Head directly into the lit pharmacy, inform staff/guard, and phone your emergency contact.',
          textHi: 'सीधे रोशनी वाली मेडिकल शॉप में जाएं, कर्मचारी या गार्ड को बताएं और तुरंत फोन करें।',
          isCorrect: true,
          feedbackEn: 'Brilliant! Moving to a brightly lit establishment with active workers removes isolation and immediately discourages any pursuer.',
          feedbackHi: 'बहुत बढ़िया! खुली दुकान में जाने से अकेलापन खत्म होता है और पीछा करने वाला तुरंत पीछे हट जाता है।',
          educationalTipEn: 'When followed, never go to an empty dead end or unlit shortcut. Seek active commercial counters or security booths.',
          educationalTipHi: 'पीछा होने पर कभी अंधेरे रास्ते न लें, हमेशा खुली दुकानों या सुरक्षा गार्ड की शरण लें।',
          safetyDelta: 25,
          boundariesDelta: 20
        },
        {
          id: 'c2',
          textEn: 'Cross the street decisively, stay in the open light, and dial 112 or emergency speed-dial.',
          textHi: 'सड़क पार करके खुली रोशनी में आएं और सीधे 112 या इमरजेंसी नंबर डायल करें।',
          isCorrect: true,
          feedbackEn: 'Excellent situational awareness. Crossing the street breaks alignment and calling police or emergency contacts triggers instant support.',
          feedbackHi: 'उत्कृष्ट सतर्कता। सड़क पार करने से स्थिति स्पष्ट हो जाती है और 112 डायल करने से मदद मिलती है।',
          educationalTipEn: 'Crossing the street confirms if someone is intentionally following you while keeping you in public view.',
          educationalTipHi: 'सड़क पार करके यह पुष्टि हो जाती है कि व्यक्ति आपका पीछा कर रहा है या नहीं।',
          safetyDelta: 20,
          supportDelta: 20
        },
        {
          id: 'c3',
          textEn: 'Sprint into the dark unlit alley shortcut to try to lose him in the shadows.',
          textHi: 'अंधेरी सुनसान गली में भागकर उसे चकमा देने की कोशिश करें।',
          isCorrect: false,
          feedbackEn: 'Dangerous choice. Running into an isolated dark alley removes witnesses, visibility, and exit routes, trapping you in complete seclusion.',
          feedbackHi: 'खतरनाक निर्णय। अंधेरी गली में भागने से रोशनी, गवाह और भागने के रास्ते खत्म हो जाते हैं।',
          educationalTipEn: 'Never run into unlit, enclosed alleyways when someone is pursuing you.',
          educationalTipHi: 'पीछा होने पर कभी भी अंधेरे और बंद रास्तों का रुख न करें।',
          safetyDelta: -30,
          boundariesDelta: -20
        }
      ],
      winningNextNodeId: 'VICTORY'
    }
  },
  takeawayEn: {
    title: 'Key Takeaways — Late-Night Walking Safety',
    checklist: [
      'Trust your instincts: If footsteps match your pace, act immediately.',
      'Cross the street to test intent and keep distance.',
      'Head straight to open shops, 24/7 pharmacies, or guard booths.',
      'Never take dark shortcuts to save time when feeling followed.',
      'Keep one ear free: Avoid wearing dual noise-cancelling headphones at night.'
    ],
    motto: 'Stay in the Light • Trust Your Gut • Be SHERO'
  },
  takeawayHi: {
    title: 'मुख्य सीख — रात में पैदल चलने की सुरक्षा',
    checklist: [
      'अपनी अंतरात्मा पर भरोसा करें: कदमों की आहट मिलते ही सतर्क हो जाएं।',
      'सड़क पार करके यह जांचें कि क्या वह आपका ही पीछा कर रहा है।',
      'खुली दुकानों, मेडिकल स्टोर या सुरक्षा बूथ का रुख करें।',
      'समय बचाने के लिए कभी अंधेरी गलियों या शॉर्टकट का इस्तेमाल न करें।',
      'रात में दोनों कानों में हेडफोन न लगाएं ताकि आसपास की आवाजें सुनाई दें।'
    ],
    motto: 'रोशनी में रहें • सतर्क रहें • SHERO बनें'
  }
};
