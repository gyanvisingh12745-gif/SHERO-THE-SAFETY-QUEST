import { MissionSceneData } from '../types';

export const a9_sextortion_call: MissionSceneData = {
  id: 'mission-9',
  part: 'A',
  code: 'A9',
  number: 9,
  titleEn: 'The Sextortion Threat',
  titleHi: 'साइबर ब्लैकमेल और डिजिटल ढाल',
  taglineEn: 'A sudden video call cuts off, followed by morph threat images and demanding ransom.',
  taglineHi: 'अचानक एक वीडियो कॉल कटती है और फिर मोर्फ की गई तस्वीरों के साथ पैसे की धमकी दी जाती है।',
  environmentName: 'cozy_bedroom_chat',
  badgeName: 'CYBER SENTINEL',
  badgeIcon: 'Laptop',
  introPanels: [
    {
      id: 'p1',
      title: 'The Silent Video Ping',
      titleHi: 'अज्ञात वीडियो कॉल',
      captionEn: "An unknown number dials {hero} on WhatsApp video. It disconnects within three seconds.",
      captionHi: "एक अनजान नंबर से व्हाट्सएप वीडियो कॉल आती है और 3 सेकंड में अपने आप कट जाती है।",
      visualKey: 'sextortion_videocall',
      badge: 'CALL',
      soundEffect: 'ringtone'
    },
    {
      id: 'p2',
      title: 'The Extortion Threat',
      titleHi: 'ब्लैकमेल का मैसेज',
      captionEn: "Moments later, screenshots appear showing her face superimposed onto obscene imagery, demanding ₹50,000.",
      captionHi: "तुरंत बाद स्क्रीनशॉट आते हैं जिनमें {hero} का चेहरा आपत्तिजनक फोटो पर एडिट किया गया है और 50,000 रुपये मांगे जाते हैं।",
      visualKey: 'sextortion_blackmail',
      badge: 'THREAT',
      soundEffect: 'suspense'
    },
    {
      id: 'p3',
      title: 'Ticking Timer Countdown',
      titleHi: '15 मिनट की धमकी',
      captionEn: "'Transfer to this UPI in 15 minutes or we blast this to your entire contact list and parents!'",
      captionHi: "'15 मिनट में पैसे भेजो वरना तुम्हारे पूरे परिवार और दोस्तों को यह फोटो भेज दी जाएगी!'",
      visualKey: 'sextortion_timer',
      badge: 'COUNTDOWN',
      soundEffect: 'scam_alert'
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
      situationEn: 'A blackmailer has sent morphed deepfake images claiming he will ruin your reputation if you do not pay ₹50,000 immediately.',
      situationHi: 'एक ब्लैकमेलर ने एडिट की गई फर्जी तस्वीरें भेजकर धमकी दी है कि अगर 50,000 रुपये नहीं दिए तो वह इसे पूरे परिवार को भेज देगा।',
      speakerId: 'scammer',
      speakerName: 'Cyber Extortionist',
      speakerExpression: 'angry',
      speakerDialogueEn: "You have 10 minutes left {hero}! Send ₹50,000 to my UPI or watch your social media contacts get this video right now!",
      speakerDialogueHi: "सिर्फ 10 मिनट बचे हैं {hero}! 50 हजार रुपये भेजो वरना तुम्हारे सारे दोस्तों और रिश्तेदारों को यह वीडियो चला जाएगा!",
      heroExpression: 'determined',
      heroThoughtEn: "Never pay an extortionist. Paying guarantees they will ask for more. This is an AI deepfake scam.",
      heroThoughtHi: "ब्लैकमेलर को कभी एक रुपया भी नहीं देना चाहिए। पैसे देने से ब्लैकमेल कभी खत्म नहीं होता। मुझे कानूनी कदम उठाना है।",
      heroResponseDialogueEn: "I will not transfer a single rupee. Every threat, number, and UPI handle has been preserved and submitted to the Cyber Crime Portal.",
      heroResponseDialogueHi: "मैं एक रुपया भी नहीं दूंगी। तुम्हारे सारे मैसेज, नंबर और यूपीआई की शिकायत साइबर सेल में दर्ज हो चुकी है।",
      mangaEffect: 'speed_lines',
      mangaBadge: 'BLOCK!',
      crowd: [
        { id: 'counselor_priya', name: 'Cyber Expert', role: 'Helpline 1930 Agent', position: 'right_far', expression: 'determined' },
        { id: 'mahima', name: 'Mahima', role: 'Roommate offering support', position: 'left_far', expression: 'hopeful' }
      ],
      questionEn: 'You are targeted by a cyber extortionist threatening to leak morphed or fake private images. What is the critical course of action?',
      questionHi: 'फर्जी या मोर्फ तस्वीरों से ब्लैकमेल किए जाने पर सबसे सही और जरूरी कदम क्या है?',
      choices: [
        {
          id: 'c1',
          textEn: 'NEVER PAY. Take screenshots of all chats, numbers, and UPI IDs, block the sender, and report immediately to cybercrime.gov.in and dial 1930.',
          textHi: 'कभी पैसे न दें। सारे स्क्रीनशॉट लें, नंबर ब्लॉक करें और तुरंत 1930 व cybercrime.gov.in पर रिपोर्ट करें।',
          isCorrect: true,
          feedbackEn: 'Masterful response! Paying an extortionist never stops the harassment—it only invites higher ransom demands. Reporting to 1930 and StopNCII freezes the content.',
          feedbackHi: 'उत्कृष्ट निर्णय! ब्लैकमेलर को पैसे देने से वह और ज्यादा पैसे मांगता है। 1930 पर तुरंत शिकायत करने से साइबर पुलिस कार्रवाई करती है।',
          educationalTipEn: 'Under IT Act Section 66E / 67A and BNS, digital extortion carries severe prison sentences. Use StopNCII.org to generate hash blockers.',
          educationalTipHi: 'आईटी एक्ट के तहत डिजिटल ब्लैकमेलिंग एक गंभीर गैर-जमानती अपराध है। StopNCII.org पर फोटो को ऑनलाइन लीक होने से रोका जा सकता है।',
          safetyDelta: 30,
          boundariesDelta: 30
        },
        {
          id: 'c2',
          textEn: 'Transfer ₹10,000 as a partial token amount begging them to delete the files.',
          textHi: 'थोड़े पैसे देकर विनती करें कि वे तस्वीरें डिलीट कर दें।',
          isCorrect: false,
          feedbackEn: 'Fatal mistake! Paying proves that extortion works on you, leading the extortionist to demand lakhs of rupees repeatedly.',
          feedbackHi: 'भारी भूल! पैसे देने का मतलब है कि आप डर गए हैं, इसके बाद ब्लैकमेलर कभी पीछा नहीं छोड़ता और लाखों रुपये मांगता है।',
          educationalTipEn: 'Never negotiate with or pay financial extortionists. Zero compliance is the only viable policy.',
          educationalTipHi: 'ब्लैकमेलर्स से कभी समझौता न करें और न ही पैसे दें।',
          safetyDelta: -35,
          boundariesDelta: -30
        },
        {
          id: 'c3',
          textEn: 'Panic, delete all chats and evidence from your phone, and suffer in silence without telling anyone.',
          textHi: 'घबराकर सारे चैट और सबूत डिलीट कर दें और किसी को बताए बिना अकेले घुटते रहें।',
          isCorrect: false,
          feedbackEn: 'Deleting evidence removes proof needed by the cyber police to track the criminal IP and bank account.',
          feedbackHi: 'सबूत मिटाने से पुलिस के लिए अपराधी और बैंक खाते को ट्रैक करना मुश्किल हो जाता है।',
          educationalTipEn: 'Always preserve digital artifacts: URL links, account handles, mobile numbers, and transaction IDs.',
          educationalTipHi: 'हमेशा स्क्रीनशॉट और नंबर सुरक्षित रखें ताकि कानूनी कार्रवाई हो सके।',
          safetyDelta: -25,
          boundariesDelta: -20
        }
      ],
      winningNextNodeId: 'VICTORY'
    }
  },
  takeawayEn: {
    title: 'Key Takeaways — Sextortion & Digital Blackmail Response',
    checklist: [
      'RULE #1: NEVER PAY A SINGLE RUPEE. Paying never stops extortion.',
      'Preserve Evidence: Take screenshots with timestamps, mobile numbers, and bank details.',
      'Block and Disengage: Do not plead, argue, or negotiate with the scammer.',
      'Report immediately: Call 1930 (National Cyber Crime Helpline) or submit on cybercrime.gov.in.',
      'Protect your media: Use StopNCII.org to prevent non-consensual images from being shared on major platforms.'
    ],
    motto: 'No Fear • No Ransom • Report to 1930 • Be SHERO'
  },
  takeawayHi: {
    title: 'मुख्य सीख — साइबर ब्लैकमेल से सुरक्षा',
    checklist: [
      'नियम 1: एक रुपया भी न दें। पैसे देने से ब्लैकमेल कभी बंद नहीं होता।',
      'सबूत संभालें: तारीख, समय, मोबाइल नंबर और बैंक डिटेल्स के स्क्रीनशॉट लें।',
      'ब्लॉक करें: ब्लैकमेलर से कोई बहस या मिन्नतें न करें।',
      'तुरंत रिपोर्ट करें: 1930 डायल करें या cybercrime.gov.in पर शिकायत दर्ज करें।',
      'तस्वीरों को फैलने से रोकें: StopNCII.org की मदद से सोशल मीडिया प्लेटफॉर्म्स पर ब्लॉक कराएं।'
    ],
    motto: 'डरें नहीं • पैसे न दें • 1930 पर रिपोर्ट करें • SHERO बनें'
  }
};
