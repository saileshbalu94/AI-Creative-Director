
import { GoogleGenAI, Type, Modality } from '@google/genai';
import { FormData, CreativeConcept } from '../types';
import { addLog } from './loggingService';
import { fileToBase64, getPlatformProperties } from '../utils/fileUtils';
import { bestPractices } from './promptBestPractices';

// This is a mock API key. In a real application, use environment variables.
const API_KEY = process.env.API_KEY;
if (!API_KEY) {
  console.warn("API_KEY environment variable not set. Using a placeholder. App functionality will be limited.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY || "YOUR_API_KEY_HERE" });

const conceptGenerationSchema = {
  type: Type.ARRAY,
  items: {
    type: Type.OBJECT,
    properties: {
      title: { type: Type.STRING, description: 'A short, catchy title for this creative concept (e.g., "Lifestyle Focus").' },
      contextIntent: { type: Type.STRING, description: 'A 2-3 sentence description of the creative approach and intent.' },
      lightingStyle: { type: Type.STRING, description: 'The lighting style (e.g., "Soft natural lighting").' },
      backgroundTheme: { type: Type.STRING, description: 'The background theme (e.g., "Minimalist white studio").' },
      talentInteraction: { type: Type.STRING, description: 'How the talent (if present) interacts with the product (e.g., "Model holding product naturally").' },
      cameraAngle: { type: Type.STRING, description: 'The camera angle for the shot (e.g., "Eye-level product focus").' },
    },
    required: ['title', 'contextIntent', 'lightingStyle', 'backgroundTheme', 'talentInteraction', 'cameraAngle'],
  },
};

export const generateConcepts = async (formData: FormData): Promise<CreativeConcept[]> => {
  const prompt = `
    Generate 3 distinct creative concepts for a professional advertisement based on the following details.
    Return the response as a JSON array that matches the provided schema.

    - Product Industry: ${formData.industry}
    - Target Audience: ${formData.targetAudience}
    - Campaign Goal: ${formData.campaignGoal}
    - Ad Platform: ${formData.platform}
    - Primary Ad Text: "${formData.adText}"
    - CTA Text: "${formData.ctaText}"
    - Brand Font: ${formData.brandFont}
    - Primary Brand Color: ${formData.primaryBrandColor}
    - Secondary Brand Color: ${formData.secondaryBrandColor}
    - Additional Context: ${formData.campaignContext}
    - Talent is ${formData.talentPhoto ? 'present' : 'not present'}.
    - Brand logo is ${formData.brandLogo ? 'present' : 'not present'}.

    Focus on creating diverse concepts covering different angles like lifestyle, product-focused, and emotional connection. Ensure that the concepts are concise enough for the user
  `;
  
  addLog('generateConcepts:request', { prompt });
  
  if (!API_KEY) {
    addLog('generateConcepts:mock', { reason: "API_KEY not set" });
    // Return mock data if API key is not available
    await new Promise(res => setTimeout(res, 1500));
    return [
      { id: 1, title: 'Lifestyle Focus', contextIntent: 'Show the product in a realistic, everyday setting, used by the target audience.', lightingStyle: 'Soft natural lighting', backgroundTheme: 'Urban lifestyle setting', talentInteraction: 'Model holding product naturally', cameraAngle: 'Eye-level product focus' },
      { id: 2, title: 'Product Hero', contextIntent: 'A clean, studio shot that highlights the product\'s features and design.', lightingStyle: 'Dramatic studio lighting', backgroundTheme: 'Minimalist white studio', talentInteraction: 'N/A', cameraAngle: 'Overhead flat lay' },
      { id: 3, title: 'Emotional Connection', contextIntent: 'Create a scene that evokes a strong positive emotion related to the product\'s benefit.', lightingStyle: 'Warm, golden hour light', backgroundTheme: 'Cozy home interior', talentInteraction: 'Model smiling while using product', cameraAngle: 'Close-up on user reaction' },
    ];
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: conceptGenerationSchema,
      },
    });

    const jsonResponse = JSON.parse(response.text);
    addLog('generateConcepts:success', { response: jsonResponse });
    return (jsonResponse as Omit<CreativeConcept, 'id'>[]).map((concept, index) => ({
      ...concept,
      id: index + 1,
    }));
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    addLog('generateConcepts:error', { error: errorMessage, stack: error instanceof Error ? error.stack : undefined });
    throw error;
  }
};

export const generateFinalCreative = async (formData: FormData, selectedConcept: CreativeConcept): Promise<string> => {
    const { aspectRatioText, resolutionText } = getPlatformProperties(formData.platform);
    
    const promptObject = {
      task: "Create a professional, photorealistic advertisement image based on the provided assets and the following JSON specification.",
      output_specifications: {
        platform: formData.platform,
        aspect_ratio: aspectRatioText,
        resolution: resolutionText,
      },
      asset_instructions: {
        product: "The first image provided is the main product. It must be the hero element—clearly visible, appealing, and authentic.",
        ...(formData.talentPhoto && { talent: "The second image is the talent/model. Incorporate them naturally into the scene." }),
        ...(formData.brandLogo && { logo: "The third image is the brand logo. Place it tastefully, for example in a corner, ensuring it is legible but not distracting." }),
        ...(formData.inspirationPhoto && { inspiration: "The final image is an inspiration photo. Draw from its mood, style, and composition." }),
      },
      creative_direction: {
        concept_title: selectedConcept.title,
        concept_intent: selectedConcept.contextIntent,
        lighting: selectedConcept.lightingStyle,
        background: selectedConcept.backgroundTheme,
        camera_angle: selectedConcept.cameraAngle,
        ...(formData.talentPhoto && {
          talent_interaction: selectedConcept.talentInteraction,
          talent_expression_goal: `Their expression should align with the campaign goal: '${formData.campaignGoal}'.`,
        }),
      },
      branding_and_text: {
        primary_ad_text: `Integrate the primary ad text: "${formData.adText}"`,
        cta_text: `Include a call-to-action (e.g., a button) with the text: "${formData.ctaText}"`,
        font_suggestion: `All text should use or be inspired by the font: ${formData.brandFont}`,
        primary_brand_color: `The primary color for branding elements (like text or buttons) should be ${formData.primaryBrandColor}`,
        secondary_brand_color: `The secondary color can be ${formData.secondaryBrandColor}`,
        readability_note: "Crucially, all text must be highly readable and contrast well with the background.",
      },
      campaign_info: {
        industry: formData.industry,
        target_audience: formData.targetAudience,
        campaign_goal: `The overall goal is to ${formData.campaignGoal}. The ad should be a compelling, conversion-focused creative optimized for ${formData.platform}.`,
      },
      ...bestPractices,
    };

    const textPrompt = `Please generate an image based on the following JSON instructions:\n\n${JSON.stringify(promptObject, null, 2)}`;


  const parts: any[] = [{ text: textPrompt }];

  if (formData.productPhoto) {
    const base64 = await fileToBase64(formData.productPhoto);
    parts.push({ inlineData: { mimeType: formData.productPhoto.type, data: base64 } });
  }
  if (formData.talentPhoto) {
    const base64 = await fileToBase64(formData.talentPhoto);
    parts.push({ inlineData: { mimeType: formData.talentPhoto.type, data: base64 } });
  }
  if (formData.brandLogo) {
    const base64 = await fileToBase64(formData.brandLogo);
    parts.push({ inlineData: { mimeType: formData.brandLogo.type, data: base64 } });
  }
  if (formData.inspirationPhoto) {
    const base64 = await fileToBase64(formData.inspirationPhoto);
    parts.push({ inlineData: { mimeType: formData.inspirationPhoto.type, data: base64 } });
  }

  addLog('generateFinalCreative:request', { prompt: promptObject, imageCount: parts.length - 1 });
  
  if (!API_KEY) {
     addLog('generateFinalCreative:mock', { reason: "API_KEY not set" });
     await new Promise(res => setTimeout(res, 3000));
     const placeholderUrl = `https://picsum.photos/seed/${Math.random()}/1080/1080`;
     // Fetch image and convert to base64 to simulate API response
     const response = await fetch(placeholderUrl);
     const blob = await response.blob();
     return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve((reader.result as string).split(',')[1]);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
     });
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image-preview',
      contents: {
        parts: parts,
      },
      config: {
          responseModalities: [Modality.IMAGE, Modality.TEXT],
      },
    });

    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        addLog('generateFinalCreative:success', { image: { mimeType: part.inlineData.mimeType, data: '<base64_string>' } });
        return part.inlineData.data;
      }
    }

    const errorText = response.candidates[0]?.content?.parts?.[0]?.text || "No image was generated by the model.";
    addLog('generateFinalCreative:error', { error: 'No image part in response', responseText: errorText, fullResponse: response });
    throw new Error(`The model did not generate an image. Response: ${errorText}`);
    
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    addLog('generateFinalCreative:error', { error: errorMessage, stack: error instanceof Error ? error.stack : undefined });
    throw error;
  }
};