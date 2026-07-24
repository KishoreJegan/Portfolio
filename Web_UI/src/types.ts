export interface ProfileData {
  name: string;
  opener: string;
  welcomeMessage: string;
  title: string;
  location: string;
  status: 'Available for work' | 'Building next big thing' | 'In deep focus';
  photoUrl: string;
  bio: string;
  skills: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  description: string;
  highlights: string[];
  tags: string[];
  githubUrl?: string;
  demoUrl?: string;
}

export interface GlassSettings {
  blurPx: number;
  opacityPercent: number;
  borderOpacityPercent: number;
  amberGlow: boolean;
  ambientLightMotion: boolean;
}
