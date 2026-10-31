import { MissionSceneData } from '../types';

export const b5_the_heir: MissionSceneData = {
  id: 'episode-5',
  part: 'B',
  code: 'B5',
  number: 14,
  titleEn: '"The Heir" — Bodily Autonomy & Consent',
  titleHi: '"वारिस" — शारीरिक स्वायत्तता और सहमति',
  taglineEn: 'Relentless in-law coercion for a male child collides with personal bodily autonomy and the law.',
  taglineHi: 'बेटे की चाह में ससुराल का अनैतिक दबाव और महिला के शारीरिक व कानूनी अधिकारों की रक्षा।',
  environmentName: 'support_counseling_office',
  badgeName: 'AUTONOMY DEFENDER',
  badgeIcon: 'HeartHandshake',
  introPanels: [
    {
      id: 'p1',
      title: 'The "Khandaan Ka Chirag"',
      titleHi: 'खानदान का चिराग?',
      captionEn: "Sunita Aunty and relatives insist that {helpedWoman} must produce a male heir within the year.",
      captionHi: "सुनीता आंटी और रिश्तेदार जिद करते हैं कि {helpedWoman} को इसी साल 'वारिस' पैदा करना होगा।",
      visualKey: 'b5_heir_pressure',
      badge: 'PRESSURE',
      soundEffect: 'sigh'
    },
    {
      id: 'p2',
      title: 'Illegal Ultrasound Demand',
      titleHi: 'अवैध लिंग जांच की कोशिश',
      captionEn: "{husband} reveals he has booked an illegal sex-selection ultrasound clinic in an unlicensed back-alley.",
      captionHi: "{husband} बताता है कि उसने शहर के बाहर एक अवैध क्लिनिक में लिंग जांच की तारीख तय कर ली है।",
      visualKey: 'b5_illegal_clinic',
      badge: 'CRIME',
      soundEffect: 'suspense'
    },
    {
      id: 'p3',
      title: 'Bodily Integrity',
      titleHi: 'शरीर पर हक',
      captionEn: "{helpedWoman} breaks down in distress: 'My body, my health, my dreams... do none of them matter to them?'",
      captionHi: "{helpedWoman} रो पड़ती हैं: 'मेरा शरीर, मेरी सेहत, मेरी खुशी... क्या इनकी कोई कीमत नहीं है?'",
      visualKey: 'b5_autonomy_cry',
      badge: 'RIGHTS',
      soundEffect: 'heartbeat'
    }
  ],
  startNodeId: 'node_1',
  nodes: {
    node_1: {
      id: 'node_1',
      decisionNumber: 1,
      backgroundKey: 'support_office',
      lighting: 'amber_interior',
      weather: 'clear',
      situationEn: '{husband} and Sunita Aunty are trying to force {helpedWoman} into a car to take her to an illegal prenatal sex-selection diagnostic clinic.',
      situationHi: '{husband} और सास {helpedWoman} को जबरन गाड़ी में बैठाकर अवैध भ्रूण लिंग जांच केंद्र ले जाने की कोशिश कर रहे हैं।',
      speakerId: 'sunita_aunty',
      speakerName: 'Sunita Aunty',
      speakerExpression: 'angry',
      speakerDialogueEn: "Our lineage needs a grandson, {helpedWoman}! The doctor has agreed to check discreetly. You will get in this car and do your duty as a daughter-in-law!",
      speakerDialogueHi: "हमारे खानदान को पोता चाहिए {helpedWoman}! डॉक्टर ने चुपके से जांच करने की बात मान ली है। गाड़ी में बैठो और अपना फर्ज निभाओ!",
      heroExpression: 'determined',
      heroThoughtEn: "Prenatal sex determination is a serious non-bailable crime under the PC-PNDT Act. Bodily autonomy and reproductive choice belong solely to the woman.",
      heroThoughtHi: "गर्भ में लिंग जांच करवाना पीसी-पीएनडीटी एक्ट के तहत गैर-जमानती अपराध है। शरीर और मातृत्व पर सिर्फ महिला का अधिकार है।",
      heroResponseDialogueEn: "Stop right there. Female foeticide and prenatal sex testing are punishable by rigorous imprisonment under the PC-PNDT Act. No one can force {helpedWoman}’s body against her will.",
      heroResponseDialogueHi: "यहीं रुक जाइए। गर्भ में लिंग जांच करवाना कानूनन जेल की सजा वाला अपराध है। {helpedWoman} के शरीर पर किसी का जबरन हक नहीं है।",
      mangaEffect: 'impact_burst',
      mangaBadge: 'STOP!',
      crowd: [
        { id: 'counselor_priya', name: 'Counsellor Priya', role: 'Legal Advocate', position: 'right_far', expression: 'determined' },
        { id: 'anjali', name: '{helpedWoman} Didi', role: 'Refusing coercion', position: 'left_far', expression: 'determined' }
      ],
      questionEn: 'In-laws attempt to coerce a woman into illegal fetal sex determination and reproductive control. What is the lawful, empowering stance?',
      questionHi: 'ससुराल वाले जबरन लिंग जांच और बच्चे के लिए दबाव बनाएं, तो क्या कानूनी और नैतिक कदम उठाना चाहिए?',
      choices: [
        {
          id: 'c1',
          textEn: 'Firmly refuse participation, assert absolute constitutional bodily autonomy, and report the illegal sex-determination racket to the PC-PNDT State Cell.',
          textHi: 'जांच कराने से साफ इंकार करें, अपने शारीरिक अधिकारों पर अडिग रहें और अवैध लिंग जांच केंद्र की सूचना स्वास्थ्य विभाग को दें।',
          isCorrect: true,
          feedbackEn: 'Heroic and lawful action! Every woman has complete sovereignty over her body, reproductive health, and medical decisions. The PC-PNDT Act strictly criminalizes prenatal sex determination.',
          feedbackHi: 'साहसी और कानूनी रूप से मजबूत फैसला! हर महिला का अपने शरीर और मातृत्व पर पूर्ण अधिकार है। लिंग जांच करवाना और कराना दोनों कानूनन गंभीर अपराध हैं।',
          educationalTipEn: 'Under the PC-PNDT Act 1994, prenatal sex determination carries up to 5 years imprisonment and severe fines. Whistleblowers receive cash rewards.',
          educationalTipHi: 'पीसी-पीएनडीटी अधिनियम के तहत लिंग जांच कराने वालों और डॉक्टरों दोनों को 5 साल तक की जेल हो सकती है।',
          safetyDelta: 30,
          boundariesDelta: 35
        },
        {
          id: 'c2',
          textEn: 'Consult an independent medical gynecologist alone to safeguard personal health and confidential contraceptive choices.',
          textHi: 'बिना किसी दबाव के किसी स्वतंत्र स्त्री रोग विशेषज्ञ (Gynecologist) से अकेले परामर्श लें और अपनी सेहत को प्राथमिकता दें।',
          isCorrect: true,
          feedbackEn: 'Crucial healthcare independence! Medical consultations regarding reproduction and contraception must always be private, voluntary, and dignified.',
          feedbackHi: 'सेहत की स्वायत्तता! मातृत्व और स्वास्थ्य से जुड़े निर्णय हमेशा महिला की व्यक्तिगत सहमति और डॉक्टर की सलाह पर आधारित होने चाहिए।',
          educationalTipEn: 'Reproductive coercion (tampering with birth control, forced pregnancy) is a recognized form of domestic violence.',
          educationalTipHi: 'गर्भनिरोधक से छेड़छाड़ करना या जबरन गर्भधारण के लिए दबाव बनाना भी घरेलू हिंसा का रूप है।',
          safetyDelta: 25,
          supportDelta: 25
        },
        {
          id: 'c3',
          textEn: 'Submit to the illegal test and take unverified concoctions to please the in-laws.',
          textHi: 'सास-ससुर को खुश करने के लिए अवैध जांच करा लें और अनजान दवाइयां खाना शुरू कर दें।',
          isCorrect: false,
          feedbackEn: 'Extremely dangerous! Engaging in illegal sex testing is a criminal offense and taking unregulated concoctions poses fatal risks to maternal health.',
          feedbackHi: 'बेहद खतरनाक! गैरकानूनी लिंग जांच में शामिल होना अपराध है और अनजान दवाइयां खाने से जान को गंभीर खतरा हो सकता है।',
          educationalTipEn: 'Biological sex is genetically determined by the male chromosome (X or Y), never the mother. Blaming women is scientifically absurd and medically harmful.',
          educationalTipHi: 'विज्ञान के अनुसार बच्चे का लिंग पिता के क्रोमोसोम से तय होता है, मां से नहीं। महिला पर दोष मढ़ना पूरी तरह अवैज्ञानिक है।',
          safetyDelta: -40,
          boundariesDelta: -35
        }
      ],
      winningNextNodeId: 'VICTORY'
    }
  },
  takeawayEn: {
    title: 'Key Takeaways — Bodily Autonomy & Reproductive Rights',
    checklist: [
      'My Body, My Right: A woman’s reproductive health and family planning decisions belong solely to her.',
      'PC-PNDT Act 1994 strictly outlaws sex determination with prison time for offenders.',
      'Science fact: Chromosomal sex is determined by the father (XY), not the mother.',
      'Reproductive coercion (forced pregnancy, birth control sabotage) is punishable domestic violence.',
      'Report illegal clinics anonymously to the National Health Portal / PC-PNDT nodal officers.'
    ],
    motto: 'My Body • My Dignity • My Consent • Be SHERO'
  },
  takeawayHi: {
    title: 'मुख्य सीख — शारीरिक स्वायत्तता और मातृत्व के अधिकार',
    checklist: [
      'मेरा शरीर, मेरा हक: मातृत्व और स्वास्थ्य से जुड़े सभी फैसले महिला की व्यक्तिगत सहमति पर आधारित हैं।',
      'पीसी-पीएनडीटी कानून के तहत लिंग जांच करवाना गैर-जमानती अपराध और जेल की सजा है।',
      'वैज्ञानिक तथ्य: बच्चे का लिंग पिता के गुणसूत्र (XY) से तय होता है, मां का कोई दोष नहीं होता।',
      'जबरन बच्चा पैदा करने का दबाव डालना घरेलू हिंसा कानून के तहत दंडनीय है।',
      'अवैध लिंग जांच केंद्रों की गुप्त शिकायत स्वास्थ्य विभाग या राष्ट्रीय स्वास्थ्य पोर्टल पर करें।'
    ],
    motto: 'मेरा शरीर • मेरी गरिमा • मेरी सहमति • SHERO बनें'
  }
};
