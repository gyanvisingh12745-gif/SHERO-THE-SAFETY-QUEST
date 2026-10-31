import { MissionSceneData } from '../types';

export const a4_crowded_market: MissionSceneData = {
  id: 'mission-4',
  part: 'A',
  code: 'A4',
  number: 4,
  titleEn: 'The Crowded Market',
  titleHi: 'भीड़भाड़ वाला बाजार',
  taglineEn: 'Festival shopping in a packed bazaar. A man uses the dense crowd to crowd personal space and touch inappropriate boundaries.',
  taglineHi: 'त्योहारों की भीड़ में एक व्यक्ति धक्का-मुक्की का फायदा उठाकर बदतमीजी करने की कोशिश करता है।',
  environmentName: 'crowded_market_day',
  badgeName: 'PUBLIC DEFENDER',
  badgeIcon: 'Users',
  introPanels: [
    {
      id: 'p1',
      title: 'Bazaar Rush',
      titleHi: 'बाजार की चहल-पहल',
      captionEn: "{hero} and Aanya are shopping for festival crafts in the bustling Lajpat market.",
      captionHi: "{hero} और आन्या त्योहार की खरीदारी के लिए बाजार आई हैं।",
      visualKey: 'crowded_market_day',
      badge: 'MARKET',
      soundEffect: 'ambient'
    },
    {
      id: 'p2',
      title: 'The Harasser Closes In',
      titleHi: 'भीड़ का फायदा',
      captionEn: "A man behind repeatedly presses forward, pretending it is just crowd pressure.",
      captionHi: "पीछे से एक व्यक्ति भीड़ का बहाना बनाकर लगातार धक्का देता है और करीब आता है।",
      visualKey: 'crowded_market_day',
      badge: 'HARASSMENT',
      soundEffect: 'suspense'
    },
    {
      id: 'p3',
      title: 'Breaking the Silence',
      titleHi: 'खुलकर विरोध',
      captionEn: "{hero} turns around directly, making eye contact and raising her voice clearly.",
      captionHi: "{hero} तुरंत पीछे मुड़ती है, आंखें मिलाकर जोर से आवाज उठाती है।",
      visualKey: 'crowded_market_day',
      badge: 'ASSERTION',
      soundEffect: 'ping'
    }
  ],
  storyboardTurns: [
    {
      id: 'sb_1',
      speaker: 'Narrator',
      speakerRole: 'narrator',
      bubbleType: 'narration',
      textEn: 'The Lajpat market is buzzing with festival shoppers. Colorful stalls line the narrow lanes as {hero} and Aanya browse for handicraft decorations.',
      textHi: 'लाजपत बाज़ार त्योहार की खरीदारी से गुलज़ार है। रंग-बिरंगी दुकानें तंग गलियों में सजी हैं और {hero} और आन्या हैंडीक्राफ्ट सजावट देख रही हैं।',
      mangaBadge: 'BAZAAR',
      sfx: 'ambient',
      cameraZoom: 'wide'
    },
    {
      id: 'sb_2',
      speaker: '{hero}',
      speakerRole: 'hero',
      heroExpression: 'happy',
      bubbleType: 'speech',
      textEn: 'Aanya, look at those diyas! Let\'s check out that textile stall next.',
      textHi: 'आन्या, वो दीये देखो! चलो उस कपड़े की दुकान पर भी चलते हैं।',
      mangaBadge: 'SHOP',
      sfx: 'ambient',
      cameraZoom: 'normal'
    },
    {
      id: 'sb_3',
      speaker: 'Narrator',
      speakerRole: 'narrator',
      bubbleType: 'narration',
      textEn: 'As the crowd thickens near the textile stall, {hero} feels someone press against her from behind. She steps forward — it happens again.',
      textHi: 'कपड़े की दुकान के पास भीड़ घनी हो जाती है। {hero} को पीछे से कोई दबाव महसूस होता है। वह आगे बढ़ती है — फिर से होता है।',
      mangaBadge: 'CROWD',
      sfx: 'suspense',
      cameraZoom: 'close_up'
    },
    {
      id: 'sb_4',
      speaker: '{hero}',
      speakerRole: 'hero',
      heroExpression: 'shocked',
      bubbleType: 'thought',
      textEn: 'That wasn\'t the crowd pushing... someone is deliberately pressing against me. This is the second time.',
      textHi: 'यह भीड़ का धक्का नहीं था... कोई जानबूझकर मेरे करीब आ रहा है। यह दूसरी बार है।',
      mangaBadge: 'ALERT!',
      sfx: 'gasp',
      cameraZoom: 'close_up'
    },
    {
      id: 'sb_5',
      speaker: 'Narrator',
      speakerRole: 'narrator',
      bubbleType: 'narration',
      textEn: 'The third time, it\'s unmistakable. A man behind her is deliberately using the crowd cover to brush against her body.',
      textHi: 'तीसरी बार, कोई शक नहीं रहा। पीछे खड़ा व्यक्ति भीड़ की आड़ में जानबूझकर उसके शरीर को छू रहा है।',
      mangaBadge: 'VIOLATION',
      sfx: 'tension',
      cameraZoom: 'close_up'
    },
    {
      id: 'sb_6',
      speaker: 'Harasser',
      speakerRole: 'stranger',
      speakerExpression: 'annoyed',
      bubbleType: 'speech',
      textEn: 'Arey madam, it\'s a crowded market! People bump into each other. Why are you making such a big deal?',
      textHi: 'अरे मैडम, इतनी भीड़ है! बाज़ार में तो धक्के लगते ही हैं। इतना ड्रामा क्यों कर रही हो?',
      mangaBadge: 'EXCUSE',
      sfx: 'tension',
      cameraZoom: 'normal'
    },
    {
      id: 'sb_7',
      speaker: '{hero}',
      speakerRole: 'hero',
      heroExpression: 'angry',
      bubbleType: 'thought',
      textEn: 'He\'s gaslighting me — pretending it\'s accidental. He counts on my embarrassment to keep me silent. NOT TODAY.',
      textHi: 'वह मुझे गैसलाइट कर रहा है — जैसे कि यह अनजाने में हुआ। वह सोचता है शर्म से मैं चुप रहूँगी। आज नहीं!',
      mangaBadge: 'FURY!',
      sfx: 'heartbeat',
      cameraZoom: 'close_up'
    },
    {
      id: 'sb_8',
      speaker: 'Aanya',
      speakerRole: 'friend',
      speakerExpression: 'angry',
      bubbleType: 'speech',
      textEn: '{hero}! I saw what he did. Don\'t stay quiet — call him out right now!',
      textHi: '{hero}! मैंने देखा उसने क्या किया। चुप मत रहो — अभी उसका मुँह तोड़ो!',
      mangaBadge: 'SUPPORT',
      sfx: 'tension',
      cameraZoom: 'normal'
    },
    {
      id: 'sb_9',
      speaker: '{hero}',
      speakerRole: 'hero',
      heroExpression: 'determined',
      bubbleType: 'thought',
      textEn: 'I need to decide — confront him publicly, or move away silently? My dignity demands an answer.',
      textHi: 'मुझे फ़ैसला करना होगा — सबके सामने उसका विरोध करूँ, या चुपचाप हट जाऊँ? मेरे आत्मसम्मान का सवाल है।',
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
      backgroundKey: 'crowded_market_day',
      lighting: 'market_sunshine',
      weather: 'ambient_dust',
      situationEn: 'The man brushes deliberately against {hero} for the third time in front of a textile stall.',
      situationHi: 'दुकान के सामने वह व्यक्ति जानबूझकर तीसरी बार छूने की कोशिश करता है।',
      speakerId: 'stranger',
      speakerName: 'Harasser in Crowd',
      speakerExpression: 'annoyed',
      speakerDialogueEn: "Arey madam, so much crowd here! Why are you complaining? In a market, people bump into each other.",
      speakerDialogueHi: "अरे मैडम, इतनी भीड़ है! आप शिकायत क्यों कर रही हैं? बाजार में तो धक्के लगते ही हैं।",
      heroExpression: 'angry',
      heroThoughtEn: "This was intentional, not accidental crowd movement. He relies on my embarrassment to stay quiet.",
      heroThoughtHi: "यह अनजाने में लगा धक्का नहीं है। वह सोचता है कि शर्म के मारे मैं चुप रहूँगी।",
      heroResponseDialogueEn: "STOP! Step back! Do not touch me! You deliberately stepped into my personal space!",
      heroResponseDialogueHi: "रुकिए! पीछे हटिए! मुझे मत छूइए! आप जानबूझकर बदतमीजी कर रहे हैं!",
      mangaEffect: 'impact_burst',
      mangaBadge: 'STOP!',
      crowd: [
        { id: 'aanya', name: 'Aanya', role: 'Supportive Friend', position: 'left_mid', expression: 'angry' },
        { id: 'shopkeeper', name: 'Shopkeeper', role: 'Shopkeeper', position: 'right_far', expression: 'determined' }
      ],
      questionEn: 'Someone deliberately touches or crowds you in a crowded public market. What is the most effective reaction?',
      questionHi: 'भीड़भाड़ वाले बाजार में कोई जानबूझकर बदतमीजी करे, तो सबसे असरदार कदम क्या है?',
      choices: [
        {
          id: 'c1',
          textEn: 'Turn around immediately, look him in the eye, and speak loudly: "STOP! Back off! Do not touch me!" alerting the crowd.',
          textHi: 'तुरंत पीछे मुड़ें, आंख में आंख डालकर जोर से कहें: "रुकिए! पीछे हटिए! मुझे मत छूइए!", ताकि आसपास के लोग जागरूक हो जाएं।',
          isCorrect: true,
          feedbackEn: 'Calling out harassment loudly and directly strips away the perpetrator anonymity and instantly rallies bystanders and shopkeepers to your support.',
          feedbackHi: 'जोर से और स्पष्ट आवाज में विरोध करने से बदतमीज व्यक्ति की हिम्मत टूटती है और आसपास के लोग तुरंत आपकी मदद में आगे आते हैं।',
          educationalTipEn: 'Harassers thrive on the assumption that women will stay silent out of shame. Loud public naming stops them.',
          educationalTipHi: 'छेड़खानी करने वाले महिला की खामोशी का फायदा उठाते हैं। खुलकर आवाज उठाना उन्हें तुरंत रोक देता है।',
          safetyDelta: 25,
          boundariesDelta: 25
        },
        {
          id: 'c2',
          textEn: 'Look down in embarrassment and quickly move alone into a narrow deserted side-lane.',
          textHi: 'शर्म से सिर झुका लें और अकेले किसी सुनसान पतली गली में चली जाएं।',
          isCorrect: false,
          feedbackEn: 'Leaving a populated public bazaar for a deserted side-alley isolates you and increases your vulnerability significantly.',
          feedbackHi: 'भीड़भाड़ वाली जगह छोड़कर सुनसान गली में जाना आपके लिए ज्यादा खतरनाक हो सकता है।',
          educationalTipEn: 'Never flee toward isolated spaces when harassed; stay in the open crowd where help is abundant.',
          educationalTipHi: 'कभी भी सुनसान जगह की तरफ न भागें; लोगों के बीच ही रहें जहाँ मदद मिल सके।',
          safetyDelta: -25,
          boundariesDelta: -20
        },
        {
          id: 'c3',
          textEn: 'Blame yourself for wearing bright clothes and leave without saying anything.',
          textHi: 'अपने कपड़ों को दोष दें और बिना कुछ बोले चुपचाप चली जाएं।',
          isCorrect: false,
          feedbackEn: 'Harassment is 100% the responsibility of the harasser, never the victim clothes or presence. Self-blame protects the wrongdoer.',
          feedbackHi: 'बदतमीजी की पूरी जिम्मेदारी बदतमीज व्यक्ति की होती है, कपड़ों की नहीं। खुद को दोष देना गलत है।',
          educationalTipEn: 'Clothing is never an invitation or excuse for non-consensual contact. Stand tall in your dignity.',
          educationalTipHi: 'कपड़े कभी बदतमीजी का बहाना नहीं हो सकते। हमेशा अपने आत्मसम्मान के साथ खड़ी रहें।',
          safetyDelta: -15,
          boundariesDelta: -20
        }
      ],
      winningNextNodeId: 'VICTORY'
    }
  },
  takeawayEn: {
    title: 'Key Takeaways — Responding to Public Harassment',
    checklist: [
      'Call out the behavior directly and loudly: "Stop touching me! Step back!"',
      'Make eye contact: Direct eye contact shows confidence and shatters predator stealth.',
      'Engage bystanders: Turn to nearby shopkeepers, guards, or shoppers for collective support.',
      'Stay in the open market: Never withdraw into isolated alleys or unlit corners.',
      'Report repeat offenders to the local bazaar security or police booth.'
    ],
    motto: 'Break The Silence • Claim Your Space • Be SHERO'
  },
  takeawayHi: {
    title: 'मुख्य सीख — सार्वजनिक छेड़खानी का सामना',
    checklist: [
      'जोर से और सीधे शब्दों में विरोध करें: "पीछे हटिए! बदतमीजी मत कीजिए!"',
      'सीधे आंखों में देखें: यह आपका आत्मविश्वास दिखाता है।',
      'आसपास के दुकानदारों या लोगों से मदद मांगें।',
      'हमेशा मुख्य बाजार में रहें, कभी सुनसान गलियों में न जाएं।',
      'पुलिस बूथ या स्थानीय सुरक्षा गार्ड को तुरंत सूचित करें।'
    ],
    motto: 'खामोशी तोड़ें • अपनी जगह बनाएं • SHERO बनें'
  }
};
