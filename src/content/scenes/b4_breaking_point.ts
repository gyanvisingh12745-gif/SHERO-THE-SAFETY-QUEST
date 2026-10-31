import { MissionSceneData } from '../types';

export const b4_breaking_point: MissionSceneData = {
  id: 'episode-4',
  part: 'B',
  code: 'B4',
  number: 13,
  titleEn: 'Breaking Point & Lifeline',
  titleHi: 'नया सवेरा और कानूनी सहारा',
  taglineEn: 'Stepping into the Sakhi One-Stop Crisis Center to reclaim dignity, safety, and legal rights.',
  taglineHi: 'सखी वन-स्टॉप सेंटर में कदम रखकर कानूनी अधिकार, सुरक्षा और आत्मसम्मान वापस पाना।',
  environmentName: 'support_counseling_office',
  badgeName: 'JUSTICE SEEKER',
  badgeIcon: 'Scale',
  introPanels: [
    {
      id: 'p1',
      title: 'Safe Haven',
      titleHi: 'सुरक्षित पनाह',
      captionEn: "Dawn breaks. {helpedWoman} is safe under {hero}'s roof, but fear of retribution still shadows her eyes.",
      captionHi: "सुबह की रोशनी फूटी। {helpedWoman} {hero} के घर सुरक्षित है, पर आंखों में खौफ अब भी बाकी है।",
      visualKey: 'b4_dawn_shelter',
      badge: 'SANCTUARY',
      soundEffect: 'dawn_birds'
    },
    {
      id: 'p2',
      title: 'The Sakhi Center Gate',
      titleHi: 'सखी सेंटर का दरवाजा',
      captionEn: "{hero} accompanies {helpedWoman} to the government Sakhi One Stop Center for integrated support.",
      captionHi: "{hero} {helpedWoman} को लेकर सरकारी 'सखी वन स्टॉप सेंटर' पहुंचती है जहां एक ही छत के नीचे सारी मदद मिलती है।",
      visualKey: 'b4_center_doors',
      badge: 'SUPPORT',
      soundEffect: 'door_open'
    },
    {
      id: 'p3',
      title: 'Counsellor Priya’s Desk',
      titleHi: 'काउंसलर प्रिया का भरोसा',
      captionEn: "Counsellor Priya welcomes them warmly: 'You are safe here, {helpedWoman}. The law stands beside you.'",
      captionHi: "काउंसलर प्रिया मुस्कुराकर स्वागत करती हैं: '{helpedWoman}, आप सुरक्षित हैं। कानून आपके साथ खड़ा है।'",
      visualKey: 'b4_counselor_desk',
      badge: 'HOPE',
      soundEffect: 'gentle_bell'
    }
  ],
  startNodeId: 'node_1',
  nodes: {
    node_1: {
      id: 'node_1',
      decisionNumber: 1,
      backgroundKey: 'support_office',
      lighting: 'dawn_hope',
      weather: 'clear',
      situationEn: 'In the counselling room, Priya explains the legal remedies available under the Domestic Violence Act (PWDVA) and free legal aid through DLSA.',
      situationHi: 'काउंसलिंग कक्ष में प्रिया घरेलू हिंसा कानून के तहत सुरक्षा आदेश (Protection Order) और मुफ्त कानूनी सहायता (DLSA) के बारे में समझाती हैं।',
      speakerId: 'counselor_priya',
      speakerName: 'Counsellor Priya',
      speakerExpression: 'hopeful',
      speakerDialogueEn: "{helpedWoman}, you are not helpless. Under the PWDVA 2005, a magistrate can grant you a Protection Order barring {husband} from contacting you, and guarantee your right to residence and maintenance.",
      speakerDialogueHi: "{helpedWoman}, आप बेबस नहीं हैं। घरेलू हिंसा कानून के तहत कोर्ट प्रोटेक्शन ऑर्डर जारी कर सकता है जिससे कोई आपको परेशान नहीं कर सकता, और आपका भरण-पोषण भी सुनिश्चित होता है।",
      heroExpression: 'hopeful',
      heroThoughtEn: "Knowing your legal rights replaces fear with power. Free legal aid and protection officers exist precisely for this.",
      heroThoughtHi: "कानूनी अधिकारों की जानकारी डर को हिम्मत में बदल देती है। कानून महिलाओं की हिफाजत के लिए बना है।",
      heroResponseDialogueEn: "We want to file for a Protection Order and access medical and psychological counselling right here.",
      heroResponseDialogueHi: "हम प्रोटेक्शन ऑर्डर के लिए आवेदन करना चाहते हैं और यहाँ से मेडिकल व कानूनी मदद लेना चाहते हैं।",
      mangaEffect: 'glow_focus',
      mangaBadge: 'PHEW~',
      crowd: [
        { id: 'anjali', name: '{helpedWoman} Didi', role: 'Finding newfound courage', position: 'left_far', expression: 'hopeful' },
        { id: 'meera', name: 'Meera', role: 'Waiting friend in reception', position: 'right_far', expression: 'relieved' }
      ],
      questionEn: 'A survivor of domestic abuse seeks legal safety and rehabilitation. What is the most effective institutional pathway?',
      questionHi: 'घरेलू हिंसा से पीड़ित महिला के लिए सबसे सुरक्षित और कानूनी संस्थागत रास्ता क्या है?',
      choices: [
        {
          id: 'c1',
          textEn: 'File a Domestic Incident Report (DIR) with a Protection Officer, apply for an interim Protection Order under PWDVA, and access free counsel via DLSA.',
          textHi: 'प्रोटेक्शन ऑफिसर के जरिए DIR दर्ज कराएं, कोर्ट से प्रोटेक्शन ऑर्डर लें और DLSA से मुफ्त सरकारी वकील पाएं।',
          isCorrect: true,
          feedbackEn: 'Phenomenal legal empowerment! A Protection Order legally forbids the abuser from approaching you or your workplace, backed by immediate police enforcement.',
          feedbackHi: 'शानदार कानूनी कदम! प्रोटेक्शन ऑर्डर मिलने के बाद आरोपी का आपके पास आना या संपर्क करना गैर-जमानती जुर्म बन जाता है।',
          educationalTipEn: 'Under Article 39A and NALSA/DLSA regulations, every woman in India is entitled to 100% free legal aid regardless of income.',
          educationalTipHi: 'भारतीय संविधान और NALSA के तहत हर महिला को सरकारी खर्चे पर मुफ्त वकील पाने का कानूनी अधिकार है।',
          safetyDelta: 30,
          supportDelta: 30
        },
        {
          id: 'c2',
          textEn: 'Utilize Sakhi One Stop Center facilities: temporary shelter, medical examination, psychological trauma care, and police assistance under one roof.',
          textHi: 'सखी वन स्टॉप सेंटर की सुविधाओं का उपयोग करें: अस्थाई आश्रय, मेडिकल जांच, मनोवैज्ञानिक परामर्श और पुलिस सहायता।',
          isCorrect: true,
          feedbackEn: 'Comprehensive recovery! One Stop Centers (OSCs) provide round-the-clock emergency care without survivors having to shuttle between different offices.',
          feedbackHi: 'संपूर्ण सहारा! सखी वन स्टॉप सेंटर में एक ही जगह बिना भटके मेडिकल, कानूनी और रहने की सुरक्षित व्यवस्था मिलती है।',
          educationalTipEn: 'There are over 700 Sakhi One Stop Centers across India connected via Helpline 181.',
          educationalTipHi: 'देश भर में 700 से अधिक सखी सेंटर 24 घंटे हेल्पलाइन 181 से जुड़े हैं।',
          safetyDelta: 25,
          supportDelta: 30
        },
        {
          id: 'c3',
          textEn: 'Keep everything a secret, return home alone tonight, and promise to never consult outside counsellors again.',
          textHi: 'सब कुछ छुपाकर आज रात अकेले वापस ससुराल लौट जाएं और कभी किसी से मदद न मांगने का वादा करें।',
          isCorrect: false,
          feedbackEn: 'Extremely perilous! Returning without legal safeguards or family accountability drastically escalates the danger of violent retaliation.',
          feedbackHi: 'अत्यंत खतरनाक! बिना किसी कानूनी सुरक्षा के अकेले वापस जाने से हिंसा और खतरे का स्तर बहुत बढ़ जाता है।',
          educationalTipEn: 'Never return to an abusive environment without formal protection orders or a mediated safety agreement.',
          educationalTipHi: 'बिना कानूनी सुरक्षा और मध्यस्थता के कभी असुरक्षित माहौल में वापस न लौटें।',
          safetyDelta: -35,
          boundariesDelta: -30
        }
      ],
      winningNextNodeId: 'VICTORY'
    }
  },
  takeawayEn: {
    title: 'Key Takeaways — Institutional Support & Legal Rights',
    checklist: [
      'Sakhi One Stop Centers provide medical, legal, psychological, and shelter support under one roof.',
      'Protection Orders under PWDVA 2005 prevent abusers from entering your home or workplace.',
      'Free Legal Aid: DLSA (District Legal Services Authority) provides free lawyers to all women.',
      'Helplines: 181 (Women in Distress), 1091 (Women Police), 112 (National Emergency).',
      'You are resilient, you have rights, and justice is on your side!'
    ],
    motto: 'Reclaim Your Life • Justice & Dignity • Be SHERO'
  },
  takeawayHi: {
    title: 'मुख्य सीख — संस्थागत सहायता और कानूनी अधिकार',
    checklist: [
      'सखी वन स्टॉप सेंटर एक ही छत के नीचे मेडिकल, कानूनी, मानसिक और आश्रय सहायता देते हैं।',
      'घरेलू हिंसा अधिनियम के तहत प्रोटेक्शन ऑर्डर आरोपी को आपके पास आने से रोकता है।',
      'मुफ्त कानूनी सहायता: DLSA हर महिला को मुफ्त वकील उपलब्ध कराता है।',
      'हेल्पलाइन्स: 181 (महिला हेल्पलाइन), 1091 (महिला पुलिस), 112 (इमरजेंसी)।',
      'आप मजबूत हैं, कानून आपके साथ है और न्याय आपका हक है!'
    ],
    motto: 'जिंदगी आपकी है • न्याय और आत्मसम्मान • SHERO बनें'
  }
};
