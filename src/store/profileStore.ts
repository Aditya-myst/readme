import { create } from 'zustand';

export interface ProfileState {
  name: string;
  tagline: string;
  about: string;
  skills: string;
  github: string;
  linkedin: string;
  twitter: string;
  website: string;
  template: 'minimal' | 'pro' | 'influencer' | 'poweruser' | 'retro';
  updateField: (field: keyof Omit<ProfileState, 'updateField'>, value: string) => void;
}

export const useProfileStore = create<ProfileState>((set) => ({
  name: 'Jane Doe',
  tagline: 'Full Stack Developer 🚀',
  about: 'I am passionate about building scalable web apps and exploring new technologies.',
  skills: 'JavaScript, React, Node.js, Python',
  github: 'janedoe',
  linkedin: 'janedoe',
  twitter: 'janedoe',
  website: 'https://myblog.com',
  template: 'pro',
  updateField: (field, value) => set((state) => ({ ...state, [field]: value })),
}));
