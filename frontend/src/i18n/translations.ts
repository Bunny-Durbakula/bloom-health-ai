import { Language } from '../types';

export interface Translations {
  appName: string;
  tagline: string;
  nav: {
    home: string;
    chat: string;
    report: string;
    about: string;
    privacy: string;
    login: string;
    register: string;
    logout: string;
  };
  hero: {
    headline: string;
    subEnglish: string;
    subTelugu: string;
    subHindi: string;
    ctaChat: string;
    ctaReport: string;
    badge: string;
  };
  features: {
    title: string;
    subtitle: string;
    chatTitle: string;
    chatDesc: string;
    reportTitle: string;
    reportDesc: string;
    langTitle: string;
    langDesc: string;
  };
  chat: {
    title: string;
    subtitle: string;
    placeholder: string;
    send: string;
    thinking: string;
    clear: string;
    retry: string;
    examplesTitle: string;
    examples: string[];
    errorGeneric: string;
  };
  report: {
    title: string;
    subtitle: string;
    dropzoneTitle: string;
    dropzoneSubtitle: string;
    fileLimitNotice: string;
    loginRequiredNotice: string;
    loginCta: string;
    analyzeBtn: string;
    analyzingBtn: string;
    resultsTitle: string;
    nonMedicalTitle: string;
    disclaimerTitle: string;
  };
  auth: {
    loginTitle: string;
    loginSubtitle: string;
    registerTitle: string;
    registerSubtitle: string;
    emailLabel: string;
    passwordLabel: string;
    signInBtn: string;
    signUpBtn: string;
    noAccount: string;
    haveAccount: string;
  };
  disclaimer: string;
  emergencyNotice: string;
}

export const translations: Record<Language, Translations> = {
  en: {
    appName: "Bloom Health AI",
    tagline: "Multilingual Healthcare Information Assistant",
    nav: {
      home: "Home",
      chat: "Health Chat",
      report: "Understand My Report",
      about: "About",
      privacy: "Privacy & Safety",
      login: "Sign In",
      register: "Create Account",
      logout: "Sign Out",
    },
    hero: {
      headline: "Understand Your Health, With Confidence.",
      subEnglish: "Know more about your health.",
      subTelugu: "మీ ఆరోగ్యం గురించి మరింత తెలుసుకోండి.",
      subHindi: "अपने स्वास्थ्य के बारे में अधिक जानें।",
      ctaChat: "Start a Health Chat",
      ctaReport: "Understand My Report",
      badge: "Empowering Patient Understanding",
    },
    features: {
      title: "Compassionate, Accessible Health Guidance",
      subtitle: "Designed to demystify complex medical terminology and provide clarity in your language of choice.",
      chatTitle: "Conversational Health Q&A",
      chatDesc: "Ask everyday wellness and symptom questions and receive calm, medically balanced explanations.",
      reportTitle: "Medical Document Explanations",
      reportDesc: "Upload lab tests, blood reports, or discharge summaries for a structured, plain-language breakdown.",
      langTitle: "True Multilingual Care",
      langDesc: "Fluently converse and understand reports in English, Telugu (తెలుగు), and Hindi (हिन्दी).",
    },
    chat: {
      title: "Bloom Health Assistant",
      subtitle: "Ask any health or medical question in your preferred language.",
      placeholder: "Type your health question here... (Enter to send, Shift+Enter for newline)",
      send: "Send",
      thinking: "Thinking and reviewing medical guidance...",
      clear: "Clear Chat",
      retry: "Retry Question",
      examplesTitle: "Suggested Questions:",
      examples: [
        "What does a high blood sugar result mean?",
        "Explain common causes of headaches.",
        "What questions should I ask my doctor about my blood test?",
      ],
      errorGeneric: "Failed to connect to the health assistant. Please check your connection and try again.",
    },
    report: {
      title: "Understand Your Medical Report",
      subtitle: "Upload your blood test, prescription, or lab report for an organized, easy-to-read explanation.",
      dropzoneTitle: "Drop your medical document here, or browse files",
      dropzoneSubtitle: "Supports PDF, JPEG, PNG, and WebP (up to 15 MB)",
      fileLimitNotice: "Maximum file size is 15 MB. Only authentic healthcare reports are analyzed.",
      loginRequiredNotice: "Sign in required to analyze medical reports to protect your healthcare privacy.",
      loginCta: "Sign In or Register to Upload",
      analyzeBtn: "Analyze Medical Report",
      analyzingBtn: "Reviewing & Analyzing Document...",
      resultsTitle: "Structured Report Explanation",
      nonMedicalTitle: "Document Not Recognized",
      disclaimerTitle: "Medical Disclaimer",
    },
    auth: {
      loginTitle: "Welcome Back to Bloom Health",
      loginSubtitle: "Sign in to securely access document analysis and saved health history.",
      registerTitle: "Create Your Health Account",
      registerSubtitle: "Join Bloom Health AI to securely understand your lab reports and medical tests.",
      emailLabel: "Email Address",
      passwordLabel: "Password",
      signInBtn: "Sign In",
      signUpBtn: "Create Free Account",
      noAccount: "Don't have an account yet? Register here",
      haveAccount: "Already have an account? Sign in here",
    },
    disclaimer: "Bloom Health AI is an educational assistant, not a replacement for a qualified doctor. Never use it to diagnose conditions, prescribe medications, or replace personal clinical evaluation.",
    emergencyNotice: "If you are experiencing severe symptoms, chest pain, difficulty breathing, or another acute medical emergency, call 112 / 911 or visit the nearest emergency room immediately.",
  },
  te: {
    appName: "బ్లూమ్ హెల్త్ AI",
    tagline: "బహుభాషా ఆరోగ్య సమాచార సహాయకుడు",
    nav: {
      home: "హోమ్",
      chat: "ఆరోగ్య సంభాషణ",
      report: "నా రిపోర్ట్‌ని అర్థం చేసుకోండి",
      about: "గురించి",
      privacy: "గోప్యత & భద్రత",
      login: "లాగిన్",
      register: "ఖాతా తెరవండి",
      logout: "లాగ్ అవుట్",
    },
    hero: {
      headline: "మీ ఆరోగ్యాన్ని నమ్మకంతో అర్థం చేసుకోండి.",
      subEnglish: "Know more about your health.",
      subTelugu: "మీ ఆరోగ్యం గురించి మరింత తెలుసుకోండి.",
      subHindi: "अपने स्वास्थ्य के बारे में अधिक जानें।",
      ctaChat: "ఆరోగ్య చాట్ ప్రారంభించండి",
      ctaReport: "నా రిపోర్ట్ అర్థం చేసుకోండి",
      badge: "సహజమైన ఆరోగ్య అవగాహన",
    },
    features: {
      title: "సులభమైన, సరళమైన ఆరోగ్య సమాచారం",
      subtitle: "సంక్లిష్టమైన వైద్య నిబంధనలను మీ స్వంత భాషలో సులభంగా అర్థం చేసుకునేందుకు రూపొందించబడింది.",
      chatTitle: "ఆరోగ్య ప్రశ్నలు & సమాధానాలు",
      chatDesc: "మీ లక్షణాలు లేదా సాధారణ ఆరోగ్య సందేహాలను అడగండి మరియు సరళమైన వివరణ పొందండి.",
      reportTitle: "వైద్య నివేదికల వివరణ",
      reportDesc: "రక్త పరీక్షలు లేదా ప్రిస్క్రిప్షన్‌లను అప్‌లోడ్ చేసి, సులభమైన తెలుగులో విశ్లేషణను పొందండి.",
      langTitle: "బహుభాషా మద్దతు",
      langDesc: "తెలుగు, ఇంగ్లీష్ మరియు హిందీలలో ఆరోగ్య సమాచారాన్ని సులభంగా పొందండి.",
    },
    chat: {
      title: "బ్లూమ్ ఆరోగ్య సహాయకుడు",
      subtitle: "మీకు నచ్చిన భాషలో ఏదైనా ఆరోగ్య ప్రశ్నను అడగండి.",
      placeholder: "మీ ఆరోగ్య ప్రశ్నను ఇక్కడ టైప్ చేయండి... (పంపడానికి Enter, కొత్త లైన్ కోసం Shift+Enter)",
      send: "పంపు",
      thinking: "పరిశీలిస్తోంది...",
      clear: "సంభాషణను క్లియర్ చేయండి",
      retry: "మళ్ళీ ప్రయత్నించండి",
      examplesTitle: "ఉదాహరణ ప్రశ్నలు:",
      examples: [
        "రక్తంలో చక్కెర ఎక్కువైతే దాని అర్థం ఏమిటి?",
        "సాధారణ తలనొప్పికి కారణాలు ఏమిటి?",
        "రక్త పరీక్ష గురించి నా వైద్యుడిని ఏ ప్రశ్నలు అడగాలి?",
      ],
      errorGeneric: "ఆరోగ్య సహాయకుడిని సంప్రదించడంలో లోపం. దయచేసి మళ్లీ ప్రయత్నించండి.",
    },
    report: {
      title: "మీ వైద్య నివేదికను అర్థం చేసుకోండి",
      subtitle: "సులభమైన వివరణ కోసం మీ రక్త పరీక్ష లేదా ల్యాబ్ రిపోర్ట్‌ను అప్‌లోడ్ చేయండి.",
      dropzoneTitle: "మీ వైద్య పత్రాన్ని ఇక్కడ వేయండి లేదా ఎంచుకోండి",
      dropzoneSubtitle: "PDF, JPEG, PNG మరియు WebP మద్దతు ఉంది (15 MB వరకు)",
      fileLimitNotice: "గరిష్ట పరిమాణం 15 MB. వైద్య పత్రాలు మాత్రమే విశ్లేషించబడతాయి.",
      loginRequiredNotice: "వైద్య నివేదికలను విశ్లేషించడానికి మరియు మీ గోప్యతను కాపాడటానికి లాగిన్ అవసరం.",
      loginCta: "అప్‌లోడ్ చేయడానికి లాగిన్ లేదా రిజిస్టర్ అవ్వండి",
      analyzeBtn: "రిపోర్ట్‌ను విశ్లేషించండి",
      analyzingBtn: "పత్రాన్ని విశ్లేషిస్తోంది...",
      resultsTitle: "క్రమబద్ధమైన నివేదిక వివరణ",
      nonMedicalTitle: "వైద్య పత్రంగా గుర్తించబడలేదు",
      disclaimerTitle: "వైద్య నిరాకరణ",
    },
    auth: {
      loginTitle: "తిరిగి స్వాగతం",
      loginSubtitle: "మీ రిపోర్ట్‌లను సురక్షితంగా విశ్లేషించడానికి లాగిన్ చేయండి.",
      registerTitle: "ఖాతాను సృష్టించండి",
      registerSubtitle: "మీ వైద్య పరీక్షలను సులభంగా అర్థం చేసుకోవడానికి బ్లూమ్ హెల్త్‌లో చేరండి.",
      emailLabel: "ఈమెయిల్ చిరునామా",
      passwordLabel: "పాస్‌వర్డ్",
      signInBtn: "లాగిన్ అవ్వండి",
      signUpBtn: "ఖాతా తెరవండి",
      noAccount: "ఇంకా ఖాతా లేదా? ఇక్కడ నమోదు చేసుకోండి",
      haveAccount: "ఇప్పటికే ఖాతా ఉందా? లాగిన్ అవ్వండి",
    },
    disclaimer: "బ్లూమ్ హెల్త్ AI అనేది ఒక విద్యా సహాయకుడు మాత్రమే, అర్హత కలిగిన వైద్యుడికి ప్రత్యామ్నాయం కాదు. వ్యాధి నిర్ధారణ లేదా మందుల మార్పు కోసం దీన్ని ఉపయోగించవద్దు.",
    emergencyNotice: "తీవ్రమైన ఛాతీ నొప్పి, శ్వాస ఆడకపోవడం వంటి అత్యవసర పరిస్థితులు ఉంటే, వెంటనే 112 కు కాల్ చేయండి లేదా దగ్గరలోని ఆసుపత్రికి వెళ్ళండి.",
  },
  hi: {
    appName: "ब्लूम हेल्थ AI",
    tagline: "बहुभाषी स्वास्थ्य सूचना सहायक",
    nav: {
      home: "होम",
      chat: "स्वास्थ्य संवाद",
      report: "मेरी रिपोर्ट समझें",
      about: "के बारे में",
      privacy: "गोपनीयता और सुरक्षा",
      login: "लॉग इन",
      register: "खाता बनाएं",
      logout: "लॉग आउट",
    },
    hero: {
      headline: "अपने स्वास्थ्य को आत्मविश्वास से समझें।",
      subEnglish: "Know more about your health.",
      subTelugu: "మీ ఆరోగ్యం గురించి మరింత తెలుసుకోండి.",
      subHindi: "अपने स्वास्थ्य के बारे में अधिक जानें।",
      ctaChat: "स्वास्थ्य संवाद शुरू करें",
      ctaReport: "मेरी रिपोर्ट समझें",
      badge: "सशक्त रोगी समझ",
    },
    features: {
      title: "सुलभ और संवेदनशील स्वास्थ्य मार्गदर्शन",
      subtitle: "जटिल चिकित्सा शब्दों को आपकी अपनी भाषा में सरल बनाने के लिए डिज़ाइन किया गया।",
      chatTitle: "स्वास्थ्य प्रश्न और उत्तर",
      chatDesc: "अपने सामान्य स्वास्थ्य और लक्षणों के बारे में पूछें और शांत, सटीक उत्तर प्राप्त करें।",
      reportTitle: "मेडिकल रिपोर्ट का विश्लेषण",
      reportDesc: "अपनी ब्लड रिपोर्ट या पर्चे को अपलोड करें और सरल भाषा में संरचित विश्लेषण प्राप्त करें।",
      langTitle: "सच्ची बहुभाषी सहायता",
      langDesc: "अंग्रेजी, तेलुगु और हिंदी में स्वास्थ्य संबंधी जानकारी आसानी से समझें।",
    },
    chat: {
      title: "ब्लूम स्वास्थ्य सहायक",
      subtitle: "अपनी पसंदीदा भाषा में कोई भी स्वास्थ्य प्रश्न पूछें।",
      placeholder: "अपना स्वास्थ्य प्रश्न यहां लिखें... (भेजने के लिए Enter, नई पंक्ति के लिए Shift+Enter)",
      send: "भेजें",
      thinking: "समीक्षा और उत्तर तैयार कर रहा है...",
      clear: "चैट साफ़ करें",
      retry: "पुनः प्रयास करें",
      examplesTitle: "सुझाए गए प्रश्न:",
      examples: [
        "उच्च रक्त शर्करा (हाई ब्लड शुगर) का क्या अर्थ है?",
        "सिरदर्द के सामान्य कारण क्या हैं?",
        "ब्लड टेस्ट के बारे में डॉक्टर से क्या पूछना चाहिए?",
      ],
      errorGeneric: "स्वास्थ्य सहायक से संपर्क करने में असमर्थ। कृपया पुनः प्रयास करें।",
    },
    report: {
      title: "अपनी मेडिकल रिपोर्ट समझें",
      subtitle: "संरचित और सरल भाषा में व्याख्या के लिए अपनी लैब रिपोर्ट अपलोड करें।",
      dropzoneTitle: "अपनी मेडिकल रिपोर्ट यहां खींचें या फ़ाइल चुनें",
      dropzoneSubtitle: "PDF, JPEG, PNG और WebP समर्थित (15 MB तक)",
      fileLimitNotice: "अधिकतम फ़ाइल आकार 15 MB। केवल वास्तविक स्वास्थ्य रिपोर्ट का विश्लेषण किया जाता है।",
      loginRequiredNotice: "आपकी चिकित्सा गोपनीयता की रक्षा के लिए रिपोर्ट विश्लेषण से पहले लॉग इन आवश्यक है।",
      loginCta: "अपलोड करने के लिए लॉग इन या रजिस्टर करें",
      analyzeBtn: "रिपोर्ट का विश्लेषण करें",
      analyzingBtn: "दस्तावेज़ की समीक्षा की जा रही है...",
      resultsTitle: "संरचित रिपोर्ट विश्लेषण",
      nonMedicalTitle: "मेडिकल दस्तावेज़ नहीं पहचाना गया",
      disclaimerTitle: "चिकित्सा अस्वीकरण",
    },
    auth: {
      loginTitle: "ब्लूम हेल्थ में पुनः स्वागत है",
      loginSubtitle: "दस्तावेज़ विश्लेषण और स्वास्थ्य इतिहास के लिए सुरक्षित रूप से लॉग इन करें।",
      registerTitle: "अपना स्वास्थ्य खाता बनाएं",
      registerSubtitle: "अपनी मेडिकल टेस्ट रिपोर्ट को आसानी से समझने के लिए ब्लूम हेल्थ से जुड़ें।",
      emailLabel: "ईमेल पता",
      passwordLabel: "पासवर्ड",
      signInBtn: "लॉग इन करें",
      signUpBtn: "खाता बनाएं",
      noAccount: "क्या आपके पास खाता नहीं है? यहां रजिस्टर करें",
      haveAccount: "क्या आपके पास पहले से खाता है? लॉग इन करें",
    },
    disclaimer: "ब्लूम हेल्थ AI एक शैक्षिक सहायक है, यह किसी योग्य डॉक्टर का विकल्प नहीं है। किसी भी बीमारी के निदान या दवा बदलने के लिए इसका उपयोग न करें।",
    emergencyNotice: "यदि आप सीने में दर्द, सांस लेने में अत्यधिक कठिनाई या अन्य तीव्र आपात स्थिति महसूस कर रहे हैं, तो तुरंत 112 पर कॉल करें या नजदीकी अस्पताल जाएं।",
  },
};
