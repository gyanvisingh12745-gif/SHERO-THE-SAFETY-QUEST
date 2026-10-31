import { MissionSceneData } from '../types';

export const b3_controlling_husband: MissionSceneData = {
  id: 'episode-3',
  part: 'B',
  code: 'B3',
  number: 12,
  titleEn: 'The Controlling Husband',
  titleHi: 'नियंत्रण और धमकी का चक्र',
  taglineEn: 'Temper flares, doors slam, and secret tracking apps appear on {helpedWoman}’s smartphone.',
  taglineHi: 'गुस्सा, धमकियां और फोन में बिना बताए छुपाया गया जासूसी ऐप—रिश्ता दमघोंटू बन चुका है।',
  environmentName: 'cozy_apartment',
  badgeName: 'SAFETY SENTINEL',
  badgeIcon: 'ShieldAlert',
  introPanels: [
    {
      id: 'p1',
      title: 'Broken Ceramic',
      titleHi: 'टूटा हुआ कप',
      captionEn: "A ceramic mug shatters against the living room wall during another furious interrogation.",
      captionHi: "सवालों और शक के बीच गुस्से में दीवार पर पटका गया कप बिखर जाता है।",
      visualKey: 'b3_shattered_cup',
      badge: 'INTIMIDATION',
      soundEffect: 'glass_shatter'
    },
    {
      id: 'p2',
      title: 'Hidden Tracking App',
      titleHi: 'फोन में जासूसी ऐप',
      captionEn: "{hero} inspects {helpedWoman}’s phone and discovers a covert background GPS tracker installed without consent.",
      captionHi: "{hero} जब {helpedWoman} का फोन देखती है तो उसमें बैकग्राउंड में चल रहा जीपीएस ट्रैकर ऐप मिलता है।",
      visualKey: 'b3_spy_app',
      badge: 'SPYWARE',
      soundEffect: 'ping'
    },
    {
      id: 'p3',
      title: 'The Coercive Threat',
      titleHi: 'धमकी और गैसलाइटिंग',
      captionEn: "'If you ever tell your parents, I will destroy your reputation and hurt myself!' {husband} warns.",
      captionHi: "'अगर तुमने अपने घर में कुछ बताया, तो मैं तुम्हारी बदनामी कर दूंगा!' {husband} धमकी देता है।",
      visualKey: 'b3_threat_words',
      badge: 'GASLIGHT',
      soundEffect: 'suspense'
    }
  ],
  startNodeId: 'node_1',
  nodes: {
    node_1: {
      id: 'node_1',
      decisionNumber: 1,
      backgroundKey: 'cozy_apartment',
      lighting: 'tension_dark',
      weather: 'clear',
      situationEn: '{husband} slams his fist on the table, blocking the room exit, accusing {helpedWoman} of infidelity because she returned 15 minutes late from work.',
      situationHi: '{husband} मेज पर मुक्का मारता है, कमरे का दरवाजा रोकता है और ऑफिस से 15 मिनट देर से आने पर {helpedWoman} पर बेवफाई का झूठा आरोप लगाता है।',
      speakerId: 'rohan',
      speakerName: '{husband}',
      speakerExpression: 'angry',
      speakerDialogueEn: "You were 15 minutes late, {helpedWoman}! Where were you? Who were you laughing with? If you try to walk out that door, you won't like what happens!",
      speakerDialogueHi: "तुम 15 मिनट लेट क्यों आईं {helpedWoman}? किसके साथ थीं? अगर इस दरवाजे से बाहर कदम रखा, तो अंजाम बुरा होगा!",
      heroExpression: 'determined',
      heroThoughtEn: "Physical intimidation, property destruction, and blocking exits are severe domestic violence indicators. We must execute a quiet safety exit plan.",
      heroThoughtHi: "दरवाजा रोकना, मेज पर हाथ मारना और धमकियां देना घरेलू हिंसा है। हमें तुरंत सुरक्षित निकलने की योजना पर काम करना होगा।",
      heroResponseDialogueEn: "{husband}, step away from the doorway. Threatening language and blocking physical exits is illegal intimidation. {helpedWoman} is coming with me.",
      heroResponseDialogueHi: "{husband}, दरवाजे से पीछे हटो। रास्ता रोकना और डराना कानूनी रूप से हिंसा है। {helpedWoman} मेरे साथ जा रही हैं।",
      mangaEffect: 'impact_burst',
      mangaBadge: 'STOP!',
      crowd: [
        { id: 'anjali', name: '{helpedWoman} Didi', role: 'Shaking with fear', position: 'left_far', expression: 'scared' },
        { id: 'guard', name: 'Apartment Security', role: 'Noticed loud shouting', position: 'right_far', expression: 'determined' }
      ],
      questionEn: 'A partner uses explosive anger, property damage, door blocking, and covert phone tracking. What is the most critical safety protocol?',
      questionHi: 'जब पार्टनर हिंसक रूप से डराए, रास्ता रोके और फोन में जासूसी ऐप लगाए, तो सबसे जरूरी सुरक्षा प्रोटोकॉल क्या है?',
      choices: [
        {
          id: 'c1',
          textEn: 'Prioritize physical safety: De-escalate without provoking immediate violence, prepare an emergency "Go-Bag" (documents, keys, cash), and exit to a secure shelter with trusted allies.',
          textHi: 'शारीरिक सुरक्षा पहले रखें: स्थिति को शांत करते हुए इमरजेंसी गो-बैग (दस्तावेज, चाबियां, पैसे) लेकर सुरक्षित जगह निकलें।',
          isCorrect: true,
          feedbackEn: 'Life-saving protocol! In escalating situations of physical intimidation, never stay trapped. Having essential documents ready and a pre-planned safe destination protects your life.',
          feedbackHi: 'जीवन रक्षक प्रोटोकॉल! जब हिंसा और डराने की स्थिति बने, तो फंसे न रहें। जरूरी दस्तावेज लेकर सुरक्षित ठिकाने पर जाना सबसे समझदारी है।',
          educationalTipEn: 'A "Go-Bag" contains certified copies of Aadhaar, bank passbooks, marriage certificates, keys, medicines, and emergency funds.',
          educationalTipHi: 'इमरजेंसी गो-बैग में आधार, बैंक दस्तावेज, जरूरी दवाइयां और नकदी पहले से सुरक्षित रखी जाती है।',
          safetyDelta: 30,
          boundariesDelta: 30
        },
        {
          id: 'c2',
          textEn: 'Remove covert tracking apps, change account passwords on a safe device, and alert the Women Helpline (181 / 1091).',
          textHi: 'फोन से स्पाइवेयर ऐप हटाएं, सुरक्षित फोन से पासवर्ड बदलें और महिला हेल्पलाइन 181 या 1091 पर सूचना दें।',
          isCorrect: true,
          feedbackEn: 'Essential digital and legal defense! Cutting off digital surveillance stops the abuser from anticipating your movements.',
          feedbackHi: 'सटीक डिजिटल कदम! जासूसी ऐप हटाने से आपका मूवमेंट ट्रैक होना बंद होता है और 181 से तुरंत कानूनी मदद मिलती है।',
          educationalTipEn: 'Always perform security resets or helpline calls on a trusted secondary phone that the abuser cannot monitor.',
          educationalTipHi: 'हेल्पलाइन पर कॉल या पासवर्ड रीसेट हमेशा किसी भरोसेमंद दूसरे फोन से करें।',
          safetyDelta: 25,
          supportDelta: 25
        },
        {
          id: 'c3',
          textEn: 'Promise never to leave the house again and delete all social apps to prevent him getting angry.',
          textHi: 'वादा करें कि आगे से कभी घर से बाहर नहीं निकलेंगी ताकि उनका गुस्सा शांत रहे।',
          isCorrect: false,
          feedbackEn: 'Fatal appeasement! Appeasing domestic abuse never reduces violence—it signals total vulnerability, causing cycles of violence to intensify.',
          feedbackHi: 'खतरनाक समझौता! हिंसा के आगे झुकने से अत्याचार कम नहीं होता बल्कि और ज्यादा बढ़ जाता है।',
          educationalTipEn: 'Abusive anger is a choice made by the perpetrator, never the fault or responsibility of the partner.',
          educationalTipHi: 'हिंसा करना हमलावर का अपना फैसला है, इसमें पीड़ित की कोई गलती या जिम्मेदारी नहीं होती।',
          safetyDelta: -35,
          boundariesDelta: -30
        }
      ],
      winningNextNodeId: 'VICTORY'
    }
  },
  takeawayEn: {
    title: 'Key Takeaways — Escaping Intimidation & Coercive Control',
    checklist: [
      'Violence is never your fault: Excuses like "I was drunk" or "you provoked me" are false.',
      'Prepare a Go-Bag: Keep duplicate keys, IDs, cash, and phone chargers ready in secret.',
      'Establish a Danger Code Word with trusted family/friends (e.g., texting "Order Chai").',
      'Disable unauthorized location tracking apps and factory reset compromised devices.',
      'Call the 24/7 National Domestic Violence Helpline: 181 or Emergency 112.'
    ],
    motto: 'Safety First • Break the Silence • You Are Not Alone • Be SHERO'
  },
  takeawayHi: {
    title: 'मुख्य सीख — घरेलू हिंसा और धमकियों से बचाव',
    checklist: [
      'हिंसा में आपकी कोई गलती नहीं: "तुमने उकसाया" या "गुस्से में हो गया" सिर्फ बहाने हैं।',
      'इमरजेंसी गो-बैग तैयार रखें: जरूरी दस्तावेज, चाबियां, पैसे और चार्जर अलग छुपाकर रखें।',
      'शुभचिंतकों के साथ एक सीक्रेट कोड वर्ड तय करें (जैसे मैसेज में "चाय भेज दो")।',
      'फोन से अनजान ट्रैकिंग ऐप्स हटाएं और पासवर्ड बदलें।',
      '24/7 घरेलू हिंसा हेल्पलाइन: 181 या आपातकालीन 112 डायल करें।'
    ],
    motto: 'सुरक्षा सबसे पहले • चुप्पी तोड़ें • आप अकेली नहीं हैं • SHERO बनें'
  }
};
