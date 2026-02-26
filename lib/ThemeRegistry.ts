export type ThemeKey = 'default' | 'pelli' | 'haldi' | 'mehendi' | 'sangeeth' | 'upanayanam' | 'vratam' | 'pellikuthuru' | 'pellikoduku';

export interface ThemeConfig {
  key: ThemeKey;
  name: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
  assets: {
    motifPath?: string;
    patternPath?: string;
    audioPath?: string;
  };
}

export const THEME_REGISTRY: Record<ThemeKey, ThemeConfig> = {
  default: {
    key: 'default',
    name: 'Wedding Theme',
    colors: {
      primary: 'var(--bg-primary)',
      secondary: 'var(--text-primary)',
      accent: 'var(--accent-primary)',
    },
    assets: {}
  },
  pelli: {
    key: 'pelli',
    name: 'Vivaham',
    colors: {
      primary: '#FAF5E9',
      secondary: '#4A1C1C',
      accent: '#D4A017',
    },
    assets: {
      motifPath: '/assets/svg/pelli/ganesha_motif.svg',
      patternPath: '/assets/svg/pelli/kolam_pattern.svg',
      audioPath: '/audio/ambient_bells.ogg',
    }
  },
  haldi: { key: 'haldi', name: 'Haldi', colors: { primary: '', secondary: '', accent: '' }, assets: {} },
  mehendi: { key: 'mehendi', name: 'Mehendi', colors: { primary: '', secondary: '', accent: '' }, assets: {} },
  sangeeth: { key: 'sangeeth', name: 'Sangeeth', colors: { primary: '', secondary: '', accent: '' }, assets: {} },
  upanayanam: { key: 'upanayanam', name: 'Upanayanam', colors: { primary: '', secondary: '', accent: '' }, assets: {} },
  vratam: { key: 'vratam', name: 'Vratam', colors: { primary: '', secondary: '', accent: '' }, assets: {} },
  pellikuthuru: { key: 'pellikuthuru', name: 'Pelli Kuthuru', colors: { primary: '', secondary: '', accent: '' }, assets: {} },
  pellikoduku: { key: 'pellikoduku', name: 'Pelli Koduku', colors: { primary: '', secondary: '', accent: '' }, assets: {} }
};
