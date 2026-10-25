export type InterfaceLanguage = 'en' | 'my';

export interface TranslationDictionary {
  // Navigation & Brand
  brandName: string;
  brandTagline: string;
  navDashboard: string;
  navAiChat: string;
  navCreateVideo: string;
  navMyProjects: string;
  navNewProject: string;

  // Dashboard
  welcomeTitle: string;
  welcomeSubtitle: string;
  actionChatTitle: string;
  actionChatDesc: string;
  actionCreateTitle: string;
  actionCreateDesc: string;
  actionProjectsTitle: string;
  actionProjectsDesc: string;
  recentProjectsTitle: string;
  viewAllProjects: string;
  noProjectsYet: string;
  createFirstPrompt: string;
  storageNoticeTitle: string;
  storageNoticeDesc: string;

  // Provider Status (Honest functionality)
  providerStatusTitle: string;
  providerStatusDesc: string;
  statusAiEngine: string;
  statusVoiceSynthesis: string;
  statusVideoRendering: string;
  statusPublishingApi: string;
  statusConnected: string;
  statusAwaitingKey: string;
  statusFoundationReady: string;
  statusNotConnected: string;

  // AI Chat
  chatHeaderTitle: string;
  chatHeaderSubtitle: string;
  chatWelcomeMessage: string;
  chatInputPlaceholder: string;
  chatSendBtn: string;
  chatExamplePromptsTitle: string;
  chatTurnIntoProjectBtn: string;
  chatThinking: string;
  chatClearConversation: string;

  // Create Video
  createHeaderTitle: string;
  createHeaderSubtitle: string;
  fieldTitleLabel: string;
  fieldTitlePlaceholder: string;
  fieldIdeaLabel: string;
  fieldIdeaPlaceholder: string;
  fieldTypeLabel: string;
  fieldLanguageLabel: string;
  fieldDurationLabel: string;
  fieldStyleLabel: string;
  fieldAudienceLabel: string;
  fieldAudiencePlaceholder: string;
  btnCreateProject: string;
  creatingProject: string;

  // Video Types
  typeEducation: string;
  typeStorytelling: string;
  typeDocumentary: string;
  typeProductPromo: string;
  typeSocialMedia: string;

  // Durations
  duration15s: string;
  duration30s: string;
  duration60s: string;
  duration2_3m: string;

  // Project Statuses
  statusDraft: string;
  statusInProgress: string;
  statusNeedsReview: string;
  statusReady: string;
  statusFailed: string;

  // My Projects
  projectsHeaderTitle: string;
  projectsHeaderSubtitle: string;
  searchPlaceholder: string;
  filterAllTypes: string;
  filterAllStatuses: string;
  btnOpenWorkspace: string;
  btnRename: string;
  btnDuplicate: string;
  btnDelete: string;
  deleteConfirmTitle: string;
  deleteConfirmDesc: string;
  btnConfirmDelete: string;
  btnCancel: string;
  btnSave: string;
  renameModalTitle: string;
  exportBackupBtn: string;
  importBackupBtn: string;
  noMatchingProjects: string;
  lastUpdated: string;
  scenesCount: string;

  // Workspace
  workspaceBackToProjects: string;
  tabConcept: string;
  tabScript: string;
  tabStoryboard: string;
  tabAudio: string;
  tabPreview: string;
  tabPublish: string;
  editIdeaPrompt: string;
  saveChanges: string;
  savingChanges: string;

  // Workspace Script
  scriptVersionsTitle: string;
  activeVersionLabel: string;
  createNewVersionBtn: string;
  scriptWordCount: string;
  scriptEstimatedTime: string;
  scriptPlaceholder: string;

  // Workspace Storyboard
  addSceneBtn: string;
  sceneLabel: string;
  sceneNarrationLabel: string;
  sceneVisualPromptLabel: string;
  sceneDurationLabel: string;
  deleteSceneBtn: string;
  sceneAssetStatus: string;
  scenePlaceholderNotice: string;

  // Workspace Audio
  audioVoiceTitle: string;
  voiceStyleLabel: string;
  speakerNameLabel: string;
  bgMusicLabel: string;
  musicVolumeLabel: string;
  voiceSynthesisNotice: string;

  // Workspace Preview & Export
  previewVideoTitle: string;
  previewDisclaimer: string;
  startPreviewBtn: string;
  pausePreviewBtn: string;
  resetPreviewBtn: string;
  exportFormatLabel: string;
  exportResolutionLabel: string;
  triggerExportBtn: string;
  exportPipelineNotice: string;
  exportHistoryTitle: string;

  // Workspace Publishing
  publishTitle: string;
  publishNotice: string;
  connectPlatformBtn: string;
}
