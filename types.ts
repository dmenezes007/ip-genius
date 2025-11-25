
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
export type EducationLevel = 'Infantil' | 'Fundamental_I' | 'Fundamental_II' | 'Medio' | 'Superior';
export type UserRole = 'Teacher' | 'Student';

export type AspectRatio = '16:9' | '1:1';

export interface GeneratedImage {
  id: string;
  data: string;
  prompt: string;
  timestamp: number;
}

export interface SearchResultItem {
  title: string;
  url: string;
}

export interface LessonPlan {
  title: string;
  duration: string;
  bncc: string;
  objectives: string[];
  activities: string[];
}

declare global {
  interface AIStudio {
    hasSelectedApiKey: () => Promise<boolean>;
    openSelectKey: () => Promise<void>;
  }
}
