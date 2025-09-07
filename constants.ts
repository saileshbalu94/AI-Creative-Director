import { FormData } from './types';

export const PLATFORM_OPTIONS = [
  'Instagram Feed',
  'Instagram Stories',
  'Facebook Feed',
  'TikTok',
  'LinkedIn Sponsored Content',
];

export const CAMPAIGN_GOALS = [
  'Brand Awareness',
  'Drive Sales',
  'Increase Engagement',
  'Lead Generation',
  'App Downloads',
];

export const LIGHTING_STYLES = ['Natural', 'Studio', 'Dramatic', 'Soft', 'Bright'];
export const BACKGROUND_THEMES = ['Minimalist', 'Lifestyle', 'Urban', 'Nature', 'Abstract'];
export const TALENT_INTERACTIONS = ['Holding product', 'Using product', 'Looking at product', 'Ignoring product', 'Interacting with background'];
export const CAMERA_ANGLES = ['Eye-level', 'Overhead', 'Low angle', 'High angle', 'Close-up'];

export const FONT_OPTIONS = [
  'Montserrat',
  'Lato',
  'Roboto',
  'Oswald',
  'Source Sans Pro',
  'Poppins',
  'Open Sans',
];

export const INITIAL_FORM_DATA: FormData = {
  productPhoto: null,
  talentPhoto: null,
  inspirationPhoto: null,
  adText: '',
  brandLogo: null,
  ctaText: '',
  platform: PLATFORM_OPTIONS[0],
  industry: '',
  targetAudience: '',
  campaignGoal: CAMPAIGN_GOALS[0],
  campaignContext: '',
  brandFont: FONT_OPTIONS[0],
  primaryBrandColor: '#3B82F6',
  secondaryBrandColor: '#F97316',
};