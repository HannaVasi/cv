export interface Project {
  id: string;
  projectName: string;
  anonymizedProjectName?: string;
  startDate: string;
  endDate?: string;
  untilNow: boolean;
  description: string;
  responsibilities?: string;
  technologies?: string;
  is_manual: boolean;
  company?: string;
}

export interface FormErrors {
  projectName?: string;
  startDate?: string;
  endDate?: string;
  description?: string;
}

export type FormMode = "create" | "edit";
