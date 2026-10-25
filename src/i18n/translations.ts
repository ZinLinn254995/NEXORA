import { TranslationDictionary, InterfaceLanguage } from '../types/i18n';

export const translations: Record<InterfaceLanguage, TranslationDictionary> = {
  en: {
    // Navigation & Brand
    brandName: 'NEXORA',
    brandTagline: 'AI Video Studio',
    navDashboard: 'Dashboard',
    navAiChat: 'AI Chat',
    navCreateVideo: 'Create Video',
    navMyProjects: 'My Projects',
    navNewProject: 'New Video',

    // Dashboard
    welcomeTitle: 'Create great videos with AI guidance',
    welcomeSubtitle: 'Turn your ideas into structured video concepts, scripts, and storyboards in minutes. No complex editing timeline required.',
    actionChatTitle: 'Chat with AI',
    actionChatDesc: 'Brainstorm creative concepts, hooks, and video outlines conversationally.',
    actionCreateTitle: 'Create Video',
    actionCreateDesc: 'Quick guided setup for education, storytelling, promos, or social clips.',
    actionProjectsTitle: 'My Projects',
    actionProjectsDesc: 'Access your saved projects, review scripts, edit scenes, and check status.',
    recentProjectsTitle: 'Recent Projects',
    viewAllProjects: 'View all projects',
    noProjectsYet: 'No projects created yet',
    createFirstPrompt: 'Get started by creating your first video project or chatting with the AI assistant.',
    storageNoticeTitle: 'Local Workspace Storage',
    storageNoticeDesc: 'Projects are currently saved safely in your browser storage. Export a JSON backup anytime or prepare for cloud synchronization.',

    // Provider Status
    providerStatusTitle: 'System & Engine Connectivity',
    providerStatusDesc: 'Honest real-time status of backend pipelines and AI synthesis engines.',
    statusAiEngine: 'AI Ideation & Script Model',
    statusVoiceSynthesis: 'Voice Narration TTS Engine',
    statusVideoRendering: 'Video Composition & Render Pipeline',
    statusPublishingApi: 'Direct Platform Publishing API',
    statusConnected: 'Connected',
    statusAwaitingKey: 'Awaiting Gemini Key',
    statusFoundationReady: 'Integration point ready',
    statusNotConnected: 'Not connected (Foundation phase)',

    // AI Chat
    chatHeaderTitle: 'AI Creative Partner',
    chatHeaderSubtitle: 'Chat with the assistant to discover video concepts, find compelling hooks, or structure a complete project.',
    chatWelcomeMessage: 'Hello! I am your NEXORA video creative partner. Tell me what kind of video you would like to make, or pick one of the ideas below.',
    chatInputPlaceholder: 'Describe your video idea or ask for suggestions...',
    chatSendBtn: 'Send',
    chatExamplePromptsTitle: 'Beginner idea starters',
    chatTurnIntoProjectBtn: 'Turn this into a Project',
    chatThinking: 'NEXORA AI is thinking...',
    chatClearConversation: 'Clear Chat',

    // Create Video
    createHeaderTitle: 'Create a New Video Project',
    createHeaderSubtitle: 'Answer a few simple questions. The AI and workspace will structure the script, scenes, and narration for you.',
    fieldTitleLabel: 'Video Title',
    fieldTitlePlaceholder: 'e.g. 5 Habits of Highly Creative People',
    fieldIdeaLabel: 'What is this video about? (Core Idea)',
    fieldIdeaPlaceholder: 'Describe what viewers should learn, feel, or see in this video...',
    fieldTypeLabel: 'Video Type',
    fieldLanguageLabel: 'Video Content Language',
    fieldDurationLabel: 'Target Duration',
    fieldStyleLabel: 'Visual Tone & Style',
    fieldAudienceLabel: 'Target Audience (Optional)',
    fieldAudiencePlaceholder: 'e.g. Beginners, students, tech enthusiasts, shoppers',
    btnCreateProject: 'Create Video Project',
    creatingProject: 'Structuring Project...',

    // Video Types
    typeEducation: 'Education & How-To',
    typeStorytelling: 'Storytelling & Narrative',
    typeDocumentary: 'Mini-Documentary & History',
    typeProductPromo: 'Product Promotion & Ad',
    typeSocialMedia: 'Social Media & Short Clip',

    // Durations
    duration15s: '15 seconds (Shorts / Reel)',
    duration30s: '30 seconds (Quick Story)',
    duration60s: '60 seconds (Explainer)',
    duration2_3m: '2-3 minutes (In-Depth)',

    // Project Statuses
    statusDraft: 'Draft',
    statusInProgress: 'In Progress',
    statusNeedsReview: 'Needs Review',
    statusReady: 'Ready',
    statusFailed: 'Failed',

    // My Projects
    projectsHeaderTitle: 'My Video Projects',
    projectsHeaderSubtitle: 'All saved projects in your workspace. Open any project to refine scripts, view storyboard scenes, or test preview.',
    searchPlaceholder: 'Search projects by title or idea...',
    filterAllTypes: 'All Types',
    filterAllStatuses: 'All Statuses',
    btnOpenWorkspace: 'Open Project',
    btnRename: 'Rename',
    btnDuplicate: 'Duplicate',
    btnDelete: 'Delete',
    deleteConfirmTitle: 'Delete Project?',
    deleteConfirmDesc: 'This will permanently remove this project and its saved scenes and script history from your browser storage.',
    btnConfirmDelete: 'Yes, Delete',
    btnCancel: 'Cancel',
    btnSave: 'Save',
    renameModalTitle: 'Rename Project',
    exportBackupBtn: 'Export Backup (JSON)',
    importBackupBtn: 'Import Backup',
    noMatchingProjects: 'No projects match your filter.',
    lastUpdated: 'Updated',
    scenesCount: 'scenes',

    // Workspace
    workspaceBackToProjects: 'Back to Projects',
    tabConcept: 'Concept & Brief',
    tabScript: 'Script & Dialogue',
    tabStoryboard: 'Scenes & Storyboard',
    tabAudio: 'Voice & Sound',
    tabPreview: 'Preview & Render',
    tabPublish: 'Publishing',
    editIdeaPrompt: 'Edit Core Idea',
    saveChanges: 'Save Changes',
    savingChanges: 'Saving...',

    // Workspace Script
    scriptVersionsTitle: 'Script Versions',
    activeVersionLabel: 'Active Version',
    createNewVersionBtn: '+ New Script Draft',
    scriptWordCount: 'Words',
    scriptEstimatedTime: 'Est. speaking time',
    scriptPlaceholder: 'Write or paste your narration script here. Break down by paragraphs for easy scene mapping...',

    // Workspace Storyboard
    addSceneBtn: '+ Add Scene',
    sceneLabel: 'Scene',
    sceneNarrationLabel: 'Narration / Voiceover',
    sceneVisualPromptLabel: 'Visual Prompt / Shot Description',
    sceneDurationLabel: 'Duration (sec)',
    deleteSceneBtn: 'Remove Scene',
    sceneAssetStatus: 'Visual status',
    scenePlaceholderNotice: 'Visual rendering pipeline ready for image/video model connection.',

    // Workspace Audio
    audioVoiceTitle: 'Voiceover & Audio Direction',
    voiceStyleLabel: 'Voice Style / Delivery',
    speakerNameLabel: 'Voice Persona',
    bgMusicLabel: 'Background Music Genre',
    musicVolumeLabel: 'Background Music Balance',
    voiceSynthesisNotice: 'Voice synthesis integration point is prepared. Real neural TTS will be connected when provider credentials are enabled.',

    // Workspace Preview & Export
    previewVideoTitle: 'Storyboard Interactive Preview',
    previewDisclaimer: 'This preview sequences your scenes, visual descriptions, and synchronized narration text in real-time.',
    startPreviewBtn: 'Play Storyboard',
    pausePreviewBtn: 'Pause',
    resetPreviewBtn: 'Restart',
    exportFormatLabel: 'Export Container',
    exportResolutionLabel: 'Resolution Target',
    triggerExportBtn: 'Queue Video Export',
    exportPipelineNotice: 'Full MP4 cloud video rendering integration point is active in architecture. Local mock export creates a verified job record with honest status.',
    exportHistoryTitle: 'Export Records',

    // Workspace Publishing
    publishTitle: 'Platform Distribution',
    publishNotice: 'Publishing directly to YouTube, TikTok, or Instagram requires authorized user OAuth credentials. This integration point is prepared for future authorization flows.',
    connectPlatformBtn: 'Connect Account (Future)',
  },

  my: {
    // Navigation & Brand
    brandName: 'NEXORA',
    brandTagline: 'အေအိုင် ဗီဒီယို ဖန်တီးမှု စတူဒီယို',
    navDashboard: 'ပင်မစာမျက်နှာ',
    navAiChat: 'အေအိုင် စကားပြော',
    navCreateVideo: 'ဗီဒီယို အသစ်လုပ်ရန်',
    navMyProjects: 'ကျွန်ုပ်၏ ပရောဂျက်များ',
    navNewProject: 'ဗီဒီယိုသစ်',

    // Dashboard
    welcomeTitle: 'AI ဖြင့် ဗီဒီယိုများကို လွယ်ကူစွာ ဖန်တီးပါ',
    welcomeSubtitle: 'ရှုပ်ထွေးသော ဗီဒီယိုတည်းဖြတ်မှု နည်းပညာများ မလိုဘဲ စိတ်ကူးများကို ဇာတ်ညွှန်းနှင့် အခန်းစဉ်အဖြစ် မိနစ်ပိုင်းအတွင်း ပြောင်းလဲပါ။',
    actionChatTitle: 'အေအိုင်နှင့် ဆွေးနွေးပါ',
    actionChatDesc: 'စိတ်ကူးအကြံဉာဏ်များ၊ အဖွင့်စကားများနှင့် ဗီဒီယိုအကျဉ်းချုပ်များကို အေအိုင်နှင့် တိုင်ပင်ပါ။',
    actionCreateTitle: 'ဗီဒီယို စတင်ပြုလုပ်ပါ',
    actionCreateDesc: 'ပညာပေး၊ ပုံပြင်ပြော၊ ကြော်ငြာ သို့မဟုတ် ဆိုရှယ်မီဒီယာ ဗီဒီယိုများကို လမ်းညွှန်ချက်ဖြင့် အမြန်ဖန်တီးပါ။',
    actionProjectsTitle: 'ကျွန်ုပ်၏ ပရောဂျက်များ',
    actionProjectsDesc: 'သိမ်းဆည်းထားသော ပရောဂျက်များကို ပြန်လည်ကြည့်ရှုခြင်း၊ ဇာတ်ညွှန်းပြင်ဆင်ခြင်းနှင့် အခြေအနေ စစ်ဆေးခြင်း။',
    recentProjectsTitle: 'လတ်တလော ပရောဂျက်များ',
    viewAllProjects: 'အားလုံးကြည့်ရှုရန်',
    noProjectsYet: 'ပရောဂျက် မရှိသေးပါ',
    createFirstPrompt: 'ပထမဆုံး ဗီဒီယို ပရောဂျက်ကို စတင်ဖန်တီးပါ သို့မဟုတ် အေအိုင်နှင့် အကြံဉာဏ် ဆွေးနွေးပါ။',
    storageNoticeTitle: 'ပြည်တွင်း ဘရောက်ဇာ သိမ်းဆည်းမှု',
    storageNoticeDesc: 'သင့်ပရောဂျက်များကို သင့်စက်တွင်း ဘရောက်ဇာတွင် လုံခြုံစွာ သိမ်းဆည်းထားပါသည်။ လိုအပ်ပါက JSON ဖိုင်အဖြစ် ထုတ်ယူနိုင်ပါသည်။',

    // Provider Status
    providerStatusTitle: 'စနစ်နှင့် ဝန်ဆောင်မှု ချိတ်ဆက်မှု အခြေအနေ',
    providerStatusDesc: 'အေအိုင်နှင့် ဗီဒီယို ပြုလုပ်သည့် စနစ်များ၏ အမှန်တကယ် ချိတ်ဆက်မှု အခြေအနေ။',
    statusAiEngine: 'အေအိုင် အကြံဉာဏ်နှင့် ဇာတ်ညွှန်းစနစ်',
    statusVoiceSynthesis: 'အသံထွက်ဖတ်ကြားမှု (TTS) စနစ်',
    statusVideoRendering: 'ဗီဒီယို ပေါင်းစပ်ထုတ်လုပ်မှု စနစ်',
    statusPublishingApi: 'ဆိုရှယ်မီဒီယာသို့ တိုက်ရိုက်တင်ပို့မှု',
    statusConnected: 'ချိတ်ဆက်ထားသည်',
    statusAwaitingKey: 'Gemini သော့ စောင့်ဆိုင်းနေဆဲ',
    statusFoundationReady: 'ချိတ်ဆက်ရန် အဆင်သင့်ပြင်ဆင်ထားသည်',
    statusNotConnected: 'မချိတ်ဆက်ရသေးပါ (အခြေခံအဆင့်)',

    // AI Chat
    chatHeaderTitle: 'အေအိုင် ဖန်တီးမှု လက်ထောက်',
    chatHeaderSubtitle: 'ဗီဒီယို စိတ်ကူးအသစ်များ ရယူရန်နှင့် စနစ်တကျ ပြင်ဆင်ရန် အေအိုင်နှင့် တိုင်ပင်ဆွေးနွေးပါ။',
    chatWelcomeMessage: 'မင်္ဂလာပါ! ကျွန်ုပ်သည် NEXORA ၏ ဗီဒီယို ဖန်တီးမှု လက်ထောက်ဖြစ်ပါသည်။ မည်သည့် ဗီဒီယိုမျိုး ပြုလုပ်လိုသည်ကို ပြောပြပါ သို့မဟုတ် အောက်ပါ နမူနာများကို ရွေးချယ်ပါ။',
    chatInputPlaceholder: 'သင့် ဗီဒီယို စိတ်ကူးကို ရေးသားပါ...',
    chatSendBtn: 'ပေးပို့ရန်',
    chatExamplePromptsTitle: 'အစပြုသူများအတွက် စိတ်ကူးများ',
    chatTurnIntoProjectBtn: 'ဤစိတ်ကူးဖြင့် ပရောဂျက် ဖန်တီးမည်',
    chatThinking: 'NEXORA AI စဉ်းစားနေပါသည်...',
    chatClearConversation: 'စကားပြော မှတ်တမ်း ရှင်းလင်းရန်',

    // Create Video
    createHeaderTitle: 'ဗီဒီယို ပရောဂျက် အသစ် စတင်ပါ',
    createHeaderSubtitle: 'ရိုးရှင်းသော မေးခွန်း အနည်းငယ်ကို ဖြေဆိုပါ။ အေအိုင်က ဇာတ်ညွှန်းနှင့် အခန်းစဉ်များကို အလိုအလျောက် စီစဉ်ပေးပါမည်။',
    fieldTitleLabel: 'ဗီဒီယို ခေါင်းစဉ်',
    fieldTitlePlaceholder: 'ဥပမာ - ပုဂံ ရှေးဟောင်း စေတီပုထိုးများ သမိုင်း',
    fieldIdeaLabel: 'ဤဗီဒီယိုတွင် မည်သည့်အကြောင်း ဖော်ပြလိုသနည်း (အဓိက စိတ်ကူး)',
    fieldIdeaPlaceholder: 'ကြည့်ရှုသူများ သိရှိခံစားစေလိုသော အကြောင်းအရာကို ရေးသားပါ...',
    fieldTypeLabel: 'ဗီဒီယို အမျိုးအစား',
    fieldLanguageLabel: 'ဗီဒီယိုတွင် အသုံးပြုမည့် ဘာသာစကား',
    fieldDurationLabel: 'ခန့်မှန်း ကြာချိန်',
    fieldStyleLabel: 'ဗီဒီယို အသွင်အပြင်နှင့် စတိုင်',
    fieldAudienceLabel: 'ပစ်မှတ် ပရိသတ် (ရွေးချယ်နိုင်သည်)',
    fieldAudiencePlaceholder: 'ဥပမာ - ကျောင်းသားလူငယ်များ၊ နည်းပညာ ချစ်သူများ',
    btnCreateProject: 'ပရောဂျက် စတင်ဖန်တီးပါ',
    creatingProject: 'ပရောဂျက် တည်ဆောက်နေသည်...',

    // Video Types
    typeEducation: 'ပညာပေးနှင့် နည်းလမ်းများ',
    typeStorytelling: 'ပုံပြင်နှင့် ဇာတ်လမ်းပြောပြချက်',
    typeDocumentary: 'မှတ်တမ်းနှင့် သမိုင်းကြောင်း',
    typeProductPromo: 'ကုန်ပစ္စည်း ကြော်ငြာ',
    typeSocialMedia: 'ဆိုရှယ်မီဒီယာ ဗီဒီယိုတို',

    // Durations
    duration15s: '၁၅ စက္ကန့် (Shorts / Reel)',
    duration30s: '၃၀ စက္ကန့် (ဇာတ်လမ်းတို)',
    duration60s: '၆၀ စက္ကန့် (ရှင်းလင်းချက်)',
    duration2_3m: '၂ မှ ၃ မိနစ် (အသေးစိတ်)',

    // Project Statuses
    statusDraft: 'မူကြမ်း',
    statusInProgress: 'လုပ်ဆောင်နေဆဲ',
    statusNeedsReview: 'ပြန်လည်စစ်ဆေးရန်',
    statusReady: 'အဆင်သင့်ဖြစ်ပြီ',
    statusFailed: 'မအောင်မြင်ပါ',

    // My Projects
    projectsHeaderTitle: 'ကျွန်ုပ်၏ ဗီဒီယို ပရောဂျက်များ',
    projectsHeaderSubtitle: 'သိမ်းဆည်းထားသော ပရောဂျက်များ အားလုံး။ ဇာတ်ညွှန်းနှင့် အခန်းများကို ကြည့်ရှု ပြင်ဆင်နိုင်ပါသည်။',
    searchPlaceholder: 'ခေါင်းစဉ် သို့မဟုတ် စိတ်ကူးဖြင့် ရှာဖွေပါ...',
    filterAllTypes: 'အမျိုးအစား အားလုံး',
    filterAllStatuses: 'အခြေအနေ အားလုံး',
    btnOpenWorkspace: 'ပရောဂျက် ဖွင့်မည်',
    btnRename: 'အမည်ပြောင်းမည်',
    btnDuplicate: 'မိတ္တူကူးမည်',
    btnDelete: 'ဖျက်မည်',
    deleteConfirmTitle: 'ပရောဂျက်ကို အမှန်တကယ် ဖျက်မှာလား?',
    deleteConfirmDesc: 'ဤပရောဂျက်နှင့်တကွ ရေးသားထားသော ဇာတ်ညွှန်း၊ အခန်းစဉ် အားလုံးကို ဘရောက်ဇာမှ အပြီးတိုင် ဖျက်ပစ်ပါမည်။',
    btnConfirmDelete: 'ဟုတ်ကဲ့၊ ဖျက်မည်',
    btnCancel: 'မလုပ်တော့ပါ',
    btnSave: 'သိမ်းဆည်းမည်',
    renameModalTitle: 'ပရောဂျက် အမည်ပြောင်းရန်',
    exportBackupBtn: 'ဖိုင်အဖြစ် ထုတ်ယူသိမ်းဆည်းရန် (JSON)',
    importBackupBtn: 'သိမ်းဆည်းထားသော ဖိုင် ပြန်သွင်းရန်',
    noMatchingProjects: 'ရှာဖွေမှုနှင့် ကိုက်ညီသော ပရောဂျက် မရှိပါ။',
    lastUpdated: 'ပြင်ဆင်ချိန်',
    scenesCount: 'အခန်း',

    // Workspace
    workspaceBackToProjects: 'ပရောဂျက်များသို့ ပြန်သွားရန်',
    tabConcept: 'အကြံဉာဏ်နှင့် အကျဉ်းချုပ်',
    tabScript: 'ဇာတ်ညွှန်းနှင့် စကားပြော',
    tabStoryboard: 'အခန်းစဉ်များ (Storyboard)',
    tabAudio: 'အသံနှင့် တေးဂီတ',
    tabPreview: 'စမ်းသပ်ကြည့်ရှုမှုနှင့် ထုတ်ယူမှု',
    tabPublish: 'ဖြန့်ချိခြင်း',
    editIdeaPrompt: 'စိတ်ကူး ပြင်ဆင်ရန်',
    saveChanges: 'အပြောင်းအလဲများ သိမ်းမည်',
    savingChanges: 'သိမ်းဆည်းနေသည်...',

    // Workspace Script
    scriptVersionsTitle: 'ဇာတ်ညွှန်း မူကွဲများ',
    activeVersionLabel: 'လက်ရှိ အသုံးပြုနေသော မူကွဲ',
    createNewVersionBtn: '+ ဇာတ်ညွှန်းမူကြမ်း အသစ်',
    scriptWordCount: 'စကားလုံး အရေအတွက်',
    scriptEstimatedTime: 'ခန့်မှန်း စကားပြောချိန်',
    scriptPlaceholder: 'ဇာတ်ညွှန်း စာသားများကို ဤနေရာတွင် ရေးသားပါ...',

    // Workspace Storyboard
    addSceneBtn: '+ အခန်းသစ် ထည့်မည်',
    sceneLabel: 'အခန်း',
    sceneNarrationLabel: 'နောက်ခံ အသံပြောကြားချက်',
    sceneVisualPromptLabel: 'ရုပ်ပုံ/ဗီဒီယို ဖော်ပြချက် အညွှန်း',
    sceneDurationLabel: 'ကြာချိန် (စက္ကန့်)',
    deleteSceneBtn: 'အခန်းကို ဖယ်ရှားမည်',
    sceneAssetStatus: 'ရုပ်ပုံ အခြေအနေ',
    scenePlaceholderNotice: 'ဗီဒီယိုနှင့် ရုပ်ပုံ ထုတ်လုပ်ရေး စနစ် ချိတ်ဆက်ရန် အဆင်သင့် ဖြစ်နေပါသည်။',

    // Workspace Audio
    audioVoiceTitle: 'အသံနှင့် နောက်ခံတေးဂီတ ညွှန်ကြားချက်',
    voiceStyleLabel: 'အသံထွက်ဟန်',
    speakerNameLabel: 'အသံရှင် ပုံစံ',
    bgMusicLabel: 'နောက်ခံတေးဂီတ အမျိုးအစား',
    musicVolumeLabel: 'တေးဂီတ အသံပမာဏ ချိန်ညှိမှု',
    voiceSynthesisNotice: 'အသံထွက်ဖတ်ကြားမှု (TTS) ချိတ်ဆက်ရန် အဆင်သင့် ဖြစ်နေပါသည်။ ဝန်ဆောင်မှု သော့ ချိတ်ဆက်ပြီးပါက အလိုအလျောက် အသံသွင်းပေးပါမည်။',

    // Workspace Preview & Export
    previewVideoTitle: 'အခန်းစဉ်များ စမ်းသပ်ပြသမှု',
    previewDisclaimer: 'ဤစနစ်သည် သင်ရေးဆွဲထားသော အခန်းများ၊ ရုပ်ပုံဖော်ပြချက်များနှင့် စကားပြောစာသားများကို အချိန်နှင့်တပြေးညီ ဆက်တိုက် ပြသပေးပါသည်။',
    startPreviewBtn: 'စတင်ပြသမည်',
    pausePreviewBtn: 'ခေတ္တရပ်မည်',
    resetPreviewBtn: 'အစမှ ပြန်စမည်',
    exportFormatLabel: 'ဖိုင်ပုံစံ',
    exportResolutionLabel: 'ဗီဒီယို ကြည်လင်မှု အဆင့်',
    triggerExportBtn: 'ဗီဒီယို ဖိုင် ထုတ်ယူရန် တန်းစီမည်',
    exportPipelineNotice: 'MP4 ဗီဒီယို ထုတ်လုပ်မှု စနစ်အတွက် အဆင်သင့် စီစဉ်ထားပါသည်။ လက်ရှိတွင် စနစ် စစ်ဆေးချက် မှတ်တမ်းအဖြစ် တရားဝင် စာရင်းသွင်းပေးပါသည်။',
    exportHistoryTitle: 'ထုတ်ယူထားသော မှတ်တမ်းများ',

    // Workspace Publishing
    publishTitle: 'ဆိုရှယ်မီဒီယာသို့ တင်ပို့ခြင်း',
    publishNotice: 'YouTube, TikTok သို့မဟုတ် Instagram တို့သို့ တိုက်ရိုက်တင်ရန် အသုံးပြုသူ၏ ခွင့်ပြုချက် (OAuth) လိုအပ်ပါသည်။ အနာဂတ်တွင် ချိတ်ဆက်နိုင်ရန် ပြင်ဆင်ထားပါသည်။',
    connectPlatformBtn: 'အကောင့် ချိတ်ဆက်ရန် (မကြာမီ)',
  },
};
