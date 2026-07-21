import { create } from 'zustand';

export type WidgetType = 'github-stats' | 'top-languages' | 'streak' | 'spotify' | 'text';

export interface WidgetConfig {
  id: string;
  type: WidgetType;
  theme?: string;
  align?: 'left' | 'center' | 'right';
  content?: string;
  username?: string;
}

export interface ProfileState {
  username: string;
  name: string;
  bio: string;
  widgets: WidgetConfig[];
  setUsername: (username: string) => void;
  setName: (name: string) => void;
  setBio: (bio: string) => void;
  addWidget: (widget: Omit<WidgetConfig, 'id'>) => void;
  updateWidget: (id: string, updates: Partial<WidgetConfig>) => void;
  removeWidget: (id: string) => void;
  reorderWidgets: (startIndex: number, endIndex: number) => void;
}

export const useProfileStore = create<ProfileState>((set) => ({
  username: 'torvalds',
  name: 'Linus Torvalds',
  bio: 'Just a tech enthusiast making things.',
  widgets: [
    {
      id: 'w-1',
      type: 'github-stats',
      theme: 'radical',
      username: 'torvalds'
    },
    {
      id: 'w-2',
      type: 'top-languages',
      theme: 'radical',
      username: 'torvalds'
    }
  ],
  setUsername: (username) => set({ username }),
  setName: (name) => set({ name }),
  setBio: (bio) => set({ bio }),
  
  addWidget: (widget) => set((state) => ({
    widgets: [...state.widgets, { ...widget, id: `w-${Date.now()}` }]
  })),
  
  updateWidget: (id, updates) => set((state) => ({
    widgets: state.widgets.map(w => w.id === id ? { ...w, ...updates } : w)
  })),
  
  removeWidget: (id) => set((state) => ({
    widgets: state.widgets.filter(w => w.id !== id)
  })),
  
  reorderWidgets: (startIndex, endIndex) => set((state) => {
    const result = Array.from(state.widgets);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return { widgets: result };
  }),
}));
