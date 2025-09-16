"use server";

import { generateAd, GenerateAdInput } from "@/ai/flows/generate-ad";

export async function generateAdAction(input: GenerateAdInput) {
  try {
    const { description } = await generateAd(input);
    return { success: true, description };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Failed to generate description." };
  }
}
