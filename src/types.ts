export type ResourceType = 'handouts' | 'past-papers' | 'lecture-notes' | 'youtube';
export type AcademicLevel = '2000' | '3000' | '4000';

export interface Resource {
  id: string;
  title: string;
  subject: string;
  description: string;
  type: ResourceType;
  level: AcademicLevel;
  academicYear: string;
  semester: string;
  downloadUrl: string;
  uploadedAt: string;
  author: string;
  thumbnailUrl?: string;
  resourceFormat?: 'video' | 'article';
}

export interface Category {
  id: ResourceType;
  title: string;
  description: string;
  icon: string;
  color: string;
}
