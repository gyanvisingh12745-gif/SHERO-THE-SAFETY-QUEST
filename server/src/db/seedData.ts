/**
 * SHERO: The Safety Quest — Seed Data
 * Comprehensive data for 12 Canonical Missions, Characters, Safety Resources, and Achievements.
 * Bilingual: English ('en') and Hindi ('hi').
 * Strictly dynamic: tokens {playerName} and {hero} used, no hardcoded names.
 */

export interface SeedCharacter {
  id: string;
  code: string;
  defaultName: string;
  role: string;
  avatarKey: string;
}

export interface SeedAchievement {
  id: string;
  code: string;
  icon: string;
  category: string;
  points: number;
  translations: {
    en: { title: string; description: string };
    hi: { title: string; description: string };
  };
}

export interface SeedSafetyResource {
  id: string;
  code: string;
  category: string;
  phone: string;
  secondaryPhone?: string;
  smsNumber?: string;
  website?: string;
  availableHours: string;
  isVerified: number;
  nationalPriority: number;
  translations: {
    en: { name: string; description: string; address?: string; stepsToAccess: string };
    hi: { name: string; description: string; address?: string; stepsToAccess: string };
  };
}

export interface SeedChoice {
  id: string;
  choiceOrder: number;
  isCorrect: number;
  safetyScoreDelta: number;
  boundariesDelta: number;
  supportDelta: number;
  sfxEmotion: string;
  nextSceneOrder: number; // sceneOrder to target
  translations: {
    en: { choiceText: string; feedbackText: string; educationalTip: string };
    hi: { choiceText: string; feedbackText: string; educationalTip: string };
  };
}

export interface SeedDialogue {
  id: string;
  dialogueOrder: number;
  speakerType: 'hero' | 'stranger' | 'npc' | 'narrator' | 'ally';
  characterCode?: string;
  emotion: string;
  sfxCue?: string;
  translations: {
    en: { speakerName: string; dialogueText: string; thoughtText?: string };
    hi: { speakerName: string; dialogueText: string; thoughtText?: string };
  };
}

export interface SeedScene {
  id: string;
  sceneOrder: number;
  sceneType: 'intro' | 'decision' | 'outcome' | 'climax';
  characterCode?: string;
  backgroundKey: string;
  musicCue: string;
  translations: {
    en: { title: string; environmentName: string; narrativeText: string; promptText: string };
    hi: { title: string; environmentName: string; narrativeText: string; promptText: string };
  };
  dialogues: SeedDialogue[];
  choices: SeedChoice[];
}

export interface SeedMission {
  id: string;
  slug: string;
  number: number;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  estimatedMinutes: number;
  badgeName: string;
  badgeIcon: string;
  badgeDescription: string;
  translations: {
    en: { title: string; tagline: string; summary: string; learningGoal: string };
    hi: { title: string; tagline: string; summary: string; learningGoal: string };
  };
  scenes: SeedScene[];
}

// ---------------------------------------------------------------------------
// CHARACTERS
// ---------------------------------------------------------------------------
export const SEED_CHARACTERS: SeedCharacter[] = [
  { id: 'char_hero', code: 'hero', defaultName: 'Shero', role: 'Protagonist', avatarKey: 'hero_neutral' },
  { id: 'char_stranger_bus', code: 'stranger_bus', defaultName: 'Persistent Stranger', role: 'Transit Stranger', avatarKey: 'stranger_hoodie' },
  { id: 'char_store_clerk', code: 'store_clerk', defaultName: 'Store Cashier', role: 'Bystander Ally', avatarKey: 'npc_clerk' },
  { id: 'char_transit_marshal', code: 'transit_marshal', defaultName: 'Metro Marshal', role: 'Authority', avatarKey: 'npc_marshal' },
  { id: 'char_priya_ally', code: 'priya_ally', defaultName: 'Priya', role: 'Trusted Colleague', avatarKey: 'priya_work' },
  { id: 'char_vikram_manager', code: 'vikram_manager', defaultName: 'Vikram', role: 'Overstepping Manager', avatarKey: 'manager_vikram' },
  { id: 'char_rohit_partner', code: 'rohit_partner', defaultName: 'Rohit', role: 'Controlling Partner', avatarKey: 'partner_rohit' },
  { id: 'char_suman_inlaw', code: 'suman_inlaw', defaultName: 'Suman', role: 'Mother-in-law', avatarKey: 'inlaw_suman' },
  { id: 'char_alok_husband', code: 'alok_husband', defaultName: 'Alok', role: 'Husband', avatarKey: 'husband_alok' },
  { id: 'char_friend_neha', code: 'friend_neha', defaultName: 'Neha', role: 'Distressed Friend', avatarKey: 'friend_neha' },
  { id: 'char_neha_friend', code: 'neha_friend', defaultName: 'Neha', role: 'Distressed Friend', avatarKey: 'friend_neha' },
  { id: 'char_kavita_officer', code: 'kavita_officer', defaultName: 'Officer Kavita', role: 'Police Officer', avatarKey: 'officer_kavita' },
  { id: 'char_dr_meera', code: 'dr_meera', defaultName: 'Dr. Meera', role: 'Counselor', avatarKey: 'counselor_meera' },
  { id: 'char_counselor_meera', code: 'counselor_meera', defaultName: 'Counselor Meera', role: 'Counselor', avatarKey: 'counselor_meera' }
];

// ---------------------------------------------------------------------------
// ACHIEVEMENTS
// ---------------------------------------------------------------------------
export const SEED_ACHIEVEMENTS: SeedAchievement[] = [
  {
    id: 'ach_commute_guardian',
    code: 'COMMUTE_GUARDIAN',
    icon: 'ShieldCheck',
    category: 'street_safety',
    points: 100,
    translations: {
      en: { title: 'Commute Guardian', description: 'Demonstrated exceptional situational awareness in transit terminals.' },
      hi: { title: 'सफर संरक्षिका', description: 'पारगमन अड्डों पर असाधारण स्थितिजन्य सतर्कता का परिचय दिया।' }
    }
  },
  {
    id: 'ach_transit_navigator',
    code: 'TRANSIT_NAVIGATOR',
    icon: 'Compass',
    category: 'transit_safety',
    points: 100,
    translations: {
      en: { title: 'Transit Navigator', description: 'Effectively diffused crowded transit harassment with bystander engagement.' },
      hi: { title: 'पारगमन दिशा-सूचक', description: 'भीड़भाड़ वाले सफर में राहगीरों के सहयोग से उत्पीड़न को रोका।' }
    }
  },
  {
    id: 'ach_illuminated_path',
    code: 'ILLUMINATED_PATH',
    icon: 'Sun',
    category: 'street_safety',
    points: 100,
    translations: {
      en: { title: 'The Lit Path', description: 'Refused dangerous isolated shortcuts and secured populated havens.' },
      hi: { title: 'प्रकाशित मार्ग', description: 'असुरक्षित शॉर्टकट को नकारते हुए सुरक्षित आबादी वाले रास्तों को चुना।' }
    }
  },
  {
    id: 'ach_digital_shield',
    code: 'DIGITAL_SHIELD',
    icon: 'Lock',
    category: 'cyber_safety',
    points: 100,
    translations: {
      en: { title: 'Cyber Defender', description: 'Safeguarded digital forensic evidence and activated 1930 cyber protections.' },
      hi: { title: 'साइबर रक्षक', description: 'डिजिटल साक्ष्य सुरक्षित कर 1930 साइबर सुरक्षा हेल्पलाइन सक्रिय की।' }
    }
  },
  {
    id: 'ach_boundary_builder',
    code: 'BOUNDARY_BUILDER',
    icon: 'Briefcase',
    category: 'workplace_safety',
    points: 100,
    translations: {
      en: { title: 'Boundary Champion', description: 'Asserted unequivocal workplace boundaries under the POSH Act 2013.' },
      hi: { title: 'मर्यादा संरक्षक', description: 'पॉश अधिनियम 2013 के तहत कार्यस्थल पर स्पष्ट सीमाएं तय कीं।' }
    }
  },
  {
    id: 'ach_sovereign_heart',
    code: 'SOVEREIGN_HEART',
    icon: 'Heart',
    category: 'relational_safety',
    points: 100,
    translations: {
      en: { title: 'Sovereign Heart', description: 'Spotted coercive control red flags and prioritized emotional autonomy.' },
      hi: { title: 'स्वाभिमानी मन', description: 'नियंत्रणकारी व्यवहार के संकेतों को पहचान कर भावनात्मक स्वायत्तता को प्राथमिकता दी।' }
    }
  },
  {
    id: 'ach_legal_clarity',
    code: 'LEGAL_CLARITY',
    icon: 'BookOpen',
    category: 'domestic_rights',
    points: 100,
    translations: {
      en: { title: 'Rights Defender', description: 'Exercised legal protections under PWDVA Section 3 against domestic harassment.' },
      hi: { title: 'अधिकार सजग', description: 'घरेलू हिंसा अधिनियम धारा 3 के अंतर्गत कानूनी अधिकारों की पहचान की।' }
    }
  },
  {
    id: 'ach_tactical_haven',
    code: 'TACTICAL_HAVEN',
    icon: 'Key',
    category: 'domestic_safety',
    points: 100,
    translations: {
      en: { title: 'Safe Exit Strategist', description: 'Prepared an essential Go-Bag and safely executed an exit protocol.' },
      hi: { title: 'सुरक्षित निकास रणनीतिकार', description: 'आपातकालीन गो-बैग तैयार कर सुरक्षित निकास योजना को पूरा किया।' }
    }
  },
  {
    id: 'ach_financial_autonomy',
    code: 'FINANCIAL_AUTONOMY',
    icon: 'Coins',
    category: 'financial_rights',
    points: 100,
    translations: {
      en: { title: 'Financial Sovereign', description: 'Defended Streedhan rights and established uncompromised financial security.' },
      hi: { title: 'आर्थिक स्वावलंबन', description: 'स्त्रीधन अधिकारों की रक्षा कर पूर्ण आर्थिक सुरक्षा स्थापित की।' }
    }
  },
  {
    id: 'ach_empathy_catalyst',
    code: 'EMPATHY_CATALYST',
    icon: 'Users',
    category: 'bystander_support',
    points: 100,
    translations: {
      en: { title: 'Empathetic Bystander', description: 'Provided active, non-judgmental support and connected a friend to Sakhi Centre.' },
      hi: { title: 'सहानुभूति संबल', description: 'बिना पूर्वाग्रह के दोस्त का साथ दिया और उसे सखी वन स्टॉप सेंटर से जोड़ा।' }
    }
  },
  {
    id: 'ach_crisis_navigator',
    code: 'CRISIS_NAVIGATOR',
    icon: 'PhoneCall',
    category: 'emergency_crisis',
    points: 100,
    translations: {
      en: { title: 'Emergency Master', description: 'Mastered 112 emergency escalation and secured immediate police intervention.' },
      hi: { title: 'संकटमोचक', description: '112 आपातकालीन सेवा का त्वरित उपयोग कर पुलिस सहायता सुनिश्चित की।' }
    }
  },
  {
    id: 'ach_phoenix_rising',
    code: 'PHOENIX_RISING',
    icon: 'Sparkles',
    category: 'recovery_empowerment',
    points: 150,
    translations: {
      en: { title: 'Phoenix of Freedom', description: 'Completed all 12 quests, forging lifelong independence and empowering others.' },
      hi: { title: 'स्वावलंबन की उड़ान', description: 'सभी 12 अभियानों को पूरा कर अटूट स्वतंत्रता और शक्ति प्राप्त की।' }
    }
  }
];

// ---------------------------------------------------------------------------
// SAFETY RESOURCES
// ---------------------------------------------------------------------------
export const SEED_SAFETY_RESOURCES: SeedSafetyResource[] = [
  {
    id: 'res_112',
    code: 'ERSS_112',
    category: 'emergency',
    phone: '112',
    smsNumber: '112',
    website: 'https://112.gov.in',
    availableHours: '24/7',
    isVerified: 1,
    nationalPriority: 1,
    translations: {
      en: {
        name: 'National Emergency Response Support System (ERSS)',
        description: 'Single all-India emergency helpline for Police, Fire, and Ambulance with automated GPS tracking.',
        stepsToAccess: 'Dial 112 directly from any mobile or landline. Even phones with no balance or locked screens can place 112 emergency calls.'
      },
      hi: {
        name: 'राष्ट्रीय आपातकालीन हेल्पलाइन 112 (ERSS)',
        description: 'पुलिस, अग्निशमन और एम्बुलेंस के लिए अखिल भारतीय एकीकृत 24/7 आपातकालीन नंबर।',
        stepsToAccess: 'किसी भी मोबाइल या लैंडलाइन से सीधे 112 डायल करें। बिना बैलेंस या स्क्रीन लॉक होने पर भी यह कॉल कनेक्ट होती है।'
      }
    }
  },
  {
    id: 'res_181',
    code: 'WOMEN_181',
    category: 'domestic_abuse',
    phone: '181',
    website: 'https://wcd.nic.in',
    availableHours: '24/7',
    isVerified: 1,
    nationalPriority: 2,
    translations: {
      en: {
        name: 'Women Helpline (Domestic Abuse & Distress)',
        description: 'Toll-free 24-hour national helpline providing emergency rescue, psychological counseling, and legal advice to women in distress.',
        stepsToAccess: 'Dial 181 toll-free. The operator immediately connects you to the nearest Sakhi One Stop Centre or Protection Officer.'
      },
      hi: {
        name: 'महिला हेल्पलाइन 181',
        description: 'घरेलू हिंसा, संकट और मानसिक प्रताड़ना की शिकार महिलाओं के लिए 24 घंटे निःशुल्क राष्ट्रीय हेल्पलाइन।',
        stepsToAccess: 'टोल-फ्री नंबर 181 पर कॉल करें। यह आपको तुरंत नजदीकी सखी वन स्टॉप सेंटर या संरक्षण अधिकारी से जोड़ता है।'
      }
    }
  },
  {
    id: 'res_1091',
    code: 'POLICE_1091',
    category: 'police',
    phone: '1091',
    availableHours: '24/7',
    isVerified: 1,
    nationalPriority: 3,
    translations: {
      en: {
        name: 'Women Police Helpline (1091)',
        description: 'Direct police helpline dedicated to dispatching female police patrol units and registering immediate distress calls.',
        stepsToAccess: 'Dial 1091 when experiencing stalking, street harassment, or threatening situations requiring immediate police dispatch.'
      },
      hi: {
        name: 'महिला पुलिस हेल्पलाइन (1091)',
        description: 'सड़क पर छेड़छाड़, पीछा करने या धमकी की स्थिति में तुरंत महिला पुलिस गश्ती दल भेजने के लिए विशेष हेल्पलाइन।',
        stepsToAccess: 'आपात स्थिति में सीधे 1091 डायल करें। पुलिस नियंत्रण कक्ष निकटतम पीसीआर वैन को आपके स्थान पर रवाना करेगा।'
      }
    }
  },
  {
    id: 'res_1930',
    code: 'CYBER_1930',
    category: 'cyber',
    phone: '1930',
    website: 'https://cybercrime.gov.in',
    availableHours: '24/7',
    isVerified: 1,
    nationalPriority: 4,
    translations: {
      en: {
        name: 'National Cyber Crime Reporting Helpline (1930)',
        description: 'Dedicated national portal and telephone assistance for cyber stalking, revenge extortion, identity theft, and online harassment.',
        stepsToAccess: 'Call 1930 to freeze fraudulent accounts or log evidence. Register formal complaints online at cybercrime.gov.in with screenshots and URLs.'
      },
      hi: {
        name: 'राष्ट्रीय साइबर अपराध हेल्पलाइन (1930)',
        description: 'ऑनलाइन ब्लैकमेल, साइबर स्टॉकिंग, फर्जी प्रोफाइल और डिजिटल उत्पीड़न के खिलाफ आधिकारिक राष्ट्रीय हेल्पलाइन।',
        stepsToAccess: '1930 पर तुरंत कॉल करें या cybercrime.gov.in पर स्क्रीनशॉट और यूआरएल के साथ डिजिटल शिकायत दर्ज करें।'
      }
    }
  },
  {
    id: 'res_ncw_whatsapp',
    code: 'NCW_WHATSAPP',
    category: 'domestic_abuse',
    phone: '+91-7827170170',
    website: 'http://ncw.nic.in',
    availableHours: '24/7',
    isVerified: 1,
    nationalPriority: 5,
    translations: {
      en: {
        name: 'National Commission for Women (NCW) WhatsApp SOS',
        description: 'Discreet text-based emergency alert line for victims unable to place voice calls during domestic crisis.',
        stepsToAccess: 'Send a message or live location on WhatsApp to +91 7827170170 for confidential rescue coordination.'
      },
      hi: {
        name: 'राष्ट्रीय महिला आयोग (NCW) व्हाट्सएप हेल्पलाइन',
        description: 'घरेलू संकट में जब फोन पर बात करना संभव न हो, तब व्हाट्सएप पर गोपनीय संदेश भेजने के लिए हेल्पलाइन।',
        stepsToAccess: '+91 7827170170 पर व्हाट्सएप मैसेज या लाइव लोकेशन भेजकर गोपनीय सहायता प्राप्त करें।'
      }
    }
  },
  {
    id: 'res_sakhi_osc',
    code: 'SAKHI_OSC',
    category: 'shelter',
    phone: '181',
    availableHours: '24/7',
    isVerified: 1,
    nationalPriority: 6,
    translations: {
      en: {
        name: 'Sakhi One Stop Centres (OSC)',
        description: 'Integrated government centers present across districts providing medical aid, legal counsel, temporary shelter (up to 5 days), and police facilitation under one roof.',
        stepsToAccess: 'Walk into any district government hospital premises where Sakhi Centres operate, or dial 181 for facilitated escort.'
      },
      hi: {
        name: 'सखी वन स्टॉप सेंटर (OSC)',
        description: 'एक ही छत के नीचे चिकित्सा सहायता, कानूनी सलाह, 5 दिन तक का सुरक्षित आश्रय और पुलिस सहायता प्रदान करने वाला केंद्र।',
        stepsToAccess: 'जिले के मुख्य सरकारी अस्पताल परिसर में स्थित सखी केंद्र पर जाएं या 181 डायल कर परिवहन सहायता मांगें।'
      }
    }
  },
  {
    id: 'res_dlsa',
    code: 'DLSA_LEGAL',
    category: 'legal',
    phone: '15100',
    website: 'https://nalsa.gov.in',
    availableHours: '10:00 AM - 5:00 PM (Helpline 24/7)',
    isVerified: 1,
    nationalPriority: 7,
    translations: {
      en: {
        name: 'District Legal Services Authority (DLSA / NALSA)',
        description: 'Provides 100% free legal aid advocates, court filing assistance, and legal advice for all women regardless of income.',
        stepsToAccess: 'Dial 15100 toll-free or visit the legal aid clinic in your district court complex. Ask for the DLSA Front Office.'
      },
      hi: {
        name: 'जिला विधिक सेवा प्राधिकरण (DLSA / NALSA)',
        description: 'सभी महिलाओं के लिए निःशुल्क वकील, कानूनी सलाह और अदालती कार्यवाही सहायता प्रदान करने वाला आधिकारिक निकाय।',
        stepsToAccess: 'टोल-फ्री नंबर 15100 पर कॉल करें या अपने जिला न्यायालय परिसर के डीएलएसए फ्रंट ऑफिस में संपर्क करें।'
      }
    }
  },
  {
    id: 'res_icall',
    code: 'ICALL_COUNSEL',
    category: 'mental_health',
    phone: '9152987821',
    website: 'https://icallhelpline.org',
    availableHours: 'Mon-Sat 10:00 AM - 8:00 PM',
    isVerified: 1,
    nationalPriority: 8,
    translations: {
      en: {
        name: 'iCall Psychosocial Helpline (TISS)',
        description: 'Confidential, free telephone and email psychological counseling run by qualified mental health practitioners at TISS.',
        stepsToAccess: 'Call 9152987821 or email icall@tiss.edu for professional trauma counseling and emotional recovery.'
      },
      hi: {
        name: 'आईकॉल (iCall) मानसिक स्वास्थ्य हेल्पलाइन',
        description: 'टाटा इंस्टीट्यूट ऑफ सोशल साइंसेज द्वारा संचालित निःशुल्क और गोपनीय मनोवैज्ञानिक परामर्श सेवा।',
        stepsToAccess: '9152987821 पर कॉल करें या icall@tiss.edu पर ईमेल कर पेशेवर मानसिक परामर्श प्राप्त करें।'
      }
    }
  }
];

// ---------------------------------------------------------------------------
// 12 CANONICAL MISSIONS
// ---------------------------------------------------------------------------
export const SEED_MISSIONS: SeedMission[] = [
  // -------------------------------------------------------------------------
  // M01: THE LAST BUS STOP
  // -------------------------------------------------------------------------
  {
    id: 'm01_the_last_bus_stop',
    slug: 'the-last-bus-stop',
    number: 1,
    category: 'street_safety',
    difficulty: 'Beginner',
    estimatedMinutes: 5,
    badgeName: 'COMMUTE GUARDIAN',
    badgeIcon: 'ShieldCheck',
    badgeDescription: 'Mastered commute situational awareness and safe transit navigation.',
    translations: {
      en: {
        title: 'The Last Bus Stop',
        tagline: 'Night falls over the transit terminal, and a persistent stranger closes the distance.',
        summary: '{playerName} waits for the evening bus when an unknown man persistently tests personal space boundaries.',
        learningGoal: 'Recognize early boundary violations, shift immediately to illuminated populated zones, and broadcast transit status.'
      },
      hi: {
        title: 'अंतिम बस स्टॉप',
        tagline: 'बस अड्डे पर अंधेरा घिर आया है, और एक अजनबी संदिग्ध रूप से करीब आ रहा है।',
        summary: '{playerName} शाम की बस की प्रतीक्षा कर रही है, जब एक अजनबी व्यक्ति उसकी व्यक्तिगत सीमा का अतिक्रमण करने लगता है।',
        learningGoal: 'सीमा अतिक्रमण के शुरुआती संकेतों को पहचानें, तुरंत रोशनी वाले सुरक्षित स्थान पर जाएं और लाइव लोकेशन साझा करें।'
      }
    },
    scenes: [
      {
        id: 'm01_s01',
        sceneOrder: 1,
        sceneType: 'decision',
        characterCode: 'stranger_bus',
        backgroundKey: 'bus_stop_dusk',
        musicCue: 'ambient_suspense',
        translations: {
          en: {
            title: 'Shadows at the Shelter',
            environmentName: 'Transit Shelter Edge',
            narrativeText: 'Dusk has turned to pitch black. {playerName} stands near the edge of the bus shelter. A stranger steps closer, ignoring her clear physical step back.',
            promptText: 'The stranger is invading your personal space. What is your immediate reaction?'
          },
          hi: {
            title: 'शेड में परछाइयां',
            environmentName: 'बस शेल्टर का कोना',
            narrativeText: 'रात गहरा चुकी है। {playerName} बस शेल्टर के किनारे खड़ी है। एक अजनबी उसके पीछे हटने के बावजूद कदम आगे बढ़ाता है।',
            promptText: 'अजनबी आपकी निजी सीमा में घुस रहा है। आपकी पहली प्रतिक्रिया क्या होगी?'
          }
        },
        dialogues: [
          {
            id: 'm01_s01_d01',
            dialogueOrder: 1,
            speakerType: 'stranger',
            characterCode: 'stranger_bus',
            emotion: 'smirking',
            sfxCue: 'footsteps_gravel',
            translations: {
              en: {
                speakerName: 'Stranger',
                dialogueText: '"Hey, waiting all alone in the dark? Come sit over here by my bike, I can drop you home."'
              },
              hi: {
                speakerName: 'अजनबी',
                dialogueText: '"अरे, इतनी रात को अकेले खड़ी हो? इधर मेरी बाइक के पास आ जाओ, मैं घर छोड़ देता हूँ।"'
              }
            }
          },
          {
            id: 'm01_s01_d02',
            dialogueOrder: 2,
            speakerType: 'hero',
            characterCode: 'hero',
            emotion: 'vigilant',
            translations: {
              en: {
                speakerName: '{playerName}',
                dialogueText: '"No thank you. I am waiting right here."',
                thoughtText: 'He purposefully ignored my boundary step. Standing in this unlit corner is dangerous.'
              },
              hi: {
                speakerName: '{playerName}',
                dialogueText: '"जी नहीं, धन्यवाद। मैं यहीं ठीक हूँ।"',
                thoughtText: 'उसने जानबूझकर मेरे पीछे हटने को नजरअंदाज किया। इस अंधेरे कोने में खड़े रहना जोखिम भरा है।'
              }
            }
          }
        ],
        choices: [
          {
            id: 'm01_s01_c01',
            choiceOrder: 1,
            isCorrect: 0,
            safetyScoreDelta: -15,
            boundariesDelta: -10,
            supportDelta: 0,
            sfxEmotion: 'afraid',
            nextSceneOrder: 1,
            translations: {
              en: {
                choiceText: 'Put in noise-canceling headphones, ignore him completely, and remain in the dark corner.',
                feedbackText: 'Disengaging auditory perception in an isolated setting strips you of situational awareness.',
                educationalTip: 'Never block your hearing when an unfamiliar person is encroaching on your space in isolated areas.'
              },
              hi: {
                choiceText: 'हेडफोन लगा लें, उसे अनदेखा करें और अंधेरे कोने में ही खड़ी रहें।',
                feedbackText: 'अकेले में सुनने की क्षमता को अवरुद्ध करने से स्थितिजन्य सतर्कता खत्म हो जाती है।',
                educationalTip: 'एकांत में जब कोई संदिग्ध व्यक्ति करीब हो तो कभी भी हेडफोन न लगाएं।'
              }
            }
          },
          {
            id: 'm01_s01_c02',
            choiceOrder: 2,
            isCorrect: 1,
            safetyScoreDelta: 20,
            boundariesDelta: 15,
            supportDelta: 10,
            sfxEmotion: 'ping',
            nextSceneOrder: 2,
            translations: {
              en: {
                choiceText: 'Step out firmly toward the brightly lit convenience store with cashier staff and waiting commuters.',
                feedbackText: 'Outstanding move! Shifting to a brightly illuminated commercial spot with active witnesses deters opportunists.',
                educationalTip: 'Distance and public visibility are your primary shields against street intimidation.'
              },
              hi: {
                choiceText: 'तुरंत रोशनी वाली दुकान की तरफ बढ़ें जहां कर्मचारी और अन्य ग्राहक मौजूद हैं।',
                feedbackText: 'बहुत बढ़िया! रोशनी और लोगों की मौजूदगी वाले स्थान पर जाने से संदिग्ध व्यक्ति का हौसला पस्त हो जाता है।',
                educationalTip: 'दूरी और सार्वजनिक दृश्यता सड़क पर सुरक्षा का सबसे मजबूत पहला कदम है।'
              }
            }
          },
          {
            id: 'm01_s01_c03',
            choiceOrder: 3,
            isCorrect: 0,
            safetyScoreDelta: -10,
            boundariesDelta: 5,
            supportDelta: 0,
            sfxEmotion: 'shock',
            nextSceneOrder: 1,
            translations: {
              en: {
                choiceText: 'Aggressively shout insults at him while standing ground in the dark.',
                feedbackText: 'Aggressive verbal confrontation in an isolated dark spot risks provoking immediate physical escalation.',
                educationalTip: 'Assert firm boundaries while moving toward safety, rather than getting trapped in a verbal brawl in the dark.'
              },
              hi: {
                choiceText: 'अंधेरे में ही खड़े रहकर उस पर जोर-जोर से चिल्लाएं और अपशब्द कहें।',
                feedbackText: 'अकेले में अपशब्द कहकर आक्रामकता बढ़ाने से सामने वाला व्यक्ति हिंसक हो सकता है।',
                educationalTip: 'मजबूत सीमाएं बनाते हुए तुरंत सुरक्षित स्थान की ओर बढ़ें, अकेले में उलझने से बचें।'
              }
            }
          }
        ]
      },
      {
        id: 'm01_s02',
        sceneOrder: 2,
        sceneType: 'decision',
        characterCode: 'store_clerk',
        backgroundKey: 'night_store_haven',
        musicCue: 'ambient_calm',
        translations: {
          en: {
            title: 'The Lit Haven',
            environmentName: '24/7 Pharmacy / Convenience Store',
            narrativeText: '{playerName} stands by the store entrance under bright white LEDs. The stranger loiters 30 meters away across the road. The clerk nods warmly.',
            promptText: 'You have 7 minutes before the bus arrives. What is your next proactive safety step?'
          },
          hi: {
            title: 'सुरक्षित रोशनी',
            environmentName: 'दुकान का रोशन काउंटर',
            narrativeText: '{playerName} दुकान की दूधिया रोशनी में खड़ी है। वह अजनबी सड़क पार 30 मीटर दूर खड़ा देख रहा है। दुकानदार ने विनम्रता से देखा।',
            promptText: 'बस आने में अभी 7 मिनट बाकी हैं। आप अपनी सुरक्षा के लिए अगला कदम क्या उठाएंगी?'
          }
        },
        dialogues: [
          {
            id: 'm01_s02_d01',
            dialogueOrder: 1,
            speakerType: 'npc',
            characterCode: 'store_clerk',
            emotion: 'supportive',
            translations: {
              en: {
                speakerName: 'Cashier',
                dialogueText: '"Evening! Feel free to wait inside by the window until your bus arrives."'
              },
              hi: {
                speakerName: 'दुकानदार',
                dialogueText: '"नमस्ते बहन! जब तक बस न आए आप अंदर शीशे के पास खड़े होकर इंतजार कर सकती हैं।"'
              }
            }
          },
          {
            id: 'm01_s02_d02',
            dialogueOrder: 2,
            speakerType: 'hero',
            characterCode: 'hero',
            emotion: 'focused',
            translations: {
              en: {
                speakerName: '{playerName}',
                dialogueText: '"Thank you, that is very helpful."',
                thoughtText: 'I am safe here, but I must make sure a trusted contact knows my coordinates.'
              },
              hi: {
                speakerName: '{playerName}',
                dialogueText: '"बहुत धन्यवाद भइया।"',
                thoughtText: 'यहाँ रोशनी है, पर मुझे किसी भरोसेमंद व्यक्ति को अपनी लाइव लोकेशन भेज देनी चाहिए।'
              }
            }
          }
        ],
        choices: [
          {
            id: 'm01_s02_c01',
            choiceOrder: 1,
            isCorrect: 1,
            safetyScoreDelta: 20,
            boundariesDelta: 10,
            supportDelta: 20,
            sfxEmotion: 'relief',
            nextSceneOrder: 3,
            translations: {
              en: {
                choiceText: 'Share your 8-hour WhatsApp/Google live location and bus route details with a trusted emergency contact.',
                feedbackText: 'Perfect! Live location tethering creates real-time accountability and lets trusted contacts track your journey.',
                educationalTip: 'Always initiate a live location share whenever commuting after dark in unfamiliar transit corridors.'
              },
              hi: {
                choiceText: 'अपने किसी भरोसेमंद परिजन को व्हाट्सएप या गूगल मैप्स पर लाइव लोकेशन और बस नंबर भेजें।',
                feedbackText: 'उत्कृष्ट! लाइव लोकेशन साझा करने से परिवार को आपकी स्थिति की वास्तविक जानकारी रहती है।',
                educationalTip: 'रात के समय सफर करते हुए हमेशा अपने करीबी संपर्क को लाइव लोकेशन भेज कर रखें।'
              }
            }
          },
          {
            id: 'm01_s02_c02',
            choiceOrder: 2,
            isCorrect: 0,
            safetyScoreDelta: -10,
            boundariesDelta: 0,
            supportDelta: -10,
            sfxEmotion: 'shock',
            nextSceneOrder: 2,
            translations: {
              en: {
                choiceText: 'Post an open Instagram story stating you are stranded alone at this exact bus stop.',
                feedbackText: 'Publicly broadcasting your real-time vulnerability to unknown followers exposes you to secondary threats.',
                educationalTip: 'Never broadcast vulnerable real-time locations on open public social networks.'
              },
              hi: {
                choiceText: 'इंस्टाग्राम स्टोरी पर पोस्ट करें कि आप इस बस स्टॉप पर अकेली फंसी हैं।',
                feedbackText: 'सार्वजनिक सोशल मीडिया पर यह बताना कि आप अकेली हैं, आपको और अधिक जोखिम में डाल सकता है।',
                educationalTip: 'सार्वजनिक मंचों पर कभी भी अपनी एकांत या असुरक्षित स्थिति का सीधा प्रसारण न करें।'
              }
            }
          },
          {
            id: 'm01_s02_c03',
            choiceOrder: 3,
            isCorrect: 0,
            safetyScoreDelta: -5,
            boundariesDelta: -5,
            supportDelta: 0,
            sfxEmotion: 'afraid',
            nextSceneOrder: 2,
            translations: {
              en: {
                choiceText: 'Walk back out into the dark shadows behind the bus shelter to hide until headlights appear.',
                feedbackText: 'Surrendering a lit, staffed location to hide in shadowy blind spots severely compromises your safety.',
                educationalTip: 'Stay in well-lit populated zones. Never corner yourself into blind alleys or unlit spots.'
              },
              hi: {
                choiceText: 'दुकान से निकलकर बस शेल्टर के पीछे अंधेरी झाड़ियों में छिपने की कोशिश करें।',
                feedbackText: 'रोशनी वाली सुरक्षित जगह छोड़कर अंधेरे में छिपना भारी भूल है।',
                educationalTip: 'हमेशा रोशनी और लोगों की नजर में रहें। कभी भी खुद को किसी अंधेरे कोने में न फंसाएं।'
              }
            }
          }
        ]
      },
      {
        id: 'm01_s03',
        sceneOrder: 3,
        sceneType: 'outcome',
        characterCode: 'hero',
        backgroundKey: 'bus_interior_safe',
        musicCue: 'victory_theme',
        translations: {
          en: {
            title: 'A Journey Secured',
            environmentName: 'Well-Lit City Bus',
            narrativeText: 'The electric bus pulls up directly in front of the store. {playerName} boards smoothly near the conductor. The stranger realizes the opportunity has vanished and walks away.',
            promptText: 'Mission Complete! You established firm boundaries and leveraged populated havens.'
          },
          hi: {
            title: 'सुरक्षित यात्रा',
            environmentName: 'रोशन सिटी बस',
            narrativeText: 'इलेक्ट्रिक बस ठीक दुकान के सामने आकर रुकती है। {playerName} कंडक्टर के पास वाली सीट पर सुरक्षित सवार होती है। अजनबी समझ जाता है कि उसकी दाल नहीं गलेगी और चला जाता है।',
            promptText: 'मिशन संपन्न! आपने दृढ़ता से सीमाएं बनाईं और सुरक्षित स्थान का सही उपयोग किया।'
          }
        },
        dialogues: [
          {
            id: 'm01_s03_d01',
            dialogueOrder: 1,
            speakerType: 'hero',
            characterCode: 'hero',
            emotion: 'confident',
            translations: {
              en: {
                speakerName: '{playerName}',
                dialogueText: '"I stayed alert, picked the lit haven, and kept my circle informed. That is true safety empowerment."'
              },
              hi: {
                speakerName: '{playerName}',
                dialogueText: '"मैंने सतर्कता बरती, सुरक्षित रोशनी चुनी और अपनों को सूचित रखा। यही सच्ची आत्मरक्षा है।"'
              }
            }
          }
        ],
        choices: [
          {
            id: 'm01_s03_c01',
            choiceOrder: 1,
            isCorrect: 1,
            safetyScoreDelta: 10,
            boundariesDelta: 10,
            supportDelta: 10,
            sfxEmotion: 'victory',
            nextSceneOrder: 3,
            translations: {
              en: {
                choiceText: 'Conclude mission and review commute safety takeaways.',
                feedbackText: 'Commute Guardian badge unlocked!',
                educationalTip: 'Remember: 112 emergency and live location shares should always be within one-tap reach on your phone.'
              },
              hi: {
                choiceText: 'मिशन समाप्त करें और सीखे गए सुरक्षा सूत्रों को दोहराएं।',
                feedbackText: 'सफर संरक्षिका पदक प्राप्त हुआ!',
                educationalTip: 'याद रखें: 112 आपातकालीन नंबर और लाइव लोकेशन हमेशा एक क्लिक पर तैयार होने चाहिए।'
              }
            }
          }
        ]
      }
    ]
  },

  // -------------------------------------------------------------------------
  // M02: THE CROWDED COMMUTE
  // -------------------------------------------------------------------------
  {
    id: 'm02_the_crowded_commute',
    slug: 'the-crowded-commute',
    number: 2,
    category: 'transit_safety',
    difficulty: 'Beginner',
    estimatedMinutes: 6,
    badgeName: 'TRANSIT NAVIGATOR',
    badgeIcon: 'Compass',
    badgeDescription: 'Effectively diffused crowded transit harassment with bystander engagement.',
    translations: {
      en: {
        title: 'The Crowded Commute',
        tagline: 'Rush-hour metro crush: someone is exploiting the crowd to press uncomfortably close.',
        summary: '{playerName} travels on a packed evening train when a fellow commuter uses train movement to persistently touch her inappropriately.',
        learningGoal: 'Distinguish accidental transit bumps from deliberate harassment, speak up unequivocally, and mobilize nearby passengers.'
      },
      hi: {
        title: 'भीड़भाड़ वाला सफर',
        tagline: 'मेट्रो में शाम की भारी भीड़: कोई व्यक्ति भीड़ की आड़ में अनुचित रूप से सट रहा है।',
        summary: '{playerName} खचाखच भरी ट्रेन में सफर कर रही है जब एक सहयात्री जानबूझकर बार-बार आपत्तिजनक रूप से छूने की कोशिश करता है।',
        learningGoal: 'अनजाने झटके और जानबूझकर की गई छेड़छाड़ के अंतर को पहचानें, स्पष्ट आवाज में विरोध करें और सहयात्रियों को सचेत करें।'
      }
    },
    scenes: [
      {
        id: 'm02_s01',
        sceneOrder: 1,
        sceneType: 'decision',
        characterCode: 'stranger_bus',
        backgroundKey: 'metro_crowded',
        musicCue: 'ambient_suspense',
        translations: {
          en: {
            title: 'Unwanted Proximity',
            environmentName: 'Packed Metro Coach',
            narrativeText: 'The train rocks as it rounds a curve. Even with ample grab rail space, the man standing behind {playerName} consistently leans his hand into her waist.',
            promptText: 'His hand presses against your hip repeatedly. How do you handle this boundary violation?'
          },
          hi: {
            title: 'अवांछित निकटता',
            environmentName: 'खचाखच भरा मेट्रो कोच',
            narrativeText: 'ट्रेन मोड़ पर हिलती है। पर्याप्त जगह होने के बावजूद पीछे खड़ा व्यक्ति बार-बार {playerName} की कमर को छूने का प्रयास कर रहा है।',
            promptText: 'उसका हाथ लगातार आपकी सीमा लांघ रहा है। आप क्या करेंगी?'
          }
        },
        dialogues: [
          {
            id: 'm02_s01_d01',
            dialogueOrder: 1,
            speakerType: 'hero',
            characterCode: 'hero',
            emotion: 'tense',
            translations: {
              en: {
                speakerName: '{playerName}',
                dialogueText: '',
                thoughtText: 'Once could be a sudden brake. Three times with shifting fingers is deliberate harassment.'
              },
              hi: {
                speakerName: '{playerName}',
                dialogueText: '',
                thoughtText: 'एक बार अचानक ब्रेक लगना हो सकता है। पर तीन बार जानबूझकर उंगलियां आगे बढ़ाना स्पष्ट छेड़छाड़ है।'
              }
            }
          }
        ],
        choices: [
          {
            id: 'm02_s01_c01',
            choiceOrder: 1,
            isCorrect: 0,
            safetyScoreDelta: -10,
            boundariesDelta: -10,
            supportDelta: 0,
            sfxEmotion: 'afraid',
            nextSceneOrder: 1,
            translations: {
              en: {
                choiceText: 'Squeeze yourself silently tighter against the doors and hope he stops.',
                feedbackText: 'Remaining silent and retreating gives perpetrators perceived impunity to continue escalating contact.',
                educationalTip: 'Harassers rely heavily on the victim\'s hesitation to make a scene. Silence rarely deters them.'
              },
              hi: {
                choiceText: 'चुपचाप दरवाजे से सट कर खड़ी हो जाएं और उम्मीद करें कि वह खुद रुक जाएगा।',
                feedbackText: 'चुप रहने से गलत इरादे रखने वाले को लगता है कि कोई विरोध नहीं होगा।',
                educationalTip: 'छेड़छाड़ करने वाले अक्सर पीड़ित की झिझक का फायदा उठाते हैं। चुप्पी इसका समाधान नहीं है।'
              }
            }
          },
          {
            id: 'm02_s01_c02',
            choiceOrder: 2,
            isCorrect: 1,
            safetyScoreDelta: 20,
            boundariesDelta: 20,
            supportDelta: 15,
            sfxEmotion: 'ping',
            nextSceneOrder: 2,
            translations: {
              en: {
                choiceText: 'Turn firmly, make direct eye contact, and say in a loud, clear voice: "Keep your hands to yourself and step back."',
                feedbackText: 'Superb! A loud, direct statement strips away his anonymity and instantly puts surrounding passengers on alert.',
                educationalTip: 'Clarity, volume, and naming the exact behavior ("keep your hands off") breaks the harassment dynamic.'
              },
              hi: {
                choiceText: 'पीछे मुड़कर सीधे उसकी आँखों में देखें और स्पष्ट, ऊंची आवाज में कहें: "अपना हाथ पीछे रखिए और दूर खड़े होइए।"',
                feedbackText: 'शाबाश! स्पष्ट और ऊंची आवाज से आसपास के सभी सहयात्री तुरंत सचेत हो जाते हैं और वह व्यक्ति सकपका जाता है।',
                educationalTip: 'स्पष्ट शब्दों में हरकत का नाम लेकर टोकना छेड़खानी को रोकने का सबसे प्रभावी तरीका है।'
              }
            }
          },
          {
            id: 'm02_s01_c03',
            choiceOrder: 3,
            isCorrect: 0,
            safetyScoreDelta: -5,
            boundariesDelta: 5,
            supportDelta: 0,
            sfxEmotion: 'shock',
            nextSceneOrder: 1,
            translations: {
              en: {
                choiceText: 'Whisper under your breath and elbow him blindly backward without looking.',
                feedbackText: 'Blind physical retaliation without verbal clarity can cause accidental injury to innocent commuters or escalate unchecked.',
                educationalTip: 'Make the confrontation verbal and visible so bystanders clearly understand who the initiator is.'
              },
              hi: {
                choiceText: 'बिना पीछे देखे अपनी कोहनी जोर से पीछे मारें और फुसफुसाएं।',
                feedbackText: 'बिना देखे कोहनी मारने से किसी निर्दोष यात्री को चोट लग सकती है और भ्रम की स्थिति बन सकती है।',
                educationalTip: 'हमेशा मुड़कर स्पष्ट आवाज में टोकें ताकि आसपास के लोगों को साफ पता चले कि गलत कौन कर रहा है।'
              }
            }
          }
        ]
      },
      {
        id: 'm02_s02',
        sceneOrder: 2,
        sceneType: 'decision',
        characterCode: 'transit_marshal',
        backgroundKey: 'metro_station_platform',
        musicCue: 'ambient_calm',
        translations: {
          en: {
            title: 'Station Assistance',
            environmentName: 'Platform Intercom & Security Post',
            narrativeText: 'The train doors slide open at the next interchange. The harasser tries to slip away into the crowd. A female Metro Marshal stands near the coach door.',
            promptText: 'What is your immediate course of action upon arrival at the station?'
          },
          hi: {
            title: 'स्टेशन सहायता',
            environmentName: 'प्लेटफॉर्म सुरक्षा सहायता केंद्र',
            narrativeText: 'अगले स्टेशन पर ट्रेन रुकती है। वह व्यक्ति भीड़ में गायब होने की कोशिश करता है। कोच के ठीक बाहर एक महिला मेट्रो मार्शल खड़ी है।',
            promptText: 'स्टेशन पहुंचते ही आप क्या कदम उठाएंगी?'
          }
        },
        dialogues: [
          {
            id: 'm02_s02_d01',
            dialogueOrder: 1,
            speakerType: 'npc',
            characterCode: 'transit_marshal',
            emotion: 'supportive',
            translations: {
              en: {
                speakerName: 'Metro Marshal',
                dialogueText: '"Is there an issue, ma\'am? We heard a commotion inside."'
              },
              hi: {
                speakerName: 'मेट्रो मार्शल',
                dialogueText: '"कोई समस्या है बहनजी? हमने कोच में आवाज सुनी थी।"'
              }
            }
          }
        ],
        choices: [
          {
            id: 'm02_s02_c01',
            choiceOrder: 1,
            isCorrect: 1,
            safetyScoreDelta: 20,
            boundariesDelta: 15,
            supportDelta: 20,
            sfxEmotion: 'relief',
            nextSceneOrder: 3,
            translations: {
              en: {
                choiceText: 'Point out the individual to the Metro Marshal and report the specific coach number and physical harassment.',
                feedbackText: 'Excellent follow-through! Official reporting ensures CCTV review and protects other daily commuters.',
                educationalTip: 'Transit systems have CCTV surveillance. Reporting promptly allows station staff to detain repeat offenders.'
              },
              hi: {
                choiceText: 'मार्शल को उस व्यक्ति की ओर इशारा करें और कोच नंबर व छेड़छाड़ की घटना दर्ज कराएं।',
                feedbackText: 'बहुत बढ़िया! तुरंत शिकायत करने से सीसीटीवी फुटेज सुरक्षित होती है और अन्य महिलाओं की सुरक्षा सुनिश्चित होती है।',
                educationalTip: 'मेट्रो स्टेशनों पर सीसीटीवी कैमरे होते हैं। तुरंत सूचना देने से आदतन अपराधियों पर कार्रवाई होती है।'
              }
            }
          },
          {
            id: 'm02_s02_c02',
            choiceOrder: 2,
            isCorrect: 0,
            safetyScoreDelta: -5,
            boundariesDelta: -5,
            supportDelta: -5,
            sfxEmotion: 'afraid',
            nextSceneOrder: 2,
            translations: {
              en: {
                choiceText: 'Say "Nothing happened, just crowd rushing" and rush home in distress.',
                feedbackText: 'Dismissing the incident lets the perpetrator repeat the offense on the very next train.',
                educationalTip: 'You have the absolute right to a safe commute. Transit staff are stationed specifically to assist you.'
              },
              hi: {
                choiceText: 'कहें कि "कुछ नहीं हुआ, बस भीड़ थी" और घबराकर बाहर निकल जाएं।',
                feedbackText: 'मामले को टालने से वह व्यक्ति अगली ट्रेन में किसी अन्य महिला के साथ फिर यही करेगा।',
                educationalTip: 'आपको सुरक्षित यात्रा का पूरा अधिकार है। सुरक्षा कर्मी आपकी सहायता के लिए ही तैनात हैं।'
              }
            }
          }
        ]
      },
      {
        id: 'm02_s03',
        sceneOrder: 3,
        sceneType: 'outcome',
        characterCode: 'hero',
        backgroundKey: 'metro_station_concourse',
        musicCue: 'victory_theme',
        translations: {
          en: {
            title: 'Respect in Transit',
            environmentName: 'Well-Guarded Concourse',
            narrativeText: 'The security team detains the offender for questioning, verifying CCTV evidence. Other women commuters thank {playerName} for speaking up.',
            promptText: 'Mission Complete! You dismantled harassment and commanded respect.'
          },
          hi: {
            title: 'सफर में सम्मान',
            environmentName: 'सुरक्षित मेट्रो परिसर',
            narrativeText: 'सुरक्षा दल ने सीसीटीवी फुटेज देखकर उस व्यक्ति को हिरासत में ले लिया। साथी महिला यात्रियों ने {playerName} के साहस की सराहना की।',
            promptText: 'मिशन संपन्न! आपने चुप्पी तोड़कर छेड़छाड़ का डटकर मुकाबला किया।'
          }
        },
        dialogues: [
          {
            id: 'm02_s03_d01',
            dialogueOrder: 1,
            speakerType: 'hero',
            characterCode: 'hero',
            emotion: 'confident',
            translations: {
              en: {
                speakerName: '{playerName}',
                dialogueText: '"Never stay silent in the crowd. When you speak up with courage, the whole community stands with you."'
              },
              hi: {
                speakerName: '{playerName}',
                dialogueText: '"भीड़ में कभी चुप मत रहो। जब आप साहस से बोलती हैं, तो पूरा समाज आपके साथ खड़ा होता है।"'
              }
            }
          }
        ],
        choices: [
          {
            id: 'm02_s03_c01',
            choiceOrder: 1,
            isCorrect: 1,
            safetyScoreDelta: 10,
            boundariesDelta: 10,
            supportDelta: 10,
            sfxEmotion: 'victory',
            nextSceneOrder: 3,
            translations: {
              en: {
                choiceText: 'Finish quest and collect Transit Navigator badge.',
                feedbackText: 'Transit Navigator badge awarded!',
                educationalTip: 'Emergency contact for Delhi Metro is 155370 / CISF 24x7 control room; Indian Railways is 139.'
              },
              hi: {
                choiceText: 'मिशन पूरा करें और पारगमन दिशा-सूचक पदक प्राप्त करें।',
                feedbackText: 'पारगमन दिशा-सूचक पदक प्रदान किया गया!',
                educationalTip: 'मेट्रो हेल्पलाइन 155370 और भारतीय रेलवे हेल्पलाइन 139 चौबीसों घंटे सक्रिय रहती है।'
              }
            }
          }
        ]
      }
    ]
  },

  // -------------------------------------------------------------------------
  // M03: THE UNSAFE SHORTCUT
  // -------------------------------------------------------------------------
  {
    id: 'm03_the_unsafe_shortcut',
    slug: 'the-unsafe-shortcut',
    number: 3,
    category: 'street_safety',
    difficulty: 'Beginner',
    estimatedMinutes: 6,
    badgeName: 'ILLUMINATED PATH',
    badgeIcon: 'Sun',
    badgeDescription: 'Refused dangerous isolated shortcuts and secured populated havens.',
    translations: {
      en: {
        title: 'The Unsafe Shortcut',
        tagline: 'Tired and running late: save 15 minutes through a dark alley or take the lit main road?',
        summary: '{playerName} is walking home late after extra hours. An unlit shortcut through construction alleys tempts her, but gut instincts signal risk.',
        learningGoal: 'Prioritize environmental visibility over commute speed, recognize situational red flags, and locate 24/7 commercial safe points.'
      },
      hi: {
        title: 'असुरक्षित छोटा रास्ता',
        tagline: 'थकान और देर: अंधेरी गली से 15 मिनट बचाएं या मुख्य रोशन सड़क से जाएं?',
        summary: '{playerName} देर रात घर लौट रही है। एक निर्माणाधीन अंधेरा शॉर्टकट 15 मिनट बचा सकता है, लेकिन उसका अंतर्मन खतरे की घंटी बजा रहा है।',
        learningGoal: 'जल्दी पहुंचने से ज्यादा रास्ते की सुरक्षा और रोशनी को प्राथमिकता दें और 24 घंटे खुली दुकानों को पहचानें।'
      }
    },
    scenes: [
      {
        id: 'm03_s01',
        sceneOrder: 1,
        sceneType: 'decision',
        characterCode: 'hero',
        backgroundKey: 'street_fork_night',
        musicCue: 'ambient_suspense',
        translations: {
          en: {
            title: 'The Crossroads',
            environmentName: 'Fork in the Road',
            narrativeText: 'The road splits. To the left is an unlit dirt lane through abandoned construction lots (10 minutes). To the right is the broad avenue with streetlights, tea stalls, and moving autos (25 minutes).',
            promptText: 'Your phone battery is at 18% and you are exhausted. Which route do you choose?'
          },
          hi: {
            title: 'दोराहा',
            environmentName: 'सड़क का मोड़',
            narrativeText: 'रास्ता दो हिस्सों में बंटता है। बाईं ओर सुनसान निर्माणाधीन अंधेरी गली है (10 मिनट)। दाईं ओर स्ट्रीट लाइट, चाय की दुकानों और ऑटो रिक्शा वाली मुख्य सड़क है (25 मिनट)।',
            promptText: 'फोन की बैटरी 18% बची है और आप बहुत थकी हैं। आप कौन सा रास्ता चुनेंगी?'
          }
        },
        dialogues: [
          {
            id: 'm03_s01_d01',
            dialogueOrder: 1,
            speakerType: 'hero',
            characterCode: 'hero',
            emotion: 'thoughtful',
            translations: {
              en: {
                speakerName: '{playerName}',
                dialogueText: '',
                thoughtText: 'The shortcut is pitch black and has zero exit points if someone blocks the entrance.'
              },
              hi: {
                speakerName: '{playerName}',
                dialogueText: '',
                thoughtText: 'शॉर्टकट में घना अंधेरा है और अगर आगे कोई रास्ता रोक ले तो बाहर निकलने की कोई गुंजाइश नहीं होगी।'
              }
            }
          }
        ],
        choices: [
          {
            id: 'm03_s01_c01',
            choiceOrder: 1,
            isCorrect: 0,
            safetyScoreDelta: -25,
            boundariesDelta: -10,
            supportDelta: 0,
            sfxEmotion: 'shock',
            nextSceneOrder: 1,
            translations: {
              en: {
                choiceText: 'Take the dark construction alley to save time and get home faster.',
                feedbackText: 'Entering unlit, blind corridors with low phone battery drastically increases vulnerability to ambushes.',
                educationalTip: 'Saving 15 minutes is never worth gambling personal security in unlit, isolated choke-points.'
              },
              hi: {
                choiceText: 'जल्दी घर पहुंचने के लिए अंधेरे शॉर्टकट से निकलें।',
                feedbackText: 'कम बैटरी और बिना रोशनी वाले सुनसान रास्ते में जाना भारी जोखिम को न्योता देना है।',
                educationalTip: '15 मिनट बचाने के लिए अपनी सुरक्षा को कभी दांव पर न लगाएं।'
              }
            }
          },
          {
            id: 'm03_s01_c02',
            choiceOrder: 2,
            isCorrect: 1,
            safetyScoreDelta: 25,
            boundariesDelta: 15,
            supportDelta: 10,
            sfxEmotion: 'ping',
            nextSceneOrder: 2,
            translations: {
              en: {
                choiceText: 'Choose the illuminated main avenue with passing traffic, street lamps, and open businesses.',
                feedbackText: 'Wise decision! Ambient lighting and active traffic provide continuous passive surveillance.',
                educationalTip: 'Always choose the well-lit path with natural sightlines and populated business presence.'
              },
              hi: {
                choiceText: 'रोशनी, चलती गाड़ियों और खुली दुकानों वाली मुख्य सड़क का रास्ता चुनें।',
                feedbackText: 'सराहनीय निर्णय! रोशनी और वाहनों की आवाजाही आपको स्वाभाविक सुरक्षा कवच प्रदान करती है।',
                educationalTip: 'हमेशा रोशनी और लोगों की मौजूदगी वाली सड़क चुनें, चाहे थोड़ा समय ज्यादा लगे।'
              }
            }
          }
        ]
      },
      {
        id: 'm03_s02',
        sceneOrder: 2,
        sceneType: 'decision',
        characterCode: 'store_clerk',
        backgroundKey: 'market_street_night',
        musicCue: 'ambient_calm',
        translations: {
          en: {
            title: 'The Safe Transit Hub',
            environmentName: 'Main Road Auto Stand & Medical Store',
            narrativeText: 'Along the main avenue, {playerName} notices a 24-hour medical pharmacy and a registered pre-paid auto-rickshaw booth.',
            promptText: 'How do you finalize your commute home safely?'
          },
          hi: {
            title: 'सुरक्षित पड़ाव',
            environmentName: 'मुख्य सड़क ऑटो स्टैंड और मेडिकल स्टोर',
            narrativeText: 'मुख्य सड़क पर चलते हुए {playerName} को 24 घंटे खुला रहने वाला मेडिकल स्टोर और प्री-पेड ऑटो बूथ दिखाई देता है।',
            promptText: 'आप घर पहुंचने के लिए क्या कदम उठाएंगी?'
          }
        },
        dialogues: [
          {
            id: 'm03_s02_d01',
            dialogueOrder: 1,
            speakerType: 'hero',
            characterCode: 'hero',
            emotion: 'confident',
            translations: {
              en: {
                speakerName: '{playerName}',
                dialogueText: '',
                thoughtText: 'I can take an authorized auto with registration clearly displayed, and charge my phone slightly if needed.'
              },
              hi: {
                speakerName: '{playerName}',
                dialogueText: '',
                thoughtText: 'मैं नंबर प्लेट देखकर अधिकृत ऑटो ले सकती हूँ और घर तक सुरक्षित पहुंच सकती हूँ।'
              }
            }
          }
        ],
        choices: [
          {
            id: 'm03_s02_c01',
            choiceOrder: 1,
            isCorrect: 1,
            safetyScoreDelta: 20,
            boundariesDelta: 10,
            supportDelta: 15,
            sfxEmotion: 'relief',
            nextSceneOrder: 3,
            translations: {
              en: {
                choiceText: 'Hire an auto from the booth, take a quick photo of the vehicle license plate, and send it to your family.',
                feedbackText: 'Outstanding protocol! Documenting the vehicle license plate creates immediate traceability.',
                educationalTip: 'Always verify vehicle registration plates before boarding late-night transit.'
              },
              hi: {
                choiceText: 'बूथ से ऑटो लें, ऑटो के नंबर प्लेट की फोटो खींचकर तुरंत परिवार को भेजें।',
                feedbackText: 'शानदार आदत! गाड़ी का नंबर साझा करने से चालक भी अनुशासित रहता है और सुरक्षा सुनिश्चित होती है।',
                educationalTip: 'रात को किसी भी कैब या ऑटो में बैठने से पहले उसका नंबर अपनों से साझा करना न भूलें।'
              }
            }
          },
          {
            id: 'm03_s02_c02',
            choiceOrder: 2,
            isCorrect: 0,
            safetyScoreDelta: -10,
            boundariesDelta: 0,
            supportDelta: 0,
            sfxEmotion: 'shock',
            nextSceneOrder: 2,
            translations: {
              en: {
                choiceText: 'Accept an unregistered unmarked private car ride offering a free drop.',
                feedbackText: 'Boarding an unverified private car with strangers late at night is an extreme safety hazard.',
                educationalTip: 'Never accept unsolicited rides from private strangers, regardless of how friendly they appear.'
              },
              hi: {
                choiceText: 'किसी अज्ञात निजी कार वाले का मुफ्त लिफ्ट देने का प्रस्ताव स्वीकार कर लें।',
                feedbackText: 'रात के समय किसी अनजान व्यक्ति की निजी गाड़ी में बैठना बेहद खतरनाक हो सकता है।',
                educationalTip: 'अजनबी व्यक्तियों से कभी भी लिफ्ट न लें, हमेशा पंजीकृत सार्वजनिक साधन चुनें।'
              }
            }
          }
        ]
      },
      {
        id: 'm03_s03',
        sceneOrder: 3,
        sceneType: 'outcome',
        characterCode: 'hero',
        backgroundKey: 'home_doorstep_night',
        musicCue: 'victory_theme',
        translations: {
          en: {
            title: 'Home Safe and Sound',
            environmentName: 'Apartment Doorstep',
            narrativeText: '{playerName} reaches home securely. Her family confirms receipt of the license plate and live update. Foresight and discipline won the night.',
            promptText: 'Mission Complete! You chose the illuminated path.'
          },
          hi: {
            title: 'सकुशल घर आगमन',
            environmentName: 'घर की दहलीज',
            narrativeText: '{playerName} पूरी सुरक्षा के साथ अपने घर पहुंच गई है। परिवार को समय पर अपडेट मिल गया था। समझदारी और अनुशासन से रात सुरक्षित रही।',
            promptText: 'मिशन संपन्न! आपने सुरक्षित और प्रकाशित मार्ग चुना।'
          }
        },
        dialogues: [
          {
            id: 'm03_s03_d01',
            dialogueOrder: 1,
            speakerType: 'hero',
            characterCode: 'hero',
            emotion: 'victorious',
            translations: {
              en: {
                speakerName: '{playerName}',
                dialogueText: '"Time saved means nothing if safety is lost. The illuminated road will always be my choice."'
              },
              hi: {
                speakerName: '{playerName}',
                dialogueText: '"अगर जान ही जोखिम में हो तो बचाया गया समय व्यर्थ है। मैं हमेशा सुरक्षित और रोशन मार्ग ही चुनूँगी।"'
              }
            }
          }
        ],
        choices: [
          {
            id: 'm03_s03_c01',
            choiceOrder: 1,
            isCorrect: 1,
            safetyScoreDelta: 10,
            boundariesDelta: 10,
            supportDelta: 10,
            sfxEmotion: 'victory',
            nextSceneOrder: 3,
            translations: {
              en: {
                choiceText: 'Claim Illuminated Path badge.',
                feedbackText: 'Badge unlocked!',
                educationalTip: 'Remember: 112 is always functional even without cellular data.'
              },
              hi: {
                choiceText: 'प्रकाशित मार्ग पदक प्राप्त करें।',
                feedbackText: 'पदक अनलॉक हुआ!',
                educationalTip: 'याद रखें: 112 बिना डेटा और बिना बैलेंस के भी काम करता है।'
              }
            }
          }
        ]
      }
    ]
  },

  // -------------------------------------------------------------------------
  // M04: BEHIND THE SCREEN
  // -------------------------------------------------------------------------
  {
    id: 'm04_behind_the_screen',
    slug: 'behind-the-screen',
    number: 4,
    category: 'cyber_safety',
    difficulty: 'Intermediate',
    estimatedMinutes: 7,
    badgeName: 'DIGITAL SHIELD',
    badgeIcon: 'Lock',
    badgeDescription: 'Safeguarded digital forensic evidence and activated 1930 cyber protections.',
    translations: {
      en: {
        title: 'Behind the Screen',
        tagline: 'Anonymous DMs, manipulated pictures, and extortion threats: take back digital control.',
        summary: '{playerName} receives threatening DMs from an anonymous profile claiming to hold sensitive private photos and demanding money or intimacy.',
        learningGoal: 'Never pay or negotiate with extortionists, preserve forensic digital evidence, and file reports on cybercrime.gov.in / 1930.'
      },
      hi: {
        title: 'पर्दे के पीछे',
        tagline: 'अज्ञात मैसेज, फर्जी तस्वीरें और ब्लैकमेलिंग: अपने डिजिटल सम्मान की रक्षा करें।',
        summary: '{playerName} को एक अज्ञात सोशल मीडिया अकाउंट से धमकी भरे संदेश और निजी तस्वीरों को वायरल करने की ब्लैकमेलिंग प्राप्त होती है।',
        learningGoal: 'ब्लैकमेलर से कभी बातचीत या पैसे का सौदा न करें, डिजिटल साक्ष्य सुरक्षित रखें और 1930 / cybercrime.gov.in पर रिपोर्ट करें।'
      }
    },
    scenes: [
      {
        id: 'm04_s01',
        sceneOrder: 1,
        sceneType: 'decision',
        characterCode: 'hero',
        backgroundKey: 'bedroom_screen_glow',
        musicCue: 'ambient_suspense',
        translations: {
          en: {
            title: 'The Digital Threat',
            environmentName: 'Smartphone Inbox',
            narrativeText: 'Late at night, ping after ping flashes on {playerName}\'s phone. A burner account has sent morphed photos with a 24-hour ultimatum: "Transfer 50,000 INR or these go to your college group."',
            promptText: 'Your heart is racing. What is your critical first reaction?'
          },
          hi: {
            title: 'डिजिटल धमकी',
            environmentName: 'स्मार्टफोन इनबॉक्स',
            narrativeText: 'रात के अंधेरे में {playerName} के फोन पर धड़ाधड़ मैसेज आते हैं। एक फर्जी अकाउंट से एडिट की हुई तस्वीरें भेजकर 50,000 रुपये न देने पर वायरल करने की धमकी दी जा रही है।',
            promptText: 'आपकी धड़कनें तेज हैं। आपका सबसे पहला कदम क्या होगा?'
          }
        },
        dialogues: [
          {
            id: 'm04_s01_d01',
            dialogueOrder: 1,
            speakerType: 'stranger',
            characterCode: 'stranger_bus',
            emotion: 'threatening',
            translations: {
              en: {
                speakerName: 'Blackmailer DM',
                dialogueText: '"Pay up right now or your reputation is destroyed by sunrise. Don\'t dare tell anyone."'
              },
              hi: {
                speakerName: 'ब्लैकमेलर मैसेज',
                dialogueText: '"सुबह होने से पहले पैसे भेजो वरना यह तस्वीरें तुम्हारे कॉलेज के ग्रुप में होंगी। किसी को बताने की हिम्मत मत करना।"'
              }
            }
          }
        ],
        choices: [
          {
            id: 'm04_s01_c01',
            choiceOrder: 1,
            isCorrect: 0,
            safetyScoreDelta: -20,
            boundariesDelta: -20,
            supportDelta: 0,
            sfxEmotion: 'afraid',
            nextSceneOrder: 1,
            translations: {
              en: {
                choiceText: 'Beg for mercy and transfer a small token amount to buy time.',
                feedbackText: 'Paying money confirms you can be exploited. Cyber extortionists will demand larger sums repeatedly.',
                educationalTip: 'Never send money to an extortionist. Payment always escalates blackmail demands.'
              },
              hi: {
                choiceText: 'हाथ-पैर जोड़ें और समय मांगने के लिए थोड़े पैसे ट्रांसफर कर दें।',
                feedbackText: 'पैसे देने से ब्लैकमेलर को यकीन हो जाता है कि आप डर गई हैं, वह बार-बार और ज्यादा पैसे मांगेगा।',
                educationalTip: 'ब्लैकमेल करने वाले को कभी भी एक रुपया भी न दें। भुगतान करने से मांगें बढ़ती हैं।'
              }
            }
          },
          {
            id: 'm04_s01_c02',
            choiceOrder: 2,
            isCorrect: 0,
            safetyScoreDelta: -10,
            boundariesDelta: 0,
            supportDelta: -10,
            sfxEmotion: 'shock',
            nextSceneOrder: 1,
            translations: {
              en: {
                choiceText: 'Delete your social account immediately and wipe the chat without saving anything.',
                feedbackText: 'Deleting the account destroys forensic digital evidence (sender ID, IP records, timestamps) needed by police.',
                educationalTip: 'Do not delete chats immediately. Forensic screenshots and URLs are essential evidence.'
              },
              hi: {
                choiceText: 'घबराकर तुरंत अपना अकाउंट डिलीट कर दें और सारा चैट मिटा दें।',
                feedbackText: 'चैट मिटाने से पुलिस जांच के लिए जरूरी डिजिटल सबूत (यूआरएल, टाइमस्टैम्प, प्रोफाइल आईडी) नष्ट हो जाते हैं।',
                educationalTip: 'तुरंत चैट डिलीट न करें। कानूनी कार्रवाई के लिए स्क्रीनशॉट और लिंक संभाल कर रखना जरूरी है।'
              }
            }
          },
          {
            id: 'm04_s01_c03',
            choiceOrder: 3,
            isCorrect: 1,
            safetyScoreDelta: 25,
            boundariesDelta: 20,
            supportDelta: 15,
            sfxEmotion: 'ping',
            nextSceneOrder: 2,
            translations: {
              en: {
                choiceText: 'Take full uncropped screenshots capturing profile URL, timestamps, and payment handles; do not reply.',
                feedbackText: 'Masterful! Preserving digital evidence without engaging denies the extortionist psychological leverage.',
                educationalTip: 'Document everything: profile handles, message links, timestamps, and phone numbers before blocking.'
              },
              hi: {
                choiceText: 'प्रोफाइल यूआरएल, समय और यूपीआई हैंडल के पूरे स्क्रीनशॉट लें, और कोई जवाब न दें।',
                feedbackText: 'शानदार! जवाब न देकर साक्ष्य सुरक्षित करना ब्लैकमेलर के मनोवैज्ञानिक दबाव को तोड़ देता है।',
                educationalTip: 'ब्लॉक करने से पहले प्रोफाइल आईडी, लिंक और मैसेज के स्पष्ट स्क्रीनशॉट जरूर सुरक्षित रखें।'
              }
            }
          }
        ]
      },
      {
        id: 'm04_s02',
        sceneOrder: 2,
        sceneType: 'decision',
        characterCode: 'priya_ally',
        backgroundKey: 'daylight_desk',
        musicCue: 'ambient_calm',
        translations: {
          en: {
            title: 'Mobilizing Legal Defense',
            environmentName: 'Cyber Crime Reporting Desk',
            narrativeText: 'The next morning, {playerName} confides in Priya, who is supportive. Together, they prepare to escalate to official authorities.',
            promptText: 'What is the most effective legal channel to report cyber extortion in India?'
          },
          hi: {
            title: 'कानूनी कार्रवाई',
            environmentName: 'साइबर अपराध सहायता पटल',
            narrativeText: 'अगली सुबह, {playerName} अपनी सहेली प्रिया से बात करती है। प्रिया पूरा साथ देती है और दोनों आधिकारिक स्तर पर शिकायत दर्ज करने की तैयारी करती हैं।',
            promptText: 'भारत में साइबर ब्लैकमेलिंग की शिकायत दर्ज करने का सबसे प्रभावी मंच कौन सा है?'
          }
        },
        dialogues: [
          {
            id: 'm04_s02_d01',
            dialogueOrder: 1,
            speakerType: 'ally',
            characterCode: 'priya_ally',
            emotion: 'supportive',
            translations: {
              en: {
                speakerName: 'Priya',
                dialogueText: '"You did nothing wrong, {playerName}. Morphed media is an IT Act violation. We have the screenshots; let\'s report it formally."'
              },
              hi: {
                speakerName: 'प्रिया',
                dialogueText: '"तुम्हारी कोई गलती नहीं है {playerName}। तस्वीरों से छेड़छाड़ आईटी एक्ट के तहत गंभीर अपराध है। हमारे पास सबूत हैं, चलो शिकायत दर्ज करें।"'
              }
            }
          }
        ],
        choices: [
          {
            id: 'm04_s02_c01',
            choiceOrder: 1,
            isCorrect: 1,
            safetyScoreDelta: 25,
            boundariesDelta: 15,
            supportDelta: 20,
            sfxEmotion: 'relief',
            nextSceneOrder: 3,
            translations: {
              en: {
                choiceText: 'Dial 1930 helpline and log an incident on the National Cyber Crime Reporting Portal (cybercrime.gov.in) under "Women Related Crime".',
                feedbackText: 'Brilliant! The 1930 national helpline coordinates directly with police cyber cells and financial intelligence units.',
                educationalTip: 'Sections 66E, 67, and 67A of the Information Technology Act carry strict penalties for non-consensual imagery.'
              },
              hi: {
                choiceText: 'हेल्पलाइन 1930 पर कॉल करें और cybercrime.gov.in पर "महिला संबंधी अपराध" श्रेणी में ऑनलाइन शिकायत दर्ज करें।',
                feedbackText: 'अति उत्तम! 1930 हेल्पलाइन सीधे पुलिस साइबर सेल और संबंधित सोशल मीडिया प्लेटफॉर्म से संपर्क कर त्वरित कार्रवाई करती है।',
                educationalTip: 'आईटी अधिनियम की धारा 66E, 67 और 67A के तहत अश्लील सामग्री और ब्लैकमेलिंग पर कठोर सजा का प्रावधान है।'
              }
            }
          },
          {
            id: 'm04_s02_c02',
            choiceOrder: 2,
            isCorrect: 0,
            safetyScoreDelta: -10,
            boundariesDelta: -5,
            supportDelta: 0,
            sfxEmotion: 'shock',
            nextSceneOrder: 2,
            translations: {
              en: {
                choiceText: 'Engage a random hacker found on an internet forum claiming they can delete the offender\'s server.',
                feedbackText: 'Online "recovery hackers" are almost universally secondary scammers looking to steal further funds.',
                educationalTip: 'Only trust government cyber portals and law enforcement; private online "hackers" are fraud scams.'
              },
              hi: {
                choiceText: 'इंटरनेट फोरम पर दावा करने वाले किसी अज्ञात "हैकर" को पैसे देकर मदद मांगें।',
                feedbackText: 'इंटरनेट पर मदद का दावा करने वाले निजी हैकर अक्सर ठग होते हैं जो आपसे और पैसे ऐंठ लेंगे।',
                educationalTip: 'केवल आधिकारिक सरकारी साइबर सेल पर भरोसा करें; इंटरनेट के फर्जी हैकर्स से दूर रहें।'
              }
            }
          }
        ]
      },
      {
        id: 'm04_s03',
        sceneOrder: 3,
        sceneType: 'outcome',
        characterCode: 'hero',
        backgroundKey: 'cyber_cell_office',
        musicCue: 'victory_theme',
        translations: {
          en: {
            title: 'Sovereignty Reclaimed',
            environmentName: 'Cyber Investigation Bureau',
            narrativeText: 'The cyber cell issues a takedown notice to the platform and traces the burner IP address. The extortionist\'s accounts are frozen.',
            promptText: 'Mission Complete! You weaponized legal and technical systems against extortion.'
          },
          hi: {
            title: 'डिजिटल संप्रभुता',
            environmentName: 'साइबर अपराध अन्वेषण कक्ष',
            narrativeText: 'साइबर सेल ने संबंधित सोशल मीडिया मंच को नोटिस भेजकर तस्वीरें हटवाईं और आईपी एड्रेस के आधार पर आरोपी की पहचान कर ली।',
            promptText: 'मिशन संपन्न! आपने कानूनी और तकनीकी साधनों से ब्लैकमेलिंग को मात दी।'
          }
        },
        dialogues: [
          {
            id: 'm04_s03_d01',
            dialogueOrder: 1,
            speakerType: 'hero',
            characterCode: 'hero',
            emotion: 'triumphant',
            translations: {
              en: {
                speakerName: '{playerName}',
                dialogueText: '"Blackmail survives only in shadows and shame. When met with evidence and law, it shatters."'
              },
              hi: {
                speakerName: '{playerName}',
                dialogueText: '"ब्लैकमेलिंग सिर्फ शर्म और डर के साए में पलती है। सबूत और कानून के आगे यह टिक नहीं सकती।"'
              }
            }
          }
        ],
        choices: [
          {
            id: 'm04_s03_c01',
            choiceOrder: 1,
            isCorrect: 1,
            safetyScoreDelta: 10,
            boundariesDelta: 10,
            supportDelta: 10,
            sfxEmotion: 'victory',
            nextSceneOrder: 3,
            translations: {
              en: {
                choiceText: 'Collect Digital Shield achievement.',
                feedbackText: 'Digital Shield unlocked!',
                educationalTip: 'Always use 2-Factor Authentication (2FA) via authenticator apps on all digital accounts.'
              },
              hi: {
                choiceText: 'साइबर रक्षक पदक प्राप्त करें।',
                feedbackText: 'साइबर रक्षक पदक अनलॉक हुआ!',
                educationalTip: 'अपने सभी सोशल मीडिया अकाउंट्स पर हमेशा टू-फैक्टर ऑथेंटिकेशन (2FA) ऑन रखें।'
              }
            }
          }
        ]
      }
    ]
  },

  // -------------------------------------------------------------------------
  // M05: THE WORKPLACE BOUNDARY
  // -------------------------------------------------------------------------
  {
    id: 'm05_the_workplace_boundary',
    slug: 'the-workplace-boundary',
    number: 5,
    category: 'workplace_safety',
    difficulty: 'Intermediate',
    estimatedMinutes: 7,
    badgeName: 'BOUNDARY BUILDER',
    badgeIcon: 'Briefcase',
    badgeDescription: 'Asserted unequivocal workplace boundaries under the POSH Act 2013.',
    translations: {
      en: {
        title: 'The Workplace Boundary',
        tagline: 'Quid pro quo suggestions and late-night personal messages from senior leadership.',
        summary: '{playerName}\'s manager ties career appraisals to dinner dates and sends late-night romantic messages under the guise of mentorship.',
        learningGoal: 'Identify workplace sexual harassment under the POSH Act 2013, document incidents contemporaneously, and approach the Internal Committee (IC).'
      },
      hi: {
        title: 'कार्यस्थल की मर्यादा',
        tagline: 'प्रमोशन के नाम पर अनचाही शर्तें और देर रात व्यक्तिगत मैसेज: कार्यस्थल पर सम्मान की रक्षा।',
        summary: '{playerName} का सीनियर मैनेजर प्रमोशन और प्रोजेक्ट देने के बदले डिनर पर चलने का दबाव बनाता है और देर रात गैर-जरूरी मैसेज भेजता है।',
        learningGoal: 'पॉश अधिनियम 2013 के तहत कार्यस्थल पर यौन उत्पीड़न की पहचान करें, लिखित साक्ष्य रखें और आंतरिक शिकायत समिति (ICC) में रिपोर्ट करें।'
      }
    },
    scenes: [
      {
        id: 'm05_s01',
        sceneOrder: 1,
        sceneType: 'decision',
        characterCode: 'vikram_manager',
        backgroundKey: 'office_conference_room',
        musicCue: 'ambient_suspense',
        translations: {
          en: {
            title: 'The Appraisal Talk',
            environmentName: 'Private Conference Room',
            narrativeText: 'Manager Vikram closes the glass door. During {playerName}\'s performance review, he hints: "You know I hold the keys to your promotion. If you are a little more warm to me outside the office, things could move very fast."',
            promptText: 'Your manager is proposing quid pro quo harassment. What is your response?'
          },
          hi: {
            title: 'समीक्षा बैठक',
            environmentName: 'कॉन्फ्रेंस रूम',
            narrativeText: 'मैनेजर विक्रम दरवाजा बंद कर देता है। परफॉर्मेंस रिव्यू के दौरान वह कहता है: "तुम जानती हो कि तुम्हारा प्रमोशन मेरे हाथ में है। अगर तुम ऑफिस के बाहर मुझसे थोड़ा घुलो-मिलो, तो तुम्हारा करियर बहुत तेजी से आगे बढ़ेगा।"',
            promptText: 'मैनेजर अप्रत्यक्ष रूप से अनैतिक शर्त रख रहा है। आपकी क्या प्रतिक्रिया होगी?'
          }
        },
        dialogues: [
          {
            id: 'm05_s01_d01',
            dialogueOrder: 1,
            speakerType: 'npc',
            characterCode: 'vikram_manager',
            emotion: 'condescending',
            translations: {
              en: {
                speakerName: 'Vikram',
                dialogueText: '"Let\'s discuss your appraisal over wine tonight at my place. Just the two of us."'
              },
              hi: {
                speakerName: 'विक्रम',
                dialogueText: '"आज रात मेरे घर पर वाइन के साथ तुम्हारी अप्रेजल पर बात करते हैं। सिर्फ हम दोनों।"'
              }
            }
          }
        ],
        choices: [
          {
            id: 'm05_s01_c01',
            choiceOrder: 1,
            isCorrect: 0,
            safetyScoreDelta: -15,
            boundariesDelta: -15,
            supportDelta: 0,
            sfxEmotion: 'afraid',
            nextSceneOrder: 1,
            translations: {
              en: {
                choiceText: 'Laugh nervously and say "Maybe some other time", avoiding direct conflict.',
                feedbackText: 'Vague brush-offs are frequently treated as coy encouragement by persistent corporate harassers.',
                educationalTip: 'Never leave ambiguity when dealing with inappropriate professional conduct.'
              },
              hi: {
                choiceText: 'झेंपते हुए हंसें और कहें "शायद फिर कभी", और बात टालने की कोशिश करें।',
                feedbackText: 'अस्पष्ट जवाब देने से सामने वाला समझता है कि आप भविष्य में मान सकती हैं।',
                educationalTip: 'कार्यस्थल पर अनुचित व्यवहार पर कभी भी अस्पष्ट या गोलमोल प्रतिक्रिया न दें।'
              }
            }
          },
          {
            id: 'm05_s01_c02',
            choiceOrder: 2,
            isCorrect: 1,
            safetyScoreDelta: 20,
            boundariesDelta: 25,
            supportDelta: 10,
            sfxEmotion: 'ping',
            nextSceneOrder: 2,
            translations: {
              en: {
                choiceText: 'State calmly and clearly: "My appraisal must be based strictly on work metrics. I keep all professional reviews during office hours in official meeting spaces."',
                feedbackText: 'Flawless boundary definition! Framing the boundary professionally establishes an unassailable record.',
                educationalTip: 'Set firm professional guardrails in clear, unambiguous language.'
              },
              hi: {
                choiceText: 'शांत और स्पष्ट शब्दों में कहें: "मेरी समीक्षा केवल मेरे काम के आधार पर होनी चाहिए। मैं सभी मीटिंग्स ऑफिस समय में और आधिकारिक जगह पर ही करती हूँ।"',
                feedbackText: 'उत्कृष्ट! बिना झिझके पेशेवर मर्यादा तय करना सामने वाले के मंसूबों पर पानी फेर देता है।',
                educationalTip: 'हमेशा स्पष्ट और मर्यादित भाषा में काम और निजी जीवन की सीमा रेखा खींचें।'
              }
            }
          }
        ]
      },
      {
        id: 'm05_s02',
        sceneOrder: 2,
        sceneType: 'decision',
        characterCode: 'priya_ally',
        backgroundKey: 'office_cafeteria',
        musicCue: 'ambient_calm',
        translations: {
          en: {
            title: 'Documentation and POSH Protocol',
            environmentName: 'Office Workspace',
            narrativeText: 'Despite your rejection, Vikram continues sending late-night WhatsApp texts and subtle threats about removing you from the flagship project.',
            promptText: 'What is the correct protocol under India\'s POSH Act 2013?'
          },
          hi: {
            title: 'पॉश अधिनियम और दस्तावेजीकरण',
            environmentName: 'कार्यालय',
            narrativeText: 'मना करने के बावजूद विक्रम देर रात गैर-जरूरी मैसेज भेजना जारी रखता है और प्रोजेक्ट से हटाने की अप्रत्यक्ष धमकी देता है।',
            promptText: 'पॉश अधिनियम 2013 के तहत सही कदम क्या होगा?'
          }
        },
        dialogues: [
          {
            id: 'm05_s02_d01',
            dialogueOrder: 1,
            speakerType: 'hero',
            characterCode: 'hero',
            emotion: 'determined',
            translations: {
              en: {
                speakerName: '{playerName}',
                dialogueText: '',
                thoughtText: 'I need to create a contemporaneous incident log with exact dates, times, and screenshots.'
              },
              hi: {
                speakerName: '{playerName}',
                dialogueText: '',
                thoughtText: 'मुझे तारीख, समय और स्क्रीनशॉट के साथ एक विस्तृत घटना डायरी तैयार करनी होगी।'
              }
            }
          }
        ],
        choices: [
          {
            id: 'm05_s02_c01',
            choiceOrder: 1,
            isCorrect: 1,
            safetyScoreDelta: 25,
            boundariesDelta: 20,
            supportDelta: 25,
            sfxEmotion: 'relief',
            nextSceneOrder: 3,
            translations: {
              en: {
                choiceText: 'Compile the timestamped messages and submit a formal written complaint to the company\'s Internal Committee (IC) with a copy to the Presiding Officer.',
                feedbackText: 'The legal gold standard! Under the POSH Act 2013, the Internal Committee must maintain confidentiality and investigate within 90 days.',
                educationalTip: 'Every workplace with 10+ employees must have an Internal Committee (IC) headed by a senior woman.'
              },
              hi: {
                choiceText: 'तारीखों और स्क्रीनशॉट के साथ कंपनी की आंतरिक शिकायत समिति (IC) को औपचारिक लिखित शिकायत दर्ज कराएं।',
                feedbackText: 'कानूनी रूप से सबसे सही कदम! पॉश एक्ट के तहत आंतरिक समिति को 90 दिनों के भीतर निष्पक्ष जांच पूरी करनी होती है।',
                educationalTip: '10 से अधिक कर्मचारियों वाले हर संस्थान में महिला की अध्यक्षता वाली आंतरिक समिति होना अनिवार्य है।'
              }
            }
          },
          {
            id: 'm05_s02_c02',
            choiceOrder: 2,
            isCorrect: 0,
            safetyScoreDelta: -15,
            boundariesDelta: -10,
            supportDelta: -10,
            sfxEmotion: 'shock',
            nextSceneOrder: 2,
            translations: {
              en: {
                choiceText: 'Resign immediately without reporting to avoid any office awkwardness.',
                feedbackText: 'Quitting penalizes the victim while the harasser remains free to target future colleagues.',
                educationalTip: 'The law protects you against retaliation. You do not have to forfeit your career.'
              },
              hi: {
                choiceText: 'बिना कोई शिकायत किए चुपचाप नौकरी छोड़ दें ताकि कोई तमाशा न हो।',
                feedbackText: 'नौकरी छोड़ना खुद को सजा देना है, जबकि गलत करने वाला बिना किसी डर के दूसरों को निशाना बनाएगा।',
                educationalTip: 'कानून आपको किसी भी बदले की भावना वाली कार्रवाई से सुरक्षा प्रदान करता है।'
              }
            }
          }
        ]
      },
      {
        id: 'm05_s03',
        sceneOrder: 3,
        sceneType: 'outcome',
        characterCode: 'hero',
        backgroundKey: 'office_sunny_atrium',
        musicCue: 'victory_theme',
        translations: {
          en: {
            title: 'Dignity at Work',
            environmentName: 'Company Atrium',
            narrativeText: 'The Internal Committee investigates your documented complaint. Vikram receives disciplinary action, and your project leadership is preserved under independent oversight.',
            promptText: 'Mission Complete! You defended your professional dignity and set an example.'
          },
          hi: {
            title: 'सम्मानजनक कार्यस्थल',
            environmentName: 'कार्यालय परिसर',
            narrativeText: 'आंतरिक समिति ने आपके पुख्ता सबूतों के आधार पर जांच पूरी की। विक्रम पर अनुशासनात्मक कार्रवाई हुई और आपका प्रोजेक्ट नेतृत्व सुरक्षित रहा।',
            promptText: 'मिशन संपन्न! आपने अपने स्वाभिमान और करियर की रक्षा की।'
          }
        },
        dialogues: [
          {
            id: 'm05_s03_d01',
            dialogueOrder: 1,
            speakerType: 'hero',
            characterCode: 'hero',
            emotion: 'confident',
            translations: {
              en: {
                speakerName: '{playerName}',
                dialogueText: '"No one has the right to compromise your career for inappropriate demands. The law stands firmly with us."'
              },
              hi: {
                speakerName: '{playerName}',
                dialogueText: '"किसी को भी आपके करियर को अनुचित शर्तों पर तौलने का अधिकार नहीं है। कानून हमारे साथ है।"'
              }
            }
          }
        ],
        choices: [
          {
            id: 'm05_s03_c01',
            choiceOrder: 1,
            isCorrect: 1,
            safetyScoreDelta: 10,
            boundariesDelta: 10,
            supportDelta: 10,
            sfxEmotion: 'victory',
            nextSceneOrder: 3,
            translations: {
              en: {
                choiceText: 'Unlock Boundary Builder badge.',
                feedbackText: 'Boundary Builder unlocked!',
                educationalTip: 'The Ministry of Women & Child Development provides the SHe-Box portal for direct central complaints.'
              },
              hi: {
                choiceText: 'मर्यादा संरक्षक पदक प्राप्त करें।',
                feedbackText: 'मर्यादा संरक्षक पदक अनलॉक हुआ!',
                educationalTip: 'महिला एवं बाल विकास मंत्रालय का SHe-Box पोर्टल कार्यस्थल पर उत्पीड़न की ऑनलाइन शिकायत के लिए उपलब्ध है।'
              }
            }
          }
        ]
      }
    ]
  },

  // -------------------------------------------------------------------------
  // M06: LOVE OR CONTROL
  // -------------------------------------------------------------------------
  {
    id: 'm06_love_or_control',
    slug: 'love-or-control',
    number: 6,
    category: 'relational_safety',
    difficulty: 'Intermediate',
    estimatedMinutes: 7,
    badgeName: 'SOVEREIGN HEART',
    badgeIcon: 'Heart',
    badgeDescription: 'Spotted coercive control red flags and prioritized emotional autonomy.',
    translations: {
      en: {
        title: 'Love or Control',
        tagline: 'Disguised as caring concern: password demands, monitoring clothes, and cutting off friends.',
        summary: '{playerName}\'s partner Rohit exhibits escalating coercive control under the claim of "protective love".',
        learningGoal: 'Differentiate protective care from coercive control, maintain outside social networks, and resist emotional isolation.'
      },
      hi: {
        title: 'प्यार या नियंत्रण',
        tagline: 'फिक्र के नाम पर पाबंदियां: पासवर्ड मांगना, कपड़ों पर टोकना और दोस्तों से काटना।',
        summary: '{playerName} का साथी रोहित "प्यार और परवाह" का हवाला देकर धीरे-धीरे उसकी हर गतिविधि पर पाबंदी लगाने लगता है।',
        learningGoal: 'सच्चे प्यार और नियंत्रणकारी व्यवहार के फर्क को समझें, दोस्तों से संपर्क न तोड़ें और आत्मसम्मान बनाए रखें।'
      }
    },
    scenes: [
      {
        id: 'm06_s01',
        sceneOrder: 1,
        sceneType: 'decision',
        characterCode: 'rohit_partner',
        backgroundKey: 'cafe_corner_sunset',
        musicCue: 'ambient_suspense',
        translations: {
          en: {
            title: 'The Demand for "Transparency"',
            environmentName: 'Cafe Corner Table',
            narrativeText: 'Rohit holds his hand out across the table. "If you really love me and have nothing to hide, give me your phone passcode and remove all your male college friends from Instagram right now."',
            promptText: 'Your partner is demanding total digital surveillance. How do you respond?'
          },
          hi: {
            title: 'पारदर्शिता का झूठा दावा',
            environmentName: 'कैफे की टेबल',
            narrativeText: 'रोहित टेबल पर हाथ आगे बढ़ाकर कहता है: "अगर तुम सच में मुझसे प्यार करती हो, तो अपना फोन अनलॉक करके मुझे दो और अपने सभी पुराने दोस्तों को अनफॉलो करो।"',
            promptText: 'आपका साथी फोन की जासूसी और दोस्तों को छोड़ने की मांग कर रहा है। आपका क्या रुख होगा?'
          }
        },
        dialogues: [
          {
            id: 'm06_s01_d01',
            dialogueOrder: 1,
            speakerType: 'npc',
            characterCode: 'rohit_partner',
            emotion: 'manipulative',
            translations: {
              en: {
                speakerName: 'Rohit',
                dialogueText: '"Couples who trust each other share everything. Unless you\'re hiding something from me?"'
              },
              hi: {
                speakerName: 'रोहित',
                dialogueText: '"जो एक दूसरे से प्यार करते हैं वो कुछ नहीं छिपाते। या फिर तुम मुझसे कुछ छिपा रही हो?"'
              }
            }
          }
        ],
        choices: [
          {
            id: 'm06_s01_c01',
            choiceOrder: 1,
            isCorrect: 0,
            safetyScoreDelta: -20,
            boundariesDelta: -25,
            supportDelta: -15,
            sfxEmotion: 'afraid',
            nextSceneOrder: 1,
            translations: {
              en: {
                choiceText: 'Hand over your passcode and delete your friends to prove your devotion.',
                feedbackText: 'Surrendering your digital privacy and cutting off friends isolates you and fuels greater control.',
                educationalTip: 'Isolation from personal support circles is the primary tactic of coercive control.'
              },
              hi: {
                choiceText: 'अपना पासवर्ड दे दें और अपनी निष्ठा साबित करने के लिए दोस्तों को हटा दें।',
                feedbackText: 'अपनी निजता सौंपना और दोस्तों से नाता तोड़ना आपको अकेला कर देता है, जिससे नियंत्रण बढ़ता है।',
                educationalTip: 'अपनों से दूर करना और जासूसी करना प्यार नहीं, बल्कि मानसिक नियंत्रण का तरीका है।'
              }
            }
          },
          {
            id: 'm06_s01_c02',
            choiceOrder: 2,
            isCorrect: 1,
            safetyScoreDelta: 25,
            boundariesDelta: 25,
            supportDelta: 15,
            sfxEmotion: 'ping',
            nextSceneOrder: 2,
            translations: {
              en: {
                choiceText: 'Hold your ground calmly: "Trust is built on mutual respect, not surveillance. I value my privacy and my friendships, and healthy love respects boundaries."',
                feedbackText: 'Clear, grounded boundary assertion! True trust does not require policing private conversations.',
                educationalTip: 'Healthy relationships are built on interdependence and mutual respect, not ownership.'
              },
              hi: {
                choiceText: 'शांति से स्पष्ट कहें: "भरोसा सम्मान से बनता है, जासूसी से नहीं। मेरी निजता और मेरे दोस्त मेरे जीवन का हिस्सा हैं।"',
                feedbackText: 'शानदार दृष्टिकोण! सच्चा प्रेम कभी भी दूसरे की स्वतंत्रता और स्वाभिमान का गला नहीं घोंटता।',
                educationalTip: 'स्वस्थ रिश्तों में दोनों साथी एक दूसरे की व्यक्तिगत सीमाओं का आदर करते हैं।'
              }
            }
          }
        ]
      },
      {
        id: 'm06_s02',
        sceneOrder: 2,
        sceneType: 'decision',
        characterCode: 'friend_neha',
        backgroundKey: 'park_bench_day',
        musicCue: 'ambient_calm',
        translations: {
          en: {
            title: 'The Trusted Reflection',
            environmentName: 'Quiet Park Bench',
            narrativeText: 'Rohit gives the silent treatment and threatens self-harm if you don\'t comply. Feeling rattled, you meet your trusted childhood friend Neha.',
            promptText: 'How do you handle emotional blackmail and threats of self-harm?'
          },
          hi: {
            title: 'सच्चा संबल',
            environmentName: 'पार्क की शांत बेंच',
            narrativeText: 'रोहित बात करना बंद कर देता है और धमकी देता है कि अगर उसकी बात नहीं मानी तो वह खुद को नुकसान पहुंचा लेगा। परेशान होकर आप अपनी दोस्त नेहा से मिलती हैं।',
            promptText: 'भावनात्मक ब्लैकमेल और खुद को चोट पहुंचाने की धमकी से कैसे निपटें?'
          }
        },
        dialogues: [
          {
            id: 'm06_s02_d01',
            dialogueOrder: 1,
            speakerType: 'ally',
            characterCode: 'friend_neha',
            emotion: 'supportive',
            translations: {
              en: {
                speakerName: 'Neha',
                dialogueText: '"Threatening self-harm to force you to obey is a classic manipulation technique. You are not responsible for his choices."'
              },
              hi: {
                speakerName: 'नेहा',
                dialogueText: '"अपनी बात मनवाने के लिए खुद को नुकसान पहुंचाने की धमकी देना सबसे बड़ा भावनात्मक जाल है। तुम उसकी जिम्मेदार नहीं हो।"'
              }
            }
          }
        ],
        choices: [
          {
            id: 'm06_s02_c01',
            choiceOrder: 1,
            isCorrect: 1,
            safetyScoreDelta: 25,
            boundariesDelta: 20,
            supportDelta: 25,
            sfxEmotion: 'relief',
            nextSceneOrder: 3,
            translations: {
              en: {
                choiceText: 'Inform his family/counselor of his self-harm statements for medical safety, while refusing to compromise your boundaries or stay in an abusive dynamic.',
                feedbackText: 'The mature, safe course of action! Passing crisis threats to professional/family support detaches you from manipulative guilt.',
                educationalTip: 'Never allow self-harm threats to hostage your boundaries. Involve his guardians or emergency counselors.'
              },
              hi: {
                choiceText: 'उसकी धमकी की सूचना उसके परिवार या काउंसलर को दें, लेकिन ब्लैकमेल के दबाव में आकर अपनी सीमाएं न तोड़ें।',
                feedbackText: 'सर्वोत्तम और परिपक्व निर्णय! उसके परिवार को सचेत कर आप खुद को भावनात्मक शोषण से बचाती हैं।',
                educationalTip: 'खुद को चोट पहुंचाने की धमकी के आगे कभी न झुकें; इसकी सूचना परिवार या हेल्पलाइन को दें।'
              }
            }
          },
          {
            id: 'm06_s02_c02',
            choiceOrder: 2,
            isCorrect: 0,
            safetyScoreDelta: -15,
            boundariesDelta: -20,
            supportDelta: -10,
            sfxEmotion: 'shock',
            nextSceneOrder: 2,
            translations: {
              en: {
                choiceText: 'Rush back immediately and promise to do anything he wants out of guilt.',
                feedbackText: 'Succumbing to self-harm blackmail reinforces the manipulation cycle and deepens entrapment.',
                educationalTip: 'Rewarding manipulative tactics ensures they will be repeated with greater intensity.'
              },
              hi: {
                choiceText: 'डर और अपराधबोध में आकर वापस जाएं और उसकी हर शर्त मानने का वादा करें।',
                feedbackText: 'धमकी के आगे झुकने से सामने वाले को पता चल जाता है कि यह तरीका हमेशा काम करेगा।',
                educationalTip: 'भावनात्मक शोषण के आगे झुकना समस्या को और ज्यादा गहरा कर देता है।'
              }
            }
          }
        ]
      },
      {
        id: 'm06_s03',
        sceneOrder: 3,
        sceneType: 'outcome',
        characterCode: 'hero',
        backgroundKey: 'balcony_sunrise',
        musicCue: 'victory_theme',
        translations: {
          en: {
            title: 'Sovereign and Unbroken',
            environmentName: 'Morning Balcony',
            narrativeText: '{playerName} steps onto the balcony with a clear heart. True love elevates your wings; it never clips them.',
            promptText: 'Mission Complete! You identified emotional control and reclaimed your peace.'
          },
          hi: {
            title: 'स्वाभिमान की सुबह',
            environmentName: 'बालकनी की सुबह',
            narrativeText: '{playerName} खुले आसमान के नीचे गहरी सांस लेती है। सच्चा प्यार पंख देता है, उन्हें कतरता नहीं।',
            promptText: 'मिशन संपन्न! आपने नियंत्रण के जाल को तोड़कर अपनी स्वतंत्रता चुनी।'
          }
        },
        dialogues: [
          {
            id: 'm06_s03_d01',
            dialogueOrder: 1,
            speakerType: 'hero',
            characterCode: 'hero',
            emotion: 'peaceful',
            translations: {
              en: {
                speakerName: '{playerName}',
                dialogueText: '"Control is not care. My independence and dignity are non-negotiable."'
              },
              hi: {
                speakerName: '{playerName}',
                dialogueText: '"पाबंदी प्यार नहीं है। मेरी स्वतंत्रता और आत्मसम्मान से कोई समझौता नहीं हो सकता।"'
              }
            }
          }
        ],
        choices: [
          {
            id: 'm06_s03_c01',
            choiceOrder: 1,
            isCorrect: 1,
            safetyScoreDelta: 10,
            boundariesDelta: 10,
            supportDelta: 10,
            sfxEmotion: 'victory',
            nextSceneOrder: 3,
            translations: {
              en: {
                choiceText: 'Collect Sovereign Heart achievement.',
                feedbackText: 'Sovereign Heart unlocked!',
                educationalTip: 'National Domestic Violence / Relational Helpline: 181 (toll-free 24/7).'
              },
              hi: {
                choiceText: 'स्वाभिमानी मन पदक प्राप्त करें।',
                feedbackText: 'स्वाभिमानी मन पदक अनलॉक हुआ!',
                educationalTip: 'रिश्तों में प्रताड़ना और मदद के लिए राष्ट्रीय हेल्पलाइन 181 सदैव उपलब्ध है।'
              }
            }
          }
        ]
      }
    ]
  },

  // -------------------------------------------------------------------------
  // M07: THE PERFECT DAUGHTER-IN-LAW
  // -------------------------------------------------------------------------
  {
    id: 'm07_the_perfect_daughter_in_law',
    slug: 'the-perfect-daughter-in-law',
    number: 7,
    category: 'domestic_rights',
    difficulty: 'Intermediate',
    estimatedMinutes: 8,
    badgeName: 'LEGAL CLARITY',
    badgeIcon: 'BookOpen',
    badgeDescription: 'Exercised legal protections under PWDVA Section 3 against domestic harassment.',
    translations: {
      en: {
        title: 'The Perfect Daughter-in-Law',
        tagline: 'In-law surveillance, isolation from maternal parents, and daily emotional taunts.',
        summary: '{playerName} faces systemic emotional abuse, financial micromanagement, and forbidden contact with her parents from her in-laws.',
        learningGoal: 'Identify emotional, economic, and verbal abuse defined under Section 3 of PWDVA 2005, and access Protection Officers.'
      },
      hi: {
        title: 'आदर्श बहू की अग्निपरीक्षा',
        tagline: 'ससुराल में जासूसी, मायके से बात करने पर पाबंदी और तानों की बारिश: अपने कानूनी अधिकारों को जानें।',
        summary: '{playerName} को ससुराल में लगातार ताने, खर्च के लिए तरसाना और माता-पिता से मिलने पर पाबंदियों का सामना करना पड़ रहा है।',
        learningGoal: 'घरेलू हिंसा अधिनियम 2005 की धारा 3 के तहत भावनात्मक और आर्थिक उत्पीड़न को समझें और संरक्षण अधिकारी की मदद लें।'
      }
    },
    scenes: [
      {
        id: 'm07_s01',
        sceneOrder: 1,
        sceneType: 'decision',
        characterCode: 'suman_inlaw',
        backgroundKey: 'living_room_shadows',
        musicCue: 'ambient_suspense',
        translations: {
          en: {
            title: 'Curtailed Freedoms',
            environmentName: 'In-Laws Living Room',
            narrativeText: 'Mother-in-law Suman disconnects the home Wi-Fi and locks {playerName}\'s phone in a cupboard: "In this house, daughters-in-law do not speak to their mothers every day, nor do they go out without permission."',
            promptText: 'Your basic liberty and communication rights are being stripped. What step do you take?'
          },
          hi: {
            title: 'बंधनों की जकड़न',
            environmentName: 'ससुराल का बैठक कक्ष',
            narrativeText: 'सास सुमन घर का वाई-फाई बंद कर देती है और {playerName} का फोन अलमारी में रख देती है: "इस घर की बहुएं रोज मायके में बात नहीं करतीं, न ही बिना पूछे कदम बाहर रखती हैं।"',
            promptText: 'आपकी बुनियादी आजादी और बातचीत पर पाबंदी लगाई जा रही है। आप क्या करेंगी?'
          }
        },
        dialogues: [
          {
            id: 'm07_s01_d01',
            dialogueOrder: 1,
            speakerType: 'npc',
            characterCode: 'suman_inlaw',
            emotion: 'hostile',
            translations: {
              en: {
                speakerName: 'Suman (Mother-in-law)',
                dialogueText: '"Learn your place. Everything you do must be approved by us."'
              },
              hi: {
                speakerName: 'सुमन (सास)',
                dialogueText: '"अपनी सीमा में रहो। इस घर में तुम्हारी हर सांस हमारी मर्जी से चलेगी।"'
              }
            }
          }
        ],
        choices: [
          {
            id: 'm07_s01_c01',
            choiceOrder: 1,
            isCorrect: 0,
            safetyScoreDelta: -20,
            boundariesDelta: -20,
            supportDelta: -20,
            sfxEmotion: 'afraid',
            nextSceneOrder: 1,
            translations: {
              en: {
                choiceText: 'Silently comply, accept the confinement, and cut all contact with your maternal family.',
                feedbackText: 'Enduring confinement emboldens perpetrators and leads to severe psychological and physical risks.',
                educationalTip: 'Section 3 of the PWDVA explicitly criminalizes emotional, verbal, and economic abuse.'
              },
              hi: {
                choiceText: 'चुपचाप सब सहन करें और मायके से हमेशा के लिए नाता तोड़ लें।',
                feedbackText: 'चुपचाप अत्याचार सहने से सामने वालों का हौसला बढ़ता है और स्थिति बदतर हो जाती है।',
                educationalTip: 'घरेलू हिंसा अधिनियम की धारा 3 भावनात्मक और आर्थिक उत्पीड़न को अपराध मानती है।'
              }
            }
          },
          {
            id: 'm07_s01_c02',
            choiceOrder: 2,
            isCorrect: 1,
            safetyScoreDelta: 25,
            boundariesDelta: 20,
            supportDelta: 20,
            sfxEmotion: 'ping',
            nextSceneOrder: 2,
            translations: {
              en: {
                choiceText: 'Assert firmly that communication with your parents is your fundamental human right, and retrieve your phone during daytime hours.',
                feedbackText: 'Asserting fundamental rights calmly creates clear legal and personal boundaries.',
                educationalTip: 'No family or spouse has the legal authority to isolate an adult from their parents or withhold their phone.'
              },
              hi: {
                choiceText: 'स्पष्ट कहें कि माता-पिता से बात करना आपका बुनियादी अधिकार है, और अपना फोन वापस लें।',
                feedbackText: 'दृढ़ता से अपनी बात रखना कानूनी और नैतिक रूप से पूरी तरह सही है।',
                educationalTip: 'किसी भी व्यक्ति को आपकी आजादी छीनने या अपनों से बात करने से रोकने का कोई कानूनी हक नहीं है।'
              }
            }
          }
        ]
      },
      {
        id: 'm07_s02',
        sceneOrder: 2,
        sceneType: 'decision',
        characterCode: 'hero',
        backgroundKey: 'sakhi_centre_desk',
        musicCue: 'ambient_calm',
        translations: {
          en: {
            title: 'Accessing Protection Officers',
            environmentName: 'District Legal Aid Clinic / Sakhi Centre',
            narrativeText: 'Accompanied by a trusted support ally, {playerName} visits the district Sakhi One Stop Centre to understand her rights under the Protection of Women from Domestic Violence Act (PWDVA 2005).',
            promptText: 'What remedy is provided under Section 18 & 19 of the PWDVA?'
          },
          hi: {
            title: 'कानूनी सुरक्षा की शरण',
            environmentName: 'सखी वन स्टॉप सेंटर',
            narrativeText: 'अपनी सहेली के साथ {playerName} सखी वन स्टॉप सेंटर जाती है ताकि घरेलू हिंसा अधिनियम (PWDVA 2005) के तहत अपने अधिकारों को समझ सके।',
            promptText: 'घरेलू हिंसा अधिनियम की धारा 18 और 19 के तहत क्या सुरक्षा मिलती है?'
          }
        },
        dialogues: [
          {
            id: 'm07_s02_d01',
            dialogueOrder: 1,
            speakerType: 'npc',
            characterCode: 'counselor_meera',
            emotion: 'supportive',
            translations: {
              en: {
                speakerName: 'Counselor Meera',
                dialogueText: '"Under PWDVA, you have the right to reside in the shared household without harassment, and the court can grant a Protection Order prohibiting any form of abuse."'
              },
              hi: {
                speakerName: 'काउंसलर मीरा',
                dialogueText: '"इस कानून के तहत आपको साझा घर में सम्मान से रहने का अधिकार है, और अदालत ससुराल वालों को किसी भी तरह की प्रताड़ना से रोकने का प्रोटेक्शन ऑर्डर दे सकती है।"'
              }
            }
          }
        ],
        choices: [
          {
            id: 'm07_s02_c01',
            choiceOrder: 1,
            isCorrect: 1,
            safetyScoreDelta: 25,
            boundariesDelta: 20,
            supportDelta: 25,
            sfxEmotion: 'relief',
            nextSceneOrder: 3,
            translations: {
              en: {
                choiceText: 'File a Domestic Incident Report (DIR) through the Protection Officer seeking Protection and Residence Orders.',
                feedbackText: 'The official statutory process! A DIR registered by a Protection Officer initiates speedy magistrate review.',
                educationalTip: 'Protection Officers are appointed by the state government in every district to assist aggrieved women free of cost.'
              },
              hi: {
                choiceText: 'संरक्षण अधिकारी के माध्यम से डोमेस्टिक इंसिडेंट रिपोर्ट (DIR) दर्ज कराएं और अदालत से सुरक्षा आदेश मांगें।',
                feedbackText: 'सबसे सटीक कानूनी प्रक्रिया! संरक्षण अधिकारी द्वारा दर्ज DIR पर मजिस्ट्रेट त्वरित संज्ञान लेते हैं।',
                educationalTip: 'हर जिले में सरकार द्वारा संरक्षण अधिकारी नियुक्त होते हैं जो महिलाओं की निःशुल्क कानूनी मदद करते हैं।'
              }
            }
          },
          {
            id: 'm07_s02_c02',
            choiceOrder: 2,
            isCorrect: 0,
            safetyScoreDelta: -10,
            boundariesDelta: 0,
            supportDelta: -10,
            sfxEmotion: 'shock',
            nextSceneOrder: 2,
            translations: {
              en: {
                choiceText: 'Organize an informal village council meeting without any written legal recording.',
                feedbackText: 'Informal community meetings frequently enforce regressive compromises that pressure women to endure abuse.',
                educationalTip: 'Always utilize formal legal channels (DIR, DLSA, Sakhi OSC) where your constitutional rights are upheld.'
              },
              hi: {
                choiceText: 'बिना किसी कानूनी लिखा-पढ़ी के सिर्फ बिचौलियों या अनौपचारिक पंचायत की पंचायत पर भरोसा करें।',
                feedbackText: 'अनौपचारिक पंचायतें अक्सर महिला पर ही समझौते का दबाव बनाती हैं।',
                educationalTip: 'हमेशा आधिकारिक कानूनी रास्तों (डीएलएसए, सखी सेंटर) का सहारा लें जहां आपके अधिकारों की रक्षा होती है।'
              }
            }
          }
        ]
      },
      {
        id: 'm07_s03',
        sceneOrder: 3,
        sceneType: 'outcome',
        characterCode: 'hero',
        backgroundKey: 'courthouse_steps',
        musicCue: 'victory_theme',
        translations: {
          en: {
            title: 'Protected by the Law',
            environmentName: 'District Court Premises',
            narrativeText: 'The magistrate issues a court Protection Order restraining the in-laws from interfering with {playerName}\'s communication and residence. Dignity is restored.',
            promptText: 'Mission Complete! You invoked statutory domestic protections.'
          },
          hi: {
            title: 'कानून की ढाल',
            environmentName: 'न्यायालय परिसर',
            narrativeText: 'मजिस्ट्रेट ने ससुराल वालों को {playerName} के फोन, आवागमन और सम्मानजनक रहने के अधिकार में दखल देने से रोकने का सुरक्षा आदेश जारी किया।',
            promptText: 'मिशन संपन्न! आपने कानूनी अधिकारों से अपने सम्मान की रक्षा की।'
          }
        },
        dialogues: [
          {
            id: 'm07_s03_d01',
            dialogueOrder: 1,
            speakerType: 'hero',
            characterCode: 'hero',
            emotion: 'confident',
            translations: {
              en: {
                speakerName: '{playerName}',
                dialogueText: '"Marriage is an equal partnership of respect. The law does not permit anyone to strip you of your humanity."'
              },
              hi: {
                speakerName: '{playerName}',
                dialogueText: '"विवाह बराबरी और सम्मान का बंधन है। कोई भी परंपरा आपको आपके मानवीय अधिकारों से वंचित नहीं कर सकती।"'
              }
            }
          }
        ],
        choices: [
          {
            id: 'm07_s03_c01',
            choiceOrder: 1,
            isCorrect: 1,
            safetyScoreDelta: 10,
            boundariesDelta: 10,
            supportDelta: 10,
            sfxEmotion: 'victory',
            nextSceneOrder: 3,
            translations: {
              en: {
                choiceText: 'Unlock Rights Defender badge.',
                feedbackText: 'Rights Defender badge awarded!',
                educationalTip: 'PWDVA (2005) provides civil remedies: Protection Orders, Residence Orders, and Monetary Relief.'
              },
              hi: {
                choiceText: 'अधिकार सजग पदक प्राप्त करें।',
                feedbackText: 'अधिकार सजग पदक प्रदान किया गया!',
                educationalTip: 'घरेलू हिंसा अधिनियम के तहत सुरक्षा आदेश, निवास का अधिकार और आर्थिक राहत प्राप्त की जा सकती है।'
              }
            }
          }
        ]
      }
    ]
  },

  // -------------------------------------------------------------------------
  // M08: BEHIND CLOSED DOORS
  // -------------------------------------------------------------------------
  {
    id: 'm08_behind_closed_doors',
    slug: 'behind-closed-doors',
    number: 8,
    category: 'domestic_safety',
    difficulty: 'Advanced',
    estimatedMinutes: 9,
    badgeName: 'TACTICAL HAVEN',
    badgeIcon: 'Key',
    badgeDescription: 'Prepared an essential Go-Bag and safely executed an exit protocol.',
    translations: {
      en: {
        title: 'Behind Closed Doors',
        tagline: 'Escalating physical violence at home: assemble a discreet Go-Bag and execute a safe exit.',
        summary: '{playerName}\'s husband Alok\'s anger has crossed into physical intimidation and object smashing. She must safely plan and execute an emergency exit.',
        learningGoal: 'Pack a discreet emergency Go-Bag (documents, cash, medicines, keys) and plan a safe departure without provoking confrontation.'
      },
      hi: {
        title: 'बंद दरवाजों के पीछे',
        tagline: 'घर में बढ़ती हिंसा: चुपचाप आपातकालीन गो-बैग तैयार करें और सुरक्षित निकास की योजना बनाएं।',
        summary: '{playerName} के पति आलोक का गुस्सा अब मारपीट और तोड़फोड़ तक पहुंच चुका है। उसे बिना टकराव के एक सुरक्षित आपातकालीन निकास करना होगा।',
        learningGoal: 'जरूरी दस्तावेजों, नकदी, दवाइयों और चाबियों के साथ गो-बैग तैयार करें और सुरक्षित समय पर घर से निकलें।'
      }
    },
    scenes: [
      {
        id: 'm08_s01',
        sceneOrder: 1,
        sceneType: 'decision',
        characterCode: 'alok_husband',
        backgroundKey: 'kitchen_shattered_glass',
        musicCue: 'ambient_suspense',
        translations: {
          en: {
            title: 'The Tipping Point',
            environmentName: 'Kitchen with Smashed Dishes',
            narrativeText: 'Alok smashes a plate against the wall in a rage, yelling threats before slamming the bedroom door. The atmosphere is volatile and further physical danger is imminent.',
            promptText: 'Violence has escalated inside the house. What is your immediate safety priority?'
          },
          hi: {
            title: 'खतरे की घंटी',
            environmentName: 'रसोईघर में टूटे हुए बर्तन',
            narrativeText: 'आलोक गुस्से में दीवार पर प्लेटें पटकता है, गालियां देता है और बेडरूम का दरवाजा जोर से बंद कर लेता है। घर में कभी भी जानलेवा हमला हो सकता है।',
            promptText: 'घर में हिंसा बढ़ चुकी है। आपकी सबसे पहली प्राथमिकता क्या होगी?'
          }
        },
        dialogues: [
          {
            id: 'm08_s01_d01',
            dialogueOrder: 1,
            speakerType: 'hero',
            characterCode: 'hero',
            emotion: 'alert',
            translations: {
              en: {
                speakerName: '{playerName}',
                dialogueText: '',
                thoughtText: 'I cannot wait for him to turn physical on me. I need to prepare my essentials and exit when he falls asleep or leaves.'
              },
              hi: {
                speakerName: '{playerName}',
                dialogueText: '',
                thoughtText: 'मैं उसके मुझ पर हाथ उठाने का इंतजार नहीं कर सकती। मुझे अपनी जरूरी चीजें समेटकर सुरक्षित निकलना होगा।'
              }
            }
          }
        ],
        choices: [
          {
            id: 'm08_s01_c01',
            choiceOrder: 1,
            isCorrect: 0,
            safetyScoreDelta: -25,
            boundariesDelta: 0,
            supportDelta: 0,
            sfxEmotion: 'shock',
            nextSceneOrder: 1,
            translations: {
              en: {
                choiceText: 'Bang on his bedroom door and demand an immediate argument to resolve things right now.',
                feedbackText: 'Confronting an enraged, violent partner trapped in an enclosed room severely escalates lethal danger.',
                educationalTip: 'Never escalate or confront an agitated violent abuser when escape routes are blocked.'
              },
              hi: {
                choiceText: 'बेडरूम का दरवाजा पीटें और अभी के अभी बहस करके फैसला करने की जिद करें।',
                feedbackText: 'गुस्से से भरे हिंसक व्यक्ति से बंद कमरे में उलझना गंभीर चोट का कारण बन सकता है।',
                educationalTip: 'जब कोई अत्यधिक गुस्से में हो, तो उससे बहस न करें; अपनी जान की सुरक्षा को पहले रखें।'
              }
            }
          },
          {
            id: 'm08_s01_c02',
            choiceOrder: 2,
            isCorrect: 1,
            safetyScoreDelta: 25,
            boundariesDelta: 15,
            supportDelta: 15,
            sfxEmotion: 'ping',
            nextSceneOrder: 2,
            translations: {
              en: {
                choiceText: 'Discreetly assemble an emergency Go-Bag with original IDs (Aadhaar, PAN), bank passbook, essential meds, spare keys, and cash.',
                feedbackText: 'Lifesaving preparedness! Having your vital documents and emergency cash in one concealed bag makes immediate departure feasible.',
                educationalTip: 'A Go-Bag ensures you do not have to return for documents or financial essentials later.'
              },
              hi: {
                choiceText: 'चुपचाप एक गो-बैग तैयार करें जिसमें आधार कार्ड, पैन कार्ड, बैंक पासबुक, जरूरी दवाइयां, चाबियां और नकदी हो।',
                feedbackText: 'जीवन रक्षक तैयारी! जरूरी कागजात और पैसे पास होने से आप तुरंत सुरक्षित स्थान पर जा सकती हैं।',
                educationalTip: 'गो-बैग तैयार रखने से आपको बाद में कागजात लेने के लिए दोबारा उस खतरनाक जगह नहीं जाना पड़ता।'
              }
            }
          }
        ]
      },
      {
        id: 'm08_s02',
        sceneOrder: 2,
        sceneType: 'decision',
        characterCode: 'priya_ally',
        backgroundKey: 'apartment_door_exit',
        musicCue: 'ambient_suspense',
        translations: {
          en: {
            title: 'The Timed Departure',
            environmentName: 'Apartment Corridor',
            narrativeText: 'At 6:30 AM, Alok leaves for his morning shift. {playerName} has a 45-minute window. Her friend Priya is parked two blocks away.',
            promptText: 'How do you execute your departure safely?'
          },
          hi: {
            title: 'निकास का सही समय',
            environmentName: 'अपार्टमेंट की सीढ़ियां',
            narrativeText: 'सुबह 6:30 बजे आलोक अपनी शिफ्ट के लिए निकल जाता है। {playerName} के पास 45 मिनट का समय है। उसकी सहेली प्रिया दो गली दूर गाड़ी में इंतजार कर रही है।',
            promptText: 'आप सुरक्षित तरीके से घर से कैसे निकलेंगी?'
          }
        },
        dialogues: [
          {
            id: 'm08_s02_d01',
            dialogueOrder: 1,
            speakerType: 'hero',
            characterCode: 'hero',
            emotion: 'focused',
            translations: {
              en: {
                speakerName: '{playerName}',
                dialogueText: '',
                thoughtText: 'I will take my Go-Bag, turn off location tracking on apps he monitors, and proceed directly to the safe house.'
              },
              hi: {
                speakerName: '{playerName}',
                dialogueText: '',
                thoughtText: 'मैं अपना बैग लूंगी, उन ऐप्स की लोकेशन बंद करूंगी जो उसने ट्रैक कर रखी हैं, और सीधे सुरक्षित जगह पहुँचूंगी।'
              }
            }
          }
        ],
        choices: [
          {
            id: 'm08_s02_c01',
            choiceOrder: 1,
            isCorrect: 1,
            safetyScoreDelta: 25,
            boundariesDelta: 20,
            supportDelta: 25,
            sfxEmotion: 'relief',
            nextSceneOrder: 3,
            translations: {
              en: {
                choiceText: 'Disable shared family GPS trackers on your phone, walk calmly to Priya\'s vehicle, and proceed to the designated safe shelter.',
                feedbackText: 'Flawless tactical exit! Neutralizing digital tracking prevents the abuser from intercepting you.',
                educationalTip: 'Always check your phone for shared device trackers (Find My, Google Family Link) before executing an exit.'
              },
              hi: {
                choiceText: 'फोन से शेयर की गई जीपीएस ट्रैकिंग बंद करें, शांति से प्रिया की गाड़ी तक जाएं और सुरक्षित आश्रय स्थल पहुंचें।',
                feedbackText: 'शानदार निकास! डिजिटल ट्रैकिंग बंद करने से कोई आपका पीछा नहीं कर सकता।',
                educationalTip: 'निकलने से पहले यह जरूर जांच लें कि फोन में कोई लोकेशन शेयरिंग ऐप चालू तो नहीं है।'
              }
            }
          },
          {
            id: 'm08_s02_c02',
            choiceOrder: 2,
            isCorrect: 0,
            safetyScoreDelta: -20,
            boundariesDelta: -10,
            supportDelta: -10,
            sfxEmotion: 'shock',
            nextSceneOrder: 2,
            translations: {
              en: {
                choiceText: 'Leave a dramatic handwritten note on the kitchen counter explaining all his faults.',
                feedbackText: 'Leaving provocative notes incites immediate frantic pursuit and increases danger on the road.',
                educationalTip: 'Do not leave notes or disclose destination details during an emergency exit.'
              },
              hi: {
                choiceText: 'रसोई में एक लंबा भावुक पत्र लिखकर छोड़ें जिसमें उसकी सारी गलतियां गिनाई गई हों।',
                feedbackText: 'पत्र छोड़ने से सामने वाला और भड़क सकता है और तुरंत आपका पीछा कर सकता है।',
                educationalTip: 'निकलते समय कभी भी पत्र न छोड़ें और न ही यह बताएं कि आप कहां जा रही हैं।'
              }
            }
          }
        ]
      },
      {
        id: 'm08_s03',
        sceneOrder: 3,
        sceneType: 'outcome',
        characterCode: 'hero',
        backgroundKey: 'safe_shelter_room',
        musicCue: 'victory_theme',
        translations: {
          en: {
            title: 'A Safe Haven Reached',
            environmentName: 'Verified Women\'s Shelter (Sakhi)',
            narrativeText: '{playerName} arrives securely at the Sakhi One Stop Centre. The shelter provides immediate safety, medical checkups, and legal filing assistance.',
            promptText: 'Mission Complete! You planned with tactical intelligence and preserved your life.'
          },
          hi: {
            title: 'सुरक्षित ठिकाना',
            environmentName: 'सखी वन स्टॉप सेंटर का सुरक्षित कक्ष',
            narrativeText: '{playerName} सकुशल सखी वन स्टॉप सेंटर पहुंच गई है। यहाँ उसे सुरक्षित कमरा, चिकित्सा सहायता और कानूनी सलाह उपलब्ध कराई जाती है।',
            promptText: 'मिशन संपन्न! आपने सूझबूझ से अपनी जान और आजादी की रक्षा की।'
          }
        },
        dialogues: [
          {
            id: 'm08_s03_d01',
            dialogueOrder: 1,
            speakerType: 'hero',
            characterCode: 'hero',
            emotion: 'relieved',
            translations: {
              en: {
                speakerName: '{playerName}',
                dialogueText: '"Physical safety comes first. No one deserves to live under terror in their own home."'
              },
              hi: {
                speakerName: '{playerName}',
                dialogueText: '"जान की सुरक्षा सबसे पहले है। किसी को भी अपने ही घर में खौफ के साए में जीने की जरूरत नहीं है।"'
              }
            }
          }
        ],
        choices: [
          {
            id: 'm08_s03_c01',
            choiceOrder: 1,
            isCorrect: 1,
            safetyScoreDelta: 10,
            boundariesDelta: 10,
            supportDelta: 10,
            sfxEmotion: 'victory',
            nextSceneOrder: 3,
            translations: {
              en: {
                choiceText: 'Unlock Safe Exit Strategist badge.',
                feedbackText: 'Safe Exit Strategist unlocked!',
                educationalTip: 'Women in immediate danger can contact NCW WhatsApp SOS: +91 7827170170 or dial 181.'
              },
              hi: {
                choiceText: 'सुरक्षित निकास रणनीतिकार पदक प्राप्त करें।',
                feedbackText: 'सुरक्षित निकास रणनीतिकार पदक प्रदान किया गया!',
                educationalTip: 'तत्काल संकट के समय राष्ट्रीय महिला आयोग का व्हाट्सएप नंबर +91 7827170170 या 181 डायल करें।'
              }
            }
          }
        ]
      }
    ]
  },

  // -------------------------------------------------------------------------
  // M09: THE MONEY TRAP
  // -------------------------------------------------------------------------
  {
    id: 'm09_the_money_trap',
    slug: 'the-money-trap',
    number: 9,
    category: 'financial_rights',
    difficulty: 'Advanced',
    estimatedMinutes: 8,
    badgeName: 'FINANCIAL AUTONOMY',
    badgeIcon: 'Coins',
    badgeDescription: 'Defended Streedhan rights and established uncompromised financial security.',
    translations: {
      en: {
        title: 'The Money Trap',
        tagline: 'Salary confiscation, withheld bank accounts, and pawned jewelry: reclaiming economic power.',
        summary: '{playerName}\'s salary is confiscated each month, her gold jewelry (Streedhan) is locked away, and she is denied personal spending money.',
        learningGoal: 'Understand Streedhan as absolute sole property under Section 14 of the Hindu Succession Act, open independent accounts, and assert financial sovereignty.'
      },
      hi: {
        title: 'आर्थिक जाल',
        tagline: 'वेतन छीनना, बैंक खातों पर कब्जा और स्त्रीधन पर पाबंदी: अपनी आर्थिक स्वतंत्रता वापस पाएं।',
        summary: '{playerName} का सारा वेतन ससुराल वाले छीन लेते हैं, उसके गहने (स्त्रीधन) अलमारी में बंद कर दिए गए हैं और उसे एक-एक पैसे के लिए तरसाया जाता है।',
        learningGoal: 'हिंदू उत्तराधिकार अधिनियम की धारा 14 के तहत स्त्रीधन पर पूर्ण अधिकार को समझें और स्वतंत्र बैंक खाता खोलें।'
      }
    },
    scenes: [
      {
        id: 'm09_s01',
        sceneOrder: 1,
        sceneType: 'decision',
        characterCode: 'alok_husband',
        backgroundKey: 'bedroom_bank_documents',
        musicCue: 'ambient_suspense',
        translations: {
          en: {
            title: 'The Confiscation',
            environmentName: 'Bedroom Desk',
            narrativeText: 'Salary day arrives. Alok demands: "Transfer your entire salary to my account immediately. Also, my mother will keep your gold locker keys. A good wife does not keep separate money."',
            promptText: 'You are facing severe economic abuse. How do you respond?'
          },
          hi: {
            title: 'आर्थिक प्रताड़ना',
            environmentName: 'बेडरूम',
            narrativeText: 'सैलरी का दिन है। आलोक मांग करता है: "अपनी पूरी तनख्वाह मेरे खाते में ट्रांसफर करो। और लॉकर की चाबी मां के पास रहेगी। अच्छी बहुएं अलग से पैसे नहीं रखतीं।"',
            promptText: 'आपके आर्थिक अधिकारों का हनन किया जा रहा है। आप क्या करेंगी?'
          }
        },
        dialogues: [
          {
            id: 'm09_s01_d01',
            dialogueOrder: 1,
            speakerType: 'npc',
            characterCode: 'alok_husband',
            emotion: 'commanding',
            translations: {
              en: {
                speakerName: 'Alok',
                dialogueText: '"Everything you earn belongs to this household. Don\'t talk back."'
              },
              hi: {
                speakerName: 'आलोक',
                dialogueText: '"तुम जो कमाती हो उस पर इस घर का हक है। बहस मत करो।"'
              }
            }
          }
        ],
        choices: [
          {
            id: 'm09_s01_c01',
            choiceOrder: 1,
            isCorrect: 0,
            safetyScoreDelta: -20,
            boundariesDelta: -25,
            supportDelta: 0,
            sfxEmotion: 'afraid',
            nextSceneOrder: 1,
            translations: {
              en: {
                choiceText: 'Transfer your entire salary and surrender all locker keys to keep the peace.',
                feedbackText: 'Total economic dependency strips away your capacity to leave or protect yourself in crises.',
                educationalTip: 'Economic abuse is recognized by Indian courts as a severe form of domestic violence.'
              },
              hi: {
                choiceText: 'शांति बनाए रखने के लिए सारा वेतन ट्रांसफर कर दें और लॉकर की चाबी दे दें।',
                feedbackText: 'अपनी पूरी कमाई सौंपने से आप पूरी तरह पराधीन हो जाती हैं और संकट के समय लाचार हो जाती हैं।',
                educationalTip: 'आर्थिक रूप से मोहताज करना घरेलू हिंसा कानून के तहत दंडनीय अपराध है।'
              }
            }
          },
          {
            id: 'm09_s01_c02',
            choiceOrder: 2,
            isCorrect: 1,
            safetyScoreDelta: 25,
            boundariesDelta: 25,
            supportDelta: 10,
            sfxEmotion: 'ping',
            nextSceneOrder: 2,
            translations: {
              en: {
                choiceText: 'Stand firm: "My earnings and my Streedhan are my legal property. We can contribute equally to household bills, but my salary remains in my own name."',
                feedbackText: 'Courageous and legally unimpeachable! Section 14 of the Hindu Succession Act affirms a woman\'s absolute ownership over her property.',
                educationalTip: 'Streedhan includes gifts, jewelry, and cash given before, during, or after marriage.'
              },
              hi: {
                choiceText: 'दृढ़ता से कहें: "मेरी कमाई और मेरा स्त्रीधन मेरा कानूनी अधिकार है। मैं घर के खर्च में वाजिब योगदान दूंगी, लेकिन मेरा खाता मेरा रहेगा।"',
                feedbackText: 'साहसी और कानूनी रूप से अचूक निर्णय! हिंदू उत्तराधिकार अधिनियम की धारा 14 महिला को उसकी संपत्ति का पूर्ण स्वामी बनाती है।',
                educationalTip: 'शादी से पहले, शादी में या बाद में मिले गहने, उपहार और पैसे स्त्रीधन हैं जिस पर सिर्फ आपका अधिकार है।'
              }
            }
          }
        ]
      },
      {
        id: 'm09_s02',
        sceneOrder: 2,
        sceneType: 'decision',
        characterCode: 'hero',
        backgroundKey: 'bank_branch_interior',
        musicCue: 'ambient_calm',
        translations: {
          en: {
            title: 'Securing Financial Autonomy',
            environmentName: 'Bank Branch',
            narrativeText: '{playerName} visits the bank during lunch hour. She discovers that Alok has attempted to add himself as joint operator on her pre-marriage fixed deposits.',
            promptText: 'What immediate financial security steps do you take at the bank?'
          },
          hi: {
            title: 'वित्तीय सुरक्षा के कदम',
            environmentName: 'बैंक शाखा',
            narrativeText: '{playerName} दोपहर में बैंक जाती है। उसे पता चलता है कि आलोक ने उसकी पुरानी एफडी में खुद को ज्वाइंट होल्डर जोड़ने की अर्जी दी है।',
            promptText: 'बैंक में आप तुरंत क्या वित्तीय सुरक्षात्मक कदम उठाएंगी?'
          }
        },
        dialogues: [
          {
            id: 'm09_s02_d01',
            dialogueOrder: 1,
            speakerType: 'hero',
            characterCode: 'hero',
            emotion: 'focused',
            translations: {
              en: {
                speakerName: '{playerName}',
                dialogueText: '',
                thoughtText: 'I must ensure all my accounts are single-operator, update my netbanking passwords, and change the registered mobile number to my personal device.'
              },
              hi: {
                speakerName: '{playerName}',
                dialogueText: '',
                thoughtText: 'मुझे सभी खातों को केवल एकल संचालन (Single Operator) पर रखना होगा और मोबाइल नंबर सिर्फ अपने फोन का देना होगा।'
              }
            }
          }
        ],
        choices: [
          {
            id: 'm09_s02_c01',
            choiceOrder: 1,
            isCorrect: 1,
            safetyScoreDelta: 25,
            boundariesDelta: 20,
            supportDelta: 15,
            sfxEmotion: 'relief',
            nextSceneOrder: 3,
            translations: {
              en: {
                choiceText: 'Instruct the bank in writing that no joint mandate is authorized, update OTP mobile numbers to your personal SIM, and register a digital locker inventory.',
                feedbackText: 'Decisive financial defense! Securing banking credentials ensures uninterrupted economic independence.',
                educationalTip: 'Never share netbanking passwords, debit card PINs, or banking OTPs with anyone, including spouses.'
              },
              hi: {
                choiceText: 'बैंक को लिखित निर्देश दें कि कोई ज्वाइंट खाता मान्य नहीं है, ओटीपी के लिए अपना निजी नंबर दर्ज कराएं और गहनों की सूची बनाएं।',
                feedbackText: 'निर्णायक वित्तीय कदम! अपने बैंक खातों की सुरक्षा आपकी आजादी की बुनियाद है।',
                educationalTip: 'नेटबैंकिंग पासवर्ड, एटीएम पिन या ओटीपी किसी के भी साथ साझा न करें, चाहे वो पति ही क्यों न हो।'
              }
            }
          },
          {
            id: 'm09_s02_c02',
            choiceOrder: 2,
            isCorrect: 0,
            safetyScoreDelta: -15,
            boundariesDelta: -10,
            supportDelta: 0,
            sfxEmotion: 'shock',
            nextSceneOrder: 2,
            translations: {
              en: {
                choiceText: 'Sign the joint mandate forms without reading to avoid arguments at home.',
                feedbackText: 'Signing joint mandates grants the other party legal authorization to withdraw all your funds.',
                educationalTip: 'Once a joint mandate is executed, either party can withdraw funds without the other\'s consent.'
              },
              hi: {
                choiceText: 'घर में झगड़े से बचने के लिए बिना पढ़े ज्वाइंट खाते के फॉर्म पर दस्तखत कर दें।',
                feedbackText: 'ज्वाइंट खाते पर दस्तखत करने से दूसरा व्यक्ति आपके सारे पैसे निकालने के लिए कानूनी रूप से अधिकृत हो जाता है।',
                educationalTip: 'कभी भी दबाव में आकर किसी भी बैंक दस्तावेज या ज्वाइंट अकाउंट फॉर्म पर हस्ताक्षर न करें।'
              }
            }
          }
        ]
      },
      {
        id: 'm09_s03',
        sceneOrder: 3,
        sceneType: 'outcome',
        characterCode: 'hero',
        backgroundKey: 'modern_office_desk',
        musicCue: 'victory_theme',
        translations: {
          en: {
            title: 'Economic Sovereignty',
            environmentName: 'Sunny Office Desk',
            narrativeText: 'With her bank accounts secured and her salary routed solely into her private account, {playerName} stands on solid financial ground. Her future is in her hands.',
            promptText: 'Mission Complete! You defended your Streedhan and economic liberty.'
          },
          hi: {
            title: 'आर्थिक संप्रभुता',
            environmentName: 'ऑफिस का रोशन केबिन',
            narrativeText: 'बैंक खातों की सुरक्षा और वेतन अपने नियंत्रण में होने से {playerName} आर्थिक रूप से पूरी तरह मजबूत और आत्मनिर्भर है। उसका भविष्य उसके अपने हाथ में है।',
            promptText: 'मिशन संपन्न! आपने अपने स्त्रीधन और आर्थिक स्वावलंबन की रक्षा की।'
          }
        },
        dialogues: [
          {
            id: 'm09_s03_d01',
            dialogueOrder: 1,
            speakerType: 'hero',
            characterCode: 'hero',
            emotion: 'confident',
            translations: {
              en: {
                speakerName: '{playerName}',
                dialogueText: '"Economic independence is the bedrock of freedom. When a woman controls her own livelihood, she cannot be trapped."'
              },
              hi: {
                speakerName: '{playerName}',
                dialogueText: '"आर्थिक आत्मनिर्भरता ही स्वतंत्रता की नींव है। जब एक महिला की कमाई पर उसका अपना हक होता है, तो उसे कोई लाचार नहीं बना सकता।"'
              }
            }
          }
        ],
        choices: [
          {
            id: 'm09_s03_c01',
            choiceOrder: 1,
            isCorrect: 1,
            safetyScoreDelta: 10,
            boundariesDelta: 10,
            supportDelta: 10,
            sfxEmotion: 'victory',
            nextSceneOrder: 3,
            translations: {
              en: {
                choiceText: 'Collect Financial Sovereign badge.',
                feedbackText: 'Financial Sovereign unlocked!',
                educationalTip: 'The Supreme Court of India in Pratibha Rani v. Suraj Kumar ruled that Streedhan remains the absolute property of the woman.'
              },
              hi: {
                choiceText: 'आर्थिक स्वावलंबन पदक प्राप्त करें।',
                feedbackText: 'आर्थिक स्वावलंबन पदक प्रदान किया गया!',
                educationalTip: 'सुप्रीम कोर्ट ने प्रतिभा रानी बनाम सूरज कुमार मामले में स्पष्ट किया था कि स्त्रीधन पर केवल महिला का अनन्य अधिकार है।'
              }
            }
          }
        ]
      }
    ]
  },

  // -------------------------------------------------------------------------
  // M10: A FRIEND IN NEED
  // -------------------------------------------------------------------------
  {
    id: 'm10_a_friend_in_need',
    slug: 'a-friend-in-need',
    number: 10,
    category: 'bystander_support',
    difficulty: 'Advanced',
    estimatedMinutes: 8,
    badgeName: 'EMPATHY CATALYST',
    badgeIcon: 'Users',
    badgeDescription: 'Provided active, non-judgmental support and connected a friend to Sakhi Centre.',
    translations: {
      en: {
        title: 'A Friend in Need',
        tagline: 'A close companion reveals hidden bruises and tearfully asks for help: become an empowering ally.',
        summary: '{playerName}\'s friend Neha breaks down, disclosing ongoing domestic violence at home and feeling terrified of being judged.',
        learningGoal: 'Practice trauma-informed listening without victim-blaming, preserve the survivor\'s agency, and connect to Sakhi OSC & DLSA free legal aid.'
      },
      hi: {
        title: 'संकट में साथी',
        tagline: 'सहेली ने रोते हुए चोट के निशान दिखाए और मदद मांगी: एक सजग और मजबूत साथी बनें।',
        summary: '{playerName} की दोस्त नेहा रो पड़ती है और बताती है कि ससुराल में उसके साथ रोज मारपीट होती है, और वह समाज के डर से चुप है।',
        learningGoal: 'बिना किसी दोषारोपण के संवेदनशीलता से सुनें, दोस्त के निर्णय का सम्मान करें और उसे सखी सेंटर व डीएलएसए की मुफ्त कानूनी सहायता से जोड़ें।'
      }
    },
    scenes: [
      {
        id: 'm10_s01',
        sceneOrder: 1,
        sceneType: 'decision',
        characterCode: 'friend_neha',
        backgroundKey: 'cozy_tea_cafe',
        musicCue: 'ambient_suspense',
        translations: {
          en: {
            title: 'The Disclosure',
            environmentName: 'Quiet Tea Corner',
            narrativeText: 'Neha rolls up her sleeve, revealing deep bruises. Tears stream down her face: "He hit me again last night because dinner was 10 minutes late. He says it is my fault for provoking him. Am I a bad wife?"',
            promptText: 'Your friend is blaming herself for her abuser\'s violence. What do you say?'
          },
          hi: {
            title: 'दर्द भरी दास्तां',
            environmentName: 'शांत चाय की दुकान',
            narrativeText: 'नेहा अपनी आस्तीन ऊपर करती है, जहां गहरे नीले निशान हैं। वह रोते हुए कहती है: "कल रात खाना 10 मिनट देर से बना तो उन्होंने मुझे फिर पीटा। कहते हैं मेरी ही गलती थी। क्या मैं सच में बुरी पत्नी हूँ?"',
            promptText: 'आपकी दोस्त हिंसा के लिए खुद को दोषी मान रही है। आप उससे क्या कहेंगी?'
          }
        },
        dialogues: [
          {
            id: 'm10_s01_d01',
            dialogueOrder: 1,
            speakerType: 'ally',
            characterCode: 'friend_neha',
            emotion: 'crying',
            translations: {
              en: {
                speakerName: 'Neha',
                dialogueText: '"Everyone tells me to adjust and compromise for the sake of family honor. I don\'t know where to turn."'
              },
              hi: {
                speakerName: 'नेहा',
                dialogueText: '"सब कहते हैं परिवार की इज्जत के लिए समझौता कर लो। मुझे समझ नहीं आ रहा मैं क्या करूँ।"'
              }
            }
          }
        ],
        choices: [
          {
            id: 'm10_s01_c01',
            choiceOrder: 1,
            isCorrect: 0,
            safetyScoreDelta: -20,
            boundariesDelta: -10,
            supportDelta: -20,
            sfxEmotion: 'shock',
            nextSceneOrder: 1,
            translations: {
              en: {
                choiceText: 'Say "Marriage requires adjustment; try cooking earlier and don\'t answer back."',
                feedbackText: 'Victim-blaming normalizes domestic violence and drives abused individuals into deeper isolation.',
                educationalTip: 'Never blame the victim or advise tolerating abuse. Violence is 100% the choice of the perpetrator.'
              },
              hi: {
                choiceText: 'कहें "शादी में थोड़ा सहना पड़ता है; अगली बार समय से खाना बना लेना और बहस मत करना।"',
                feedbackText: 'पीड़िता को ही दोष देने से हिंसा को बढ़ावा मिलता है और वह और ज्यादा लाचार हो जाती है।',
                educationalTip: 'हिंसा के लिए कभी भी पीड़ित को जिम्मेदार न ठहराएं। हिंसा करने वाला ही शत-प्रतिशत दोषी होता है।'
              }
            }
          },
          {
            id: 'm10_s01_c02',
            choiceOrder: 2,
            isCorrect: 1,
            safetyScoreDelta: 25,
            boundariesDelta: 15,
            supportDelta: 25,
            sfxEmotion: 'ping',
            nextSceneOrder: 2,
            translations: {
              en: {
                choiceText: 'Hold her hand and state clearly: "This is not your fault. Violence is never justified, ever. I believe you, and you are not alone. We will get you through this safely."',
                feedbackText: 'Trauma-informed validation! Believing survivors and lifting the burden of guilt is the first essential step of healing.',
                educationalTip: 'The most powerful words a friend can offer are: "I believe you, and this is not your fault."'
              },
              hi: {
                choiceText: 'उसका हाथ थामें और कहें: "इसमें तुम्हारी कोई गलती नहीं है। मारपीट का कोई बहाना नहीं हो सकता। मुझे तुम पर पूरा भरोसा है, तुम अकेली नहीं हो।"',
                feedbackText: 'सच्चा संबल! पीड़िता को यह अहसास कराना कि वह अकेली नहीं है, उसके अंदर फिर से जीने की हिम्मत भरता है।',
                educationalTip: 'किसी पीड़ित के लिए सबसे बड़ी ताकत यह सुनना होता है कि "मुझे तुम पर विश्वास है, तुम्हारी कोई गलती नहीं है।"'
              }
            }
          }
        ]
      },
      {
        id: 'm10_s02',
        sceneOrder: 2,
        sceneType: 'decision',
        characterCode: 'counselor_meera',
        backgroundKey: 'sakhi_centre_waiting',
        musicCue: 'ambient_calm',
        translations: {
          en: {
            title: 'Facilitating Safe Pathways',
            environmentName: 'Support Service Consultation',
            narrativeText: 'Neha wants to take legal action but has no personal income and is terrified of expensive lawyer fees.',
            promptText: 'What verified public resource provides 100% free legal defense to women in India?'
          },
          hi: {
            title: 'मुफ्त कानूनी मदद का रास्ता',
            environmentName: 'परामर्श कक्ष',
            narrativeText: 'नेहा कानूनी कदम उठाना चाहती है लेकिन उसके पास कोई पैसे नहीं हैं और वह वकीलों की भारी फीस से डरी हुई है।',
            promptText: 'भारत में कौन सा आधिकारिक संस्थान महिलाओं को शत-प्रतिशत मुफ्त वकील और कानूनी सहायता देता है?'
          }
        },
        dialogues: [
          {
            id: 'm10_s02_d01',
            dialogueOrder: 1,
            speakerType: 'hero',
            characterCode: 'hero',
            emotion: 'supportive',
            translations: {
              en: {
                speakerName: '{playerName}',
                dialogueText: '"You do not need to spend a single rupee to get top legal representation. The government provides free advocates to all women through DLSA."'
              },
              hi: {
                speakerName: '{playerName}',
                dialogueText: '"तुम्हें वकील के लिए एक रुपया भी खर्च करने की जरूरत नहीं है। सरकार डीएलएसए (DLSA) के जरिए हर महिला को मुफ्त वकील देती है।"'
              }
            }
          }
        ],
        choices: [
          {
            id: 'm10_s02_c01',
            choiceOrder: 1,
            isCorrect: 1,
            safetyScoreDelta: 25,
            boundariesDelta: 20,
            supportDelta: 25,
            sfxEmotion: 'relief',
            nextSceneOrder: 3,
            translations: {
              en: {
                choiceText: 'Accompany her to the District Legal Services Authority (DLSA) front office to assign a free government-appointed legal aid lawyer and register at the Sakhi One Stop Centre.',
                feedbackText: 'Exceptional empowerment! Under the Legal Services Authorities Act 1987, all women are entitled to free legal aid regardless of financial means.',
                educationalTip: 'Toll-free National Legal Aid Helpline is 15100.'
              },
              hi: {
                choiceText: 'उसे जिला विधिक सेवा प्राधिकरण (DLSA) लेकर जाएं जहां उसे मुफ्त सरकारी वकील मिलेगा, और सखी वन स्टॉप सेंटर से जोड़ें।',
                feedbackText: 'अद्भुत साथी! विधिक सेवा प्राधिकरण अधिनियम 1987 के तहत भारत की प्रत्येक महिला को मुफ्त कानूनी सहायता पाने का अधिकार है।',
                educationalTip: 'राष्ट्रीय कानूनी सहायता का टोल-फ्री नंबर 15100 है।'
              }
            }
          },
          {
            id: 'm10_s02_c02',
            choiceOrder: 2,
            isCorrect: 0,
            safetyScoreDelta: -10,
            boundariesDelta: 0,
            supportDelta: -10,
            sfxEmotion: 'shock',
            nextSceneOrder: 2,
            translations: {
              en: {
                choiceText: 'Tell her that courts take 20 years so she should just rent a cheap secret flat without telling anyone.',
                feedbackText: 'Discouraging institutional legal remedies leaves the abuser without restraint and leaves the woman vulnerable to kidnapping or abandonment claims.',
                educationalTip: 'Protection Orders under PWDVA are designed for fast emergency relief, not decades of litigation.'
              },
              hi: {
                choiceText: 'कहें कि कोर्ट कचहरी में 20 साल लगते हैं, इसलिए कहीं दूर चुपचाप कमरा लेकर छिप जाओ।',
                feedbackText: 'कानूनी सुरक्षा न लेने से आरोपी महिला के खिलाफ ही झूठे मुकदमे दर्ज करा सकता है।',
                educationalTip: 'घरेलू हिंसा कानून के तहत प्रोटेक्शन ऑर्डर आपातकालीन राहत के लिए त्वरित दिए जाते हैं।'
              }
            }
          }
        ]
      },
      {
        id: 'm10_s03',
        sceneOrder: 3,
        sceneType: 'outcome',
        characterCode: 'hero',
        backgroundKey: 'sakhi_centre_garden',
        musicCue: 'victory_theme',
        translations: {
          en: {
            title: 'The Circle of Courage',
            environmentName: 'Shelter Garden Courtyard',
            narrativeText: 'With her free legal aid lawyer assigned and temporary safe shelter provided at the Sakhi Centre, Neha smiles through her tears. You stood by her when it mattered most.',
            promptText: 'Mission Complete! You were an empathetic, active ally.'
          },
          hi: {
            title: 'सहानुभूति की शक्ति',
            environmentName: 'सखी केंद्र का बगीचा',
            narrativeText: 'डीएलएसए से मुफ्त वकील मिलने और सखी केंद्र में सुरक्षित आश्रय मिलने के बाद नेहा के चेहरे पर सुकून की मुस्कान लौटी। जब उसे सबसे ज्यादा जरूरत थी, आप उसके साथ खड़ी रहीं।',
            promptText: 'मिशन संपन्न! आप एक सच्चे और जागरूक साथी साबित हुईं।'
          }
        },
        dialogues: [
          {
            id: 'm10_s03_d01',
            dialogueOrder: 1,
            speakerType: 'hero',
            characterCode: 'hero',
            emotion: 'happy',
            translations: {
              en: {
                speakerName: '{playerName}',
                dialogueText: '"We are only as strong as the hands we hold. When women stand together, fear loses its power."'
              },
              hi: {
                speakerName: '{playerName}',
                dialogueText: '"हमारी असली ताकत एक दूसरे का हाथ थामने में है। जब बहनें एक साथ खड़ी होती हैं, तो डर का साया मिट जाता है।"'
              }
            }
          }
        ],
        choices: [
          {
            id: 'm10_s03_c01',
            choiceOrder: 1,
            isCorrect: 1,
            safetyScoreDelta: 10,
            boundariesDelta: 10,
            supportDelta: 10,
            sfxEmotion: 'victory',
            nextSceneOrder: 3,
            translations: {
              en: {
                choiceText: 'Collect Empathetic Bystander badge.',
                feedbackText: 'Empathetic Bystander badge awarded!',
                educationalTip: 'Sakhi One Stop Centres operate across all 700+ districts of India.'
              },
              hi: {
                choiceText: 'सहानुभूति संबल पदक प्राप्त करें।',
                feedbackText: 'सहानुभूति संबल पदक प्रदान किया गया!',
                educationalTip: 'सखी वन स्टॉप सेंटर भारत के सभी 700 से अधिक जिलों में कार्यरत हैं।'
              }
            }
          }
        ]
      }
    ]
  },

  // -------------------------------------------------------------------------
  // M11: THE BREAKING POINT
  // -------------------------------------------------------------------------
  {
    id: 'm11_the_breaking_point',
    slug: 'the-breaking-point',
    number: 11,
    category: 'emergency_crisis',
    difficulty: 'Advanced',
    estimatedMinutes: 9,
    badgeName: 'CRISIS NAVIGATOR',
    badgeIcon: 'PhoneCall',
    badgeDescription: 'Mastered 112 emergency escalation and secured immediate police intervention.',
    translations: {
      en: {
        title: 'The Breaking Point',
        tagline: 'Imminent threat of physical assault: activate national emergency response (112) and zero-FIR rights.',
        summary: '{playerName} is trapped in an escalating domestic emergency where an aggressor is attempting to force open a locked room door.',
        learningGoal: 'Operate 112 emergency response, give clear location milestones to dispatchers, and register a Zero-FIR with a female police officer.'
      },
      hi: {
        title: 'निर्णायक मोड़',
        tagline: 'तत्काल जानलेवा हमला: राष्ट्रीय आपातकालीन सेवा 112 को सक्रिय करें और जीरो एफआईआर के अधिकार जानें।',
        summary: '{playerName} एक गंभीर आपात स्थिति में फंसी है जहां हमलावर कमरे का दरवाजा तोड़ने की कोशिश कर रहा है।',
        learningGoal: '112 आपातकालीन नंबर का त्वरित उपयोग करें, पुलिस डिस्पैचर को सही पता दें और महिला अधिकारी से जीरो एफआईआर दर्ज कराएं।'
      }
    },
    scenes: [
      {
        id: 'm11_s01',
        sceneOrder: 1,
        sceneType: 'decision',
        characterCode: 'hero',
        backgroundKey: 'locked_room_night',
        musicCue: 'ambient_suspense',
        translations: {
          en: {
            title: 'Behind the Latched Door',
            environmentName: 'Locked Bedroom',
            narrativeText: 'Violent thuds shake the wooden door as the aggressor screams profanities outside. The lock bolt is bending under force. You have minutes before breach.',
            promptText: 'Your physical sanctuary is about to fail. What is your immediate call?'
          },
          hi: {
            title: 'बंद दरवाजे के पीछे',
            environmentName: 'अंदर से बंद कमरा',
            narrativeText: 'दरवाजे पर लगातार तेज वार हो रहे हैं और बाहर से हमलावर जान से मारने की धमकियां दे रहा है। कुंडी मुड़ने लगी है। आपके पास कुछ ही मिनट हैं।',
            promptText: 'दरवाजा किसी भी पल टूट सकता है। आप तुरंत क्या करेंगी?'
          }
        },
        dialogues: [
          {
            id: 'm11_s01_d01',
            dialogueOrder: 1,
            speakerType: 'hero',
            characterCode: 'hero',
            emotion: 'alert',
            translations: {
              en: {
                speakerName: '{playerName}',
                dialogueText: '',
                thoughtText: 'I must dial 112 immediately. Keep my voice steady and state: exact street, landmark, floor number, and immediate violent breach.'
              },
              hi: {
                speakerName: '{playerName}',
                dialogueText: '',
                thoughtText: 'मुझे तुरंत 112 डायल करना होगा। घबराए बिना सही पता, मुख्य लैंडमार्क, मंजिल और जान के खतरे की बात कहनी होगी।'
              }
            }
          }
        ],
        choices: [
          {
            id: 'm11_s01_c01',
            choiceOrder: 1,
            isCorrect: 1,
            safetyScoreDelta: 25,
            boundariesDelta: 20,
            supportDelta: 25,
            sfxEmotion: 'ping',
            nextSceneOrder: 2,
            translations: {
              en: {
                choiceText: 'Dial 112, state clearly: "Female under violent domestic assault, address [Street + Landmark + Flat #], door being breached right now, dispatch PCR immediately."',
                feedbackText: 'Textbook emergency communication! Clear, concise distress details allow dispatchers to assign highest priority PCR response.',
                educationalTip: '112 automatically captures GPS towers; stating prominent landmarks speeds up the local patrol car.'
              },
              hi: {
                choiceText: '112 मिलाएं और स्पष्ट कहें: "महिला पर जानलेवा हमला हो रहा है, पता [गली + लैंडमार्क + फ्लैट नंबर], दरवाजा तोड़ा जा रहा है, तुरंत पीसीआर वैन भेजें।"',
                feedbackText: 'उत्कृष्ट आपातकालीन कॉल! सटीक विवरण से पुलिस नियंत्रण कक्ष तुरंत निकटतम पीसीआर वैन को सायरन के साथ रवाना करता है।',
                educationalTip: '112 पर कॉल करते ही पुलिस को नजदीकी लैंडमार्क और सही फ्लैट नंबर बताना सबसे महत्वपूर्ण होता है।'
              }
            }
          },
          {
            id: 'm11_s01_c02',
            choiceOrder: 2,
            isCorrect: 0,
            safetyScoreDelta: -25,
            boundariesDelta: 0,
            supportDelta: -20,
            sfxEmotion: 'shock',
            nextSceneOrder: 1,
            translations: {
              en: {
                choiceText: 'Start writing a long Facebook post asking if any friends happen to be awake.',
                feedbackText: 'Wasting critical minutes on social media during a physical breach can have fatal consequences.',
                educationalTip: 'Always call emergency lifelines (112) first before reaching out to social networks.'
              },
              hi: {
                choiceText: 'फेसबुक पर लंबा पोस्ट लिखकर पूछें कि क्या कोई दोस्त इस समय जाग रहा है।',
                feedbackText: 'हमले के दौरान सोशल मीडिया पर समय बर्बाद करना जानलेवा भूल साबित हो सकता है।',
                educationalTip: 'जान का खतरा होने पर बिना एक सेकंड गंवाए सीधे 112 डायल करें।'
              }
            }
          }
        ]
      },
      {
        id: 'm11_s02',
        sceneOrder: 2,
        sceneType: 'decision',
        characterCode: 'kavita_officer',
        backgroundKey: 'police_station_desk',
        musicCue: 'ambient_calm',
        translations: {
          en: {
            title: 'Police Intervention & Zero FIR',
            environmentName: 'Police Station / Intercept Vehicle',
            narrativeText: 'Sirens wail as the PCR van arrives in 6 minutes, restraining the abuser. At the police station, the duty officer hesitates, stating the incident happened in another jurisdiction.',
            promptText: 'What is your constitutional right regarding jurisdiction under the Supreme Court of India guidelines?'
          },
          hi: {
            title: 'पुलिस कार्रवाई और जीरो एफआईआर',
            environmentName: 'थाना परिसर',
            narrativeText: 'पीसीआर वैन 6 मिनट में सायरन बजाते हुए पहुंचती है और हमलावर को काबू करती है। थाने में मुंशी कहता है कि यह इलाका दूसरे थाने में पड़ता है।',
            promptText: 'सुप्रीम कोर्ट के दिशानिर्देशों के अनुसार क्षेत्राधिकार पर आपका क्या संवैधानिक अधिकार है?'
          }
        },
        dialogues: [
          {
            id: 'm11_s02_d01',
            dialogueOrder: 1,
            speakerType: 'npc',
            characterCode: 'kavita_officer',
            emotion: 'supportive',
            translations: {
              en: {
                speakerName: 'Officer Kavita',
                dialogueText: '"As a woman officer, I am recording your statement. A Zero FIR can be filed at any police station irrespective of jurisdiction."'
              },
              hi: {
                speakerName: 'महिला अधिकारी कविता',
                dialogueText: '"मैं महिला पुलिस अधिकारी के तौर पर आपका बयान दर्ज कर रही हूँ। कानूनन जीरो एफआईआर किसी भी थाने में दर्ज की जा सकती है, चाहे घटना कहीं भी हुई हो।"'
              }
            }
          }
        ],
        choices: [
          {
            id: 'm11_s02_c01',
            choiceOrder: 1,
            isCorrect: 1,
            safetyScoreDelta: 25,
            boundariesDelta: 20,
            supportDelta: 25,
            sfxEmotion: 'relief',
            nextSceneOrder: 3,
            translations: {
              en: {
                choiceText: 'Demand registration of a "Zero FIR" immediately, request medical examination under Section 164A CrPC, and obtain a free signed copy of the FIR.',
                feedbackText: 'The pinnacle of legal awareness! A Zero FIR mandates immediate investigation regardless of territorial jurisdiction, and complainants have a statutory right to a free copy.',
                educationalTip: 'Supreme Court mandates: Police cannot refuse to register an FIR on jurisdictional grounds. Zero FIR must be accepted anywhere.'
              },
              hi: {
                choiceText: '"जीरो एफआईआर" दर्ज करने की मांग करें, धारा 164A के तहत मेडिकल कराएं और एफआईआर की निःशुल्क हस्ताक्षरित प्रति लें।',
                feedbackText: 'कानूनी सजगता की मिसाल! जीरो एफआईआर दर्ज करने से कोई भी थाना इनकार नहीं कर सकता और एफआईआर की कॉपी मुफ्त पाना आपका अधिकार है।',
                educationalTip: 'सुप्रीम कोर्ट का सख्त निर्देश है कि क्षेत्राधिकार का बहाना बनाकर पुलिस एफआईआर से मना नहीं कर सकती; जीरो एफआईआर कहीं भी दर्ज होगी।'
              }
            }
          },
          {
            id: 'm11_s02_c02',
            choiceOrder: 2,
            isCorrect: 0,
            safetyScoreDelta: -10,
            boundariesDelta: -5,
            supportDelta: -10,
            sfxEmotion: 'shock',
            nextSceneOrder: 2,
            translations: {
              en: {
                choiceText: 'Agree to an informal apology letter and go back home with the abuser that same night.',
                feedbackText: 'Returning home immediately after severe violence without legal restraint leads directly to catastrophic repeat assaults.',
                educationalTip: 'Never compromise on severe physical assault without statutory protection orders.'
              },
              hi: {
                choiceText: 'आरोपी के माफीनामे पर राजी हो जाएं और उसी रात उसके साथ वापस घर लौट जाएं।',
                feedbackText: 'गंभीर हमले के बाद बिना किसी कानूनी सुरक्षा के वापस लौटना जानलेवा साबित हो सकता है।',
                educationalTip: 'गंभीर मारपीट के बाद बिना कानूनी सुरक्षा आदेश के कभी भी उसी घर में न लौटें।'
              }
            }
          }
        ]
      },
      {
        id: 'm11_s03',
        sceneOrder: 3,
        sceneType: 'outcome',
        characterCode: 'hero',
        backgroundKey: 'morning_safe_haven',
        musicCue: 'victory_theme',
        translations: {
          en: {
            title: 'The Storm Passed',
            environmentName: 'Safe Transit Haven',
            narrativeText: 'The Zero FIR is registered, the medical examination is preserved as forensic evidence, and {playerName} is housed under protective custody. She survived the breaking point.',
            promptText: 'Mission Complete! You navigated the highest crisis with courage and law.'
          },
          hi: {
            title: 'तूफान के पार',
            environmentName: 'सुरक्षित सरकारी आश्रय',
            narrativeText: 'जीरो एफआईआर दर्ज हो चुकी है, मेडिकल साक्ष्य सुरक्षित हैं और {playerName} पूर्ण सुरक्षा में है। उसने निर्णायक मोड़ पर हिम्मत और कानून से जीत हासिल की।',
            promptText: 'मिशन संपन्न! आपने सबसे कठिन संकट को साहस और कानून से जीता।'
          }
        },
        dialogues: [
          {
            id: 'm11_s03_d01',
            dialogueOrder: 1,
            speakerType: 'hero',
            characterCode: 'hero',
            emotion: 'victorious',
            translations: {
              en: {
                speakerName: '{playerName}',
                dialogueText: '"In the darkest hour, the emergency lifelines and the law are our shields. Never hesitate to call."'
              },
              hi: {
                speakerName: '{playerName}',
                dialogueText: '"संकट की सबसे काली रात में भी 112 और कानून हमारी ढाल हैं। कभी भी मदद मांगने से न हिचकिचाएं।"'
              }
            }
          }
        ],
        choices: [
          {
            id: 'm11_s03_c01',
            choiceOrder: 1,
            isCorrect: 1,
            safetyScoreDelta: 10,
            boundariesDelta: 10,
            supportDelta: 10,
            sfxEmotion: 'victory',
            nextSceneOrder: 3,
            translations: {
              en: {
                choiceText: 'Unlock Emergency Master badge.',
                feedbackText: 'Emergency Master unlocked!',
                educationalTip: 'ERSS 112 coordinates Police, Ambulance, and Fire through a unified state dispatch center.'
              },
              hi: {
                choiceText: 'संकटमोचक पदक प्राप्त करें।',
                feedbackText: 'संकटमोचक पदक प्रदान किया गया!',
                educationalTip: '112 आपातकालीन सेवा पुलिस, एम्बुलेंस और फायर ब्रिगेड तीनों को एक साथ नियंत्रित करती है।'
              }
            }
          }
        ]
      }
    ]
  },

  // -------------------------------------------------------------------------
  // M12: A NEW BEGINNING
  // -------------------------------------------------------------------------
  {
    id: 'm12_a_new_beginning',
    slug: 'a-new-beginning',
    number: 12,
    category: 'recovery_empowerment',
    difficulty: 'Advanced',
    estimatedMinutes: 9,
    badgeName: 'PHOENIX RISING',
    badgeIcon: 'Sparkles',
    badgeDescription: 'Completed all 12 quests, forging lifelong independence and empowering others.',
    translations: {
      en: {
        title: 'A New Beginning',
        tagline: 'Life after survival: trauma recovery, emotional reclamation, and mentoring future Sheroes.',
        summary: '{playerName} enters her own independent studio apartment. She confronts the lingering shadows of trauma, learns self-compassion, and builds a supportive sisterhood.',
        learningGoal: 'Process trauma through qualified mental health care (iCall, Vandrevala), build independent supportive networks, and achieve enduring empowerment.'
      },
      hi: {
        title: 'एक नई शुरुआत',
        tagline: 'संघर्ष के बाद स्वाभिमान की जिंदगी: मानसिक आघात से उबरना और अन्य बहनों का संबल बनना।',
        summary: '{playerName} अपने नए स्वतंत्र आशियाने में कदम रखती है। वह पुराने आघातों के डर को पीछे छोड़कर मानसिक स्वास्थ्य, आत्म-विश्वास और स्वावलंबन की राह चुनती है।',
        learningGoal: 'पेशेवर मनोवैज्ञानिक परामर्श (iCall) से आघात से उबरें, स्वतंत्र जीवन नेटवर्क बनाएं और दूसरों को सशक्त करें।'
      }
    },
    scenes: [
      {
        id: 'm12_s01',
        sceneOrder: 1,
        sceneType: 'decision',
        characterCode: 'hero',
        backgroundKey: 'independent_apartment_sunlight',
        musicCue: 'ambient_calm',
        translations: {
          en: {
            title: 'The Sunlight on the Floor',
            environmentName: 'Independent Studio Apartment',
            narrativeText: 'Keys in hand, {playerName} stands in her new sunlit apartment. It is peaceful, but suddenly a passing car horn outside triggers a sharp flashback and hypervigilant anxiety.',
            promptText: 'A trauma trigger has spiked your heart rate in your safe space. How do you respond?'
          },
          hi: {
            title: 'चौखट पर धूप',
            environmentName: 'नया स्वतंत्र फ्लैट',
            narrativeText: 'हाथ में नई चाबियां लिए {playerName} अपने नए धूप से भरे कमरे में खड़ी है। सब शांत है, लेकिन बाहर अचानक बजने वाला हॉर्न उसे पुराने खौफ की याद दिला देता है।',
            promptText: 'अतीत के आघात से अचानक दिल की धड़कन तेज हो गई है। आप खुद को कैसे संभालेंगी?'
          }
        },
        dialogues: [
          {
            id: 'm12_s01_d01',
            dialogueOrder: 1,
            speakerType: 'hero',
            characterCode: 'hero',
            emotion: 'vulnerable',
            translations: {
              en: {
                speakerName: '{playerName}',
                dialogueText: '',
                thoughtText: 'My chest feels tight. My body is reacting as if the danger is still present, even though the door is locked and I am safe.'
              },
              hi: {
                speakerName: '{playerName}',
                dialogueText: '',
                thoughtText: 'मेरी सांसें भारी हो रही हैं। मेरा शरीर अब भी उसी डर में है, जबकि दरवाजा सुरक्षित रूप से बंद है और मैं आजाद हूँ।'
              }
            }
          }
        ],
        choices: [
          {
            id: 'm12_s01_c01',
            choiceOrder: 1,
            isCorrect: 0,
            safetyScoreDelta: -10,
            boundariesDelta: 0,
            supportDelta: -15,
            sfxEmotion: 'afraid',
            nextSceneOrder: 1,
            translations: {
              en: {
                choiceText: 'Berate yourself angrily for being weak, and isolate yourself with all curtains drawn.',
                feedbackText: 'Self-blame and sensory deprivation deepen post-traumatic isolation.',
                educationalTip: 'Trauma triggers are biological nervous system responses, not personal weaknesses.'
              },
              hi: {
                choiceText: 'खुद को कमजोर कहकर कोसें और खिड़की-दरवाजे बंद करके अंधेरे में बैठ जाएं।',
                feedbackText: 'खुद को कोसने और अंधेरे में कैद करने से मानसिक आघात और गहरा होता है।',
                educationalTip: 'डर लगना शरीर का स्वाभाविक तंत्रिका तंत्र संकेत है, यह आपकी कोई कमजोरी नहीं है।'
              }
            }
          },
          {
            id: 'm12_s01_c02',
            choiceOrder: 2,
            isCorrect: 1,
            safetyScoreDelta: 25,
            boundariesDelta: 20,
            supportDelta: 25,
            sfxEmotion: 'ping',
            nextSceneOrder: 2,
            translations: {
              en: {
                choiceText: 'Practice 5-4-3-2-1 sensory grounding, drink water, and remind yourself: "I am safe here. The danger is in the past."',
                feedbackText: 'Somatic trauma regulation at its finest! Grounding re-anchors the nervous system into the present safe reality.',
                educationalTip: 'Sensory grounding: 5 things you see, 4 you feel, 3 you hear, 2 you smell, 1 you taste.'
              },
              hi: {
                choiceText: '5-4-3-2-1 ग्राउंडिंग तकनीक अपनाएं, पानी पिएं और खुद को याद दिलाएं: "मैं यहाँ सुरक्षित हूँ। खतरा अब बीत चुका है।"',
                feedbackText: 'अद्भुत मनोवैज्ञानिक संतुलन! ग्राउंडिंग तकनीक दिमाग को वर्तमान की सुरक्षित स्थिति में वापस लाती है।',
                educationalTip: '5 चीजें देखें, 4 को छुएं, 3 सुनें, 2 सूंघें और 1 का स्वाद महसूस करें - यह मन को तुरंत शांत करता है।'
              }
            }
          }
        ]
      },
      {
        id: 'm12_s02',
        sceneOrder: 2,
        sceneType: 'decision',
        characterCode: 'dr_meera',
        backgroundKey: 'counseling_room_warm',
        musicCue: 'ambient_calm',
        translations: {
          en: {
            title: 'Professional Healing and Community',
            environmentName: 'Trauma-Informed Therapy Clinic',
            narrativeText: '{playerName} attends regular sessions with Dr. Meera (iCall Psychosocial Counselor). She is invited to join a peer community of women survivors starting micro-enterprises.',
            promptText: 'What is the most sustainable foundation for lifelong emotional sovereignty?'
          },
          hi: {
            title: 'मानसिक उपचार और नई राह',
            environmentName: 'परामर्श क्लिनिक',
            narrativeText: '{playerName} डॉ. मीरा के साथ नियमित काउंसलिंग सत्र लेती है। उसे आत्मनिर्भर महिलाओं के एक नए समुदाय से जुड़ने का अवसर मिलता है।',
            promptText: 'जीवन भर की भावनात्मक और सामाजिक आजादी की सबसे मजबूत नींव क्या है?'
          }
        },
        dialogues: [
          {
            id: 'm12_s02_d01',
            dialogueOrder: 1,
            speakerType: 'npc',
            characterCode: 'dr_meera',
            emotion: 'supportive',
            translations: {
              en: {
                speakerName: 'Dr. Meera',
                dialogueText: '"Healing is not forgetting; it is realizing that the trauma no longer dictates who you are or what you can achieve."'
              },
              hi: {
                speakerName: 'डॉ. मीरा',
                dialogueText: '"घाव भरने का मतलब अतीत को भुलाना नहीं, बल्कि यह समझना है कि वह बीता हुआ दर्द अब आपका भविष्य तय नहीं कर सकता।"'
              }
            }
          }
        ],
        choices: [
          {
            id: 'm12_s02_c01',
            choiceOrder: 1,
            isCorrect: 1,
            safetyScoreDelta: 25,
            boundariesDelta: 25,
            supportDelta: 25,
            sfxEmotion: 'relief',
            nextSceneOrder: 3,
            translations: {
              en: {
                choiceText: 'Commit to regular therapy, develop your professional craft, and participate in peer-led support groups.',
                feedbackText: 'The holy trinity of empowerment: mental health support, economic mastery, and sisterhood solidarity.',
                educationalTip: 'Survivors who engage supportive community circles show 4x higher long-term recovery resilience.'
              },
              hi: {
                choiceText: 'नियमित काउंसलिंग जारी रखें, अपने हुनर को निखारें और सहयोगी बहनों के समूह से जुड़ें।',
                feedbackText: 'स्वावलंबन की सबसे मजबूत राह: मानसिक स्वास्थ्य, आर्थिक हुनर और बहनों की एकजुटता।',
                educationalTip: 'सहानुभूतिपूर्ण समुदाय से जुड़ी महिलाएं जीवन में 4 गुना तेजी से नए मुकाम हासिल करती हैं।'
              }
            }
          },
          {
            id: 'm12_s02_c02',
            choiceOrder: 2,
            isCorrect: 0,
            safetyScoreDelta: -10,
            boundariesDelta: -10,
            supportDelta: -10,
            sfxEmotion: 'shock',
            nextSceneOrder: 2,
            translations: {
              en: {
                choiceText: 'Pretend nothing ever happened and avoid talking about mental health with anyone.',
                feedbackText: 'Repression traps emotional distress in the body and delays true recovery.',
                educationalTip: 'Acknowledging pain with qualified professionals is the true path to lasting resilience.'
              },
              hi: {
                choiceText: 'दिखावा करें कि कुछ हुआ ही नहीं और मानसिक स्वास्थ्य पर बात करने से बचें।',
                feedbackText: 'भावनाओं को दबाने से दर्द खत्म नहीं होता, बल्कि आगे चलकर और गंभीर रूप ले लेता है।',
                educationalTip: 'पेशेवर काउंसलर की मदद से भावनाओं को स्वीकारना ही सच्ची मजबूती की शुरुआत है।'
              }
            }
          }
        ]
      },
      {
        id: 'm12_s03',
        sceneOrder: 3,
        sceneType: 'outcome',
        characterCode: 'hero',
        backgroundKey: 'community_center_stage',
        musicCue: 'grand_celebration',
        translations: {
          en: {
            title: 'The Phoenix of Freedom',
            environmentName: 'Empowerment Auditorium',
            narrativeText: '{playerName} stands on the stage of the SHERO Community Hub, addressing dozens of young women beginning their own journeys. She is no longer just a survivor; she is an inspiring mentor and an unstoppable force.',
            promptText: 'Grand Quest Complete! All 12 missions mastered.'
          },
          hi: {
            title: 'स्वावलंबन की नई सुबह',
            environmentName: 'सशक्तिकरण सभागार',
            narrativeText: '{playerName} शेरो कम्युनिटी हब के मंच पर खड़ी है और सैकड़ों युवा बहनों को संबोधित कर रही है। अब वह सिर्फ एक पीड़िता नहीं, बल्कि एक मार्गदर्शक और अटूट शक्ति का प्रतीक बन चुकी है।',
            promptText: 'महा-अभियान संपन्न! सभी 12 मिशन सफलता से पूरे हुए।'
          }
        },
        dialogues: [
          {
            id: 'm12_s03_d01',
            dialogueOrder: 1,
            speakerType: 'hero',
            characterCode: 'hero',
            emotion: 'triumphant',
            translations: {
              en: {
                speakerName: '{playerName}',
                dialogueText: '"We walked through the dark bus stops, the crowded trains, the silent kitchens, and the courtrooms. Today, we stand tall, sovereign and fearless. Every woman has a SHERO within."'
              },
              hi: {
                speakerName: '{playerName}',
                dialogueText: '"हम अंधेरे बस स्टॉप, भीड़भाड़ वाली ट्रेनों, बंद कमरों और अदालतों के रास्तों से गुजरे। आज हम सिर उठाकर निडर खड़े हैं। हर महिला के भीतर एक शेरो मौजूद है।"'
              }
            }
          }
        ],
        choices: [
          {
            id: 'm12_s03_c01',
            choiceOrder: 1,
            isCorrect: 1,
            safetyScoreDelta: 50,
            boundariesDelta: 50,
            supportDelta: 50,
            sfxEmotion: 'victory',
            nextSceneOrder: 3,
            translations: {
              en: {
                choiceText: 'Claim the ultimate badge: PHOENIX OF FREEDOM.',
                feedbackText: 'Congratulations! You have achieved maximum safety mastery across all 12 missions.',
                educationalTip: 'Share your knowledge. Empowering another woman multiplies the safety of the entire nation.'
              },
              hi: {
                choiceText: 'सर्वोच्च पदक प्राप्त करें: स्वावलंबन की उड़ान (Phoenix of Freedom)',
                feedbackText: 'हार्दिक बधाई! आपने सभी 12 मिशनों में पूर्ण सुरक्षा दक्षता हासिल कर ली है।',
                educationalTip: 'अपने ज्ञान को साझा करें। जब एक महिला सशक्त होती है, तो पूरा समाज सुरक्षित बनता है।'
              }
            }
          }
        ]
      }
    ]
  }
];
