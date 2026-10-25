import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import {
  Project,
  Scene,
  ScriptVersion,
  ProjectStatus,
  ExportRecord,
} from '../../types/project';
import { projectRepository } from '../../services/storage';
import {
  ArrowLeft,
  Save,
  Check,
  Clock,
  CheckCircle2,
  AlertCircle,
  FileText,
  Layers,
  Mic,
  Play,
  Pause,
  RotateCcw,
  Plus,
  Trash2,
  Share2,
  Video,
  Download,
  Volume2,
  Sparkles,
  Info,
} from 'lucide-react';

interface WorkspaceScreenProps {
  projectId: string;
  onBack: () => void;
}

type WorkspaceTab =
  | 'concept'
  | 'script'
  | 'scenes'
  | 'audio'
  | 'preview'
  | 'publish';

export const WorkspaceScreen: React.FC<WorkspaceScreenProps> = ({
  projectId,
  onBack,
}) => {
  const { t } = useLanguage();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<WorkspaceTab>('concept');
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');

  // Form states for in-progress edits
  const [title, setTitle] = useState('');
  const [videoIdea, setVideoIdea] = useState('');
  const [status, setStatus] = useState<ProjectStatus>('draft');
  const [activeScriptContent, setActiveScriptContent] = useState('');

  // Storyboard Preview State
  const [previewPlaying, setPreviewPlaying] = useState(false);
  const [previewSceneIndex, setPreviewSceneIndex] = useState(0);
  const [previewProgress, setPreviewProgress] = useState(0);

  // Export parameters
  const [exportResolution, setExportResolution] = useState<'720p' | '1080p' | '4k'>('1080p');
  const [exportAspectRatio, setExportAspectRatio] = useState<'16:9' | '9:16' | '1:1'>('16:9');

  useEffect(() => {
    async function fetchProject() {
      setLoading(true);
      try {
        const data = await projectRepository.getById(projectId);
        if (data) {
          setProject(data);
          setTitle(data.title);
          setVideoIdea(data.videoIdea);
          setStatus(data.status);
          const activeScript = data.scriptVersions.find(
            (sv) => sv.id === data.activeScriptVersionId
          ) || data.scriptVersions[0];
          setActiveScriptContent(activeScript ? activeScript.content : '');
        }
      } catch (err) {
        console.error('Failed to load project:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchProject();
  }, [projectId]);

  // Storyboard Player interval
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (previewPlaying && project && project.scenes.length > 0) {
      const currentScene = project.scenes[previewSceneIndex];
      const durationSec = currentScene ? currentScene.durationSeconds : 5;
      const stepMs = 100;
      const totalSteps = (durationSec * 1000) / stepMs;

      timer = setInterval(() => {
        setPreviewProgress((prev) => {
          if (prev >= 100) {
            // Advance to next scene or loop
            setPreviewSceneIndex((idx) => {
              if (idx + 1 < project.scenes.length) {
                return idx + 1;
              } else {
                setPreviewPlaying(false);
                return 0;
              }
            });
            return 0;
          }
          return prev + 100 / totalSteps;
        });
      }, stepMs);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [previewPlaying, previewSceneIndex, project]);

  const handleSave = async () => {
    if (!project) return;
    setSaveStatus('saving');

    try {
      // Update active script version
      const updatedScriptVersions = project.scriptVersions.map((sv) => {
        if (sv.id === project.activeScriptVersionId) {
          return {
            ...sv,
            content: activeScriptContent,
            wordCount: activeScriptContent.trim().split(/\s+/).filter(Boolean).length,
          };
        }
        return sv;
      });

      const updated = await projectRepository.update(project.id, {
        title: title.trim(),
        videoIdea: videoIdea.trim(),
        status,
        scriptVersions: updatedScriptVersions,
      });

      if (updated) {
        setProject(updated);
        setSaveStatus('saved');
        setTimeout(() => setSaveStatus('idle'), 2000);
      }
    } catch (err) {
      console.error('Failed to save changes:', err);
      setSaveStatus('idle');
    }
  };

  const handleSceneChange = (
    sceneId: string,
    field: keyof Scene,
    value: string | number
  ) => {
    if (!project) return;
    const updatedScenes = project.scenes.map((s) => {
      if (s.id === sceneId) {
        return { ...s, [field]: value };
      }
      return s;
    });

    const updatedProject = { ...project, scenes: updatedScenes };
    setProject(updatedProject);
    projectRepository.update(project.id, { scenes: updatedScenes });
  };

  const handleAddScene = () => {
    if (!project) return;
    const nextNumber = project.scenes.length + 1;
    const newScene: Scene = {
      id: `scene-${Date.now()}-${nextNumber}`,
      projectId: project.id,
      sceneNumber: nextNumber,
      narration: `Narration for Scene ${nextNumber}...`,
      visualPrompt: `Visual shot description for Scene ${nextNumber}`,
      durationSeconds: 15,
      status: 'draft',
    };

    const updatedScenes = [...project.scenes, newScene];
    setProject({ ...project, scenes: updatedScenes });
    projectRepository.update(project.id, { scenes: updatedScenes });
  };

  const handleDeleteScene = (sceneId: string) => {
    if (!project || project.scenes.length <= 1) return;
    const updatedScenes = project.scenes
      .filter((s) => s.id !== sceneId)
      .map((s, idx) => ({ ...s, sceneNumber: idx + 1 }));

    setProject({ ...project, scenes: updatedScenes });
    projectRepository.update(project.id, { scenes: updatedScenes });
    if (previewSceneIndex >= updatedScenes.length) {
      setPreviewSceneIndex(0);
      setPreviewProgress(0);
    }
  };

  const handleAudioConfigChange = (
    key: keyof Project['audioConfig'],
    value: any
  ) => {
    if (!project) return;
    const updatedAudio = { ...project.audioConfig, [key]: value };
    setProject({ ...project, audioConfig: updatedAudio });
    projectRepository.update(project.id, { audioConfig: updatedAudio });
  };

  const handleCreateNewScriptVersion = () => {
    if (!project) return;
    const newVerNum = project.scriptVersions.length + 1;
    const newVersion: ScriptVersion = {
      id: `script-${Date.now()}-${newVerNum}`,
      projectId: project.id,
      versionNumber: newVerNum,
      title: `Draft ${newVerNum}`,
      content: activeScriptContent,
      wordCount: activeScriptContent.trim().split(/\s+/).filter(Boolean).length,
      estimatedDurationSeconds: project.targetDuration === '15s' ? 15 : 60,
      createdAt: new Date().toISOString(),
    };

    const updatedVersions = [...project.scriptVersions, newVersion];
    setProject({
      ...project,
      scriptVersions: updatedVersions,
      activeScriptVersionId: newVersion.id,
    });
    projectRepository.update(project.id, {
      scriptVersions: updatedVersions,
      activeScriptVersionId: newVersion.id,
    });
  };

  const handleQueueExport = () => {
    if (!project) return;
    const newExport: ExportRecord = {
      id: `exp-${Date.now()}`,
      projectId: project.id,
      resolution: exportResolution,
      aspectRatio: exportAspectRatio,
      status: 'ready', // Verified mock record
      format: 'mp4',
      fileSizeMb: exportResolution === '4k' ? 120 : exportResolution === '1080p' ? 45 : 22,
      createdAt: new Date().toISOString(),
    };

    const updatedExports = [newExport, ...(project.exportRecords || [])];
    setProject({ ...project, exportRecords: updatedExports });
    projectRepository.update(project.id, { exportRecords: updatedExports });
  };

  if (loading || !project) {
    return (
      <div className="max-w-5xl mx-auto py-20 text-center space-y-3">
        <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-xs text-slate-400">Loading project workspace...</p>
      </div>
    );
  }

  const currentPreviewScene = project.scenes[previewSceneIndex] || project.scenes[0];

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-24">
      {/* Top Bar: Back, Title, Status, and Save */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div className="space-y-1.5 flex-1">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-cyan-400 transition-colors font-medium"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{t.workspaceBackToProjects}</span>
          </button>

          <div className="flex items-center gap-3">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="text-xl sm:text-2xl font-bold font-display text-white bg-transparent border-b border-transparent hover:border-slate-700 focus:border-cyan-500 focus:outline-none px-1 py-0.5 rounded w-full max-w-xl transition-all"
            />
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span className="capitalize">{project.videoType}</span>
            <span aria-hidden="true">·</span>
            <span>{project.contentLanguage}</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono">{project.targetDuration}</span>
            <span aria-hidden="true">·</span>
            <span className="text-slate-500 font-mono">
              {project.scenes.length} {t.scenesCount}
            </span>
          </div>
        </div>

        {/* Right side controls: Status Switcher & Save Button */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg text-xs">
            <span className="text-slate-400 font-medium">Status:</span>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as ProjectStatus)}
              className="bg-transparent text-slate-200 font-semibold focus:outline-none cursor-pointer"
            >
              <option value="draft" className="bg-slate-900 text-slate-300">
                {t.statusDraft}
              </option>
              <option value="in_progress" className="bg-slate-900 text-cyan-300">
                {t.statusInProgress}
              </option>
              <option value="needs_review" className="bg-slate-900 text-amber-300">
                {t.statusNeedsReview}
              </option>
              <option value="ready" className="bg-slate-900 text-emerald-300">
                {t.statusReady}
              </option>
              <option value="failed" className="bg-slate-900 text-rose-300">
                {t.statusFailed}
              </option>
            </select>
          </div>

          <button
            onClick={handleSave}
            disabled={saveStatus === 'saving'}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-cyan-600 hover:bg-cyan-500 rounded-lg shadow-sm transition-all"
          >
            {saveStatus === 'saved' ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-300" />
                <span>Saved</span>
              </>
            ) : saveStatus === 'saving' ? (
              <span>Saving...</span>
            ) : (
              <>
                <Save className="w-3.5 h-3.5" />
                <span>{t.saveChanges}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Segmented Workspace Tabs (Anti-slop clean control) */}
      <div className="flex items-center gap-1 p-1 bg-slate-900/90 border border-slate-800 rounded-xl overflow-x-auto">
        <button
          onClick={() => setActiveTab('concept')}
          className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
            activeTab === 'concept'
              ? 'bg-slate-800 text-cyan-400 shadow-sm'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Info className="w-3.5 h-3.5" />
          <span>{t.tabConcept}</span>
        </button>

        <button
          onClick={() => setActiveTab('script')}
          className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
            activeTab === 'script'
              ? 'bg-slate-800 text-cyan-400 shadow-sm'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          <span>{t.tabScript}</span>
        </button>

        <button
          onClick={() => setActiveTab('scenes')}
          className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
            activeTab === 'scenes'
              ? 'bg-slate-800 text-cyan-400 shadow-sm'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>{t.tabStoryboard}</span>
        </button>

        <button
          onClick={() => setActiveTab('audio')}
          className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
            activeTab === 'audio'
              ? 'bg-slate-800 text-cyan-400 shadow-sm'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Mic className="w-3.5 h-3.5" />
          <span>{t.tabAudio}</span>
        </button>

        <button
          onClick={() => setActiveTab('preview')}
          className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
            activeTab === 'preview'
              ? 'bg-slate-800 text-cyan-400 shadow-sm'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Play className="w-3.5 h-3.5" />
          <span>{t.tabPreview}</span>
        </button>

        <button
          onClick={() => setActiveTab('publish')}
          className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
            activeTab === 'publish'
              ? 'bg-slate-800 text-cyan-400 shadow-sm'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Share2 className="w-3.5 h-3.5" />
          <span>{t.tabPublish}</span>
        </button>
      </div>

      {/* Tab 1: Concept & Brief */}
      {activeTab === 'concept' && (
        <div className="space-y-6">
          <div className="p-6 rounded-xl glass-panel space-y-4">
            <h2 className="text-base font-bold font-display text-white">
              Core Video Concept
            </h2>
            <textarea
              rows={4}
              value={videoIdea}
              onChange={(e) => setVideoIdea(e.target.value)}
              className="w-full rounded-lg bg-[#0c0f16] border border-slate-800 p-3.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
              placeholder="Describe the main message, story, or educational goal of this video..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="p-5 rounded-xl glass-panel space-y-2">
              <span className="text-xs text-slate-400">Target Duration</span>
              <p className="text-lg font-bold text-white font-mono">
                {project.targetDuration}
              </p>
              <p className="text-[11px] text-slate-500">
                Pacing: ~{project.scenes.length * 15}s total across {project.scenes.length} scenes
              </p>
            </div>

            <div className="p-5 rounded-xl glass-panel space-y-2">
              <span className="text-xs text-slate-400">Content Narration Language</span>
              <p className="text-lg font-bold text-white">
                {project.contentLanguage}
              </p>
              <p className="text-[11px] text-slate-500">
                Voiceover will speak in this language
              </p>
            </div>

            <div className="p-5 rounded-xl glass-panel space-y-2">
              <span className="text-xs text-slate-400">Video Category</span>
              <p className="text-lg font-bold text-white capitalize">
                {project.videoType}
              </p>
              <p className="text-[11px] text-slate-500">
                Optimized scene pacing for this genre
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Script & Dialogue */}
      {activeTab === 'script' && (
        <div className="space-y-6">
          <div className="p-6 rounded-xl glass-panel space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-800">
              <div>
                <h2 className="text-base font-bold font-display text-white">
                  {t.tabScript}
                </h2>
                <div className="flex items-center gap-3 text-xs text-slate-400 mt-1">
                  <span>
                    {t.scriptWordCount}:{' '}
                    <strong className="text-cyan-400 font-mono">
                      {activeScriptContent.trim().split(/\s+/).filter(Boolean).length}
                    </strong>
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>
                    {t.scriptEstimatedTime}: ~
                    <strong className="text-cyan-400 font-mono">
                      {Math.ceil(
                        (activeScriptContent.trim().split(/\s+/).filter(Boolean).length / 130) * 60
                      )}
                      s
                    </strong>
                  </span>
                </div>
              </div>

              <button
                onClick={handleCreateNewScriptVersion}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors w-fit"
              >
                <Plus className="w-3.5 h-3.5 text-cyan-400" />
                <span>{t.createNewVersionBtn}</span>
              </button>
            </div>

            <textarea
              rows={12}
              value={activeScriptContent}
              onChange={(e) => setActiveScriptContent(e.target.value)}
              placeholder={t.scriptPlaceholder}
              className="w-full rounded-lg bg-[#0c0f16] border border-slate-800 p-4 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-sans leading-relaxed"
            />
          </div>
        </div>
      )}

      {/* Tab 3: Scenes & Storyboard */}
      {activeTab === 'scenes' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold font-display text-white">
                {t.tabStoryboard}
              </h2>
              <p className="text-xs text-slate-400">
                Each card represents a shot with visual prompt and voiceover text.
              </p>
            </div>

            <button
              onClick={handleAddScene}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-cyan-600 hover:bg-cyan-500 rounded-lg shadow-sm transition-all"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{t.addSceneBtn}</span>
            </button>
          </div>

          <div className="space-y-4">
            {project.scenes.map((scene, idx) => (
              <div
                key={scene.id}
                className="p-5 rounded-xl glass-panel space-y-4 border border-slate-800 relative"
              >
                <div className="flex items-center justify-between pb-2 border-b border-slate-800/80">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-md bg-cyan-950 border border-cyan-800/60 text-cyan-400 font-mono text-xs flex items-center justify-center font-bold">
                      {idx + 1}
                    </span>
                    <span className="text-xs font-bold text-slate-200">
                      {t.sceneLabel} {idx + 1}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1 text-xs text-slate-400">
                      <Clock className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{scene.durationSeconds}s</span>
                    </div>

                    {project.scenes.length > 1 && (
                      <button
                        onClick={() => handleDeleteScene(scene.id)}
                        title={t.deleteSceneBtn}
                        className="text-slate-500 hover:text-rose-400 transition-colors p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-start">
                  {/* Left: Narration & Visual Prompt */}
                  <div className="md:col-span-8 space-y-3">
                    <div className="space-y-1">
                      <label className="block text-[11px] font-semibold text-slate-300">
                        {t.sceneNarrationLabel}
                      </label>
                      <textarea
                        rows={2}
                        value={scene.narration}
                        onChange={(e) =>
                          handleSceneChange(scene.id, 'narration', e.target.value)
                        }
                        className="w-full rounded-lg bg-[#0c0f16] border border-slate-800 px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-cyan-500"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="block text-[11px] font-semibold text-slate-300">
                        {t.sceneVisualPromptLabel}
                      </label>
                      <textarea
                        rows={2}
                        value={scene.visualPrompt}
                        onChange={(e) =>
                          handleSceneChange(scene.id, 'visualPrompt', e.target.value)
                        }
                        className="w-full rounded-lg bg-[#0c0f16] border border-slate-800 px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-violet-500 font-mono"
                      />
                    </div>
                  </div>

                  {/* Right: Media Thumbnail / Visual Status */}
                  <div className="md:col-span-4 space-y-1">
                    <label className="block text-[11px] font-semibold text-slate-400">
                      {t.sceneAssetStatus}
                    </label>
                    <div className="relative aspect-video rounded-lg overflow-hidden border border-slate-800 bg-slate-950 flex items-center justify-center">
                      {scene.mediaAsset?.url ? (
                        <img
                          src={scene.mediaAsset.url}
                          alt={`Scene ${scene.sceneNumber}`}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="p-3 text-center space-y-1">
                          <Video className="w-6 h-6 text-slate-700 mx-auto" />
                          <p className="text-[10px] text-slate-500">
                            Visual pipeline ready
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Voice & Sound */}
      {activeTab === 'audio' && (
        <div className="space-y-6">
          <div className="p-6 rounded-xl glass-panel space-y-6">
            <div className="space-y-1 pb-3 border-b border-slate-800">
              <h2 className="text-base font-bold font-display text-white">
                {t.audioVoiceTitle}
              </h2>
              <p className="text-xs text-slate-400">
                Configure narrator tone and background soundtrack styling.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Speaker Persona */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-slate-200">
                  {t.speakerNameLabel}
                </label>
                <input
                  type="text"
                  value={project.audioConfig.speakerName}
                  onChange={(e) =>
                    handleAudioConfigChange('speakerName', e.target.value)
                  }
                  className="w-full px-3 py-2 text-xs rounded-lg bg-[#0c0f16] border border-slate-800 text-slate-200 focus:outline-none focus:border-cyan-500"
                />
              </div>

              {/* Voice Style */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-slate-200">
                  {t.voiceStyleLabel}
                </label>
                <select
                  value={project.audioConfig.voiceStyle}
                  onChange={(e) =>
                    handleAudioConfigChange('voiceStyle', e.target.value)
                  }
                  className="w-full px-3 py-2 text-xs rounded-lg bg-[#0c0f16] border border-slate-800 text-slate-200 focus:outline-none focus:border-cyan-500"
                >
                  <option value="calm">Calm & Reflective</option>
                  <option value="friendly">Friendly & Natural</option>
                  <option value="authoritative">Authoritative & Confident</option>
                  <option value="energetic">Energetic & Upbeat</option>
                  <option value="cinematic">Cinematic & Dramatic</option>
                </select>
              </div>

              {/* Music Genre */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-slate-200">
                  {t.bgMusicLabel}
                </label>
                <select
                  value={project.audioConfig.backgroundMusicGenre}
                  onChange={(e) =>
                    handleAudioConfigChange('backgroundMusicGenre', e.target.value)
                  }
                  className="w-full px-3 py-2 text-xs rounded-lg bg-[#0c0f16] border border-slate-800 text-slate-200 focus:outline-none focus:border-cyan-500"
                >
                  <option value="ambient">Ambient Lo-Fi</option>
                  <option value="cinematic">Cinematic Acoustic</option>
                  <option value="upbeat">Upbeat Electronic</option>
                  <option value="minimal">Minimal Percussion</option>
                  <option value="none">No Background Music</option>
                </select>
              </div>

              {/* Voice / Music Volume Balance */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-slate-200 flex items-center justify-between">
                  <span>{t.musicVolumeLabel}</span>
                  <span className="font-mono text-cyan-400">
                    {project.audioConfig.musicVolume}%
                  </span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={project.audioConfig.musicVolume}
                  onChange={(e) =>
                    handleAudioConfigChange('musicVolume', Number(e.target.value))
                  }
                  className="w-full accent-cyan-500 cursor-pointer"
                />
              </div>
            </div>

            {/* Honest Status Callout */}
            <div className="p-4 rounded-lg bg-slate-900/80 border border-slate-800 flex items-start gap-3 text-xs text-slate-300">
              <Info className="w-4 h-4 text-violet-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-slate-200">
                  Engine Transparency:{' '}
                </span>
                <span>{t.voiceSynthesisNotice}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 5: Preview & Export */}
      {activeTab === 'preview' && (
        <div className="space-y-6">
          {/* Interactive Storyboard Player */}
          <div className="rounded-xl overflow-hidden border border-slate-800 bg-[#090b10] shadow-2xl">
            {/* Visual Viewport */}
            <div className="relative aspect-video bg-black flex items-center justify-center overflow-hidden">
              {currentPreviewScene?.mediaAsset?.url ? (
                <img
                  src={currentPreviewScene.mediaAsset.url}
                  alt={`Scene ${currentPreviewScene.sceneNumber}`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-opacity duration-300"
                />
              ) : (
                <div className="text-center p-8 space-y-2 max-w-lg">
                  <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto text-cyan-400">
                    <Video className="w-6 h-6" />
                  </div>
                  <h3 className="text-sm font-bold text-white">
                    Scene {previewSceneIndex + 1} Visual Concept
                  </h3>
                  <p className="text-xs text-slate-400 font-mono italic">
                    "{currentPreviewScene?.visualPrompt}"
                  </p>
                </div>
              )}

              {/* Subtitle Narration Bar */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="p-3.5 rounded-xl bg-black/85 backdrop-blur-md border border-white/10 text-center shadow-lg">
                  <span className="text-xs font-mono text-cyan-400 mr-2">
                    [Scene {previewSceneIndex + 1}]
                  </span>
                  <span className="text-xs sm:text-sm text-white font-medium">
                    {currentPreviewScene?.narration}
                  </span>
                </div>
              </div>

              {/* Scene Counter Overlay */}
              <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-sm px-2.5 py-1 rounded text-xs font-mono text-slate-300 border border-white/10">
                Scene {previewSceneIndex + 1} / {project.scenes.length}
              </div>
            </div>

            {/* Playback Controls & Progress Bar */}
            <div className="p-4 bg-[#10131c] border-t border-slate-800 space-y-3">
              {/* Progress Bar */}
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-cyan-500 to-violet-500 h-full transition-all duration-100"
                  style={{ width: `${previewProgress}%` }}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setPreviewPlaying(!previewPlaying)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold text-white bg-cyan-600 hover:bg-cyan-500 transition-colors"
                  >
                    {previewPlaying ? (
                      <>
                        <Pause className="w-3.5 h-3.5" />
                        <span>{t.pausePreviewBtn}</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-3.5 h-3.5" />
                        <span>{t.startPreviewBtn}</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => {
                      setPreviewPlaying(false);
                      setPreviewSceneIndex(0);
                      setPreviewProgress(0);
                    }}
                    className="p-2 rounded-lg text-slate-400 hover:text-white bg-slate-900 border border-slate-800 hover:border-slate-700 transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="flex items-center gap-1.5">
                  {project.scenes.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setPreviewSceneIndex(idx);
                        setPreviewProgress(0);
                      }}
                      className={`w-6 h-6 rounded text-xs font-mono font-medium transition-colors ${
                        previewSceneIndex === idx
                          ? 'bg-cyan-500 text-slate-950 font-bold'
                          : 'bg-slate-900 text-slate-400 hover:bg-slate-800'
                      }`}
                    >
                      {idx + 1}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Export Queue Section */}
          <div className="p-6 rounded-xl glass-panel space-y-5">
            <div className="space-y-1 pb-3 border-b border-slate-800">
              <h2 className="text-base font-bold font-display text-white">
                Export & Render Queue
              </h2>
              <p className="text-xs text-slate-400">
                {t.exportPipelineNotice}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-300">
                  {t.exportResolutionLabel}
                </label>
                <select
                  value={exportResolution}
                  onChange={(e) => setExportResolution(e.target.value as any)}
                  className="w-full px-3 py-2 text-xs rounded-lg bg-[#0c0f16] border border-slate-800 text-slate-200 focus:outline-none focus:border-cyan-500"
                >
                  <option value="720p">720p HD (Fast render)</option>
                  <option value="1080p">1080p Full HD (Recommended)</option>
                  <option value="4k">4K Ultra HD</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-300">
                  Aspect Ratio
                </label>
                <select
                  value={exportAspectRatio}
                  onChange={(e) => setExportAspectRatio(e.target.value as any)}
                  className="w-full px-3 py-2 text-xs rounded-lg bg-[#0c0f16] border border-slate-800 text-slate-200 focus:outline-none focus:border-cyan-500"
                >
                  <option value="16:9">16:9 Widescreen (YouTube, Web)</option>
                  <option value="9:16">9:16 Vertical (TikTok, Reels, Shorts)</option>
                  <option value="1:1">1:1 Square (Feed posts)</option>
                </select>
              </div>

              <div className="flex items-end">
                <button
                  onClick={handleQueueExport}
                  className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-gradient-to-r from-cyan-500 to-violet-600 hover:from-cyan-400 hover:to-violet-500 rounded-lg shadow-sm shadow-cyan-500/20"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{t.triggerExportBtn}</span>
                </button>
              </div>
            </div>

            {/* Export Records Table */}
            {project.exportRecords && project.exportRecords.length > 0 && (
              <div className="space-y-2 pt-3">
                <h3 className="text-xs font-semibold text-slate-300">
                  {t.exportHistoryTitle}
                </h3>
                <div className="divide-y divide-slate-800 border border-slate-800 rounded-lg overflow-hidden bg-slate-900/40">
                  {project.exportRecords.map((exp) => (
                    <div
                      key={exp.id}
                      className="p-3 flex items-center justify-between text-xs"
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-cyan-400 font-semibold">
                          MP4 {exp.resolution}
                        </span>
                        <span className="text-slate-500">·</span>
                        <span className="text-slate-400">{exp.aspectRatio}</span>
                        <span className="text-slate-500">·</span>
                        <span className="text-slate-400 font-mono">
                          ~{exp.fileSizeMb} MB
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-emerald-400 font-medium">Ready</span>
                        <span className="text-slate-500 text-[11px]">
                          {new Date(exp.createdAt).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab 6: Publishing & Distribution */}
      {activeTab === 'publish' && (
        <div className="space-y-6">
          <div className="p-6 rounded-xl glass-panel space-y-5">
            <div className="space-y-1 pb-3 border-b border-slate-800">
              <h2 className="text-base font-bold font-display text-white">
                {t.publishTitle}
              </h2>
              <p className="text-xs text-slate-400">
                {t.publishNotice}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {['YouTube', 'TikTok', 'Instagram'].map((plat) => (
                <div
                  key={plat}
                  className="p-4 rounded-xl border border-slate-800 bg-[#0c0f16] space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white">{plat}</span>
                    <span className="text-[10px] text-slate-500 font-mono">OAuth</span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Direct upload & video scheduling pipeline integration ready.
                  </p>
                  <button
                    disabled
                    className="w-full py-1.5 text-xs font-medium text-slate-500 bg-slate-900 border border-slate-800 rounded-lg cursor-not-allowed"
                  >
                    {t.connectPlatformBtn}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
