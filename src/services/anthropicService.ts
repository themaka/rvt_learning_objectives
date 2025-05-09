import Anthropic from '@anthropic-ai/sdk';
import type { ChatMessage } from '../types/chat';

// Check if API key is configured
const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY;
if (!apiKey || apiKey === 'your_api_key_here') {
  console.warn('Anthropic API key not configured. Please add your API key to .env file.');
}

// Initialize Anthropic client
const anthropic = new Anthropic({
  apiKey: apiKey || 'dummy_key_for_dev', // Fallback to prevent crashes in development
});

/**
 * Send a message to Anthropic Claude and get a response
 * @param messages Previous chat messages
 * @param userMessage New user message
 * @returns The assistant's response
 */
export const sendMessage = async (
  messages: ChatMessage[],
  userMessage: string
): Promise<string> => {
  try {
    // Check if API key is properly configured
    if (!apiKey || apiKey === 'your_api_key_here') {
      return "⚠️ API key not configured. Please add your Anthropic API key to the .env file. See README.md for instructions.";
    }
    
    // Convert our messages format to Anthropic's format
    const systemPrompt = "You are Claude, a helpful AI assistant. Keep responses concise and helpful.";
    
    // Format messages for Anthropic's API
    const formattedMessages = messages.map(msg => ({
      role: msg.role,
      content: msg.content
    }));
    
    // Add the new user message
    formattedMessages.push({
      role: 'user' as const,
      content: userMessage
    });
    
    // Call Anthropic API
    const response = await anthropic.messages.create({
      model: 'claude-3-haiku-20240307',
      system: systemPrompt,
      messages: formattedMessages,
      max_tokens: 1000,
    });
    
    // Extract text from response - ensure we're handling the content block correctly
    if (response.content[0].type === 'text') {
      return response.content[0].text;
    }
    
    return 'Sorry, I received a response I couldn\'t process.';
  } catch (error) {
    console.error('Error calling Anthropic API:', error);
    return 'Sorry, I encountered an error. Please try again.';
  }
};
