import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Project } from '../../types/project';
import { projectRepository } from '../../services/storage';
import {
  Sparkles,
  Video,
  FolderKanban,
  ArrowRight,
  Clock,
  Layers,
  CheckCircle2,
  AlertCircle,
  Cpu,
  Mic,
  Clapperboard,
  Share2,
} from 'lucide-react';

interface DashboardScreenProps {
  onNavigate: (screen: 'chat' | 'create' | 'projects') => void;
  onOpenProject: (projectId: string) => void;
}

interface ProviderStatusData {
  ai: { connected: boolean; status: string; notes?: string };
  voice: { connected: boolean; status: string; notes?: string };
  rendering: { connected: boolean; status: string; notes?: string };
  publishing: { connected: boolean; status: string; notes?: string };
}

export const DashboardScreen: React.FC<DashboardScreenProps> = ({
  onNavigate,
  onOpenProject,
}) => {
  const { t } = useLanguage();
  const [recentProjects, setRecentProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [providerStatus, setProviderStatus] = useState<ProviderStatusData>({
    ai: { connected: false, status: 'awaiting_key' },
    voice: { connected: false, status: 'foundation_ready' },
    rendering: { connected: false, status: 'foundation_ready' },
    publishing: { connected: false, status: 'not_connected' },
  });

  useEffect(() => {
    async function loadData() {
      try {
        const projects = await projectRepository.getAll();
        setRecentProjects(projects.slice(0, 4));
      } catch (err) {
        console.error('Failed to load recent projects:', err);
      } finally {
        setLoading(false);
      }

      // Check backend status endpoint
      try {
        const res = await fetch('/api/status');
        if (res.ok) {
          const data = await res.json();
          setProviderStatus(data);
        }
      } catch {
        // Backend offline or running in standard dev
      }
    }

    loadData();
  }, []);

  const getStatusBadge = (status: Project['status']) => {
    switch (status) {
      case 'ready':
        return (
          <span className="text-xs text-emerald-400 flex items-center gap-1 font-medium">
            <CheckCircle2 className="w-3.5 h-3.5" />
            {t.statusReady}
          </span>
        );
      case 'in_progress':
        return (
          <span className="text-xs text-cyan-400 flex items-center gap-1 font-medium">
            <Clock className="w-3.5 h-3.5" />
            {t.statusInProgress}
          </span>
        );
      case 'needs_review':
        return (
          <span className="text-xs text-amber-400 flex items-center gap-1 font-medium">
            <AlertCircle className="w-3.5 h-3.5" />
            {t.statusNeedsReview}
          </span>
        );
      case 'failed':
        return (
          <span className="text-xs text-rose-400 flex items-center gap-1 font-medium">
            <AlertCircle className="w-3.5 h-3.5" />
            {t.statusFailed}
          </span>
        );
      case 'draft':
      default:
        return (
          <span className="text-xs text-slate-400 flex items-center gap-1 font-medium">
            <Clock className="w-3.5 h-3.5" />
            {t.statusDraft}
          </span>
        );
    }
  };

  return (
    <div className="space-y-10 pb-16">
      {/* Hero Welcome Card */}
      <section className="relative overflow-hidden rounded-2xl border border-slate-800 bg-gradient-to-r from-[#121622] via-[#0f131c] to-[#141224] p-6 sm:p-10 shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-medium text-cyan-400 bg-cyan-950/40 border border-cyan-800/40 px-3 py-1 rounded-md">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>NEXORA Studio Foundation</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-white tracking-tight text-balance leading-tight">
              {t.welcomeTitle}
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">
              {t.welcomeSubtitle}
            </p>

            <div className="pt-2 flex flex-wrap gap-4">
              <button
                onClick={() => onNavigate('create')}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-white bg-gradient-to-r from-cyan-500 to-violet-600 hover:from-cyan-400 hover:to-violet-500 shadow-md shadow-cyan-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <Video className="w-4 h-4" />
                <span>{t.actionCreateTitle}</span>
              </button>
              <button
                onClick={() => onNavigate('chat')}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-slate-200 bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 transition-colors"
              >
                <Sparkles className="w-4 h-4 text-violet-400" />
                <span>{t.actionChatTitle}</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="relative rounded-xl overflow-hidden border border-slate-800 shadow-xl group">
              <img
                src="/src/assets/images/nexora_studio_hero_1792920332310.jpg"
                alt="NEXORA Studio Interface"
                referrerPolicy="no-referrer"
                className="w-full h-56 sm:h-64 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b0d13] via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-3 left-3 right-3 text-xs text-slate-300 bg-slate-900/90 backdrop-blur-sm p-2.5 rounded-lg border border-slate-800 flex items-center justify-between">
                <span>AI-Assisted Video Storyboard</span>
                <span className="text-cyan-400 font-mono">16:9 HD</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The 3 Main Actions */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold font-display text-slate-200 tracking-tight">
          What would you like to create today?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Action 1: Chat with AI */}
          <button
            onClick={() => onNavigate('chat')}
            className="group text-left p-6 rounded-xl glass-panel glass-panel-hover transition-all duration-200 flex flex-col justify-between h-52 relative overflow-hidden focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-lg bg-violet-950/80 border border-violet-800/50 flex items-center justify-center text-violet-400 group-hover:scale-110 transition-transform">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                  1. {t.actionChatTitle}
                </h3>
                <p className="text-slate-400 text-xs sm:text-sm mt-1 leading-relaxed">
                  {t.actionChatDesc}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1 text-xs font-semibold text-cyan-400 group-hover:translate-x-1 transition-transform">
              <span>Start brainstorming</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </button>

          {/* Action 2: Create Video */}
          <button
            onClick={() => onNavigate('create')}
            className="group text-left p-6 rounded-xl glass-panel glass-panel-hover transition-all duration-200 flex flex-col justify-between h-52 relative overflow-hidden focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-lg bg-cyan-950/80 border border-cyan-800/50 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                <Video className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                  2. {t.actionCreateTitle}
                </h3>
                <p className="text-slate-400 text-xs sm:text-sm mt-1 leading-relaxed">
                  {t.actionCreateDesc}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1 text-xs font-semibold text-cyan-400 group-hover:translate-x-1 transition-transform">
              <span>Guided creation</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </button>

          {/* Action 3: My Projects */}
          <button
            onClick={() => onNavigate('projects')}
            className="group text-left p-6 rounded-xl glass-panel glass-panel-hover transition-all duration-200 flex flex-col justify-between h-52 relative overflow-hidden focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-lg bg-slate-900 border border-slate-700/80 flex items-center justify-center text-slate-300 group-hover:scale-110 transition-transform">
                <FolderKanban className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                  3. {t.actionProjectsTitle}
                </h3>
                <p className="text-slate-400 text-xs sm:text-sm mt-1 leading-relaxed">
                  {t.actionProjectsDesc}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1 text-xs font-semibold text-cyan-400 group-hover:translate-x-1 transition-transform">
              <span>View all projects</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </button>
        </div>
      </section>

      {/* Recent Projects Section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold font-display text-slate-200 tracking-tight">
            {t.recentProjectsTitle}
          </h2>
          <button
            onClick={() => onNavigate('projects')}
            className="text-xs text-cyan-400 hover:text-cyan-300 font-medium transition-colors flex items-center gap-1"
          >
            <span>{t.viewAllProjects}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-44 rounded-xl bg-slate-900/60 animate-pulse border border-slate-800"
              />
            ))}
          </div>
        ) : recentProjects.length === 0 ? (
          <div className="p-8 text-center rounded-xl border border-slate-800/80 bg-slate-900/30 space-y-3">
            <FolderKanban className="w-10 h-10 text-slate-600 mx-auto" />
            <p className="text-sm font-semibold text-slate-300">{t.noProjectsYet}</p>
            <p className="text-xs text-slate-500 max-w-md mx-auto">{t.createFirstPrompt}</p>
            <button
              onClick={() => onNavigate('create')}
              className="mt-2 inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-cyan-600 hover:bg-cyan-500 rounded-lg"
            >
              <Video className="w-3.5 h-3.5" />
              {t.actionCreateTitle}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {recentProjects.map((project) => (
              <div
                key={project.id}
                onClick={() => onOpenProject(project.id)}
                className="group cursor-pointer rounded-xl glass-panel glass-panel-hover overflow-hidden transition-all duration-200 border border-slate-800 flex flex-col justify-between"
              >
                {/* Project Thumbnail */}
                <div className="relative aspect-video bg-slate-950 overflow-hidden">
                  {project.coverImage ? (
                    <img
                      src={project.coverImage}
                      alt={project.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-900 to-[#141724]">
                      <Video className="w-8 h-8 text-slate-700" />
                    </div>
                  )}
                  <div className="absolute top-2 right-2 bg-slate-900/90 backdrop-blur-sm px-2 py-0.5 rounded text-[11px] font-mono text-slate-300 border border-slate-800">
                    {project.targetDuration}
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-white line-clamp-1 group-hover:text-cyan-300 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs text-slate-400 line-clamp-2 mt-1">
                      {project.videoIdea}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs">
                    {getStatusBadge(project.status)}
                    <span className="text-slate-500 font-mono text-[11px]">
                      {project.scenes.length} {t.scenesCount}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* System & Provider Connectivity (Honest transparency) */}
      <section className="rounded-xl border border-slate-800/80 bg-[#0f121a] p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-base font-bold font-display text-slate-200">
              {t.providerStatusTitle}
            </h2>
            <p className="text-xs text-slate-400">{t.providerStatusDesc}</p>
          </div>
          <span className="text-[11px] font-mono text-slate-500 bg-slate-900 px-2.5 py-1 rounded border border-slate-800 w-fit">
            System Architecture v1.0
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          {/* AI Reasoning */}
          <div className="p-3.5 rounded-lg bg-slate-900/60 border border-slate-800 space-y-1.5">
            <div className="flex items-center justify-between text-slate-400">
              <span className="flex items-center gap-1.5 font-medium">
                <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                {t.statusAiEngine}
              </span>
            </div>
            <p className="text-slate-200 font-semibold">Gemini 3.8 Flash</p>
            <div className="flex items-center gap-1.5 pt-1 text-[11px]">
              <span
                className={`w-2 h-2 rounded-full ${
                  providerStatus.ai.connected ? 'bg-emerald-500' : 'bg-cyan-500'
                }`}
              />
              <span className="text-slate-400">
                {providerStatus.ai.connected ? t.statusConnected : t.statusAwaitingKey}
              </span>
            </div>
          </div>

          {/* Voice Narration */}
          <div className="p-3.5 rounded-lg bg-slate-900/60 border border-slate-800 space-y-1.5">
            <div className="flex items-center justify-between text-slate-400">
              <span className="flex items-center gap-1.5 font-medium">
                <Mic className="w-3.5 h-3.5 text-violet-400" />
                {t.statusVoiceSynthesis}
              </span>
            </div>
            <p className="text-slate-200 font-semibold">Gemini TTS Pipeline</p>
            <div className="flex items-center gap-1.5 pt-1 text-[11px]">
              <span className="w-2 h-2 rounded-full bg-amber-500/80" />
              <span className="text-slate-400">{t.statusFoundationReady}</span>
            </div>
          </div>

          {/* Video Composition */}
          <div className="p-3.5 rounded-lg bg-slate-900/60 border border-slate-800 space-y-1.5">
            <div className="flex items-center justify-between text-slate-400">
              <span className="flex items-center gap-1.5 font-medium">
                <Clapperboard className="w-3.5 h-3.5 text-cyan-400" />
                {t.statusVideoRendering}
              </span>
            </div>
            <p className="text-slate-200 font-semibold">NEXORA Video Renderer</p>
            <div className="flex items-center gap-1.5 pt-1 text-[11px]">
              <span className="w-2 h-2 rounded-full bg-amber-500/80" />
              <span className="text-slate-400">{t.statusFoundationReady}</span>
            </div>
          </div>

          {/* Social Publishing */}
          <div className="p-3.5 rounded-lg bg-slate-900/60 border border-slate-800 space-y-1.5">
            <div className="flex items-center justify-between text-slate-400">
              <span className="flex items-center gap-1.5 font-medium">
                <Share2 className="w-3.5 h-3.5 text-slate-400" />
                {t.statusPublishingApi}
              </span>
            </div>
            <p className="text-slate-200 font-semibold">YouTube / TikTok / IG</p>
            <div className="flex items-center gap-1.5 pt-1 text-[11px]">
              <span className="w-2 h-2 rounded-full bg-slate-600" />
              <span className="text-slate-400">{t.statusNotConnected}</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
