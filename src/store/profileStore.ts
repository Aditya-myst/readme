import { create } from 'zustand';
import { fetchGithubProfile } from '@/lib/github';

export type TemplateType = 
  | 'pro'
  | 'architect'
  | 'influencer'
  | 'poweruser'
  | 'minimal'
  | 'retro'
  | 'fullstack'
  | 'opensource'
  | 'aiml'
  | 'devops'
  | 'polyglot'
  | 'gamer'
  | 'designer'
  | 'student'
  | 'terminal'
  | 'minimalist_mono';

export type BadgeStyleType = 'for-the-badge' | 'flat' | 'flat-square' | 'plastic' | 'social';

export interface ProfileState {
  name: string;
  tagline: string;
  about: string;
  location: string;
  workingOnName: string;
  workingOnUrl: string;
  learning: string;
  collaborateOn: string;
  askMeAbout: string;
  
  // Tech Stack & Badges
  selectedSkills: string[];
  customSkills: string;
  badgeStyle: BadgeStyleType;
  
  // Social links
  github: string;
  linkedin: string;
  twitter: string;
  website: string;
  devto: string;
  youtube: string;
  discord: string;
  instagram: string;
  
  // Widgets & Customization
  statsTheme: string;
  showStats: boolean;
  showStreak: boolean;
  showTopLangs: boolean;
  showVisitorCount: boolean;
  showTypingHeader: boolean;
  showTrophies: boolean;
  showActivityGraph: boolean;
  showQuotes: boolean;
  showWakaTime: boolean;
  showSnake: boolean;
  wakatimeUser: string;
  
  // Preview & Editor preferences
  previewTheme: 'dark' | 'light';
  customMarkdown: string | null; // null means auto-generated from template
  isGithubLoading: boolean;
  
  // Active template
  template: TemplateType;
  
  // Actions
  updateField: (field: keyof ProfileState, value: any) => void;
  toggleSkill: (skillId: string) => void;
  setTemplate: (templateId: TemplateType) => void;
  setCustomMarkdown: (md: string | null) => void;
  importFromGithub: (username: string) => Promise<boolean>;
  resetDefaults: () => void;
}

const defaultState = {
  name: 'Alex Rivera',
  tagline: 'Full Stack Engineer & Open Source Enthusiast 🚀',
  about: 'I build high-performance web applications, explore cloud architectures, and contribute to developer tools.',
  location: 'San Francisco, CA',
  workingOnName: 'ProfileForge',
  workingOnUrl: 'https://github.com/alexrivera/profileforge',
  learning: 'Rust, WebAssembly & Next.js 16 App Router',
  collaborateOn: 'Open Source Developer Tools & UI Libraries',
  askMeAbout: 'React, TypeScript, Node.js, System Architecture',
  
  selectedSkills: ['typescript', 'react', 'nextjs', 'nodejs', 'tailwindcss', 'python', 'docker', 'postgresql', 'git'],
  customSkills: 'GraphQL, Redis, Prisma, AWS',
  badgeStyle: 'for-the-badge' as BadgeStyleType,
  
  github: 'alexrivera',
  linkedin: 'alexrivera-dev',
  twitter: 'alexrivera_codes',
  website: 'https://alexrivera.dev',
  devto: 'alexrivera',
  youtube: 'alexriveracodes',
  discord: 'alexrivera#1337',
  instagram: 'alexrivera_codes',
  
  statsTheme: 'radical',
  showStats: true,
  showStreak: true,
  showTopLangs: true,
  showVisitorCount: true,
  showTypingHeader: true,
  showTrophies: true,
  showActivityGraph: true,
  showQuotes: false,
  showWakaTime: false,
  showSnake: false,
  wakatimeUser: '',
  
  previewTheme: 'dark' as const,
  customMarkdown: null,
  isGithubLoading: false,
  template: 'pro' as const,
};

export const useProfileStore = create<ProfileState>((set, get) => ({
  ...defaultState,
  
  updateField: (field, value) => set((state) => ({ 
    ...state, 
    [field]: value,
    customMarkdown: null // Clear custom markdown override when user edits form fields to keep template synced!
  })),
  
  toggleSkill: (skillId) => set((state) => {
    const exists = state.selectedSkills.includes(skillId);
    return {
      selectedSkills: exists
        ? state.selectedSkills.filter((id) => id !== skillId)
        : [...state.selectedSkills, skillId],
      customMarkdown: null
    };
  }),
  
  setTemplate: (template) => set({ template, customMarkdown: null }),

  setCustomMarkdown: (md) => set({ customMarkdown: md }),
  
  importFromGithub: async (username) => {
    set({ isGithubLoading: true });
    const profile = await fetchGithubProfile(username);
    if (profile) {
      set((state) => ({
        ...state,
        github: profile.github,
        name: profile.name || state.name,
        about: profile.bio || state.about,
        location: profile.location || state.location,
        website: profile.website || state.website,
        twitter: profile.twitter || state.twitter,
        workingOnName: profile.workingOnName || state.workingOnName,
        workingOnUrl: profile.workingOnUrl || state.workingOnUrl,
        selectedSkills: Array.from(new Set([...state.selectedSkills, ...profile.detectedSkills])),
        customMarkdown: null,
        isGithubLoading: false,
      }));
      return true;
    } else {
      set({ isGithubLoading: false });
      return false;
    }
  },

  resetDefaults: () => set(defaultState),
}));
