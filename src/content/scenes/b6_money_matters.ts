import { MissionSceneData } from '../types';

export const b6_money_matters: MissionSceneData = {
  id: 'episode-6',
  part: 'B',
  code: 'B6',
  number: 15,
  titleEn: '"Money Matters" — Economic Freedom',
  titleHi: '"स्वाभिमान और धन" — आर्थिक आत्मनिर्भरता',
  taglineEn: 'Reclaiming Streedhan jewelry, unlocking independent accounts, and building unbreakable financial autonomy.',
  taglineHi: 'स्त्रीधन वापस पाना, अपना अलग बैंक खाता खोलना और आत्मनिर्भरता की मजबूत नींव रखना।',
  environmentName: 'support_counseling_office',
  badgeName: 'FINANCIAL SHERO',
  badgeIcon: 'Coins',
  introPanels: [
    {
      id: 'p1',
      title: 'The Locked Locker',
      titleHi: 'ताले में बंद स्त्रीधन',
      captionEn: "When {helpedWoman} asked for her bridal gold jewelry (Streedhan), she was told it was 'family property in the mother-in-law's locker'.",
      captionHi: "जब {helpedWoman} ने अपने शादी के जेवर मांगे, तो कहा गया कि वे अब सास की तिजोरी में खानदानी अमानत हैं।",
      visualKey: 'b6_locked_locker',
      badge: 'STREEDHAN',
      soundEffect: 'door_lock'
    },
    {
      id: 'p2',
      title: 'Forced Blank Cheques',
      titleHi: 'खाली चेक पर हस्ताक्षर',
      captionEn: "{husband} demands she sign blank promissory notes and take a personal bank loan in her name for his business.",
      captionHi: "{husband} अपने व्यापार के लिए {helpedWoman} के नाम से पर्सनल लोन लेने और कोरे चेक पर साइन करने का दबाव बनाता है।",
      visualKey: 'b6_blank_cheques',
      badge: 'FINANCIAL_TRAP',
      soundEffect: 'suspense'
    },
    {
      id: 'p3',
      title: 'The Independence Plan',
      titleHi: 'आत्मनिर्भरता का संकल्प',
      captionEn: "{hero} and {helpedWoman} sit at the bank branch to open a pristine, confidential single account.",
      captionHi: "{hero} और {helpedWoman} बैंक में बैठकर एक नया, गोपनीय स्वतंत्र बचत खाता खुलवाती हैं।",
      visualKey: 'b6_bank_account',
      badge: 'EMPOWERMENT',
      soundEffect: 'chime'
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
      situationEn: '{husband} arrives at the bank demanding {helpedWoman} sign a ₹10,000,000 corporate guarantee and surrender her jewellery locker keys.',
      situationHi: '{husband} बैंक पहुंचकर {helpedWoman} से 10 लाख के लोन गारंटर पेपर्स पर साइन करने और लॉकर की चाबी सौंपने की मांग करता है।',
      speakerId: 'rohan',
      speakerName: '{husband}',
      speakerExpression: 'angry',
      speakerDialogueEn: "Sign these loan guarantor papers right now {helpedWoman}! A wife's duty is to back her husband's business finances without asking questions!",
      speakerDialogueHi: "तुरंत इन लोन पेपर्स पर साइन करो {helpedWoman}! पति के बिजनेस में साथ देना और बिना सवाल किए कागजात साइन करना पत्नी का फर्ज है!",
      heroExpression: 'determined',
      heroThoughtEn: "Signing personal guarantees and handing over Streedhan creates lifetime financial entrapment. Streedhan is 100% the woman's sole property by Supreme Court ruling.",
      heroThoughtHi: "खाली कागजों पर साइन करना जिंदगी भर के कर्ज का जाल है। सुप्रीम कोर्ट के अनुसार स्त्रीधन पर केवल और केवल महिला का मालिकाना हक है।",
      heroResponseDialogueEn: "Never sign loan documents or blank cheques under coercion. Streedhan belongs exclusively to {helpedWoman} by law, and withholding it is criminal breach of trust.",
      heroResponseDialogueHi: "दबाव में आकर कभी किसी लोन पेपर पर साइन न करें। कानूनन स्त्रीधन पर पूरा हक {helpedWoman} का है और इसे रोकना अमानत में खयानत का अपराध है।",
      mangaEffect: 'glow_focus',
      mangaBadge: 'BLOCK!',
      crowd: [
        { id: 'counselor_priya', name: 'Legal Counsellor', role: 'Providing legal backing', position: 'right_far', expression: 'determined' },
        { id: 'anjali', name: '{helpedWoman} Didi', role: 'Standing tall', position: 'left_far', expression: 'determined' }
      ],
      questionEn: 'A spouse demands you sign financial loan guarantees and withholds your bridal jewelry (Streedhan). What is the essential legal and financial step?',
      questionHi: 'पति लोन पेपर्स पर जबरन हस्ताक्षर कराए और शादी के जेवर (स्त्रीधन) दबा ले, तो क्या कदम उठाना चाहिए?',
      choices: [
        {
          id: 'c1',
          textEn: 'Refuse to sign unknown financial liabilities, create a documented itemized list of all Streedhan for recovery under Section 12 PWDVA / IPC 406, and establish an independent personal bank account.',
          textHi: 'अनजान लोन पेपर्स पर साइन करने से मना करें, स्त्रीधन की पूरी सूची बनाकर कानूनन रिकवरी की अर्जी दें और अपना निजी खाता खोलें।',
          isCorrect: true,
          feedbackEn: 'Supreme financial triumph! Supreme Court precedents affirm that Streedhan is the absolute property of the woman. Never co-sign debts you did not incur or understand.',
          feedbackHi: 'सर्वोच्च वित्तीय विजय! सुप्रीम कोर्ट के फैसलों के अनुसार स्त्रीधन पर केवल महिला का हक है। कभी भी किसी ऐसे कर्ज के कागजात पर साइन न करें जिसे आप न समझती हों।',
          educationalTipEn: 'Streedhan includes gifts, ornaments, and properties given to a woman before, during, or after marriage. Refusing to return it is criminal breach of trust.',
          educationalTipHi: 'शादी में मिले सारे गहने और उपहार स्त्रीधन हैं। ससुराल वालों द्वारा इसे न लौटाना कानूनन गैर-जमानती अपराध है।',
          safetyDelta: 30,
          boundariesDelta: 35
        },
        {
          id: 'c2',
          textEn: 'Conduct a personal credit audit on CIBIL to ensure no unauthorized loans or cards were taken in your name.',
          textHi: 'अपना CIBIL क्रेडिट स्कोर चेक करें ताकि यह सुनिश्चित हो सके कि आपके नाम पर कोई फर्जी लोन या क्रेडिट कार्ड तो नहीं चल रहा।',
          isCorrect: true,
          feedbackEn: 'Brilliant financial hygiene! Monitoring your credit report ensures your financial identity has not been compromised by coercive lending.',
          feedbackHi: 'सटीक वित्तीय समझदारी! क्रेडिट स्कोर चेक करने से पता चल जाता है कि कोई आपके नाम का गलत इस्तेमाल तो नहीं कर रहा।',
          educationalTipEn: 'Annual credit reports are available free of charge from RBI-approved bureaus like CIBIL, Experian, and Equifax.',
          educationalTipHi: 'आरबीआई द्वारा मान्यता प्राप्त ब्यूरो से साल में एक बार मुफ्त में सिबिल स्कोर चेक किया जा सकता है।',
          safetyDelta: 20,
          independenceDelta: 30
        },
        {
          id: 'c3',
          textEn: 'Sign the blank loan guarantee and give up all rights to your jewelry to prevent arguments.',
          textHi: 'झगड़ा खत्म करने के लिए कोरे लोन पेपर पर साइन कर दें और गहनों का हक छोड़ दें।',
          isCorrect: false,
          feedbackEn: 'Catastrophic financial trap! Signing blank papers makes you legally liable for immense debts, leading to bank recovery, legal attachment, and financial ruin.',
          feedbackHi: 'विनाशकारी वित्तीय जाल! कोरे कागजात पर हस्ताक्षर करने से आप कानूनी रूप से लाखों के कर्जदार बन सकते हैं।',
          educationalTipEn: 'Never sign blank cheques, promissory notes, or bank papers under emotional pressure or threats.',
          educationalTipHi: 'भावनात्मक दबाव में आकर कभी भी खाली चेक या गारंटी पेपर्स पर दस्तखत न करें।',
          safetyDelta: -40,
          boundariesDelta: -35
        }
      ],
      winningNextNodeId: 'VICTORY'
    }
  },
  takeawayEn: {
    title: 'Key Takeaways — Streedhan & Financial Independence',
    checklist: [
      'Streedhan is YOUR property: Supreme Court affirms the husband/in-laws have no ownership over it.',
      'Never sign blank cheques or loan guarantee papers under marital pressure.',
      'Maintain an independent single bank account with private net banking credentials.',
      'Keep photograph records and bills of your bridal jewelry in secure digital storage.',
      'Financial independence is your ultimate shield of freedom and dignity!'
    ],
    motto: 'Financially Independent • Legally Protected • Truly SHERO'
  },
  takeawayHi: {
    title: 'मुख्य सीख — स्त्रीधन और आर्थिक आत्मनिर्भरता',
    checklist: [
      'स्त्रीधन पर सिर्फ आपका हक है: सुप्रीम कोर्ट के अनुसार पति या ससुराल वाले इस पर दावा नहीं कर सकते।',
      'भावनात्मक दबाव में कभी कोरे चेक या लोन के कागजात पर साइन न करें।',
      'अपना निजी बैंक खाता रखें जिसके पासवर्ड और ओटीपी सिर्फ आपके पास हों।',
      'अपने जेवरों की फोटो और बिल गूगल ड्राइव या डिजी लॉकर में सुरक्षित रखें।',
      'आर्थिक आजादी ही आत्मसम्मान और आत्मनिर्भरता की सबसे पक्की गारंटी है!'
    ],
    motto: 'आर्थिक स्वतंत्रता • कानूनी सुरक्षा • संपूर्ण SHERO'
  }
};
