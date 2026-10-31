import { MissionSceneData } from '../types';

export const a6_fake_job_offer: MissionSceneData = {
  id: 'mission-6',
  part: 'A',
  code: 'A6',
  number: 6,
  titleEn: 'The Fake Job Offer',
  titleHi: 'फर्जी नौकरी का झांसा',
  taglineEn: 'An exciting, high-paying corporate internship offer arrives with suspicious conditions attached.',
  taglineHi: 'एक आकर्षक और ऊंचे वेतन वाली इंटर्नशिप का ऑफर आता है, लेकिन उसमें अजीब शर्तें जुड़ी हैं।',
  environmentName: 'cafe_job_interview',
  badgeName: 'CAREER DEFENDER',
  badgeIcon: 'Briefcase',
  introPanels: [
    {
      id: 'p1',
      title: 'A Lucrative Message',
      titleHi: 'शानदार मौका?',
      captionEn: "{hero} receives a WhatsApp DM claiming she has been pre-selected for an executive stipend.",
      captionHi: "{hero} को एक व्हाट्सएप मैसेज मिलता है जिसमें बिना इंटरव्यू भारी स्टाइपेंड की बात कही गई है।",
      visualKey: 'job_offer_dm',
      badge: 'OFFER',
      soundEffect: 'ping'
    },
    {
      id: 'p2',
      title: 'The Suspicious Request',
      titleHi: 'संदिग्ध शर्तें',
      captionEn: "The 'HR recruiter' demands original academic certificates and ₹5,000 as a refundable 'onboarding fee'.",
      captionHi: "तथाकथित एचआर ओरिजिनल मार्कशीट और 5000 रुपये 'रिफंडेबल सिक्योरिटी' मांगता है।",
      visualKey: 'job_offer_fee',
      badge: 'WARNING',
      soundEffect: 'suspense'
    },
    {
      id: 'p3',
      title: 'Private Venue Invite',
      titleHi: 'निजी कमरे में बुलावा',
      captionEn: "He insists on signing the NDA alone in a private hotel suite rather than a registered corporate office.",
      captionHi: "वह किसी रजिस्टर्ड ऑफिस के बजाय होटल के कमरे में अकेले मिलने का दबाव बनाता है।",
      visualKey: 'job_offer_suite',
      badge: 'RED FLAG',
      soundEffect: 'scam_alert'
    }
  ],
  startNodeId: 'node_1',
  nodes: {
    node_1: {
      id: 'node_1',
      decisionNumber: 1,
      backgroundKey: 'cafe_terrace',
      lighting: 'market_sunshine',
      weather: 'clear',
      situationEn: "The recruiter has called you to discuss the final offer. He insists you hand over your passport/marksheets and pay ₹5,000 immediately.",
      situationHi: "रिक्रूटर आपको फाइनल ऑफर देने के लिए बुलाता है और कहता है कि ओरिजिनल दस्तावेज जमा करें और 5000 रुपये रजिस्ट्रेशन फीस दें।",
      speakerId: 'fake_recruiter',
      speakerName: 'Unverified Recruiter',
      speakerExpression: 'annoyed',
      speakerDialogueEn: "Look {hero}, 200 candidates are in line. Pay the ₹5,000 processing fee right now and deposit your original certificates to lock your seat.",
      speakerDialogueHi: "देखो {hero}, लाइन में 200 लोग हैं। तुरंत 5000 रुपये फीस दो और ओरिजिनल मार्कशीट जमा करो, तभी सीट पक्की होगी।",
      heroExpression: 'determined',
      heroThoughtEn: "Legitimate companies never ask for money or confiscate original documents. This is a classic recruitment trap.",
      heroThoughtHi: "असली कंपनियां कभी नौकरी के पैसे नहीं मांगतीं और न ही ओरिजिनल दस्तावेज जब्त करती हैं। यह साफ धोखा है।",
      heroResponseDialogueEn: "Registered organizations do not charge candidates or withhold original IDs. I am reporting this profile to the cyber cell.",
      heroResponseDialogueHi: "मान्य कंपनियां कभी पैसे नहीं मांगतीं और न ओरिजिनल डॉक्यूमेंट रखती हैं। मैं इसकी शिकायत साइबर सेल में कर रही हूँ।",
      mangaEffect: 'speed_lines',
      mangaBadge: 'SCAM!',
      crowd: [
        { id: 'meera', name: 'Meera', role: 'Colleague on call', position: 'left_far', expression: 'nervous' },
        { id: 'aanya', name: 'Aanya', role: 'Campus senior', position: 'right_far', expression: 'thinking' }
      ],
      questionEn: 'An employer demands money for an offer letter and insists on holding your original certificates. How should you respond?',
      questionHi: 'अगर कोई नियोक्ता नौकरी देने के बदले पैसे और ओरिजिनल दस्तावेज मांगे, तो क्या करना चाहिए?',
      choices: [
        {
          id: 'c1',
          textEn: 'Refuse firmly, withhold all original documents, and report the fraudulent listing on the National Cyber Crime Portal (cybercrime.gov.in).',
          textHi: 'साफ मना करें, कोई दस्तावेज न दें और राष्ट्रीय साइबर क्राइम पोर्टल पर शिकायत दर्ज कराएं।',
          isCorrect: true,
          feedbackEn: 'Spot on! Authentic corporations never ask applicants for upfront cash or physical custody of original certificates.',
          feedbackHi: 'बिल्कुल सही! कोई भी असली कंपनी उम्मीदवारों से अग्रिम राशि या मूल प्रमाणपत्र नहीं लेती।',
          educationalTipEn: 'Job scams frequently use urgency and fake exclusivity. Always verify company registration via MCA and official career domains.',
          educationalTipHi: 'नौकरी के घोटालों में जल्दबाजी दिखाई जाती है। हमेशा कंपनी की आधिकारिक वेबसाइट से ही जांच करें।',
          safetyDelta: 30,
          boundariesDelta: 25
        },
        {
          id: 'c2',
          textEn: 'Pay the fee via UPI hoping the job is genuine and hand over your originals.',
          textHi: 'नौकरी मिलने की उम्मीद में पैसे ट्रांसफर कर दें और ओरिजिनल मार्कशीट सौंप दें।',
          isCorrect: false,
          feedbackEn: 'High risk! You will lose your money and your documents will be held hostage or misused for identity theft.',
          feedbackHi: 'भारी जोखिम! आपके पैसे डूब जाएंगे और मूल दस्तावेजों का दुरुपयोग या ब्लैकमेलिंग हो सकती है।',
          educationalTipEn: 'Never surrender original educational degrees or pay "guaranteed placement fees".',
          educationalTipHi: 'कभी भी नौकरी के नाम पर अग्रिम फीस न दें।',
          safetyDelta: -30,
          boundariesDelta: -25
        },
        {
          id: 'c3',
          textEn: 'Agree to meet him alone in his private hotel room to negotiate the fee waiver.',
          textHi: 'फीस माफ कराने के लिए उसके बताए होटल के कमरे में अकेले मिलने चले जाएं।',
          isCorrect: false,
          feedbackEn: 'Extremely dangerous! Meeting unverified recruiters in private accommodations puts personal safety and physical security in severe jeopardy.',
          feedbackHi: 'अत्यंत खतरनाक! किसी अनजान व्यक्ति से निजी होटल के कमरे में मिलना जान और सुरक्षा के लिए गंभीर खतरा है।',
          educationalTipEn: 'Professional interviews take place in verified public office addresses or secure corporate video platforms, never private rooms.',
          educationalTipHi: 'इंटरव्यू हमेशा रजिस्टर्ड ऑफिस या आधिकारिक वीडियो कॉल पर होते हैं, कभी निजी कमरों में नहीं।',
          safetyDelta: -40,
          boundariesDelta: -30
        }
      ],
      winningNextNodeId: 'VICTORY'
    }
  },
  takeawayEn: {
    title: 'Key Takeaways — Employment & Career Scam Safety',
    checklist: [
      'No reputable company charges candidates for hiring or training fees.',
      'Never surrender your original certificates or passports to any employer.',
      'Check official email domains: HR will not email from free @gmail or @yahoo addresses.',
      'Verify company existence on the Ministry of Corporate Affairs (MCA) database.',
      'Report fake recruitment scams to 1930 and cybercrime.gov.in.'
    ],
    motto: 'Knowledge is Power • Protect Your Credentials • Be SHERO'
  },
  takeawayHi: {
    title: 'मुख्य सीख — नौकरी और करियर घोटालों से बचाव',
    checklist: [
      'कोई भी प्रतिष्ठित कंपनी भर्ती या ट्रेनिंग के नाम पर पैसे नहीं लेती।',
      'अपने मूल प्रमाणपत्र या पहचान पत्र कभी किसी कंपनी के पास जमा न छोड़ें।',
      'कंपनी की आधिकारिक वेबसाइट और डोमेन ईमेल की जांच करें।',
      'कॉर्पोरेट मामलों के मंत्रालय (MCA) पर कंपनी के पंजीकरण की पुष्टि करें।',
      'फर्जी नौकरी के झांसे की शिकायत 1930 और cybercrime.gov.in पर करें।'
    ],
    motto: 'सतर्क रहें • अपने अधिकारों को जानें • SHERO बनें'
  }
};
