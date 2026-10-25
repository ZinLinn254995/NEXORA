import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { VideoType, VideoDurationOption, CreateProjectPayload } from '../../types/project';
import {
  Video,
  BookOpen,
  Film,
  Sparkles,
  ShoppingBag,
  Share2,
  Clock,
  Languages,
  Check,
  ArrowRight,
} from 'lucide-react';

interface CreateVideoScreenProps {
  initialIdea?: {
    title?: string;
    idea?: string;
    videoType?: string;
  };
  onProjectCreated: (projectId: string) => void;
  onCancel: () => void;
}

const COMMON_LANGUAGES = [
  'English',
  'Burmese (မြန်မာဘာသာ)',
  'Spanish (Español)',
  'Japanese (日本語)',
  'Chinese (中文)',
  'French (Français)',
  'German (Deutsch)',
  'Thai (ภาษาไทย)',
  'Vietnamese (Tiếng Việt)',
  'Korean (한국어)',
];

export const CreateVideoScreen: React.FC<CreateVideoScreenProps> = ({
  initialIdea,
  onProjectCreated,
  onCancel,
}) => {
  const { language, t } = useLanguage();

  const [title, setTitle] = useState(initialIdea?.title || '');
  const [videoIdea, setVideoIdea] = useState(initialIdea?.idea || '');
  const [videoType, setVideoType] = useState<VideoType>(
    (initialIdea?.videoType as VideoType) || 'education'
  );
  const [contentLanguage, setContentLanguage] = useState(
    language === 'my' ? 'Burmese (မြန်မာဘာသာ)' : 'English'
  );
  const [targetDuration, setTargetDuration] = useState<VideoDurationOption>('60s');
  const [visualStyle, setVisualStyle] = useState('Cinematic & Clean');
  const [audience, setAudience] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const videoTypesConfig: Array<{
    type: VideoType;
    label: string;
    icon: React.ReactNode;
    desc: string;
  }> = [
    {
      type: 'education',
      label: t.typeEducation,
      icon: <BookOpen className="w-4 h-4 text-cyan-400" />,
      desc: 'Clear steps, how-to lessons, and concept explainers',
    },
    {
      type: 'storytelling',
      label: t.typeStorytelling,
      icon: <Film className="w-4 h-4 text-violet-400" />,
      desc: 'Emotional narratives, personal journeys, and parables',
    },
    {
      type: 'documentary',
      label: t.typeDocumentary,
      icon: <Sparkles className="w-4 h-4 text-amber-400" />,
      desc: 'Historical moments, cultural heritage, and deep investigations',
    },
    {
      type: 'product_promo',
      label: t.typeProductPromo,
      icon: <ShoppingBag className="w-4 h-4 text-emerald-400" />,
      desc: 'Product showcases, benefits, and launch spotlights',
    },
    {
      type: 'social_media',
      label: t.typeSocialMedia,
      icon: <Share2 className="w-4 h-4 text-rose-400" />,
      desc: 'High-energy vertical reels, TikTok hooks, and shorts',
    },
  ];

  const durationOptions: Array<{
    value: VideoDurationOption;
    label: string;
    seconds: number;
  }> = [
    { value: '15s', label: t.duration15s, seconds: 15 },
    { value: '30s', label: t.duration30s, seconds: 30 },
    { value: '60s', label: t.duration60s, seconds: 60 },
    { value: '2-3m', label: t.duration2_3m, seconds: 150 },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!videoIdea.trim()) {
      setError(
        language === 'my'
          ? 'ကျေးဇူးပြု၍ ဗီဒီယို စိတ်ကူး သို့မဟုတ် အကြောင်းအရာကို ရေးသားပေးပါ'
          : 'Please enter a video idea or description.'
      );
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const generatedTitle =
        title.trim() ||
        videoIdea.trim().slice(0, 45) + (videoIdea.length > 45 ? '...' : '');

      const payload: CreateProjectPayload = {
        title: generatedTitle,
        videoIdea: videoIdea.trim(),
        videoType,
        contentLanguage,
        targetDuration,
        visualStyle,
      };

      // Import project repository dynamically
      const { projectRepository } = await import('../../services/storage');
      const project = await projectRepository.create(payload);
      onProjectCreated(project.id);
    } catch (err: any) {
      console.error('Failed to create project:', err);
      setError(err?.message || 'Failed to create project');
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-20">
      {/* Header */}
      <div className="space-y-1 pb-4 border-b border-slate-800">
        <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-white tracking-tight flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center">
            <Video className="w-4 h-4 text-cyan-400" />
          </div>
          {t.createHeaderTitle}
        </h1>
        <p className="text-slate-400 text-xs sm:text-sm">
          {t.createHeaderSubtitle}
        </p>
      </div>

      {error && (
        <div className="p-3 rounded-lg bg-rose-950/60 border border-rose-800 text-rose-300 text-xs">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Step 1: Video Idea & Title */}
        <div className="p-5 rounded-xl glass-panel space-y-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-200">
              {t.fieldIdeaLabel} <span className="text-cyan-400">*</span>
            </label>
            <textarea
              rows={3}
              value={videoIdea}
              onChange={(e) => setVideoIdea(e.target.value)}
              placeholder={t.fieldIdeaPlaceholder}
              required
              className="w-full rounded-lg bg-[#0c0f16] border border-slate-800 px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50 resize-y"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-300">
              {t.fieldTitleLabel}{' '}
              <span className="text-slate-500 font-normal">
                (Optional - AI can generate one)
              </span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={t.fieldTitlePlaceholder}
              className="w-full rounded-lg bg-[#0c0f16] border border-slate-800 px-3.5 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50"
            />
          </div>
        </div>

        {/* Step 2: Video Type */}
        <div className="p-5 rounded-xl glass-panel space-y-3">
          <label className="block text-xs font-semibold text-slate-200">
            {t.fieldTypeLabel}
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {videoTypesConfig.map((item) => {
              const selected = videoType === item.type;
              return (
                <button
                  type="button"
                  key={item.type}
                  onClick={() => setVideoType(item.type)}
                  className={`text-left p-3 rounded-lg border transition-all flex items-start gap-3 ${
                    selected
                      ? 'bg-cyan-950/40 border-cyan-500/60 ring-1 ring-cyan-500/40 text-white'
                      : 'bg-slate-900/50 border-slate-800 hover:border-slate-700 text-slate-300'
                  }`}
                >
                  <div className="mt-0.5">{item.icon}</div>
                  <div className="space-y-0.5 flex-1">
                    <div className="text-xs font-semibold flex items-center justify-between">
                      <span>{item.label}</span>
                      {selected && <Check className="w-3.5 h-3.5 text-cyan-400" />}
                    </div>
                    <p className="text-[11px] text-slate-400 line-clamp-1">
                      {item.desc}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 3: Duration & Language Settings */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Target Duration */}
          <div className="p-5 rounded-xl glass-panel space-y-3">
            <label className="block text-xs font-semibold text-slate-200 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-cyan-400" />
              {t.fieldDurationLabel}
            </label>
            <div className="space-y-2">
              {durationOptions.map((opt) => (
                <button
                  type="button"
                  key={opt.value}
                  onClick={() => setTargetDuration(opt.value)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium border flex items-center justify-between transition-colors ${
                    targetDuration === opt.value
                      ? 'bg-cyan-950/40 border-cyan-500/60 text-white'
                      : 'bg-slate-900/50 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <span>{opt.label}</span>
                  {targetDuration === opt.value && (
                    <Check className="w-3.5 h-3.5 text-cyan-400" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Video Content Language */}
          <div className="p-5 rounded-xl glass-panel space-y-3">
            <label className="block text-xs font-semibold text-slate-200 flex items-center gap-1.5">
              <Languages className="w-3.5 h-3.5 text-violet-400" />
              {t.fieldLanguageLabel}
            </label>
            <p className="text-[11px] text-slate-400 leading-snug">
              The language spoken in the video narration (independent of your interface language).
            </p>
            <select
              value={contentLanguage}
              onChange={(e) => setContentLanguage(e.target.value)}
              className="w-full rounded-lg bg-[#0c0f16] border border-slate-800 px-3 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
            >
              {COMMON_LANGUAGES.map((lang) => (
                <option key={lang} value={lang} className="bg-slate-900 text-slate-200">
                  {lang}
                </option>
              ))}
            </select>

            <div className="pt-2">
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                {t.fieldStyleLabel}
              </label>
              <select
                value={visualStyle}
                onChange={(e) => setVisualStyle(e.target.value)}
                className="w-full rounded-lg bg-[#0c0f16] border border-slate-800 px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
              >
                <option value="Cinematic & Atmospheric">Cinematic & Atmospheric</option>
                <option value="Clean & Modern Minimal">Clean & Modern Minimal</option>
                <option value="Warm & Friendly Story">Warm & Friendly Story</option>
                <option value="High-Energy & Vibrant">High-Energy & Vibrant</option>
                <option value="Documentary Realism">Documentary Realism</option>
              </select>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
          <button
            type="button"
            onClick={onCancel}
            disabled={submitting}
            className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-slate-200 transition-colors"
          >
            {t.btnCancel}
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg text-xs font-semibold text-white bg-gradient-to-r from-cyan-500 to-violet-600 hover:from-cyan-400 hover:to-violet-500 shadow-lg shadow-cyan-500/20 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
          >
            <span>{submitting ? t.creatingProject : t.btnCreateProject}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
};
