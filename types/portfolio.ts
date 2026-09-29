export interface ProjectItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  image: string | null;
  galleryImages?: string[];
  githubUrl: string;
  demoUrl?: string;
  isFeatured: boolean;
  category: string;
  techStack: string[];
  highlights?: string[];
  keyChallenges?: string[];
  metrics?: { label: string; value: string }[];
  problemSolved?: string;
  architectureDetails?: string;
}

export interface SkillCategoryItem {
  name: string;
  skills: string[];
  isAiMl?: boolean;
}

export interface ExperienceItem {
  period: string;
  role: string;
  companyOrContext: string;
  location: string;
  description: string;
  keyAchievements: string[];
  technologies: string[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  period: string;
  location: string;
  focus: string;
  honorsOrHighlights: string[];
}

export interface CertificationItem {
  title: string;
  issuer: string;
  year: string;
  code?: string;
}