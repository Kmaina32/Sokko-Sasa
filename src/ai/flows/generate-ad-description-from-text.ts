'use server';
/**
 * @fileOverview Generates an ad description from user-provided keywords or phrases.
 *
 * - generateAdDescriptionFromText - A function that generates the ad description.
 * - GenerateAdDescriptionFromTextInput - The input type for the generateAdDescriptionFromText function.
 * - GenerateAdDescriptionFromTextOutput - The return type for the generateAdDescriptionFromText function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateAdDescriptionFromTextInputSchema = z.object({
  keywords: z
    .string()
    .describe('Keywords or phrases describing the item for sale.'),
});
export type GenerateAdDescriptionFromTextInput = z.infer<
  typeof GenerateAdDescriptionFromTextInputSchema
>;

const GenerateAdDescriptionFromTextOutputSchema = z.object({
  description: z
    .string()
    .describe('The generated ad description for the item.'),
});
export type GenerateAdDescriptionFromTextOutput = z.infer<
  typeof GenerateAdDescriptionFromTextOutputSchema
>;

export async function generateAdDescriptionFromText(
  input: GenerateAdDescriptionFromTextInput
): Promise<GenerateAdDescriptionFromTextOutput> {
  return generateAdDescriptionFromTextFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateAdDescriptionFromTextPrompt',
  input: {schema: GenerateAdDescriptionFromTextInputSchema},
  output: {schema: GenerateAdDescriptionFromTextOutputSchema},
  prompt: `You are an expert at writing compelling ad descriptions.

  Based on the following keywords or phrases, generate an engaging and informative ad description for an item for sale:

  Keywords/Phrases: {{{keywords}}}
  `,
});

const generateAdDescriptionFromTextFlow = ai.defineFlow(
  {
    name: 'generateAdDescriptionFromTextFlow',
    inputSchema: GenerateAdDescriptionFromTextInputSchema,
    outputSchema: GenerateAdDescriptionFromTextOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
