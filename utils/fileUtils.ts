export const fileToBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      // remove the `data:mime/type;base64,` part
      resolve(result.split(',')[1]);
    };
    reader.onerror = (error) => reject(error);
  });

export const getPlatformProperties = (platform: string): { aspectRatioText: string; resolutionText: string; width: number; height: number; } => {
    const propertiesMap: { [key: string]: { aspectRatioText: string; resolutionText: string; width: number; height: number; } } = {
      'Instagram Feed':              { aspectRatioText: '4:5 (vertical)', resolutionText: '1080x1350 pixels', width: 1080, height: 1350 },
      'Instagram Stories':           { aspectRatioText: '9:16 (vertical)', resolutionText: '1080x1920 pixels', width: 1080, height: 1920 },
      'Facebook Feed':               { aspectRatioText: '4:5 (vertical)', resolutionText: '1080x1350 pixels', width: 1080, height: 1350 },
      'TikTok':                      { aspectRatioText: '9:16 (vertical)', resolutionText: '1080x1920 pixels', width: 1080, height: 1920 },
      'LinkedIn Sponsored Content':  { aspectRatioText: '1:1 (square)', resolutionText: '1200x1200 pixels', width: 1200, height: 1200 },
    };
    // default to square for any unknown platform
    return propertiesMap[platform] || { aspectRatioText: '1:1 (square)', resolutionText: '1080x1080 pixels', width: 1080, height: 1080 };
};
