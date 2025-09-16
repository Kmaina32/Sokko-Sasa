"use server";

import {
  generateAdDescriptionFromText,
  GenerateAdDescriptionFromTextInput,
} from "@/ai/flows/generate-ad-description-from-text";
import {
  generateAdDescription,
  GenerateAdDescriptionInput,
} from "@/ai/flows/generate-ad-description";

export async function generateDescriptionFromTextAction(
  input: GenerateAdDescriptionFromTextInput
) {
  try {
    const { description } = await generateAdDescriptionFromText(input);
    return { success: true, description };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Failed to generate description." };
  }
}

export async function generateDescriptionFromImageAction(
  input: GenerateAdDescriptionInput
) {
  try {
    const { description } = await generateAdDescription(input);
    return { success: true, description };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Failed to generate description." };
  }
}
