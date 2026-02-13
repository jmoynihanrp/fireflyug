/**
 * OpenAI Service Module
 * Handles all OpenAI API interactions for content generation
 */

import { getConfigValue } from '../../scripts/configs.js';

// OpenAI API configuration
const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';
const OPENAI_API_KEY =  OPENAI_API_KEY = getConfigValue('AEM_UG_OAI_KEY');

/**
 * Make an API call to OpenAI to generate content
 * @param {string} prompt - The user's content prompt
 * @param {string} context - The context/system instructions for the AI
 * @returns {Promise<string>} - Generated content from OpenAI
 */
export async function generateContentWithOpenAI(prompt, context = 'You are a helpful assistant that generates web page content based on user prompts. Generate engaging, well-structured content suitable for web pages.') {
  const response = await fetch(OPENAI_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'gpt-5',
      messages: [{
        role: 'system',
        content: context,
      }, {
        role: 'user',
        content: prompt,
      }],
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(`OpenAI API error: ${response.status} - ${errorData.error?.message || 'Unknown error'}`);
  }

  const data = await response.json();
  return data.choices[0]?.message?.content || 'No content generated';
}

/**
 * Configuration object for OpenAI settings
 */
export const openAIConfig = {
  apiUrl: OPENAI_API_URL,
  model: 'gpt-5',
  maxTokens: 1000,
  temperature: 0.7,
  defaultSystemMessage: 'You are a helpful programmer',
};
/**
 * Mock function for generateContentWithOpenAI that returns lorem ipsum text
 * Useful for testing and development when OpenAI API is not available
 * @param {string} prompt - The user's content prompt (ignored in mock)
 * @param {string} context - The context/system instructions (ignored in mock)
 * @returns {Promise<string>} - Mock generated content with 3 paragraphs of lorem ipsum
 */
export async function generateContentWithOpenAIMock(prompt, context) {
  // Simulate API delay
  await new Promise((resolve) => {
    setTimeout(resolve, 3000);
  });

  const loremParagraphs = [
    prompt,
    context,
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.',
    'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.',
  ];

  return loremParagraphs.join('\n\n');
}