import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Project, VideoType, ProjectStatus } from '../../types/project';
import { projectRepository } from '../../services/storage';
import {
  FolderKanban,
  Search,
  Plus,
  Video,
  Edit2,
  Copy,
  Trash2,
  Clock,
  CheckCircle2,
  AlertCircle,
  Download,
  Upload,
  RefreshCw,
  ExternalLink,
} from 'lucide-react';

interface ProjectsScreenProps {
  onOpenProject: (projectId: string) => void;
  onNewProject: () => void;
}

export const ProjectsScreen: React.FC<ProjectsScreenProps> = ({
  onOpenProject,
  onNewProject,
}) => {
  const { t } = useLanguage();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Rename modal state
  const [renameTarget, setRenameTarget] = useState<Project | null>(null);
  const [newTitle, setNewTitle] = useState('');

  // Delete modal state
  const [deleteTarget, setDeleteTarget] = useState<Project | null>(null);
  const [deleting, setDeleting] = useState(false);

  const loadProjects = async () => {
    setLoading(true);
    try {
      const data = await projectRepository.getAll();
      setProjects(data);
    } catch (err) {
      console.error('Failed to load projects:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const handleOpenRename = (project: Project, e: React.MouseEvent) => {
    e.stopPropagation();
    setRenameTarget(project);
    setNewTitle(project.title);
  };

  const handleSaveRename = async () => {
    if (!renameTarget || !newTitle.trim()) return;
    try {
      await projectRepository.update(renameTarget.id, { title: newTitle.trim() });
      setRenameTarget(null);
      await loadProjects();
    } catch (err) {
      console.error('Failed to rename project:', err);
    }
  };

  const handleDuplicate = async (projectId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await projectRepository.duplicate(projectId);
      await loadProjects();
    } catch (err) {
      console.error('Failed to duplicate project:', err);
    }
  };

  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await projectRepository.delete(deleteTarget.id);
      setDeleteTarget(null);
      await loadProjects();
    } catch (err) {
      console.error('Failed to delete project:', err);
    } finally {
      setDeleting(false);
    }
  };

  const handleExportBackup = () => {
    const jsonStr = projectRepository.exportBackup();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `nexora_projects_backup_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportBackup = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async (event) => {
      const content = event.target?.result as string;
      if (content) {
        const success = projectRepository.importBackup(content);
        if (success) {
          await loadProjects();
        } else {
          alert('Invalid backup file format.');
        }
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const handleResetDemo = async () => {
    if (confirm('Load demo projects into workspace?')) {
      await projectRepository.resetToDemo();
      await loadProjects();
    }
  };

  const filteredProjects = projects.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.videoIdea.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === 'all' || p.videoType === typeFilter;
    const matchesStatus = statusFilter === 'all' || p.status === statusFilter;
    return matchesSearch && matchesType && matchesStatus;
  });

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
    <div className="max-w-7xl mx-auto space-y-6 pb-20">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-bold font-display text-white flex items-center gap-2">
            <FolderKanban className="w-6 h-6 text-cyan-400" />
            {t.projectsHeaderTitle}
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            {t.projectsHeaderSubtitle}
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={onNewProject}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-gradient-to-r from-cyan-500 to-violet-600 hover:from-cyan-400 hover:to-violet-500 rounded-lg shadow-sm shadow-cyan-500/20"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{t.navNewProject}</span>
          </button>

          <button
            onClick={handleExportBackup}
            title="Download JSON backup"
            className="p-2 text-slate-400 hover:text-white rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 transition-colors"
          >
            <Download className="w-4 h-4" />
          </button>

          <label
            title="Import JSON backup"
            className="p-2 text-slate-400 hover:text-white rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 transition-colors cursor-pointer"
          >
            <Upload className="w-4 h-4" />
            <input
              type="file"
              accept=".json"
              onChange={handleImportBackup}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
        {/* Search */}
        <div className="sm:col-span-6 relative">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.searchPlaceholder}
            className="w-full pl-9 pr-3 py-2 text-xs rounded-lg bg-slate-900/80 border border-slate-800 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
          />
        </div>

        {/* Video Type Filter */}
        <div className="sm:col-span-3">
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="w-full px-3 py-2 text-xs rounded-lg bg-slate-900/80 border border-slate-800 text-slate-300 focus:outline-none focus:border-cyan-500"
          >
            <option value="all">{t.filterAllTypes}</option>
            <option value="education">{t.typeEducation}</option>
            <option value="storytelling">{t.typeStorytelling}</option>
            <option value="documentary">{t.typeDocumentary}</option>
            <option value="product_promo">{t.typeProductPromo}</option>
            <option value="social_media">{t.typeSocialMedia}</option>
          </select>
        </div>

        {/* Status Filter */}
        <div className="sm:col-span-3">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full px-3 py-2 text-xs rounded-lg bg-slate-900/80 border border-slate-800 text-slate-300 focus:outline-none focus:border-cyan-500"
          >
            <option value="all">{t.filterAllStatuses}</option>
            <option value="draft">{t.statusDraft}</option>
            <option value="in_progress">{t.statusInProgress}</option>
            <option value="needs_review">{t.statusNeedsReview}</option>
            <option value="ready">{t.statusReady}</option>
            <option value="failed">{t.statusFailed}</option>
          </select>
        </div>
      </div>

      {/* Projects Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-64 rounded-xl bg-slate-900/60 animate-pulse border border-slate-800"
            />
          ))}
        </div>
      ) : filteredProjects.length === 0 ? (
        <div className="p-12 text-center rounded-xl border border-slate-800/80 bg-slate-900/30 space-y-4">
          <FolderKanban className="w-12 h-12 text-slate-600 mx-auto" />
          <h3 className="text-base font-semibold text-slate-300">
            {searchQuery || typeFilter !== 'all' || statusFilter !== 'all'
              ? t.noMatchingProjects
              : t.noProjectsYet}
          </h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            {t.createFirstPrompt}
          </p>
          <div className="flex justify-center gap-3 pt-2">
            <button
              onClick={onNewProject}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-gradient-to-r from-cyan-500 to-violet-600 rounded-lg"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{t.navNewProject}</span>
            </button>
            <button
              onClick={handleResetDemo}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-lg"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Load Sample Projects</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => onOpenProject(project.id)}
              className="group cursor-pointer rounded-xl glass-panel glass-panel-hover overflow-hidden transition-all duration-200 border border-slate-800 flex flex-col justify-between"
            >
              {/* Media Thumbnail */}
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
                    <Video className="w-10 h-10 text-slate-700" />
                  </div>
                )}
                <div className="absolute top-2.5 right-2.5 bg-slate-900/90 backdrop-blur-sm px-2 py-0.5 rounded text-[11px] font-mono text-slate-300 border border-slate-800">
                  {project.targetDuration}
                </div>
              </div>

              {/* Body */}
              <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                    <span className="capitalize">{project.videoType}</span>
                    <span aria-hidden="true">·</span>
                    <span>{project.contentLanguage}</span>
                  </div>

                  <h3 className="text-sm font-bold text-white line-clamp-1 group-hover:text-cyan-300 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-2">
                    {project.videoIdea}
                  </p>
                </div>

                {/* Metadata & Actions */}
                <div className="space-y-2.5 pt-2 border-t border-slate-800/80">
                  <div className="flex items-center justify-between text-xs">
                    {getStatusBadge(project.status)}
                    <span className="text-slate-500 font-mono text-[11px]">
                      {project.scenes.length} {t.scenesCount}
                    </span>
                  </div>

                  {/* Card Action Strip */}
                  <div className="flex items-center justify-between pt-1 text-slate-400">
                    <span className="text-[11px] text-slate-500">
                      {new Date(project.updatedAt).toLocaleDateString([], {
                        month: 'short',
                        day: 'numeric',
                      })}
                    </span>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={(e) => handleOpenRename(project, e)}
                        title={t.btnRename}
                        className="p-1.5 rounded hover:bg-slate-800 hover:text-slate-200 transition-colors"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={(e) => handleDuplicate(project.id, e)}
                        title={t.btnDuplicate}
                        className="p-1.5 rounded hover:bg-slate-800 hover:text-slate-200 transition-colors"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setDeleteTarget(project);
                        }}
                        title={t.btnDelete}
                        className="p-1.5 rounded hover:bg-rose-950/60 hover:text-rose-400 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Rename Modal */}
      {renameTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-xl bg-[#11141c] border border-slate-800 p-6 space-y-4 shadow-2xl">
            <h3 className="text-base font-bold font-display text-white">
              {t.renameModalTitle}
            </h3>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="w-full px-3 py-2 text-sm rounded-lg bg-slate-900 border border-slate-700 text-slate-100 focus:outline-none focus:border-cyan-500"
              autoFocus
            />
            <div className="flex justify-end gap-2.5 pt-2">
              <button
                onClick={() => setRenameTarget(null)}
                className="px-3.5 py-1.5 text-xs font-semibold text-slate-400 hover:text-slate-200"
              >
                {t.btnCancel}
              </button>
              <button
                onClick={handleSaveRename}
                className="px-4 py-1.5 text-xs font-semibold text-white bg-cyan-600 hover:bg-cyan-500 rounded-lg"
              >
                {t.btnSave}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-xl bg-[#11141c] border border-rose-900/50 p-6 space-y-4 shadow-2xl">
            <h3 className="text-base font-bold font-display text-white flex items-center gap-2">
              <Trash2 className="w-4 h-4 text-rose-400" />
              {t.deleteConfirmTitle}
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              {t.deleteConfirmDesc}
            </p>
            <div className="p-3 rounded-lg bg-slate-900 text-xs font-mono text-slate-300 truncate">
              {deleteTarget.title}
            </div>
            <div className="flex justify-end gap-2.5 pt-2">
              <button
                onClick={() => setDeleteTarget(null)}
                disabled={deleting}
                className="px-3.5 py-1.5 text-xs font-semibold text-slate-400 hover:text-slate-200"
              >
                {t.btnCancel}
              </button>
              <button
                onClick={handleConfirmDelete}
                disabled={deleting}
                className="px-4 py-1.5 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-500 rounded-lg disabled:opacity-50"
              >
                {deleting ? 'Deleting...' : t.btnConfirmDelete}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
