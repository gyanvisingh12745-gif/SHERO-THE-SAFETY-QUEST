import { MissionSceneData } from '../types';

export const a2_cab_ride: MissionSceneData = {
  id: 'mission-2',
  part: 'A',
  code: 'A2',
  number: 2,
  titleEn: 'The Evening Cab Ride',
  titleHi: 'शाम की कैब यात्रा',
  taglineEn: 'The app shows the driver approaching. Checking credentials before boarding.',
  taglineHi: 'कैब आ चुकी है। बैठने से पहले गाड़ी और ड्राइवर की सही पहचान जरूरी है।',
  environmentName: 'cab_ride',
  badgeName: 'TRANSIT NAVIGATOR',
  badgeIcon: 'Compass',
  introPanels: [
    {
      id: 'p1',
      title: 'Booking the Ride',
      titleHi: 'कैब बुकिंग',
      captionEn: "{hero} and Aanya finish college group study. {hero} books an app cab.",
      captionHi: "{hero} और आन्या की पढ़ाई खत्म हुई। {hero} ने घर जाने के लिए कैब बुक की।",
      visualKey: '02_walking_dusk',
      badge: 'APP TRANSIT',
      soundEffect: 'ping'
    },
    {
      id: 'p2',
      title: 'Arrival Check',
      titleHi: 'नंबर प्लेट मिलान',
      captionEn: "A white sedan pulls up. The driver rolls down the window and gestures to hop in.",
      captionHi: "सफेद कार आकर रुकती है। ड्राइवर शीशा नीचे करके तुरंत बैठने का इशारा करता है।",
      visualKey: 'cab_ride',
      badge: 'VERIFICATION',
      soundEffect: 'ambient'
    },
    {
      id: 'p3',
      title: 'Route Alert',
      titleHi: 'रूट डायवर्जन',
      captionEn: "Inside the cab, the driver starts taking an unlit detour away from the GPS route.",
      captionHi: "सफर के दौरान ड्राइवर जीपीएस मैप छोड़कर एक अंधेरे रास्ते पर गाड़ी मोड़ने लगता है।",
      visualKey: 'cab_ride',
      badge: 'ALERT',
      soundEffect: 'suspense'
    }
  ],
  storyboardTurns: [
    {
      id: 'sb_1',
      speaker: 'Narrator',
      speakerRole: 'narrator',
      bubbleType: 'narration',
      textEn: '{hero} and her friend Aanya finish a long group study session at college. The sun has already set. {hero} opens her cab app and books a ride home.',
      textHi: '{hero} और उसकी दोस्त आन्या की पढ़ाई देर तक चली। सूरज ढल चुका है। {hero} ने ऐप से कैब बुक की।',
      mangaBadge: 'DUSK',
      sfx: 'ping',
      cameraZoom: 'wide'
    },
    {
      id: 'sb_2',
      speaker: '{hero}',
      speakerRole: 'hero',
      heroExpression: 'neutral',
      bubbleType: 'speech',
      textEn: 'Cab should be here in 3 minutes. Let me share the live trip with you, Aanya.',
      textHi: 'कैब 3 मिनट में आ जाएगी। मैं लाइव ट्रिप तुम्हें शेयर करती हूँ, आन्या।',
      mangaBadge: 'PREP',
      sfx: 'ping',
      cameraZoom: 'close_up'
    },
    {
      id: 'sb_3',
      speaker: 'Narrator',
      speakerRole: 'narrator',
      bubbleType: 'narration',
      textEn: 'A white sedan pulls up. The driver doesn\'t confirm the OTP or her name — he just waves impatiently for her to get in.',
      textHi: 'एक सफ़ेद कार आकर रुकती है। ड्राइवर न OTP पूछता है, न नाम — बस बैठने का इशारा करता है।',
      mangaBadge: 'ARRIVAL',
      sfx: 'ambient',
      cameraZoom: 'wide'
    },
    {
      id: 'sb_4',
      speaker: '{hero}',
      speakerRole: 'hero',
      heroExpression: 'thinking',
      bubbleType: 'thought',
      textEn: 'Wait... I should match the plate number and driver photo before getting in. The app shows a different color car.',
      textHi: 'रुको... मुझे पहले नंबर प्लेट और ड्राइवर की फोटो मिलानी चाहिए। ऐप पर तो अलग रंग की गाड़ी दिख रही है।',
      mangaBadge: 'CHECK',
      sfx: 'suspense',
      cameraZoom: 'close_up'
    },
    {
      id: 'sb_5',
      speaker: 'Cab Driver',
      speakerRole: 'stranger',
      speakerExpression: 'annoyed',
      bubbleType: 'speech',
      textEn: 'Madam, jaldi baithiye! Traffic badh raha hai. I know a shortcut through the back lanes.',
      textHi: 'मैडम, जल्दी बैठिए! ट्रैफ़िक बढ़ रहा है। मुझे एक शॉर्टकट पता है पीछे की गलियों से।',
      mangaBadge: 'RUSH',
      sfx: 'tension',
      cameraZoom: 'normal'
    },
    {
      id: 'sb_6',
      speaker: 'Narrator',
      speakerRole: 'narrator',
      bubbleType: 'narration',
      textEn: 'Inside the cab, {hero} watches the GPS map on her phone. The driver suddenly turns off the main highway into a narrow, unlit lane.',
      textHi: 'कैब में बैठकर {hero} अपने फ़ोन पर GPS मैप देख रही है। अचानक ड्राइवर हाईवे छोड़कर एक सुनसान अंधेरी गली में मुड़ जाता है।',
      mangaBadge: 'DETOUR',
      sfx: 'suspense',
      cameraZoom: 'pan_slow'
    },
    {
      id: 'sb_7',
      speaker: '{hero}',
      speakerRole: 'hero',
      heroExpression: 'scared',
      bubbleType: 'thought',
      textEn: 'This isn\'t the GPS route! There are no streetlights here, no other cars. My heart is pounding...',
      textHi: 'यह GPS का रास्ता नहीं है! यहाँ न स्ट्रीटलाइट है, न कोई और गाड़ी। मेरा दिल ज़ोरों से धड़क रहा है...',
      mangaBadge: 'THUMP!',
      sfx: 'heartbeat',
      cameraZoom: 'close_up'
    },
    {
      id: 'sb_8',
      speaker: 'Cab Driver',
      speakerRole: 'stranger',
      speakerExpression: 'annoyed',
      bubbleType: 'speech',
      textEn: 'Relax madam, trust me. This dark lane will save us 15 minutes. The highway has heavy traffic.',
      textHi: 'रिलैक्स मैडम, मुझ पर भरोसा रखिए। इस अंधेरी गली से 15 मिनट बचेंगे। हाईवे पर बहुत जाम है।',
      mangaBadge: 'HONK!',
      sfx: 'tension',
      cameraZoom: 'normal'
    },
    {
      id: 'sb_9',
      speaker: '{hero}',
      speakerRole: 'hero',
      heroExpression: 'nervous',
      bubbleType: 'thought',
      textEn: 'I need to act now. Should I demand he go back to the main road? Should I call someone? What do I do?!',
      textHi: 'मुझे अभी कुछ करना होगा। क्या मैं उसे मुख्य सड़क पर लौटने को कहूँ? किसी को कॉल करूँ? मैं क्या करूँ?!',
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
      backgroundKey: 'cab_ride',
      lighting: 'dusk_golden',
      weather: 'passing_lights',
      situationEn: 'The driver abruptly turns down a narrow unlit shortcut off the GPS map, claiming it is faster.',
      situationHi: 'ड्राइवर मुख्य सड़क और जीपीएस छोड़कर एक सुनसान संकरी गली में गाड़ी मोड़ता है और कहता है कि यह शॉर्टकट है।',
      speakerId: 'cab_driver',
      speakerName: 'Cab Driver',
      speakerExpression: 'annoyed',
      speakerDialogueEn: "Madam, the main highway has heavy traffic. Trust me, this dark lane will save us 15 minutes.",
      speakerDialogueHi: "मैडम, हाईवे पर बहुत जाम है। मुझ पर भरोसा रखिए, इस अंधेरी गली से 15 मिनट बचेंगे।",
      heroExpression: 'determined',
      heroThoughtEn: "My safety app warns against unverified detours. The highway is lit and has commuters.",
      heroThoughtHi: "मेरी सुरक्षा गाइडलाइन कहती है कि कभी भी मैप से भटके बिना रोशनी वाले रास्ते पर ही रहना चाहिए।",
      heroResponseDialogueEn: "Bhaiya, please stick to the official GPS route on the highway. I have shared my live ride with my friend Aanya.",
      heroResponseDialogueHi: "भैया, कृपया जीपीएस वाले मुख्य रास्ते पर ही चलिए। मैंने अपनी लाइव राइड आन्या को शेयर कर रखी है।",
      mangaEffect: 'speed_lines',
      mangaBadge: 'HONK!',
      crowd: [
        { id: 'aanya', name: 'Aanya', role: 'Friend on Call', position: 'right_mid', expression: 'determined' }
      ],
      questionEn: 'The driver diverts from the official map into an unlit route. What is the safest response?',
      questionHi: 'ड्राइवर जीपीएस छोड़कर अंधेरे रास्ते पर गाड़ी मोड़े, तो सबसे सुरक्षित प्रतिक्रिया क्या है?',
      choices: [
        {
          id: 'c1',
          textEn: 'Firmly instruct the driver to stay on the GPS route, and speak aloud to your friend on the call.',
          textHi: 'ड्राइवर को स्पष्ट कहें कि जीपीएस रूट पर ही रहें, और फोन पर अपनी सहेली को इस बारे में जोर से बताएं।',
          isCorrect: true,
          feedbackEn: 'Assertive communication combined with letting the driver know your ride is tracked live is an effective deterrent against unauthorized detours.',
          feedbackHi: 'स्पष्ट शब्दों में मुख्य रास्ते पर रहने को कहना और यह जताना कि आप लाइव ट्रैकिंग पर हैं, सबसे सुरक्षित कदम है।',
          educationalTipEn: 'Never hesitate to speak up firmly when drivers deviate from agreed digital routes.',
          educationalTipHi: 'अगर ड्राइवर तय रास्ते से भटके, तो तुरंत आपत्ति जताएं और फोन पर स्थिति बताएं।',
          safetyDelta: 25,
          boundariesDelta: 20
        },
        {
          id: 'c2',
          textEn: 'Stay completely silent and hope he knows the way back to the main road.',
          textHi: 'चुपचाप बैठ जाएं और उम्मीद करें कि वह खुद मुख्य सड़क पर वापस आ जाएगा।',
          isCorrect: false,
          feedbackEn: 'Staying silent when a driver deviates from verified routes into dark areas compromises your safety.',
          feedbackHi: 'अंधेरे रास्ते पर खामोश रहना आपके नियंत्रण और सुरक्षा को खतरे में डालता है।',
          educationalTipEn: 'Silence can be misinterpreted as consent or compliance in unsafe situations.',
          educationalTipHi: 'खतरनाक स्थिति में चुप रहना स्थिति को और बिगाड़ सकता है।',
          safetyDelta: -25,
          boundariesDelta: -15
        },
        {
          id: 'c3',
          textEn: 'Try to grab the steering wheel while the car is moving at speed.',
          textHi: 'चलती गाड़ी में अचानक स्टेयरिंग पकड़ने की कोशिश करें।',
          isCorrect: false,
          feedbackEn: 'Interfering with vehicle controls at speed risks a severe road accident. Use emergency buttons or demand to stop in public.',
          feedbackHi: 'चलती गाड़ी में स्टेयरिंग छीनने से गंभीर दुर्घटना हो सकती है। गाड़ी रोकने को कहें या इमरजेंसी बटन दबाएं।',
          educationalTipEn: 'Demand the car stop in a lit public area rather than creating a crash risk.',
          educationalTipHi: 'सड़क पर सुरक्षित जगह गाड़ी रोकने की मांग करें।',
          safetyDelta: -30,
          boundariesDelta: -10
        }
      ],
      winningNextNodeId: 'VICTORY'
    }
  },
  takeawayEn: {
    title: 'Key Takeaways — Safe Cab Commuting',
    checklist: [
      'Match license plate, car model, and driver photo before boarding.',
      'Always share live trip tracking with a trusted friend or family member.',
      'Insist on the official GPS route; challenge unscheduled dark detours immediately.',
      'Keep your door unlocked and sit on the passenger side for quick egress.',
      'Know the in-app SOS button and dial 112 if you feel threatened.'
    ],
    motto: 'Verify Before You Ride • Stay Connected • Be SHERO'
  },
  takeawayHi: {
    title: 'मुख्य सीख — सुरक्षित कैब सफर',
    checklist: [
      'बैठने से पहले नंबर प्लेट, गाड़ी और ड्राइवर की फोटो का मिलान करें।',
      'सफर की लाइव ट्रैकिंग हमेशा किसी दोस्त या परिवार के साथ शेयर करें।',
      'जीपीएस वाले मुख्य रास्ते पर चलने पर जोर दें; अंधेरे शॉर्टकट का विरोध करें।',
      'पीछे की सीट पर बैठें ताकि आपात स्थिति में आसानी से उतर सकें।',
      'सुरक्षा के लिए 112 और ऐप के एसओएस बटन का प्रयोग करें।'
    ],
    motto: 'पुष्टि करें • संपर्क में रहें • SHERO बनें'
  }
};
