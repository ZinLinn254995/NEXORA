/**
 * Core Data Models for NEXORA Video Creation Studio
 */

export type VideoType =
  | 'education'
  | 'storytelling'
  | 'documentary'
  | 'product_promo'
  | 'social_media';

export type ProjectStatus =
  | 'draft'
  | 'in_progress'
  | 'needs_review'
  | 'ready'
  | 'failed';

export type VideoDurationOption = '15s' | '30s' | '60s' | '2-3m' | 'custom';

export interface MediaAsset {
  id: string;
  type: 'image' | 'video' | 'audio';
  url?: string;
  prompt?: string;
  provider?: string;
  status: 'pending' | 'generated' | 'placeholder' | 'failed';
  createdAt: string;
}

export interface Scene {
  id: string;
  projectId: string;
  sceneNumber: number;
  narration: string;
  visualPrompt: string;
  durationSeconds: number;
  mediaAsset?: MediaAsset;
  status: 'draft' | 'ready' | 'pending' | 'failed';
}

export interface ScriptVersion {
  id: string;
  projectId: string;
  versionNumber: number;
  title: string;
  content: string;
  wordCount: number;
  estimatedDurationSeconds: number;
  notes?: string;
  createdAt: string;
}

export interface AudioConfig {
  voiceStyle: 'friendly' | 'authoritative' | 'energetic' | 'calm' | 'cinematic';
  speakerName: string;
  backgroundMusicGenre: 'ambient' | 'cinematic' | 'upbeat' | 'minimal' | 'none';
  musicVolume: number; // 0 to 100
  voiceVolume: number; // 0 to 100
  isSynthesized: boolean;
  notes?: string;
}

export interface GenerationJob {
  id: string;
  projectId: string;
  jobType: 'script' | 'image' | 'audio' | 'video' | 'render';
  status: 'queued' | 'processing' | 'completed' | 'failed';
  progress: number; // 0 to 100
  errorMessage?: string;
  createdAt: string;
  completedAt?: string;
}

export interface ExportRecord {
  id: string;
  projectId: string;
  resolution: '720p' | '1080p' | '4k';
  aspectRatio: '16:9' | '9:16' | '1:1';
  status: 'queued' | 'processing' | 'ready' | 'failed';
  downloadUrl?: string;
  format: 'mp4';
  fileSizeMb?: number;
  createdAt: string;
}

export interface PublishingRecord {
  id: string;
  projectId: string;
  platform: 'youtube' | 'tiktok' | 'instagram' | 'facebook';
  status: 'unconnected' | 'draft' | 'scheduled' | 'published' | 'failed';
  scheduledFor?: string;
  publishedAt?: string;
  platformUrl?: string;
  errorNote?: string;
}

export interface Project {
  id: string;
  title: string;
  videoIdea: string;
  videoType: VideoType;
  contentLanguage: string; // e.g., 'English', 'Burmese'
  targetDuration: VideoDurationOption;
  status: ProjectStatus;
  scriptVersions: ScriptVersion[];
  activeScriptVersionId: string;
  scenes: Scene[];
  audioConfig: AudioConfig;
  exportRecords: ExportRecord[];
  publishingRecords: PublishingRecord[];
  generationJobs: GenerationJob[];
  createdAt: string;
  updatedAt: string;
  coverImage?: string;
  tags?: string[];
}

export interface CreateProjectPayload {
  title: string;
  videoIdea: string;
  videoType: VideoType;
  contentLanguage: string;
  targetDuration: VideoDurationOption;
  visualStyle?: string;
  initialNarration?: string;
}
