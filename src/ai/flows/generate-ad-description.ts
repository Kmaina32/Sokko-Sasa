'use server';

/**
 * @fileOverview AI flow to generate an ad description from one or more images of the item being sold.
 *
 * - generateAdDescription - A function that generates an ad description.
 * - GenerateAdDescriptionInput - The input type for the generateAdDescription function.
 * - GenerateAdDescriptionOutput - The return type for the generateAdDescription function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateAdDescriptionInputSchema = z.object({
  photoDataUris: z
    .array(z.string())
    .describe(
      'One or more photos of the item being sold, as data URIs that must include a MIME type and use Base64 encoding. Expected format: data:<mimetype>;base64,<encoded_data>.'
    ),
});
export type GenerateAdDescriptionInput = z.infer<
  typeof GenerateAdDescriptionInputSchema
>;

const GenerateAdDescriptionOutputSchema = z.object({
  description: z
    .string()
    .describe('The generated ad description based on the images.'),
});
export type GenerateAdDescriptionOutput = z.infer<
  typeof GenerateAdDescriptionOutputSchema
>;

export async function generateAdDescription(
  input: GenerateAdDescriptionInput
): Promise<GenerateAdDescriptionOutput> {
  return generateAdDescriptionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateAdDescriptionPrompt',
  input: {schema: GenerateAdDescriptionInputSchema},
  output: {schema: GenerateAdDescriptionOutputSchema},
  prompt: `You are an expert marketing copywriter specializing in writing compelling ad descriptions for items being sold online. Use the images provided to craft a detailed and enticing description that highlights the key features, benefits, and unique selling points of the item. Maximize buyer interest with vivid descriptions.

Images:
{{#each photoDataUris}}
  {{media url=this}}
{{/each}}`,
});

const generateAdDescriptionFlow = ai.defineFlow(
  {
    name: 'generateAdDescriptionFlow',
    inputSchema: GenerateAdDescriptionInputSchema,
    outputSchema: GenerateAdDescriptionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
