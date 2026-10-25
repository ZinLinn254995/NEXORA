import {
  Project,
  CreateProjectPayload,
  ScriptVersion,
  Scene,
} from '../types/project';

const STORAGE_KEY = 'nexora_projects_v1';

export interface IProjectRepository {
  getAll(): Promise<Project[]>;
  getById(id: string): Promise<Project | null>;
  create(payload: CreateProjectPayload): Promise<Project>;
  update(id: string, updates: Partial<Project>): Promise<Project | null>;
  delete(id: string): Promise<boolean>;
  duplicate(id: string): Promise<Project | null>;
  exportBackup(): string;
  importBackup(jsonString: string): boolean;
  resetToDemo(): Promise<Project[]>;
}

// Initial starter seed projects demonstrating both English and Burmese content
const INITIAL_DEMO_PROJECTS: Project[] = [
  {
    id: 'proj-bagan-001',
    title: 'ပုဂံ ရှေးဟောင်း စေတီပုထိုးများ သမိုင်း (Bagan Heritage)',
    videoIdea:
      'A majestic 60-second documentary exploring the 1,000-year history of the ancient temple plains of Bagan, Myanmar, at sunrise.',
    videoType: 'documentary',
    contentLanguage: 'Burmese',
    targetDuration: '60s',
    status: 'needs_review',
    coverImage: '/src/assets/images/bagan_sample_video_1792920332384.jpg',
    createdAt: '2026-10-24T10:30:00.000Z',
    updatedAt: '2026-10-25T02:00:00.000Z',
    activeScriptVersionId: 'script-bagan-v1',
    scriptVersions: [
      {
        id: 'script-bagan-v1',
        projectId: 'proj-bagan-001',
        versionNumber: 1,
        title: 'မူကြမ်း ၁ - ပုဂံ၏ အရုဏ်ဦး နေရောင်ခြည်',
        content:
          'အခန်း ၁ - မြူခိုးတွေ ဝေဆာနေတဲ့ ဧရာဝတီမြစ်ကမ်းဘေး ပုဂံမြေမှာ နေရောင်ခြည် နုနုစတင် သန်းလာပါတယ်။ စေတီပုထိုး ထောင်ပေါင်းများစွာရဲ့ အလှတရားဟာ ကမ္ဘာ့သမိုင်းရဲ့ အံ့ဖွယ်တစ်ခု ဖြစ်ပါတယ်။\n\nအခန်း ၂ - ၁၁ ရာစု အနော်ရထာမင်း လက်ထက်မှစ၍ ဗုဒ္ဓဘာသာ ယဉ်ကျေးမှုနှင့် အနုပညာ ဗိသုကာ လက်ရာများ ဒီမြေမှာ ထွန်းကားခဲ့ပါတယ်။\n\nအခန်း ၃ - ယနေ့ခေတ် ကမ္ဘာလှည့် ခရီးသည်များနှင့် မျိုးဆက်သစ်များအတွက် ပုဂံသည် မြန်မာတို့၏ နှလုံးသားနှင့် ကမ္ဘာ့အမွေအနှစ်အဖြစ် ဆက်လက် တည်ရှိနေဆဲ ဖြစ်ပါသည်။',
        wordCount: 88,
        estimatedDurationSeconds: 60,
        notes: 'Initial bilingual documentary narration draft',
        createdAt: '2026-10-24T10:35:00.000Z',
      },
    ],
    scenes: [
      {
        id: 'scene-b1',
        projectId: 'proj-bagan-001',
        sceneNumber: 1,
        narration:
          'မြူခိုးတွေ ဝေဆာနေတဲ့ ဧရာဝတီမြစ်ကမ်းဘေး ပုဂံမြေမှာ နေရောင်ခြည် နုနုစတင် သန်းလာပါတယ်။',
        visualPrompt:
          'Cinematic wide aerial sunrise shot of ancient terracotta pagodas amidst soft golden mist, Irrawaddy river distant.',
        durationSeconds: 20,
        status: 'ready',
        mediaAsset: {
          id: 'asset-b1',
          type: 'image',
          url: '/src/assets/images/bagan_sample_video_1792920332384.jpg',
          status: 'generated',
          createdAt: '2026-10-24T10:40:00.000Z',
        },
      },
      {
        id: 'scene-b2',
        projectId: 'proj-bagan-001',
        sceneNumber: 2,
        narration:
          '၁၁ ရာစု အနော်ရထာမင်း လက်ထက်မှစ၍ ဗုဒ္ဓဘာသာ ယဉ်ကျေးမှုနှင့် အနုပညာ ဗိသုကာ လက်ရာများ ဒီမြေမှာ ထွန်းကားခဲ့ပါတယ်။',
        visualPrompt:
          'Close-up architectural slow pan of intricate stucco stone carvings and arched temple entrance with golden morning sidelight.',
        durationSeconds: 20,
        status: 'draft',
      },
      {
        id: 'scene-b3',
        projectId: 'proj-bagan-001',
        sceneNumber: 3,
        narration:
          'ယနေ့ခေတ် မျိုးဆက်သစ်များအတွက် ပုဂံသည် မြန်မာတို့၏ နှလုံးသားနှင့် ကမ္ဘာ့အမွေအနှစ်အဖြစ် ဆက်လက် တည်ရှိနေဆဲ ဖြစ်ပါသည်။',
        visualPrompt:
          'Monks walking peacefully past ancient brick stupas as warm sunlight illuminates dust motes in the air.',
        durationSeconds: 20,
        status: 'draft',
      },
    ],
    audioConfig: {
      voiceStyle: 'calm',
      speakerName: 'Zaw (Warm Documentary Narration)',
      backgroundMusicGenre: 'ambient',
      musicVolume: 35,
      voiceVolume: 85,
      isSynthesized: false,
      notes: 'Burmese language narration profile',
    },
    exportRecords: [
      {
        id: 'exp-b1',
        projectId: 'proj-bagan-001',
        resolution: '1080p',
        aspectRatio: '16:9',
        status: 'ready',
        format: 'mp4',
        fileSizeMb: 42.8,
        createdAt: '2026-10-24T14:20:00.000Z',
      },
    ],
    publishingRecords: [],
    generationJobs: [],
  },
  {
    id: 'proj-quantum-002',
    title: 'Quantum Computing for Ordinary Humans',
    videoIdea:
      'A clear, visual 60-second explanation of quantum superposition and entanglement without intimidating math or physics jargon.',
    videoType: 'education',
    contentLanguage: 'English',
    targetDuration: '60s',
    status: 'in_progress',
    coverImage: '/src/assets/images/tech_explainer_thumb_1792920331649.jpg',
    createdAt: '2026-10-24T16:00:00.000Z',
    updatedAt: '2026-10-25T01:45:00.000Z',
    activeScriptVersionId: 'script-q-v1',
    scriptVersions: [
      {
        id: 'script-q-v1',
        projectId: 'proj-quantum-002',
        versionNumber: 1,
        title: 'Draft 1 - The Coin Flip Analogy',
        content:
          'Scene 1: Imagine a regular computer bit as a coin lying flat. It is either heads or tails, zero or one.\n\nScene 2: Now spin that coin on a table. While spinning, is it heads or tails? It is both at once! That spinning state is quantum superposition.\n\nScene 3: Because qubits can exist in superposition, quantum machines can evaluate trillions of pathways simultaneously, unlocking discoveries in medicine and energy.',
        wordCount: 71,
        estimatedDurationSeconds: 45,
        createdAt: '2026-10-24T16:10:00.000Z',
      },
    ],
    scenes: [
      {
        id: 'scene-q1',
        projectId: 'proj-quantum-002',
        sceneNumber: 1,
        narration:
          'Imagine a regular computer bit as a coin lying flat. It is either heads or tails, zero or one.',
        visualPrompt:
          'Minimalist dark slate background with a gleaming bronze coin showing digital 0 and 1 glowing runes.',
        durationSeconds: 15,
        status: 'ready',
        mediaAsset: {
          id: 'asset-q1',
          type: 'image',
          url: '/src/assets/images/tech_explainer_thumb_1792920331649.jpg',
          status: 'generated',
          createdAt: '2026-10-24T16:15:00.000Z',
        },
      },
      {
        id: 'scene-q2',
        projectId: 'proj-quantum-002',
        sceneNumber: 2,
        narration:
          'Now spin that coin on a table. While spinning, is it heads or tails? It is both at once! That is superposition.',
        visualPrompt:
          'Macro slow motion shot of a spinning glowing sphere dispersing concentric cyan particle waves.',
        durationSeconds: 20,
        status: 'draft',
      },
      {
        id: 'scene-q3',
        projectId: 'proj-quantum-002',
        sceneNumber: 3,
        narration:
          'Because qubits exist in superposition, quantum machines can solve problems in minutes that take supercomputers millennia.',
        visualPrompt:
          'Abstract high-tech visualization of interconnected quantum nodes pulsing with electric violet and cyan energy.',
        durationSeconds: 25,
        status: 'draft',
      },
    ],
    audioConfig: {
      voiceStyle: 'friendly',
      speakerName: 'Elena (Clear Tech Explainer)',
      backgroundMusicGenre: 'minimal',
      musicVolume: 25,
      voiceVolume: 90,
      isSynthesized: false,
    },
    exportRecords: [],
    publishingRecords: [],
    generationJobs: [],
  },
];

class LocalStorageProjectRepository implements IProjectRepository {
  private load(): Project[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        // Initialize with default projects so user has immediate rich data
        this.save(INITIAL_DEMO_PROJECTS);
        return INITIAL_DEMO_PROJECTS;
      }
      return JSON.parse(raw);
    } catch (e) {
      console.warn('Failed to parse projects from localStorage:', e);
      return INITIAL_DEMO_PROJECTS;
    }
  }

  private save(projects: Project[]): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
    } catch (e) {
      console.error('Failed to save projects to localStorage:', e);
    }
  }

  async getAll(): Promise<Project[]> {
    const list = this.load();
    // Sort by latest updated first
    return list.sort(
      (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    );
  }

  async getById(id: string): Promise<Project | null> {
    const list = this.load();
    return list.find((p) => p.id === id) || null;
  }

  async create(payload: CreateProjectPayload): Promise<Project> {
    const list = this.load();
    const now = new Date().toISOString();
    const newId = `proj-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    const scriptId = `script-${Date.now()}-1`;

    // Estimate duration seconds from option
    const durationMap: Record<string, number> = {
      '15s': 15,
      '30s': 30,
      '60s': 60,
      '2-3m': 150,
      custom: 60,
    };
    const totalDuration = durationMap[payload.targetDuration] || 60;
    const sceneDuration = Math.max(5, Math.floor(totalDuration / 3));

    // Initial default scenes generated from user idea
    const initialScenes: Scene[] = [
      {
        id: `scene-${Date.now()}-1`,
        projectId: newId,
        sceneNumber: 1,
        narration: payload.initialNarration || `Hook: Introduction to ${payload.title}.`,
        visualPrompt: `Opening establishing shot reflecting ${payload.videoIdea}`,
        durationSeconds: sceneDuration,
        status: 'draft',
      },
      {
        id: `scene-${Date.now()}-2`,
        projectId: newId,
        sceneNumber: 2,
        narration: `Core Insight: Exploring the key message of ${payload.title}.`,
        visualPrompt: `Engaging mid-shot showing the main concept in action.`,
        durationSeconds: sceneDuration,
        status: 'draft',
      },
      {
        id: `scene-${Date.now()}-3`,
        projectId: newId,
        sceneNumber: 3,
        narration: `Call to Action: Summary and closing thought.`,
        visualPrompt: `Memorable closing scene with clean visual focal point.`,
        durationSeconds: totalDuration - sceneDuration * 2,
        status: 'draft',
      },
    ];

    const initialScript: ScriptVersion = {
      id: scriptId,
      projectId: newId,
      versionNumber: 1,
      title: 'Initial Concept Draft',
      content: initialScenes
        .map((s) => `Scene ${s.sceneNumber}: ${s.narration}`)
        .join('\n\n'),
      wordCount: payload.videoIdea.split(/\s+/).length + 20,
      estimatedDurationSeconds: totalDuration,
      notes: 'Initial auto-generated script structure',
      createdAt: now,
    };

    const newProject: Project = {
      id: newId,
      title: payload.title.trim() || 'Untitled Video Project',
      videoIdea: payload.videoIdea.trim(),
      videoType: payload.videoType,
      contentLanguage: payload.contentLanguage,
      targetDuration: payload.targetDuration,
      status: 'draft',
      scriptVersions: [initialScript],
      activeScriptVersionId: scriptId,
      scenes: initialScenes,
      audioConfig: {
        voiceStyle: 'friendly',
        speakerName:
          payload.contentLanguage.toLowerCase().includes('burmese') ||
          payload.contentLanguage.toLowerCase().includes('myanmar')
            ? 'Zaw (Burmese Voice)'
            : 'Alex (Natural Voice)',
        backgroundMusicGenre:
          payload.videoType === 'documentary' ? 'cinematic' : 'ambient',
        musicVolume: 30,
        voiceVolume: 85,
        isSynthesized: false,
      },
      exportRecords: [],
      publishingRecords: [],
      generationJobs: [],
      createdAt: now,
      updatedAt: now,
    };

    list.unshift(newProject);
    this.save(list);
    return newProject;
  }

  async update(id: string, updates: Partial<Project>): Promise<Project | null> {
    const list = this.load();
    const index = list.findIndex((p) => p.id === id);
    if (index === -1) return null;

    const updated: Project = {
      ...list[index],
      ...updates,
      id: list[index].id, // protect immutable ID
      updatedAt: new Date().toISOString(),
    };

    list[index] = updated;
    this.save(list);
    return updated;
  }

  async delete(id: string): Promise<boolean> {
    const list = this.load();
    const filtered = list.filter((p) => p.id !== id);
    if (filtered.length === list.length) return false;
    this.save(filtered);
    return true;
  }

  async duplicate(id: string): Promise<Project | null> {
    const project = await this.getById(id);
    if (!project) return null;

    const list = this.load();
    const now = new Date().toISOString();
    const newId = `proj-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    const newScriptId = `script-${Date.now()}-1`;

    const duplicated: Project = {
      ...project,
      id: newId,
      title: `${project.title} (Copy)`,
      createdAt: now,
      updatedAt: now,
      status: 'draft',
      activeScriptVersionId: newScriptId,
      scriptVersions: project.scriptVersions.map((sv, idx) => ({
        ...sv,
        id: idx === 0 ? newScriptId : `script-${Date.now()}-${idx + 1}`,
        projectId: newId,
        createdAt: now,
      })),
      scenes: project.scenes.map((s, idx) => ({
        ...s,
        id: `scene-${Date.now()}-${idx + 1}`,
        projectId: newId,
      })),
      exportRecords: [],
      publishingRecords: [],
      generationJobs: [],
    };

    list.unshift(duplicated);
    this.save(list);
    return duplicated;
  }

  exportBackup(): string {
    const list = this.load();
    return JSON.stringify(
      {
        appName: 'NEXORA',
        version: '1.0.0',
        exportedAt: new Date().toISOString(),
        projects: list,
      },
      null,
      2
    );
  }

  importBackup(jsonString: string): boolean {
    try {
      const parsed = JSON.parse(jsonString);
      if (Array.isArray(parsed.projects)) {
        this.save(parsed.projects);
        return true;
      }
      if (Array.isArray(parsed)) {
        this.save(parsed);
        return true;
      }
      return false;
    } catch {
      return false;
    }
  }

  async resetToDemo(): Promise<Project[]> {
    this.save(INITIAL_DEMO_PROJECTS);
    return INITIAL_DEMO_PROJECTS;
  }
}

// Export default singleton instance
export const projectRepository: IProjectRepository = new LocalStorageProjectRepository();
