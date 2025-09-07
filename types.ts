
export enum Screen {
  Landing,
  Input,
  Concept,
  Output,
}

export interface FileWithPreview extends File {
  preview: string;
}

export interface FormData {
  productPhoto: FileWithPreview | null;
  talentPhoto: FileWithPreview | null;
  inspirationPhoto: FileWithPreview | null;
  adText: string;
  brandLogo: FileWithPreview | null;
  ctaText: string;
  platform: string;
  industry: string;
  targetAudience: string;
  campaignGoal: string;
  campaignContext: string;
  brandFont: string;
  primaryBrandColor: string;
  secondaryBrandColor: string;
}

export interface CreativeConcept {
  id: number;
  title: string;
  contextIntent: string;
  lightingStyle: string;
  backgroundTheme: string;
  talentInteraction: string;
  cameraAngle: string;
}

export type AppState = {
  screen: Screen;
  formData: FormData;
  concepts: CreativeConcept[];
  selectedConcept: CreativeConcept | null;
  finalImage: string | null;
  loading: boolean;
  error: string | null;
};