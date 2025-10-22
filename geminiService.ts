

import { GoogleGenAI } from "@google/genai";

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateCaptionFromImage = async (base64Image: string, mimeType: string): Promise<string> => {
    try {
        const imagePart = {
            inlineData: {
                mimeType: mimeType,
                data: base64Image,
            },
        };

        const textPart = {
            text: "Write a short, engaging, and friendly Instagram caption for this image. Include 2-3 relevant hashtags."
        };

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: { parts: [imagePart, textPart] },
        });
        
        // FIX: Safely access response.text and provide a fallback empty string.
        const caption = (response.text ?? '').trim();
        if (!caption) {
            // Handle cases where the API returns an empty response, possibly due to content policy
            throw new Error("The AI was unable to generate a caption for this image. It may violate content policies. Please try a different image.");
        }
        return caption;

    } catch (error) {
        console.error("Detailed error generating caption:", error);

        if (error instanceof Error) {
            // Check for specific error messages from the API client
            if (error.message.includes('safety')) {
                 throw new Error("Caption could not be generated due to safety settings. Please try a different image.");
            }
             if (error.message.includes('400')) { // Example for a bad request
                throw new Error("There was an issue with the image format. Please try a different image.");
            }
        }
        
        // Fallback for network errors or other unexpected issues
        throw new Error("Failed to generate caption. Please check your network connection and try again.");
    }
};