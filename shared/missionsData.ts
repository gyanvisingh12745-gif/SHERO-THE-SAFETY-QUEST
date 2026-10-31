import { Mission, SupportResource } from './types';

export const MISSIONS: Mission[] = [
  // =========================================================================
  // CHAPTER 1 — A JOURNEY HOME (Original Street-Safety Adventure)
  // =========================================================================
  {
    id: 'mission-1',
    number: 1,
    chapterNumber: 1,
    chapterName: 'A Journey Home',
    isStoryChapter: true,
    title: 'A Journey Home',
    tagline: 'Dusk falls over the transit hub, and an unexpected stranger closes the distance.',
    domain: 'Public Transport & Commute Safety',
    environmentName: 'City Bus Stop at Dusk',
    badgeName: 'COMMUTE GUARDIAN',
    badgeIcon: 'ShieldCheck',
    badgeDescription: 'Mastered commute situational awareness and safe transit navigation.',
    difficulty: 'Beginner',
    summary: 'Aira waits for her evening bus when an unknown man persistently approaches and tests personal space boundaries.',
    learningGoal: 'Recognize boundary testing early, shift to illuminated staffed zones, and verify arrival protocols.',
    startNodeId: 'm1_node_1',
    nodes: {
      m1_node_1: {
        id: 'm1_node_1',
        decisionNumber: 1,
        situation: 'Dusk has settled over the transit terminal. Aira stands near a dimly lit edge of the bus shelter. A stranger steps closer, ignoring her clear physical step back and asking invasive questions about where she lives alone.',
        speaker: 'Stranger',
        dialogue: '"Hey, you\'re waiting alone? I can drop you home in my car. Come sit over here by the shadows."',
        heroResponseDialogue: '"No, thank you. I am fine waiting right here, and I am calling someone I trust."',
        strangerType: 'cap_hoodie',
        airaThought: 'He keeps closing the gap even though I deliberately stepped away. Waiting in this dark corner alone feels unsafe.',
        exclamatoryPrompt: 'THUMP THUMP!',
        choices: [
          {
            id: 'm1_c1_a',
            text: 'Ignore him silently, put on noise-cancelling headphones, and stay in the dark corner.',
            isCorrect: false,
            feedback: 'Blocking your hearing and remaining isolated in a dim area eliminates situational awareness and leaves you vulnerable.',
            educationalTip: 'Never block your auditory senses when dealing with persistent strangers in low-visibility transit points.',
            sfxEmotion: 'afraid',
            safetyDelta: -15
          },
          {
            id: 'm1_c1_b',
            text: 'Move immediately towards the brightly lit convenience store with cashier staff and waiting commuters.',
            isCorrect: true,
            feedback: 'Excellent choice! Moving promptly toward a well-lit space with active staff and other pedestrians naturally deters unwanted contact.',
            educationalTip: 'Distance and public visibility are your strongest first-line defenses in transit environments.',
            sfxEmotion: 'ping',
            safetyDelta: 15,
            boundariesDelta: 10
          },
          {
            id: 'm1_c1_c',
            text: 'Confront him aggressively with insults and demand to know why he is looking at you.',
            isCorrect: false,
            feedback: 'Escalating hostile language with an unknown person when alone in an isolated spot risks triggering physical aggression.',
            educationalTip: 'De-escalate or disengage toward populated areas rather than engaging in aggressive verbal confrontations alone.',
            sfxEmotion: 'shock',
            safetyDelta: -10
          }
        ],
        winningNextNodeId: 'm1_node_2'
      },
      m1_node_2: {
        id: 'm1_node_2',
        decisionNumber: 2,
        situation: 'Aira is now standing just outside the brightly lit 24/7 store. The stranger lingered near the shelter bench looking over. Aira has 8 minutes before the scheduled bus.',
        speaker: 'Convenience Store Clerk',
        dialogue: '"Good evening! Welcome. Feel free to wait by the window counter if you\'re waiting for the 42 line."',
        heroResponseDialogue: '"Thank you so much! I\'ll stay right by the window where it\'s well lit."',
        strangerType: 'bearded',
        airaThought: 'I am in a safe visual spot now, but I need to make sure someone knows my commute status in real time.',
        exclamatoryPrompt: 'PING!',
        choices: [
          {
            id: 'm1_c2_a',
            text: 'Send a quick live location share and transit update to a trusted family member or friend.',
            isCorrect: true,
            feedback: 'Smart action! Live location sharing and proactive check-ins provide an immediate safety tether without drawing unwanted attention.',
            educationalTip: 'Always keep at least one trusted contact informed of your route and estimated arrival when commuting late.',
            sfxEmotion: 'relief',
            safetyDelta: 15,
            supportDelta: 15
          },
          {
            id: 'm1_c2_b',
            text: 'Post a public story on social media tagging your exact real-time coordinates asking if anyone is nearby.',
            isCorrect: false,
            feedback: 'Broadcasting your real-time vulnerability and exact location to public social networks compromises your digital and physical safety.',
            educationalTip: 'Never broadcast real-time locations to public feeds; use private, designated trusted contacts.',
            sfxEmotion: 'shock',
            safetyDelta: -15
          },
          {
            id: 'm1_c2_c',
            text: 'Step back out into the alley behind the bus shelter to hide until the bus headlights appear.',
            isCorrect: false,
            feedback: 'Retreating into an unlit, blind alley removes you from natural surveillance and limits your exit routes completely.',
            educationalTip: 'Stay in the open where store staff, cameras, and passerby pedestrians provide natural surveillance.',
            sfxEmotion: 'afraid',
            safetyDelta: -15
          }
        ],
        winningNextNodeId: 'm1_node_3'
      },
      m1_node_3: {
        id: 'm1_node_3',
        decisionNumber: 3,
        situation: 'The bus pulls up to the curb. The stranger abruptly gets up from the bench and heads for the same rear door. The front door is open next to the driver.',
        speaker: 'Bus Driver',
        dialogue: '"Line 42 Downtown Express. Boarding now."',
        heroResponseDialogue: '"Understood! I\'m boarding right by the front door near the operator."',
        strangerType: 'bearded',
        airaThought: 'I see him heading deliberately for the quiet rear section. How should I board?',
        exclamatoryPrompt: 'GASP!',
        choices: [
          {
            id: 'm1_c3_a',
            text: 'Rush quickly to the upper deck back row where it is completely empty and dark.',
            isCorrect: false,
            feedback: 'Isolating yourself in secluded rows away from passengers and operators removes access to immediate bystander assistance.',
            educationalTip: 'On public transit late at night, seat yourself in well-lit areas close to the driver or conductor.',
            sfxEmotion: 'afraid',
            safetyDelta: -10
          },
          {
            id: 'm1_c3_b',
            text: 'Board through the front doors, greet the operator, and take a seat in the forward section within clear sight of the driver.',
            isCorrect: true,
            feedback: 'Outstanding decision! Positioning near the transit operator and security cameras deters targeted harassment and ensures immediate help.',
            educationalTip: 'Transit operators are trained safety liaisons; sitting in their direct line of sight maximizes deterrence.',
            sfxEmotion: 'relief',
            safetyDelta: 20,
            boundariesDelta: 10
          },
          {
            id: 'm1_c3_c',
            text: 'Step onto the bus and block the rear doors arguing with the stranger about why he took the same bus.',
            isCorrect: false,
            feedback: 'Blocking vehicle exits and escalating in transit traps you in an enclosed space with a volatile individual.',
            educationalTip: 'Prioritize physical safety and operator proximity over debating why someone boarded.',
            sfxEmotion: 'shock',
            safetyDelta: -10
          }
        ],
        winningNextNodeId: 'VICTORY'
      }
    },
    victoryEnding: {
      title: 'Safe Arrival Guaranteed',
      description: 'You navigated dusk transit with poise, recognized subtle boundary testing, and prioritized verified public zones.',
      takeaway: 'Visibility, distance, and proactive check-ins form an impenetrable shield in public spaces.'
    }
  },

  // =========================================================================
  // CHAPTER 2 — AN UNCOMFORTABLE ENCOUNTER (Urban Awareness & Stalking)
  // =========================================================================
  {
    id: 'mission-2',
    number: 2,
    chapterNumber: 2,
    chapterName: 'An Uncomfortable Encounter',
    isStoryChapter: true,
    title: 'An Uncomfortable Encounter',
    tagline: 'Footsteps match your cadence in a quiet corridor. Instincts whisper that you are being tracked.',
    domain: 'Walking Alone & Urban Awareness',
    environmentName: 'Narrow Urban Night Corridor',
    badgeName: 'SHADOW DEFLECTOR',
    badgeIcon: 'Eye',
    badgeDescription: 'Identified intentional foot tracking, altered route, and executed a safe public refuge protocol.',
    difficulty: 'Beginner',
    summary: 'Aira walks through a quiet urban corridor and notices an individual mimicking her turns and closing the distance.',
    learningGoal: 'Verify tracking using direction changes, avoid blind corners, and divert toward active commercial sanctuaries.',
    startNodeId: 'm2_node_1',
    nodes: {
      m2_node_1: {
        id: 'm2_node_1',
        decisionNumber: 1,
        situation: 'Aira takes a shortcut down a quieter avenue. She slows down; the footsteps behind slow down. She speeds up; the footsteps match her speed and close the gap.',
        speaker: 'Shadow Tracker',
        dialogue: '"Excuse me! Hey, miss with the backpack! Wait up, why are you walking so fast?"',
        heroResponseDialogue: '"I am on my way to meet friends at Moonlight Café right now. Please keep your distance."',
        strangerType: 'sunglasses',
        airaThought: 'This is not a coincidence. Someone is deliberately pacing my footsteps. I need to verify before panicking.',
        exclamatoryPrompt: 'THUMP THUMP!',
        choices: [
          {
            id: 'm2_c1_a',
            text: 'Turn abruptly down a narrow, unlit pedestrian service alley hoping to lose him in the dark.',
            isCorrect: false,
            feedback: 'Entering an unlit dead-end alley removes visibility, eliminates bystanders, and traps you in a high-risk bottleneck.',
            educationalTip: 'Never escape into darker or narrower spaces; always steer towards wider, well-lit, populated thoroughfares.',
            sfxEmotion: 'afraid',
            safetyDelta: -20
          },
          {
            id: 'm2_c1_b',
            text: 'Perform an intentional street crossing at the illuminated intersection to confirm tracking while maintaining a wide berth.',
            isCorrect: true,
            feedback: 'Smart diagnostic tactic! Crossing the street tests intent without cornering yourself and creates visual distance.',
            educationalTip: 'A deliberate street crossing or 90-degree turn is the gold-standard test to verify if someone is following you.',
            sfxEmotion: 'ping',
            safetyDelta: 15,
            boundariesDelta: 10
          },
          {
            id: 'm2_c1_c',
            text: 'Freeze in your tracks, close your eyes, and pretend you do not hear anyone behind you.',
            isCorrect: false,
            feedback: 'Freezing on an empty sidewalk surrenders your initiative and allows a pursuer to close distance unchallenged.',
            educationalTip: 'Maintain mobility and keep moving toward populated safe havens when feeling watched.',
            sfxEmotion: 'afraid',
            safetyDelta: -10
          }
        ],
        winningNextNodeId: 'm2_node_2'
      },
      m2_node_2: {
        id: 'm2_node_2',
        decisionNumber: 2,
        situation: 'The individual crosses the street as well and speeds up, clearly following. Up ahead on the corner is Moonlight Café with bright windows, an open patio, and customers dining.',
        speaker: 'Café Barista',
        dialogue: '"Good evening! Table for one inside, or would you like to sit by the barista counter?"',
        heroResponseDialogue: '"Hello! I need to sit right by the counter, please. Someone was following me outside."',
        strangerType: 'bearded',
        airaThought: 'There is an open business ahead. I must not lead an unknown follower to my private home doorway.',
        exclamatoryPrompt: 'GASP!',
        choices: [
          {
            id: 'm2_c2_a',
            text: 'Divert directly into Moonlight Café, inform the staff calmly that you are being followed, and request to wait inside.',
            isCorrect: true,
            feedback: 'Brilliant action! Entering an active commercial establishment creates immediate deterrence and introduces witnesses and safe shelter.',
            educationalTip: 'Never lead a suspected follower to your home or residence; always divert to a staffed public sanctuary.',
            sfxEmotion: 'relief',
            safetyDelta: 20,
            supportDelta: 10
          },
          {
            id: 'm2_c2_b',
            text: 'Sprint frantically straight to your private apartment building entrance and fumble for your keys at the front door.',
            isCorrect: false,
            feedback: 'Leading a follower to your residence reveals your home address and fumbling with keys creates a vulnerable bottleneck.',
            educationalTip: 'Leading pursuers to your doorstep compromises your long-term residential security.',
            sfxEmotion: 'afraid',
            safetyDelta: -15
          },
          {
            id: 'm2_c2_c',
            text: 'Hide behind a parked car in the dimly lit parking lot until you think he walks past.',
            isCorrect: false,
            feedback: 'Hiding behind vehicles limits your field of view and leaves you vulnerable to being cornered without egress.',
            educationalTip: 'Avoid ducking behind parked cars; stay upright and move into open commercial storefronts.',
            sfxEmotion: 'shock',
            safetyDelta: -15
          }
        ],
        winningNextNodeId: 'm2_node_3'
      },
      m2_node_3: {
        id: 'm2_node_3',
        decisionNumber: 3,
        situation: 'From inside the café, Aira observes through the window. The individual lingers outside for a moment, notices the café cameras and staff looking back, and turns away down the street.',
        speaker: 'Café Manager',
        dialogue: '"He just walked away towards the subway. Would you like us to call campus security or the local police escort to accompany you home?"',
        heroResponseDialogue: '"Yes, please. I\'ll also call my trusted friend to coordinate a safe pickup."',
        strangerType: 'bearded',
        airaThought: 'The immediate threat has passed, but I need to close out this incident safely and document it.',
        exclamatoryPrompt: 'PING!',
        choices: [
          {
            id: 'm2_c3_a',
            text: 'Accept the café manager\'s offer to contact official local security / police escort and coordinate a verified pickup with your circle.',
            isCorrect: true,
            feedback: 'Perfect protocol execution! Utilizing institutional support and verified transport ensures you reach home safely.',
            educationalTip: 'Always close out a harassment event by securing a safe transit escort rather than walking back out alone.',
            sfxEmotion: 'relief',
            safetyDelta: 20,
            supportDelta: 15,
            boundariesDelta: 10
          },
          {
            id: 'm2_c3_b',
            text: 'Slip out the café back door immediately and run through the unlit service alleys to prove you are fearless.',
            isCorrect: false,
            feedback: 'Running back out through isolated dark back alleys immediately re-exposes you to the same or greater hazards.',
            educationalTip: 'Patience and verified safety escorts prevent secondary encounters.',
            sfxEmotion: 'afraid',
            safetyDelta: -15
          },
          {
            id: 'm2_c3_c',
            text: 'Walk outside and follow him down the street to shout at him.',
            isCorrect: false,
            feedback: 'Seeking retaliation against a stranger escalates risks of physical assault and undermines the safe refuge you achieved.',
            educationalTip: 'Safety prioritizes disengagement and survival, never ego-driven confrontation.',
            sfxEmotion: 'shock',
            safetyDelta: -20
          }
        ],
        winningNextNodeId: 'VICTORY'
      }
    },
    victoryEnding: {
      title: 'Pursuit Defused and Documented',
      description: 'You recognized intentional foot cadence, refused to enter dark bottlenecks, and secured refuge in a verified commercial sanctuary.',
      takeaway: 'Never lead a follower to your doorstep. Public sanctuaries and proactive escorts safeguard your autonomy.'
    }
  },

  // =========================================================================
  // CHAPTER 3 — A RELATIONSHIP CHANGING (Romantic Relationship & Boundaries)
  // =========================================================================
  {
    id: 'mission-3',
    number: 3,
    chapterNumber: 3,
    chapterName: 'A Relationship Changing',
    isStoryChapter: true,
    title: 'A Relationship Changing',
    tagline: 'Warm laughter on a rooftop terrace gives way to sudden possessiveness and demands for phone access.',
    domain: 'Relationship Boundaries & Early Warning Signs',
    environmentName: 'Rooftop Café Terrace at Sunset',
    badgeName: 'BOUNDARY SENTINEL',
    badgeIcon: 'Heart',
    badgeDescription: 'Identified early red flags, defended digital privacy, and distinguished love from coercive control.',
    difficulty: 'Intermediate',
    summary: 'Aira is on a date with her partner Haruto. What began as sweet moments turns tense when he demands to inspect her phone messages and questions her friendships.',
    learningGoal: 'Recognize digital surveillance and isolation as red flags, and set calm, non-negotiable personal boundaries.',
    startNodeId: 'm3_node_1',
    nodes: {
      m3_node_1: {
        id: 'm3_node_1',
        decisionNumber: 1,
        situation: 'The sunset over the terrace is lovely. Haruto hands Aira a small gift with a shy smile. But when Aira\'s phone buzzes on the table with a study group notification, Haruto\'s expression stiffens abruptly.',
        speaker: 'Haruto',
        dialogue: '"Who keeps messaging you this late? If you have nothing to hide from me, unlock your phone and let me see your chats right now."',
        heroResponseDialogue: '"Haruto, I care about you, but my phone and private conversations belong to me. Real trust doesn\'t require digital surveillance."',
        strangerType: 'haruto_date',
        airaThought: 'He is smiling one moment and aggressively demanding my phone passwords the next. This isn\'t normal curiosity; it feels like control.',
        exclamatoryPrompt: 'EHH?!',
        choices: [
          {
            id: 'm3_c1_a',
            text: 'Apologize profusely, hand over your unlocked phone, and recite your passwords to prove your loyalty.',
            isCorrect: false,
            feedback: 'Surrendering personal digital autonomy under emotional pressure establishes a dangerous precedent of digital surveillance and control.',
            educationalTip: 'A healthy partner respects your digital privacy. Demands for phone inspection are classic early control indicators.',
            sfxEmotion: 'afraid',
            boundariesDelta: -20,
            safetyDelta: -10
          },
          {
            id: 'm3_c1_b',
            text: 'Calmly and firmly refuse digital inspection: "I value our relationship, but my personal privacy is non-negotiable. Trust is built on communication, not surveillance."',
            isCorrect: true,
            feedback: 'Exemplary boundary defense! Setting clear, calm limits early demonstrates that your privacy and autonomy are sacred.',
            educationalTip: 'Healthy boundaries communicate that while you are committed to the relationship, you retain full ownership of your personal space.',
            sfxEmotion: 'ping',
            boundariesDelta: 20,
            safetyDelta: 10
          },
          {
            id: 'm3_c1_c',
            text: 'Grab his phone aggressively, scream at him, and throw your drink across the table.',
            isCorrect: false,
            feedback: 'Exploding with retaliatory hostility escalates emotional volatility and shifts focus away from the boundary issue.',
            educationalTip: 'Calm firmness de-escalates tension while standing unwavering on your rights.',
            sfxEmotion: 'shock',
            boundariesDelta: -10,
            safetyDelta: -10
          }
        ],
        winningNextNodeId: 'm3_node_2'
      },
      m3_node_2: {
        id: 'm3_node_2',
        decisionNumber: 2,
        situation: 'Haruto frowns deeply. He leans forward, crossing his arms and lowering his voice.',
        speaker: 'Haruto',
        dialogue: '"You have too many male friends in that college study circle. You don\'t need them. If you really loved me, you\'d drop that group and only spend your free time with me."',
        heroResponseDialogue: '"My education, my study partners, and my friends are an essential part of my life. Love should support my growth, not shrink my world."',
        strangerType: 'haruto_date',
        airaThought: 'He is trying to isolate me from my classmates and friends. Isolation is one of the biggest warning signs.',
        exclamatoryPrompt: 'SHOCK!',
        choices: [
          {
            id: 'm3_c1_d',
            text: 'Recognize the isolation tactic and stand firm: affirm that your academic goals and friendships are healthy, and you will not abandon them.',
            isCorrect: true,
            feedback: 'Crucial recognition! Isolation from peers and education is an insidious tactic used to make a partner emotionally dependent.',
            educationalTip: 'Anyone who asks you to cut off friends or academic pursuits is attempting to dismantle your support network.',
            sfxEmotion: 'ping',
            boundariesDelta: 20,
            supportDelta: 15,
            safetyDelta: 10
          },
          {
            id: 'm3_c1_e',
            text: 'Immediately text your study group and tell them you can never speak to them again because your boyfriend dislikes them.',
            isCorrect: false,
            feedback: 'Cutting off friends to placate jealousy leaves you isolated and vulnerable to further control without a support system.',
            educationalTip: 'Never sever friendships to soothe a partner\'s irrational possessiveness.',
            sfxEmotion: 'afraid',
            supportDelta: -25,
            boundariesDelta: -15
          },
          {
            id: 'm3_c1_f',
            text: 'Lie to Haruto and say you quit the group, while secretly attending meetings in fear of being discovered.',
            isCorrect: false,
            feedback: 'Living in secrecy and fear causes immense chronic stress and leaves you walking on eggshells.',
            educationalTip: 'Authentic relationships thrive on transparency and mutual respect, not secret evasions.',
            sfxEmotion: 'afraid',
            boundariesDelta: -10
          }
        ],
        winningNextNodeId: 'm3_node_3'
      },
      m3_node_3: {
        id: 'm3_node_3',
        decisionNumber: 3,
        situation: 'Seeing Aira\'s resolve, Haruto suddenly softens his face, eyes moist with tears, reaching for her hand with passionate promises.',
        speaker: 'Haruto',
        dialogue: '"I\'m sorry, Aira... I just get so scared of losing you because I love you more than life itself. You know I only act like this out of love, right?"',
        heroResponseDialogue: '"True love gives freedom and respect, Haruto. It doesn\'t demand control or make me feel guilty for having a life."',
        strangerType: 'haruto_date',
        airaThought: 'The rapid shift from anger to intense love-bombing and guilt... it feels like an emotional rollercoaster designed to make me doubt myself.',
        exclamatoryPrompt: 'SWEATDROP...',
        choices: [
          {
            id: 'm3_c3_a',
            text: 'Forgive him completely on the spot, decide his jealousy is romantic passion, and ignore the knot in your stomach.',
            isCorrect: false,
            feedback: 'Confusing jealousy and control with romantic passion is a common trap that allows concerning patterns to escalate.',
            educationalTip: 'Extreme jealousy is not evidence of love; it is evidence of insecurity and a desire for control.',
            sfxEmotion: 'afraid',
            boundariesDelta: -15,
            safetyDelta: -10
          },
          {
            id: 'm3_c3_b',
            text: 'Acknowledge his apology but note the pattern: keep your boundaries intact, take time to reflect, and confide in a trusted friend about the conversation.',
            isCorrect: true,
            feedback: 'Mature, grounded wisdom! Words must be matched by sustained behavioral change over time, and talking to an outside confidante keeps your perspective clear.',
            educationalTip: 'Never let love-bombing erase clear boundaries. Discussing red flags with trusted friends maintains objective clarity.',
            sfxEmotion: 'relief',
            boundariesDelta: 15,
            supportDelta: 15,
            safetyDelta: 15
          },
          {
            id: 'm3_c3_c',
            text: 'Laugh in his face, tell him he is pathetic, and walk out leaving him with the bill.',
            isCorrect: false,
            feedback: 'Mockery and humiliation provoke resentment and escalate dangerous reactions rather than establishing dignified self-respect.',
            educationalTip: 'Dignified firmness maintains moral high ground and personal safety.',
            sfxEmotion: 'shock',
            safetyDelta: -10
          }
        ],
        winningNextNodeId: 'VICTORY'
      }
    },
    victoryEnding: {
      title: 'Boundaries Preserved with Dignity',
      description: 'You identified early warning signs, stood firm against digital surveillance, and refused to let romance disguise isolation.',
      takeaway: 'Love respects privacy, celebrates your friendships, and supports your independence.'
    }
  },

  // =========================================================================
  // CHAPTER 4 — MARRIAGE AND FAMILY PRESSURE (In-Law & Commitment Pressures)
  // =========================================================================
  {
    id: 'mission-4',
    number: 4,
    chapterNumber: 4,
    chapterName: 'Marriage and Family Pressure',
    isStoryChapter: true,
    title: 'Marriage and Family Pressure',
    tagline: 'Family expectations gather like a storm. Relatives urge you to surrender your career and independence for tradition.',
    domain: 'Family Pressures & Marital Rights',
    environmentName: 'Family Living Room',
    badgeName: 'AUTONOMY SHIELD',
    badgeIcon: 'Users',
    badgeDescription: 'Resisted coercive family pressure, defended financial rights, and preserved maternal support ties.',
    difficulty: 'Intermediate',
    summary: 'Aira faces intense pressure from in-laws and relatives urging her to resign from her job, hand over financial assets, and sever ties with her own upbringing.',
    learningGoal: 'Navigate traditional family pressures with diplomatic firmness, protect independent accounts, and assert statutory rights under law.',
    startNodeId: 'm4_node_1',
    nodes: {
      m4_node_1: {
        id: 'm4_node_1',
        decisionNumber: 1,
        situation: 'At a formal family dinner, the elders gather around the table. The Mother-in-Law sets down her teacup, looking at Aira with an unyielding expression.',
        speaker: 'Mother-in-Law',
        dialogue: '"Now that you belong to our family, there is no need for you to be working late hours or pursuing degrees. A good daughter-in-law prioritizes the household above all."',
        heroResponseDialogue: '"I respect this family deeply, but my education and career are vital parts of who I am and my ability to contribute to our future."',
        strangerType: 'inlaw_relative',
        airaThought: 'They are trying to pressure me into resigning. If I give up my job, I will become completely financially dependent.',
        exclamatoryPrompt: 'GASP!',
        choices: [
          {
            id: 'm4_c1_a',
            text: 'Submit immediately: agree to tender your resignation tomorrow morning to keep the peace and please the elders.',
            isCorrect: false,
            feedback: 'Voluntarily relinquishing your career to appease family pressure strips away your long-term financial independence and career security.',
            educationalTip: 'Financial dependence significantly increases vulnerability. Work and education are fundamental legal rights.',
            sfxEmotion: 'afraid',
            independenceDelta: -25,
            boundariesDelta: -15
          },
          {
            id: 'm4_c1_b',
            text: 'Respond with respectful, unwavering clarity: express dedication to family while firmly maintaining that continuing your career is non-negotiable.',
            isCorrect: true,
            feedback: 'Exceptional diplomatic strength! Upholding your right to work with calm respect establishes healthy mutual expectations without unnecessary escalation.',
            educationalTip: 'Under Indian law and universal human rights, marriage does not extinguish a woman\'s right to employment and education.',
            sfxEmotion: 'ping',
            independenceDelta: 15,
            boundariesDelta: 20,
            safetyDelta: 10
          },
          {
            id: 'm4_c1_c',
            text: 'Scream at the table, accuse them of being backwards tyrants, and storm into the street late at night.',
            isCorrect: false,
            feedback: 'Storming into isolated streets late at night creates immediate physical vulnerability and closes channels for constructive resolution.',
            educationalTip: 'Never compromise your immediate physical safety when navigating difficult domestic disagreements.',
            sfxEmotion: 'shock',
            safetyDelta: -15
          }
        ],
        winningNextNodeId: 'm4_node_2'
      },
      m4_node_2: {
        id: 'm4_node_2',
        decisionNumber: 2,
        situation: 'Later that evening, Haruto presents a joint bank account document with single-signatory rights for himself and his parents.',
        speaker: 'Haruto',
        dialogue: '"If you insist on working, all your monthly salary must go into this family fund. My parents manage the finances. You shouldn\'t have secret money."',
        heroResponseDialogue: '"Contributing to shared household expenses is fair, but keeping my own independent salary account is a fundamental legal right and practical necessity."',
        strangerType: 'inlaw_relative',
        airaThought: 'He calls my earned salary "secret money." Coercing someone to hand over their entire income is economic abuse under the Domestic Violence Act.',
        exclamatoryPrompt: 'THUMP THUMP!',
        choices: [
          {
            id: 'm4_c2_a',
            text: 'Sign over all direct deposit rights and hand over your debit cards to your husband and in-laws.',
            isCorrect: false,
            feedback: 'Surrendering your banking credentials and earnings allows economic coercion and removes your ability to manage your basic needs.',
            educationalTip: 'Section 3 of the Protection of Women from Domestic Violence Act 2005 explicitly recognizes economic abuse as unlawful.',
            sfxEmotion: 'afraid',
            independenceDelta: -30,
            safetyDelta: -15
          },
          {
            id: 'm4_c2_b',
            text: 'Propose a fair, transparent split: contribute an agreed percentage to shared household costs while maintaining your personal individual bank account and private PIN.',
            isCorrect: true,
            feedback: 'Masterful financial management! Contributing equitably to household expenses while retaining an independent personal account preserves financial sovereignty.',
            educationalTip: 'Every adult woman should maintain an individual bank account registered solely in her name with private authentication.',
            sfxEmotion: 'ping',
            independenceDelta: 25,
            boundariesDelta: 20
          },
          {
            id: 'm4_c2_c',
            text: 'Refuse to contribute a single rupee to groceries or rent and dare them to kick you out.',
            isCorrect: false,
            feedback: 'Hostile refusal to contribute to mutual household obligations breeds toxic animosity rather than constructive financial partnership.',
            educationalTip: 'Fair contribution paired with private account autonomy is the healthiest financial model.',
            sfxEmotion: 'shock',
            boundariesDelta: -5
          }
        ],
        winningNextNodeId: 'm4_node_3'
      },
      m4_node_3: {
        id: 'm4_node_3',
        decisionNumber: 3,
        situation: 'A few weeks later, when Aira plans to visit her parents and childhood friends, Haruto blocks the calendar.',
        speaker: 'Haruto',
        dialogue: '"You visit your parents too often. They fill your head with ideas. From now on, you only visit them with my explicit permission and my company."',
        heroResponseDialogue: '"My parents raised me with love, and my connection with them is unconditional. Marrying you was a union, not an imprisonment."',
        strangerType: 'inlaw_relative',
        airaThought: 'Controlling when and how I see my own parents is an attempt to sever my deepest emotional safety net.',
        exclamatoryPrompt: 'SHOCK!',
        choices: [
          {
            id: 'm4_c3_a',
            text: 'Acquiesce to his demands and stop calling or visiting your parents to avoid arguments.',
            isCorrect: false,
            feedback: 'Severing maternal family ties surrenders your strongest emotional support network and deepens domestic isolation.',
            educationalTip: 'Abusers isolate victims from family to remove witnesses and lifelines. Always nurture your external support network.',
            sfxEmotion: 'afraid',
            supportDelta: -30,
            boundariesDelta: -20
          },
          {
            id: 'm4_c3_b',
            text: 'Safeguard your family lifelines: assert that regular contact with your parents is non-negotiable, and schedule consistent, independent visits.',
            isCorrect: true,
            feedback: 'Uncompromising personal boundary! Maintaining active, independent relationships with your parents ensures you are never isolated.',
            educationalTip: 'Staying connected with family and trusted lifelong friends is your most vital emotional and logistical safety tether.',
            sfxEmotion: 'relief',
            supportDelta: 25,
            boundariesDelta: 20,
            safetyDelta: 10
          },
          {
            id: 'm4_c3_c',
            text: 'Provoke a shouting match in front of his relatives and call his family terrible names.',
            isCorrect: false,
            feedback: 'Heated personal insults provoke group defensive anger and increase hostility without resolving the boundary violation.',
            educationalTip: 'Stand firm on your actions rather than trading insults.',
            sfxEmotion: 'shock',
            safetyDelta: -10
          }
        ],
        winningNextNodeId: 'VICTORY'
      }
    },
    victoryEnding: {
      title: 'Family Autonomy Maintained',
      description: 'You resisted coercive domestic pressure, protected your independent financial livelihood, and safeguarded family lifelines.',
      takeaway: 'Tradition should never be a pretext for subjugation. Your career and family connections are your fundamental rights.'
    }
  },

  // =========================================================================
  // CHAPTER 5 — THE CONTROLLING HUSBAND (Coercive Control & Documentation)
  // =========================================================================
  {
    id: 'mission-5',
    number: 5,
    chapterNumber: 5,
    chapterName: 'The Controlling Husband',
    isStoryChapter: true,
    title: 'The Controlling Husband',
    tagline: 'Behind closed doors, the controlling behavior sharpens into humiliation, curfew interrogations, and emotional threats.',
    domain: 'Domestic Abuse Recognition & Safe Evidence Logging',
    environmentName: 'Evening Living Room Under Tension',
    badgeName: 'TRUTH GUARDIAN',
    badgeIcon: 'Sparkles',
    badgeDescription: 'Recognized coercive control patterns, de-escalated volatile traps, and established safe incident documentation.',
    difficulty: 'Advanced',
    summary: 'Aira experiences escalating emotional manipulation and threats. She learns to de-escalate without confrontation, document incidents safely, and protect her self-worth.',
    learningGoal: 'Identify coercive control, prioritize physical survival over pride, and maintain discrete evidence without endangering yourself.',
    startNodeId: 'm5_node_1',
    nodes: {
      m5_node_1: {
        id: 'm5_node_1',
        decisionNumber: 1,
        situation: 'Aira arrives home 15 minutes late due to city traffic. Haruto stands waiting at the doorway, blocking the corridor, inspecting her handbag and checking the odometer on her keys.',
        speaker: 'Haruto',
        dialogue: '"Fifteen minutes late! Who were you smiling with? Give me your receipts. You think you can come and go as you please in my house?"',
        heroResponseDialogue: '"Traffic was held up by the civic construction on Main Street. I am tired and I will not engage in an interrogation."',
        strangerType: 'haruto_controlling',
        airaThought: 'He is blocking the narrow corridor and his fists are clenched. Confronting him in this tight space could turn physical.',
        exclamatoryPrompt: 'THUMP THUMP!',
        choices: [
          {
            id: 'm5_c1_a',
            text: 'De-escalate calmly: give a brief, factual answer without defensiveness, and maneuver smoothly into an open room with multiple exits.',
            isCorrect: true,
            feedback: 'Brilliant spatial and emotional awareness! In volatile domestic moments, avoiding defensive arguments and keeping exit paths open saves lives.',
            educationalTip: 'Never allow yourself to be cornered in tight hallways, bathrooms, or kitchens where exits are blocked.',
            sfxEmotion: 'relief',
            safetyDelta: 20,
            boundariesDelta: 10
          },
          {
            id: 'm5_c1_b',
            text: 'Push him physically out of the way, shout insults, and dare him to hit you.',
            isCorrect: false,
            feedback: 'Physically provoking or challenging a volatile person in a confined domestic space drastically elevates immediate danger of physical violence.',
            educationalTip: 'Prioritize physical safety and de-escalation over pride when someone is posturing aggressively.',
            sfxEmotion: 'shock',
            safetyDelta: -25
          },
          {
            id: 'm5_c1_c',
            text: 'Break down in tears, beg on your knees for forgiveness, and promise to never leave the house without him again.',
            isCorrect: false,
            feedback: 'Abject submission reinforces the abuser\'s belief that intimidation works and invites tighter restrictions on your freedom.',
            educationalTip: 'Calm, neutral brevity is safer than emotional begging or hostile provocation.',
            sfxEmotion: 'afraid',
            boundariesDelta: -20,
            safetyDelta: -10
          }
        ],
        winningNextNodeId: 'm5_node_2'
      },
      m5_node_2: {
        id: 'm5_node_2',
        decisionNumber: 2,
        situation: 'Later in the evening, Haruto uses cold, systematic humiliation to dismantle Aira\'s self-worth.',
        speaker: 'Haruto',
        dialogue: '"Look at you. You have no real skills, no family with money, and nobody else would ever tolerate you. If you ever leave this house, you\'ll end up on the streets."',
        heroResponseDialogue: '"You want me to believe I have nothing so I feel powerless. But I know my worth, my skills, and my truth."',
        strangerType: 'haruto_controlling',
        airaThought: 'He is trying to make me feel worthless so I feel unable to leave. This is verbal and psychological abuse.',
        exclamatoryPrompt: 'GASP!',
        choices: [
          {
            id: 'm5_c2_a',
            text: 'Internalize his words: accept that you are worthless and conclude that leaving is impossible.',
            isCorrect: false,
            feedback: 'Believing emotional manipulation strips away your agency. Psychological erosion is designed to make victims feel trapped.',
            educationalTip: 'Psychological abuse attacks self-efficacy. Remember your credentials, achievements, and inner strength.',
            sfxEmotion: 'afraid',
            boundariesDelta: -20,
            independenceDelta: -15
          },
          {
            id: 'm5_c2_b',
            text: 'Anchor internally in your reality: recognize the manipulation, avoid arguing the point aloud, and secretly reaffirm your skills and independence plan.',
            isCorrect: true,
            feedback: 'Mastery of internal resilience! Refusing to accept an abuser\'s distorted narrative keeps your mind clear for safety planning.',
            educationalTip: 'Abusers use verbal degradation to paralyze victims. Grounding yourself in objective reality preserves your freedom to act.',
            sfxEmotion: 'ping',
            boundariesDelta: 20,
            independenceDelta: 15,
            safetyDelta: 10
          },
          {
            id: 'm5_c2_c',
            text: 'Smash personal belongings in the living room to show how angry you are.',
            isCorrect: false,
            feedback: 'Destroying property gives the controller ammunition to accuse you of instability and further escalates dangerous tensions.',
            educationalTip: 'Keep your composure and channel energy into confidential, strategic planning.',
            sfxEmotion: 'shock',
            safetyDelta: -15
          }
        ],
        winningNextNodeId: 'm5_node_3'
      },
      m5_node_3: {
        id: 'm5_node_3',
        decisionNumber: 3,
        situation: 'Aira realizes that incidents are becoming frequent and more intense. She needs to create a record of events for potential legal, medical, or protection needs.',
        speaker: 'Inner Voice',
        dialogue: '"If I ever need a Protection Order or legal separation, I will need proof of dates, statements, threats, and financial denial. How do I do this safely?"',
        heroResponseDialogue: '"I must record every incident with precision and store the evidence where he can never reach it."',
        strangerType: 'counselor',
        airaThought: 'If he finds my notes, he could destroy them or react violently. Documentation must be completely discreet.',
        exclamatoryPrompt: 'PING!',
        choices: [
          {
            id: 'm5_c3_a',
            text: 'Maintain an encrypted, cloud-stored incident log (or entrust notes to your close friend Priya outside the house) detailing dates, exact words, and financial withholding.',
            isCorrect: true,
            feedback: 'Invaluable legal preparation! Contemporary courts and Protection Officers rely heavily on contemporaneous incident documentation.',
            educationalTip: 'Discreet logs stored outside the home or in two-factor secured cloud accounts provide vital legal evidence without exposing you to danger.',
            sfxEmotion: 'relief',
            safetyDelta: 25,
            supportDelta: 20,
            boundariesDelta: 15
          },
          {
            id: 'm5_c3_b',
            text: 'Write notes in a bright pink paper diary and keep it in your bedside nightstand where anyone can open it.',
            isCorrect: false,
            feedback: 'Leaving physical evidence of abuse documentation in accessible areas at home invites severe retaliatory confrontation.',
            educationalTip: 'Never store documentation in shared physical spaces where an abuser might discover it.',
            sfxEmotion: 'shock',
            safetyDelta: -20
          },
          {
            id: 'm5_c3_c',
            text: 'Decide that keeping notes is useless and tell yourself that things will magically get better next week.',
            isCorrect: false,
            feedback: 'Ignoring persistent patterns and failing to document leaves you without legal recourse when critical decisions arise.',
            educationalTip: 'Documentation is empowerment. It turns your private reality into undeniable legal fact.',
            sfxEmotion: 'afraid',
            safetyDelta: -10
          }
        ],
        winningNextNodeId: 'VICTORY'
      }
    },
    victoryEnding: {
      title: 'Shield of Truth Established',
      description: 'You recognized coercive control, prioritized spatial safety over confrontation, and established a secure documentation vault.',
      takeaway: 'Abuse thrives on secrecy and isolation. Discreet documentation and inner clarity are your greatest legal allies.'
    }
  },

  // =========================================================================
  // CHAPTER 6 — FINANCIAL INDEPENDENCE (Building The Economic Safety Cushion)
  // =========================================================================
  {
    id: 'mission-6',
    number: 6,
    chapterNumber: 6,
    chapterName: 'Financial Independence',
    isStoryChapter: true,
    title: 'Financial Independence',
    tagline: 'True empowerment begins with the ability to stand on your own feet. Building career paths and emergency funds.',
    domain: 'Economic Sovereignty & Practical Preparedness',
    environmentName: 'Daytime Career & Empowerment Consultation Hub',
    badgeName: 'FINANCIAL ARCHITECT',
    badgeIcon: 'Award',
    badgeDescription: 'Built independent financial pathways, created an emergency fund, and secured critical identity documents.',
    difficulty: 'Intermediate',
    summary: 'Aira visits a confidential career and legal clinic to research remote employment opportunities, set up an emergency fund, and secure copies of her documents.',
    learningGoal: 'Establish practical financial independence, understand tenancy and banking rights, and prepare a viable escape cushion.',
    startNodeId: 'm6_node_1',
    nodes: {
      m6_node_1: {
        id: 'm6_node_1',
        decisionNumber: 1,
        situation: 'At the consultation desk, a career mentor reviews Aira\'s resume and discusses remote/flexible career avenues that can provide sustainable, independent earnings.',
        speaker: 'Career Mentor',
        dialogue: '"You have a strong educational foundation. There are several verified remote technical and analytical roles that offer financial stability. Let\'s get your portfolio online securely."',
        heroResponseDialogue: '"Thank you. I need work that lets me build savings independently without raising red flags at home."',
        strangerType: 'counselor',
        airaThought: 'Having my own income means I will never be forced to stay anywhere out of desperation for rent or food.',
        exclamatoryPrompt: 'PING!',
        choices: [
          {
            id: 'm6_c1_a',
            text: 'Apply for accredited remote and hybrid roles using a private, password-protected email account accessed only on private browsing devices.',
            isCorrect: true,
            feedback: 'Smart digital and career strategy! Building income pathways while maintaining digital discretion prevents surveillance and retaliation.',
            educationalTip: 'When preparing for financial independence in high-conflict relationships, use separate email accounts and log out after every session.',
            sfxEmotion: 'ping',
            independenceDelta: 25,
            safetyDelta: 15
          },
          {
            id: 'm6_c1_b',
            text: 'Sign up for dubious online lottery schemes and high-yield investment scams promising instant millions without work.',
            isCorrect: false,
            feedback: 'Unverified get-rich-quick schemes drain existing savings, compromise personal identity data, and deepen financial vulnerability.',
            educationalTip: 'Avoid financial desperation traps; focus on verified legitimate employment, accredited skills, and steady savings.',
            sfxEmotion: 'shock',
            independenceDelta: -20,
            safetyDelta: -10
          },
          {
            id: 'm6_c1_c',
            text: 'Conclude that searching for jobs is too daunting and decide to remain completely dependent forever.',
            isCorrect: false,
            feedback: 'Surrendering your earning potential keeps you trapped. Small, steady steps create massive long-term options.',
            educationalTip: 'Even modest part-time or freelance income restores choice and self-reliance.',
            sfxEmotion: 'afraid',
            independenceDelta: -15
          }
        ],
        winningNextNodeId: 'm6_node_2'
      },
      m6_node_2: {
        id: 'm6_node_2',
        decisionNumber: 2,
        situation: 'The financial advisor explains the necessity of an emergency "Safety Fund"—money that can cover at least 3 months of basic lodging, food, and transit.',
        speaker: 'Financial Advisor',
        dialogue: '"An emergency fund is your freedom cushion. It must be accessible exclusively to you, in an individual account with e-statements only."',
        heroResponseDialogue: '"I understand. Paper bank statements sent to the house would be dangerous. Digital e-statements to my private email are essential."',
        strangerType: 'counselor',
        airaThought: 'How should I allocate and store my emergency savings to ensure it cannot be seized or discovered?',
        exclamatoryPrompt: 'PING!',
        choices: [
          {
            id: 'm6_c2_a',
            text: 'Establish an individual bank account with digital-only e-statements, deposit small consistent amounts, and keep emergency cash with a trusted friend.',
            isCorrect: true,
            feedback: 'Flawless safety preparation! A confidential digital account combined with trusted off-site cash ensures you have immediate funds during a crisis.',
            educationalTip: 'Always opt for paperless digital statements sent to private secure emails to prevent domestic mail snooping.',
            sfxEmotion: 'relief',
            independenceDelta: 25,
            safetyDelta: 15,
            supportDelta: 10
          },
          {
            id: 'm6_c2_b',
            text: 'Hide all your cash under the living room mattress where your partner cleans every weekend.',
            isCorrect: false,
            feedback: 'Hiding physical cash in common home areas almost always results in accidental discovery, interrogation, and confiscation.',
            educationalTip: 'Never store emergency cash in shared home spaces. Use verified banking channels or trusted off-site allies.',
            sfxEmotion: 'afraid',
            safetyDelta: -15,
            independenceDelta: -10
          },
          {
            id: 'm6_c2_c',
            text: 'Spend all your earnings on luxury goods immediately so nobody can take them from you.',
            isCorrect: false,
            feedback: 'Impulsive spending drains liquid assets and leaves you without emergency resources when you need them most.',
            educationalTip: 'Liquid savings provide survival power and the freedom to relocate when safety demands.',
            sfxEmotion: 'shock',
            independenceDelta: -20
          }
        ],
        winningNextNodeId: 'm6_node_3'
      },
      m6_node_3: {
        id: 'm6_node_3',
        decisionNumber: 3,
        situation: 'The advisor reminds Aira about official documents: "Without your original educational certificates, Aadhaar card, voter ID, passport, and bank records, starting over is ten times harder."',
        speaker: 'Legal Counselor',
        dialogue: '"If an emergency occurs, you might have only three minutes to leave. Where are your identity documents right now?"',
        heroResponseDialogue: '"My original certificates are at home, but I can digitize certified copies and entrust duplicates to a secure safety deposit."',
        strangerType: 'counselor',
        airaThought: 'Having digital scans and trusted duplicate copies means nobody can hold my identity hostage.',
        exclamatoryPrompt: 'PING!',
        choices: [
          {
            id: 'm6_c3_a',
            text: 'Discreetly scan all original certificates, government IDs, and financial records into an encrypted vault, and keep certified paper copies in an emergency Go-Bag.',
            isCorrect: true,
            feedback: 'Outstanding foresight! Having secure document scans and a pre-packed emergency file enables immediate independence without administrative delays.',
            educationalTip: 'Securing identity and educational documents in advance prevents abusers from withholding them as leverage.',
            sfxEmotion: 'relief',
            independenceDelta: 20,
            safetyDelta: 20,
            boundariesDelta: 10
          },
          {
            id: 'm6_c3_b',
            text: 'Hand your passport and degree certificates to your husband for "safe keeping" in his private locker.',
            isCorrect: false,
            feedback: 'Surrendering original identity documents hands total leverage to a controlling partner and makes independent travel or employment nearly impossible.',
            educationalTip: 'Never allow anyone to withhold your sovereign identity documents. Document retention is a recognized form of coercion.',
            sfxEmotion: 'afraid',
            independenceDelta: -25,
            safetyDelta: -15
          },
          {
            id: 'm6_c3_c',
            text: 'Burn your documents during an argument to prove you don\'t care about anything.',
            isCorrect: false,
            feedback: 'Destroying your own legal identity documents creates catastrophic administrative barriers for employment, housing, and legal redress.',
            educationalTip: 'Protect your legal papers with the utmost care; they are your keys to independence.',
            sfxEmotion: 'shock',
            independenceDelta: -30
          }
        ],
        winningNextNodeId: 'VICTORY'
      }
    },
    victoryEnding: {
      title: 'Foundation of Independence Built',
      description: 'You built viable employment avenues, created an emergency fund, and secured your vital identity documents.',
      takeaway: 'Financial autonomy transforms fear into options. When you can sustain yourself, nobody can dictate your worth.'
    }
  },

  // =========================================================================
  // CHAPTER 7 — THE FRIEND WHO NOTICES (Support Networks & Safe Disclosure)
  // =========================================================================
  {
    id: 'mission-7',
    number: 7,
    chapterNumber: 7,
    chapterName: 'The Friend Who Notices',
    isStoryChapter: true,
    title: 'The Friend Who Notices',
    tagline: 'Over coffee, a lifelong friend sees beneath the brave facade and reaches out. How much do you share?',
    domain: 'Friendship Lifelines & Nuanced Safe Disclosure',
    environmentName: 'Moonlight Café Patio',
    badgeName: 'CIRCLE OF TRUST',
    badgeIcon: 'Heart',
    badgeDescription: 'Disclosed domestic realities safely, established emergency code words, and reinforced mutual lifelines.',
    difficulty: 'Intermediate',
    summary: 'Aira meets her closest friend Priya for coffee. Priya notices Aira\'s withdrawal, exhaustion, and tension, and gently opens a space for honest, supportive conversation.',
    learningGoal: 'Navigate safe personal disclosure, understand that asking for help is strength, and create practical emergency pacts with allies.',
    startNodeId: 'm7_node_1',
    nodes: {
      m7_node_1: {
        id: 'm7_node_1',
        decisionNumber: 1,
        situation: 'Priya sets down her mug at Moonlight Café. Her eyes are full of warmth and deep concern as she reaches across the table to gently touch Aira\'s wrist.',
        speaker: 'Priya',
        dialogue: '"Aira, you haven\'t been answering our calls. You look so tense and exhausted, and you\'ve lost weight. Please, you don\'t have to pretend with me. What is really going on at home?"',
        heroResponseDialogue: '"Priya... things have become really difficult. Haruto has become very controlling, and I feel like I\'m constantly walking on eggshells."',
        strangerType: 'friend_priya',
        airaThought: 'I used to feel so ashamed to tell anyone. But Priya has always loved me without judgment. Can I trust her with the truth?',
        exclamatoryPrompt: 'THUMP THUMP!',
        choices: [
          {
            id: 'm7_c1_a',
            text: 'Conceal everything: paste on a fake smile, laugh loudly, and claim your marriage is fairytale perfection.',
            isCorrect: false,
            feedback: 'Hiding severe relationship abuse out of shame deepens isolation and cuts you off from the very people who want to protect you.',
            educationalTip: 'Abuse thrives in secrecy. Opening up to even one trusted ally cuts the power of isolation in half.',
            sfxEmotion: 'afraid',
            supportDelta: -20
          },
          {
            id: 'm7_c1_b',
            text: 'Share honestly at your own pace: confide the reality of his controlling behavior, the curfew interrogations, and how isolated you have felt.',
            isCorrect: true,
            feedback: 'Heartfelt courage! Sharing your reality with a trusted friend breaks the psychological cage of domestic secrecy and invites genuine support.',
            educationalTip: 'Vulnerability with trusted friends is an act of bravery. True friends listen without judgment and validate your experience.',
            sfxEmotion: 'relief',
            supportDelta: 25,
            boundariesDelta: 15,
            safetyDelta: 10
          },
          {
            id: 'm7_c1_c',
            text: 'Demand that Priya immediately march into your house, confront your husband physically, and start a public street brawl.',
            isCorrect: false,
            feedback: 'Encouraging untrained friends to confront volatile abusers directly puts both you and your friend in immediate physical peril.',
            educationalTip: 'Allies support through safe haven, backup, and logistics, never through volatile confrontations.',
            sfxEmotion: 'shock',
            safetyDelta: -15
          }
        ],
        winningNextNodeId: 'm7_node_2'
      },
      m7_node_2: {
        id: 'm7_node_2',
        decisionNumber: 2,
        situation: 'Priya tears up, squeezing Aira\'s hand tightly. Her voice is calm, resolute, and completely supportive.',
        speaker: 'Priya',
        dialogue: '"Thank you for trusting me, Aira. None of this is your fault. You are not crazy, and you do not deserve this. My home is your home anytime, day or night. Let\'s establish a safety pact right now."',
        heroResponseDialogue: '"Thank you, Priya. Hearing you say that lifts a mountain off my chest. Let\'s create a code word and backup plan."',
        strangerType: 'friend_priya',
        airaThought: 'A practical safety pact: What specific, actionable steps can Priya and I put in place today?',
        exclamatoryPrompt: 'PING!',
        choices: [
          {
            id: 'm7_c2_a',
            text: 'Establish an emergency code word (e.g., "Lavender Tea"), give Priya a spare copy of your house key, and designate her apartment as your 24/7 safe haven.',
            isCorrect: true,
            feedback: 'Superb safety planning! Pre-agreed code words allow you to signal immediate danger via text or call without a controller realizing it.',
            educationalTip: 'A covert distress code word and an accessible off-site safe house are the two most effective peer-safety measures.',
            sfxEmotion: 'relief',
            supportDelta: 25,
            safetyDelta: 25,
            boundariesDelta: 10
          },
          {
            id: 'm7_c2_b',
            text: 'Tell Priya to never speak to you again because your husband might look through your phone messages and see her text.',
            isCorrect: false,
            feedback: 'Pushing away supportive allies out of fear surrenders completely to the abuser\'s goal of total isolation.',
            educationalTip: 'Maintain secret, secure lines of communication rather than cutting off the people who care about you.',
            sfxEmotion: 'afraid',
            supportDelta: -25
          },
          {
            id: 'm7_c2_c',
            text: 'Tell Priya you will only accept help if she pays off all your family debts and buys you a luxury villa.',
            isCorrect: false,
            feedback: 'Unrealistic or transactional demands damage healthy friendships that offer genuine emotional and logistical shelter.',
            educationalTip: 'Cherish genuine solidarity and focus on practical safety steps.',
            sfxEmotion: 'shock',
            supportDelta: -15
          }
        ],
        winningNextNodeId: 'm7_node_3'
      },
      m7_node_3: {
        id: 'm7_node_3',
        decisionNumber: 3,
        situation: 'Priya shows Aira her phone. She has already saved the official Women\'s Helpline (181), National Emergency (112), and the local Women\'s Commission contact.',
        speaker: 'Priya',
        dialogue: '"I will never push you to do anything before you are ready, Aira. You are in control of your life. But whenever you decide you want to step away, you will not be alone for a single second."',
        heroResponseDialogue: '"Having your support gives me the courage I haven\'t felt in years. I know I have choices now."',
        strangerType: 'friend_priya',
        airaThought: 'She respects my autonomy. She is not dictating my choices; she is offering an unbreakable safety net.',
        exclamatoryPrompt: 'PING!',
        choices: [
          {
            id: 'm7_c3_a',
            text: 'Commit to the partnership: save helpline numbers under discreet disguised contacts, keep in daily contact with Priya, and proceed with quiet confidence.',
            isCorrect: true,
            feedback: 'Mastery of mutual empowerment! Disguised emergency contacts and regular friend check-ins keep you safe while honoring your autonomy.',
            educationalTip: 'Saving helpline numbers under ordinary names (e.g., "Pharmacy Help" or "Dentist") prevents suspicion while keeping lifelines close.',
            sfxEmotion: 'relief',
            supportDelta: 25,
            safetyDelta: 20,
            boundariesDelta: 15
          },
          {
            id: 'm7_c3_b',
            text: 'Delete Priya\'s number and block her on your phone as soon as you step into your car.',
            isCorrect: false,
            feedback: 'Blocking your closest confidante eliminates your only lifeline just when you need it most.',
            educationalTip: 'Protect your connections; they are your bridge to safety.',
            sfxEmotion: 'afraid',
            supportDelta: -30
          },
          {
            id: 'm7_c3_c',
            text: 'Brag to your husband tonight that Priya knows all his secrets and will get him arrested tomorrow.',
            isCorrect: false,
            feedback: 'Prematurely threatening an abuser with outside intervention before you have relocated to safety triggers immediate dangerous escalation.',
            educationalTip: 'Never reveal your safety network or plans to an abuser while you are still residing under the same roof.',
            sfxEmotion: 'shock',
            safetyDelta: -30
          }
        ],
        winningNextNodeId: 'VICTORY'
      }
    },
    victoryEnding: {
      title: 'The Lifeline Reconnected',
      description: 'You broke through the silence of shame, established an emergency safety pact with Priya, and dismantled the cage of isolation.',
      takeaway: 'Asking for support is the ultimate sign of strength. With a trusted circle behind you, you are never powerless.'
    }
  },

  // =========================================================================
  // CHAPTER 8 — THE BREAKING POINT (Critical Crisis De-escalation & Exit)
  // =========================================================================
  {
    id: 'mission-8',
    number: 8,
    chapterNumber: 8,
    chapterName: 'The Breaking Point',
    isStoryChapter: true,
    title: 'The Breaking Point',
    tagline: 'A hidden interview letter is discovered. Rage erupts at midnight, forcing an immediate assessment of physical survival.',
    domain: 'Crisis De-escalation & Immediate Physical Escape',
    environmentName: 'Midnight Living Room Under Threat',
    badgeName: 'CRISIS NAVIGATOR',
    badgeIcon: 'ShieldAlert',
    badgeDescription: 'Maintained composure during violent escalation, avoided hazardous bottlenecks, and executed emergency egress.',
    difficulty: 'Advanced',
    summary: 'Haruto discovers Aira\'s job interview letter and flies into an uncontrollable midnight rage. Aira must prioritize survival, spatial safety, and immediate exit.',
    learningGoal: 'De-escalate violent outbursts, avoid high-hazard rooms (kitchens/bathrooms), and activate emergency transit to safety.',
    startNodeId: 'm8_node_1',
    nodes: {
      m8_node_1: {
        id: 'm8_node_1',
        decisionNumber: 1,
        situation: 'Midnight. Haruto stands by the dining table, holding a crumpled job offer letter he found in Aira\'s briefcase. His face is flushed with fury, and he slams a glass mug against the counter, shattering it.',
        speaker: 'Haruto',
        dialogue: '"You signed a job contract behind my back?! You think you can leave me?! Nobody leaves me! You aren\'t taking a single step out of this apartment tonight!"',
        heroResponseDialogue: '"Haruto, please step back. I hear your anger, but I am staying calm. Let\'s keep our voices down."',
        strangerType: 'haruto_controlling',
        airaThought: 'He is blocking the doorway and shattering glass. Physical violence is imminent. This is not the time to debate; this is the time to survive.',
        exclamatoryPrompt: 'THUMP THUMP!',
        choices: [
          {
            id: 'm8_c1_a',
            text: 'De-escalate with low, calm voice tones, avoid eye-to-eye provocation, keep hands visible, and step backward toward the open foyer.',
            isCorrect: true,
            feedback: 'Life-saving de-escalation! Lowering your vocal pitch, avoiding physical confrontation, and keeping your hands open reduces triggers while positioning for escape.',
            educationalTip: 'During high-danger domestic rage episodes, survival comes first. Never match physical aggression or trap someone with no verbal way out.',
            sfxEmotion: 'relief',
            safetyDelta: 25,
            boundariesDelta: 10
          },
          {
            id: 'm8_c1_b',
            text: 'Scream back, pick up a shard of glass, and advance toward him threatening to fight.',
            isCorrect: false,
            feedback: 'Brandishing weapons or physically challenging a stronger, enraged person in an enclosed apartment drastically increases lethal risk.',
            educationalTip: 'Weapons in domestic crisis almost always get turned against the victim. Focus on egress, not combat.',
            sfxEmotion: 'shock',
            safetyDelta: -30
          },
          {
            id: 'm8_c1_c',
            text: 'Run into the bathroom and lock the door, even though it has no outside window or secondary exit.',
            isCorrect: false,
            feedback: 'Trapping yourself in a windowless room with a flimsy lock creates a deadly bottleneck where you can be trapped and battered.',
            educationalTip: 'Never retreat into rooms without an exterior exit, hard tiled surfaces, or accessible weapons (kitchens and small bathrooms).',
            sfxEmotion: 'afraid',
            safetyDelta: -25
          }
        ],
        winningNextNodeId: 'm8_node_2'
      },
      m8_node_2: {
        id: 'm8_node_2',
        decisionNumber: 2,
        situation: 'Haruto lunges toward the kitchen to grab more objects to throw, momentarily vacating the foyer near the front door. The front door is unlocked.',
        speaker: 'Inner Instinct',
        dialogue: '"The path to the main door is clear right now! Your pre-packed emergency Go-Bag is right behind the umbrella stand."',
        heroResponseDialogue: '"This is the moment. I have my keys, my bag, and an open door. I am leaving."',
        strangerType: 'haruto_controlling',
        airaThought: 'Every second counts. If I hesitate, he will block the doorway again.',
        exclamatoryPrompt: 'GASP!',
        choices: [
          {
            id: 'm8_c2_a',
            text: 'Seize the clear opening: grab the emergency Go-Bag, exit the front door immediately, pull it shut, and head directly for the building stairwell.',
            isCorrect: true,
            feedback: 'Decisive, life-saving execution! Recognizing the window of opportunity and escaping into a public building corridor guarantees survival.',
            educationalTip: 'When a safe exit opens during an abusive escalation, take it immediately. Things can be replaced; your life cannot.',
            sfxEmotion: 'relief',
            safetyDelta: 30,
            independenceDelta: 20,
            boundariesDelta: 20
          },
          {
            id: 'm8_c2_b',
            text: 'Stay in the living room and attempt to give him a hug to show him that love conquers all.',
            isCorrect: false,
            feedback: 'Approaching an enraged abuser actively seeking objects to throw exposes you to severe blunt force trauma and physical injury.',
            educationalTip: 'Do not attempt physical affection during an active violent episode. Distance is your only protection.',
            sfxEmotion: 'shock',
            safetyDelta: -30
          },
          {
            id: 'm8_c2_c',
            text: 'Sit on the living room sofa and start arguing about who paid for the shattered glass.',
            isCorrect: false,
            feedback: 'Arguing over property while in imminent danger of assault ignores the immediate threat to your life.',
            educationalTip: 'Material possessions have zero value compared to your physical safety.',
            sfxEmotion: 'afraid',
            safetyDelta: -25
          }
        ],
        winningNextNodeId: 'm8_node_3'
      },
      m8_node_3: {
        id: 'm8_node_3',
        decisionNumber: 3,
        situation: 'Aira reaches the illuminated, staffed ground floor security lobby. She is shaking but physically safe. The building security guard looks up with concern.',
        speaker: 'Building Security Guard',
        dialogue: '"Miss, you look terrified. Are you okay? Do you need me to lock the gate and call a verified cab or the police?"',
        heroResponseDialogue: '"Yes, please. I need a cab called directly to Priya\'s address, and please do not let anyone follow me."',
        strangerType: 'bearded',
        airaThought: 'I am out of the apartment. I must activate my safety network immediately: text Priya the code word and dial 112 if he pursues.',
        exclamatoryPrompt: 'PING!',
        choices: [
          {
            id: 'm8_c3_a',
            text: 'Send the pre-agreed code word "Lavender Tea" to Priya, have security escort you into a verified transit vehicle, and travel straight to her safe house.',
            isCorrect: true,
            feedback: 'Flawless emergency protocol! Activating your verified support network and utilizing professional security escorts brings you to absolute safety.',
            educationalTip: 'After fleeing a violent incident, move immediately to a vetted safe haven with active witnesses and security.',
            sfxEmotion: 'relief',
            safetyDelta: 25,
            supportDelta: 25,
            independenceDelta: 15
          },
          {
            id: 'm8_c3_b',
            text: 'Turn around, walk back upstairs alone, and apologize for running away.',
            isCorrect: false,
            feedback: 'Returning immediately after fleeing a violent explosion is statistically one of the most hazardous actions a victim can take.',
            educationalTip: 'Once you reach safety, never return unassisted. If you must retrieve items later, do so only with a police escort.',
            sfxEmotion: 'shock',
            safetyDelta: -35
          },
          {
            id: 'm8_c3_c',
            text: 'Walk alone into a dark, unlit public park in the middle of the night to sit on a bench.',
            isCorrect: false,
            feedback: 'Wandering alone through unlit parks at night compounds your vulnerability and exposes you to secondary public hazards.',
            educationalTip: 'Always navigate directly to illuminated, staffed, or verified domestic safe havens.',
            sfxEmotion: 'afraid',
            safetyDelta: -20
          }
        ],
        winningNextNodeId: 'VICTORY'
      }
    },
    victoryEnding: {
      title: 'Survival and Safe Exit Secured',
      description: 'You kept composure under extreme threat, utilized spatial egress, and safely activated your emergency support network.',
      takeaway: 'Your life, dignity, and physical safety are irreplaceable. Recognizing the breaking point and exiting safely is supreme courage.'
    }
  },

  // =========================================================================
  // CHAPTER 9 — STAY, SEEK HELP, OR LEAVE (The Strategic Crossroads)
  // =========================================================================
  {
    id: 'mission-9',
    number: 9,
    chapterNumber: 9,
    chapterName: 'Stay, Seek Help, or Leave',
    isStoryChapter: true,
    title: 'Stay, Seek Help, or Leave',
    tagline: 'Safe at Priya\'s home, you stand at the crossroads of your future. Evaluating legal protections, shelters, and boundaries.',
    domain: 'Holistic Safety Decisions & Statutory Legal Rights',
    environmentName: 'Crisis Support & Safe Haven Center',
    badgeName: 'SOVEREIGN DECISION-MAKER',
    badgeIcon: 'Compass',
    badgeDescription: 'Assessed holistic life realities, leveraged statutory legal protections under PWDVA, and chose an empowered path.',
    difficulty: 'Advanced',
    summary: 'Aira evaluates her options without self-blame: exploring legal Protection Orders under the Domestic Violence Act, temporary separation, or formal legal departure with community shelter backing.',
    learningGoal: 'Navigate complex life crossroads, access Protection Officers and free legal aid, and recognize that recovery has multiple valid, non-judgmental routes.',
    startNodeId: 'm9_node_1',
    nodes: {
      m9_node_1: {
        id: 'm9_node_1',
        decisionNumber: 1,
        situation: 'At the Women\'s Support & Legal Aid Pavilion, Counselor Meenakshi sits down with Aira and Priya with warm tea. She speaks with profound respect and empathy.',
        speaker: 'Counselor Meenakshi',
        dialogue: '"Aira, you have survived a terrible storm. Take a deep breath. There is no single "right" button you must press today. Whether you choose temporary separation, formal legal protection, or planning a safe path forward, we respect your autonomy completely. Let\'s evaluate what is safest for you."',
        heroResponseDialogue: '"Thank you, Meenakshi. I need to understand my practical rights—where I will sleep, how my finances are protected, and what the law says."',
        strangerType: 'counselor',
        airaThought: 'I don\'t have to feel pressured or blamed. I have legal rights, and I have the right to choose the timeline that protects my life.',
        exclamatoryPrompt: 'PING!',
        choices: [
          {
            id: 'm9_c1_a',
            text: 'Conduct a comprehensive safety assessment: review your finances, housing options, emotional stamina, and legal protections with the counselor before making permanent commitments.',
            isCorrect: true,
            feedback: 'Profoundly grounded wisdom! Taking stock of practical barriers, safe accommodation, and legal lifelines prevents rushed, vulnerable decisions.',
            educationalTip: 'Leaving is a process, not a single instant event. Safe planning accounts for housing, finances, and legal protections.',
            sfxEmotion: 'ping',
            safetyDelta: 20,
            independenceDelta: 20,
            boundariesDelta: 15
          },
          {
            id: 'm9_c1_b',
            text: 'Sign a document surrendering all your alimony, property, and matrimonial rights immediately just so people will stop talking.',
            isCorrect: false,
            feedback: 'Signing away statutory rights under emotional distress permanently harms your economic survival and legal standing.',
            educationalTip: 'Never sign legal agreements under duress or without independent counsel from a verified legal aid attorney.',
            sfxEmotion: 'shock',
            independenceDelta: -30,
            safetyDelta: -15
          },
          {
            id: 'm9_c1_c',
            text: 'Blame yourself entirely and decide you deserve to be mistreated because you weren\'t a "perfect wife."',
            isCorrect: false,
            feedback: 'Internalizing abuser guilt is the core trap of domestic violence. Abuse is always 100% the choice and responsibility of the perpetrator.',
            educationalTip: 'You are never to blame for someone else\'s violence or controlling behavior.',
            sfxEmotion: 'afraid',
            boundariesDelta: -20
          }
        ],
        winningNextNodeId: 'm9_node_2'
      },
      m9_node_2: {
        id: 'm9_node_2',
        decisionNumber: 2,
        situation: 'Counselor Meenakshi outlines statutory protections available under Indian Law (Protection of Women from Domestic Violence Act 2005): Protection Orders, Residence Orders, and Monetary Relief.',
        speaker: 'Counselor Meenakshi',
        dialogue: '"Under the PWDVA, a Protection Officer can file for an immediate court Protection Order prohibiting your husband from contacting you, coming to your workplace, or entering your residence. You also have the right to Stridhan (your personal jewelry and gifts) and emergency maintenance."',
        heroResponseDialogue: '"I want to file for an official Protection Order and secure my Stridhan and personal belongings with a police-accompanied order."',
        strangerType: 'counselor',
        airaThought: 'The law provides real, enforceable shields. I don\'t have to navigate this in the shadows.',
        exclamatoryPrompt: 'PING!',
        choices: [
          {
            id: 'm9_c2_a',
            text: 'File through the Protection Officer for statutory Protection Orders, retrieve your Stridhan with official police escort, and document everything through the legal aid registry.',
            isCorrect: true,
            feedback: 'Triumphant legal empowerment! Leveraging the PWDVA provides legally enforceable boundaries that penalize violations with non-bailable arrest.',
            educationalTip: 'Section 18 of the Domestic Violence Act empowers magistrates to pass Protection Orders prohibiting all contact and harassment.',
            sfxEmotion: 'relief',
            safetyDelta: 25,
            boundariesDelta: 25,
            independenceDelta: 15
          },
          {
            id: 'm9_c2_b',
            text: 'Go to your husband\'s house alone at 2 AM to retrieve your jewelry without telling anyone.',
            isCorrect: false,
            feedback: 'Returning unescorted to an abuser\'s territory in the dead of night is an invitation to severe retaliatory violence and unlawful confinement.',
            educationalTip: 'Always retrieve personal property with a designated Protection Officer or police escort.',
            sfxEmotion: 'shock',
            safetyDelta: -30
          },
          {
            id: 'm9_c2_c',
            text: 'Hire an illegal street gang to intimidate your in-laws and smash their windows.',
            isCorrect: false,
            feedback: 'Engaging extra-judicial criminal actors destroys your legal credibility and exposes you to severe criminal prosecution.',
            educationalTip: 'The law provides robust, legitimate remedies. Always use verified legal aid and Protection Officers.',
            sfxEmotion: 'afraid',
            safetyDelta: -25
          }
        ],
        winningNextNodeId: 'm9_node_3'
      },
      m9_node_3: {
        id: 'm9_node_3',
        decisionNumber: 3,
        situation: 'With legal protections filed, Aira evaluates her living arrangement: Priya\'s guest room for the next month, or transitional women\'s community housing, paired with her upcoming new job start date.',
        speaker: 'Priya',
        dialogue: '"Aira, you have an independent salary starting next week, you have legal protection, and you have us. How do you envision your new beginning?"',
        heroResponseDialogue: '"I choose a life of dignity, peace, and freedom. I will work, heal, and rebuild my world step by step."',
        strangerType: 'friend_priya',
        airaThought: 'The fear that paralyzed me for months is finally breaking. I am holding the steering wheel of my own destiny.',
        exclamatoryPrompt: 'PING!',
        choices: [
          {
            id: 'm9_c3_a',
            text: 'Finalize your transitional relocation plan: stay with Priya while onboarding your new career, establish a monthly savings budget, and begin counseling for emotional healing.',
            isCorrect: true,
            feedback: 'A holistic, empowered life blueprint! Combining stable housing, employment, savings, and emotional support creates an unshakeable foundation.',
            educationalTip: 'Sustainable independence combines financial stability, legal protection, and trauma-informed emotional care.',
            sfxEmotion: 'relief',
            independenceDelta: 25,
            supportDelta: 25,
            boundariesDelta: 20,
            safetyDelta: 20
          },
          {
            id: 'm9_c3_b',
            text: 'Decide that you cannot bear living without him, drop all legal protections, and move back into the apartment with zero safety conditions.',
            isCorrect: false,
            feedback: 'Returning unconditionally after filing legal documents without third-party monitoring drastically escalates the cycle of abuse.',
            educationalTip: 'Any reconciliation or dialogue must involve verified third-party counseling, behavioral change, and absolute safety boundaries.',
            sfxEmotion: 'afraid',
            safetyDelta: -30,
            boundariesDelta: -25
          },
          {
            id: 'm9_c3_c',
            text: 'Flee the city with no money, throw your phone in the river, and live off the grid in secrecy.',
            isCorrect: false,
            feedback: 'Unplanned disappearance cuts off career opportunities and essential support networks unnecessarily when legal protections exist.',
            educationalTip: 'Stand empowered within community support rather than fleeing in isolation.',
            sfxEmotion: 'shock',
            independenceDelta: -20
          }
        ],
        winningNextNodeId: 'VICTORY'
      }
    },
    victoryEnding: {
      title: 'The Sovereign Crossroads Conquered',
      description: 'You evaluated your life with dignity, activated statutory legal shields, and chose a future built on peace, autonomy, and support.',
      takeaway: 'Leaving or staying with boundaries is your sovereign choice. With legal backing and true allies, freedom is always attainable.'
    }
  },

  // =========================================================================
  // CHAPTER 10 — A NEW BEGINNING (Culmination & Multi-Branching Epilogue)
  // =========================================================================
  {
    id: 'mission-10',
    number: 10,
    chapterNumber: 10,
    chapterName: 'A New Beginning',
    isStoryChapter: true,
    title: 'A New Beginning',
    tagline: 'The morning sun rises over the city skyline. Your accumulated decisions, courage, and resilience unlock your future.',
    domain: 'Self-Actualization, Healing & Community Empowerment',
    environmentName: 'Sunlit City Promenade & Empowerment Hub',
    badgeName: 'SHERO ASCENDANT',
    badgeIcon: 'Trophy',
    badgeDescription: 'Completed the connected 10-chapter saga, forged uncompromising autonomy, and unlocked a multi-branching future.',
    difficulty: 'Advanced',
    summary: 'Aira steps out into the sunlit morning. Her accumulated choices throughout the saga determine her final destiny: The Autonomous Pioneer, The Circle of Resilience, The Empowered Scholar, or The Community Anchor.',
    learningGoal: 'Reflect on accumulated decisions, cement lifelong safety and boundary practices, and inspire community empowerment.',
    startNodeId: 'm10_node_1',
    nodes: {
      m10_node_1: {
        id: 'm10_node_1',
        decisionNumber: 1,
        situation: 'The sun shines brilliantly over the city promenade. Aira steps out in her professional attire on her way to her new career orientation. Her posture is upright, her eyes alert and peaceful.',
        speaker: 'Community Center Director',
        dialogue: '"Good morning! Welcome to the civic innovation team. We were deeply impressed by your analytical portfolio and your resilience. How does it feel to step into your new role today?"',
        heroResponseDialogue: '"It feels like breathing fresh air after being underwater for years. I am proud to be here on my own merits."',
        strangerType: 'counselor',
        airaThought: 'Every choice I made—from that bus stop in dusk to walking out the door—led me to this morning of freedom.',
        exclamatoryPrompt: 'PING!',
        choices: [
          {
            id: 'm10_c1_a',
            text: 'Embrace your new professional role with enthusiasm, commit to ongoing skills mastery, and celebrate your hard-earned financial independence.',
            isCorrect: true,
            feedback: 'Inspiring self-actualization! Your career and financial competence are enduring pillars of personal dignity and freedom.',
            educationalTip: 'Continuous professional growth and economic self-sufficiency ensure you will always navigate life on your own terms.',
            sfxEmotion: 'relief',
            independenceDelta: 20,
            boundariesDelta: 15
          },
          {
            id: 'm10_c1_b',
            text: 'Assume that because you escaped the previous situation, you will inevitably fail at your new job and quit on your first day.',
            isCorrect: false,
            feedback: 'Imposter syndrome often follows trauma. Acknowledge your accomplishments and allow yourself to succeed.',
            educationalTip: 'You possess proven resilience. Trust in your capabilities and give yourself permission to thrive.',
            sfxEmotion: 'afraid',
            boundariesDelta: -10
          },
          {
            id: 'm10_c1_c',
            text: 'Immediately look for another relationship to completely handle your finances so you don\'t have to work.',
            isCorrect: false,
            feedback: 'Rushing into dependent relationships without healing or financial grounding risks recreating the same vulnerability cycle.',
            educationalTip: 'Solidify your own independence and emotional healing before committing to new partnerships.',
            sfxEmotion: 'shock',
            independenceDelta: -15
          }
        ],
        winningNextNodeId: 'm10_node_2'
      },
      m10_node_2: {
        id: 'm10_node_2',
        decisionNumber: 2,
        situation: 'At lunchtime, Priya and Aira\'s study circle friends meet her with flowers and cupcakes on the sunlit terrace, celebrating her new apartment lease and new job.',
        speaker: 'Priya',
        dialogue: '"To Aira! A woman who fought for her dignity, protected her boundaries, and showed all of us what real courage looks like!"',
        heroResponseDialogue: '"To all of us! Because no woman should ever have to walk the journey of safety alone."',
        strangerType: 'friend_priya',
        airaThought: 'My support network is thriving. Healing isn\'t just about surviving; it\'s about reclaiming joy, connection, and laughter.',
        exclamatoryPrompt: 'PING!',
        choices: [
          {
            id: 'm10_c2_a',
            text: 'Celebrate with your circle, nurture these deep mutual friendships, and establish weekly check-ins to support each other\'s life goals.',
            isCorrect: true,
            feedback: 'The beauty of community resilience! Maintaining healthy, reciprocal friendships enriches your life and prevents isolation forever.',
            educationalTip: 'A strong circle of trust is a lifelong safety shield and source of joy.',
            sfxEmotion: 'laugh',
            supportDelta: 20,
            boundariesDelta: 10
          },
          {
            id: 'm10_c2_b',
            text: 'Push your friends away and tell them you prefer to be a lone wolf who never speaks to anyone.',
            isCorrect: false,
            feedback: 'Extreme hyper-independence is a trauma response. Humans are social beings who heal through safe, authentic connection.',
            educationalTip: 'Interdependence with trustworthy allies is the healthiest state of being.',
            sfxEmotion: 'afraid',
            supportDelta: -15
          },
          {
            id: 'm10_c2_c',
            text: 'Ignore your safety lessons and abandon all boundary awareness.',
            isCorrect: false,
            feedback: 'Boundary awareness is not paranoia; it is a permanent life skill that preserves your peace and dignity.',
            educationalTip: 'Carry your situational wisdom and self-respect into every sphere of your life.',
            sfxEmotion: 'shock',
            safetyDelta: -10
          }
        ],
        winningNextNodeId: 'm10_node_3'
      },
      m10_node_3: {
        id: 'm10_node_3',
        decisionNumber: 3,
        situation: 'As evening approaches, Aira is invited to speak at the Youth & Women Safety Workshop, sharing her journey with young women commuting, dating, and navigating decisions.',
        speaker: 'Workshop Moderator',
        dialogue: '"Aira, your story of situational awareness, boundaries, and empowerment has inspired so many. What is the one truth you want every young woman to know?"',
        heroResponseDialogue: '"Trust your instincts. Defend your boundaries without apology. You are never alone, and your future is worth fighting for."',
        strangerType: 'counselor',
        airaThought: 'From a commuter waiting in the shadows to a beacon of strength for others. This is who I am. I am a SHERO.',
        exclamatoryPrompt: 'PING!',
        choices: [
          {
            id: 'm10_c3_a',
            text: 'Share the verified safety principles: trust your gut instincts, keep independent financial roots, preserve loyal allies, and know your legal helplines (112, 181, 1091).',
            isCorrect: true,
            feedback: 'The ultimate culmination of your quest! Transforming your journey into empowerment for others cements your legacy as a true champion of women\'s safety.',
            educationalTip: 'Empowerment shared is empowerment multiplied. You have mastered every facet of the Safety Quest!',
            sfxEmotion: 'relief',
            safetyDelta: 20,
            independenceDelta: 20,
            supportDelta: 20,
            boundariesDelta: 20
          },
          {
            id: 'm10_c3_b',
            text: 'Tell the audience that the world is completely hopeless and women should never attempt to leave their houses.',
            isCorrect: false,
            feedback: 'Defeatism denies the power of education, community solidarity, and statutory legal rights.',
            educationalTip: 'Knowledge and solidarity transform fear into action and safety.',
            sfxEmotion: 'afraid',
            boundariesDelta: -15
          },
          {
            id: 'm10_c3_c',
            text: 'Refuse to share any knowledge and walk out of the room.',
            isCorrect: false,
            feedback: 'Passing the torch of safety awareness helps create safer cities and communities for everyone.',
            educationalTip: 'Community awareness protects every woman who steps onto the streets or navigates relationships.',
            sfxEmotion: 'shock',
            supportDelta: -10
          }
        ],
        winningNextNodeId: 'VICTORY'
      }
    },
    victoryEnding: {
      title: 'SHERO: The Unstoppable Horizon',
      description: 'You completed the entire 10-chapter connected journey—from public street safety to relationship boundaries, financial sovereignty, and self-actualization.',
      takeaway: 'Your decisions shape your life. With situational wisdom, strong boundaries, and true allies, you are the author of your own destiny!'
    }
  }
];

export const VERIFIED_SUPPORT_RESOURCES: SupportResource[] = [
  {
    id: 'res-112',
    name: 'National Emergency Helpline (Pan-India)',
    category: 'Emergency',
    contact: '112',
    website: 'https://112.gov.in',
    coverage: 'India (All States & Union Territories)',
    description: 'Unified single emergency number for police, fire, medical ambulance, and disaster response services.',
    officialSource: 'Ministry of Home Affairs (MHA), Government of India',
    lastVerified: '2026-03-01',
    tags: ['Emergency', 'Police', 'Ambulance', 'Fire', 'Pan-India']
  },
  {
    id: 'res-1091',
    name: 'Women in Distress National Helpline',
    category: 'Helpline',
    contact: '1091',
    website: 'https://ncw.nic.in',
    coverage: 'Pan-India Police Women Safety Wings',
    description: 'Toll-free 24/7 dedicated police assistance helpline for women experiencing harassment, domestic abuse, or distress in public/private spaces.',
    officialSource: 'National Commission for Women & State Police Organizations',
    lastVerified: '2026-03-01',
    tags: ['Women Safety', 'Police', '24/7 Helpline', 'Distress']
  },
  {
    id: 'res-181',
    name: 'Women Helpline Scheme (WHL)',
    category: 'Helpline',
    contact: '181',
    website: 'https://wcd.nic.in',
    coverage: 'Universal coverage across Indian States & UTs',
    description: '24-hour toll-free telephonic service providing integrated support, rescue, crisis intervention, counseling, and shelter referrals.',
    officialSource: 'Ministry of Women and Child Development (MWCD)',
    lastVerified: '2026-03-01',
    tags: ['Helpline', 'Crisis Counseling', 'Legal Aid Referral', 'Medical Help']
  },
  {
    id: 'res-pwdva',
    name: 'Protection of Women from Domestic Violence Act (PWDVA) Redressal Cell',
    category: 'Legal & Support',
    contact: '181 / District Protection Officer',
    website: 'https://nalsa.gov.in',
    coverage: 'Pan-India District Courts & Legal Service Authorities',
    description: 'Statutory protection network offering free legal aid, Protection Orders, Residence Orders, and Stridhan custody recovery under PWDVA 2005.',
    officialSource: 'National Legal Services Authority (NALSA) & MWCD',
    lastVerified: '2026-03-01',
    tags: ['Legal Aid', 'Protection Orders', 'PWDVA', 'Free Legal Support']
  },
  {
    id: 'res-1930',
    name: 'National Cybercrime Reporting Helpline',
    category: 'Cyber Safety',
    contact: '1930',
    website: 'https://cybercrime.gov.in',
    coverage: 'Pan-India',
    description: 'National helpline to report cyber financial frauds, online harassment, non-consensual image sharing, blackmail, and extortion.',
    officialSource: 'Indian Cyber Crime Coordination Centre (I4C), MHA',
    lastVerified: '2026-03-01',
    tags: ['Cybercrime', 'Digital Extortion', 'Identity Theft', '1930 Helpline']
  },
  {
    id: 'res-1098',
    name: 'Childline India (Now under 112 / Mission Vatsalya)',
    category: 'Campus Support',
    contact: '1098',
    website: 'https://wcd.nic.in/childline',
    coverage: 'Pan-India',
    description: '24-hour emergency helpline service for children and adolescents in need of care, rescue, and protection from violence.',
    officialSource: 'Ministry of Women and Child Development',
    lastVerified: '2026-03-01',
    tags: ['Youth', 'Minors', 'Adolescent Safety', 'Child Protection']
  },
  {
    id: 'res-posh',
    name: 'UGC SAKSHAM / Campus Internal Complaints Portal',
    category: 'Campus Support',
    contact: '1800-111-656',
    website: 'https://saksham.ugc.ac.in',
    coverage: 'Higher Educational Institutions across India',
    description: 'Statutory portal for monitoring and redressing sexual harassment and grievances in universities and colleges under POSH Regulations.',
    officialSource: 'University Grants Commission (UGC)',
    lastVerified: '2026-03-01',
    tags: ['Campus Safety', 'POSH', 'ICC', 'Student Redressal']
  }
];
