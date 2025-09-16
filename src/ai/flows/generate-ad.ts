'use server';

/**
 * @fileOverview AI flow to generate an ad description from an optional image and/or text keywords.
 *
 * - generateAd - A function that generates an ad description.
 * - GenerateAdInput - The input type for the generateAd function.
 * - GenerateAdOutput - The return type for the generateAd function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateAdInputSchema = z.object({
  photoDataUri: z
    .string()
    .optional()
    .describe(
      'An optional photo of the item being sold, as a data URI that must include a MIME type and use Base64 encoding. Expected format: data:<mimetype>;base64,<encoded_data>.'
    ),
  keywords: z
    .string()
    .optional()
    .describe(
      'Optional user-provided keywords or phrases describing the item for sale.'
    ),
});
export type GenerateAdInput = z.infer<typeof GenerateAdInputSchema>;

const GenerateAdOutputSchema = z.object({
  description: z
    .string()
    .describe('The generated ad description based on the provided inputs.'),
});
export type GenerateAdOutput = z.infer<typeof GenerateAdOutputSchema>;

export async function generateAd(
  input: GenerateAdInput
): Promise<GenerateAdOutput> {
  return generateAdFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateAdPrompt',
  input: {schema: GenerateAdInputSchema},
  output: {schema: GenerateAdOutputSchema},
  prompt: `You are an expert marketing copywriter specializing in writing compelling ad descriptions for items being sold online. 
  
  Your task is to craft a detailed and enticing description that highlights the key features, benefits, and unique selling points of the item. Maximize buyer interest with vivid descriptions.

  Use the following information to generate the ad. The image is the primary source of truth if provided. Use the keywords to add detail or focus on specific aspects.

  {{#if photoDataUri}}
  Image:
  {{media url=photoDataUri}}
  {{/if}}

  {{#if keywords}}
  Keywords/Phrases: {{{keywords}}}
  {{/if}}
  `,
});

const generateAdFlow = ai.defineFlow(
  {
    name: 'generateAdFlow',
    inputSchema: GenerateAdInputSchema,
    outputSchema: GenerateAdOutputSchema,
  },
  async input => {
    if (!input.photoDataUri && !input.keywords) {
      throw new Error('Either an image or keywords must be provided.');
    }
    const {output} = await prompt(input);
    return output!;
  }
);
