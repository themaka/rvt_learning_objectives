import React, { useState } from 'react';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
}

// System instructions for Anthropic API
const systemPrompt = `You are an educational learning objectives assistant. Your goal is to help instructors create high-quality learning objectives based on Bloom's Taxonomy.

When a user provides a course topic or subject, generate appropriate learning objectives organized by Bloom's Taxonomy levels (Remember, Understand, Apply, Analyze, Evaluate, Create).

For each objective:
1. Use appropriate action verbs for the cognitive level
2. Make objectives specific and measurable
3. Focus on student outcomes
4. Tailor the complexity to the specified course level (100-level is introductory, 200-level is intermediate, 300-400 level is advanced)

If the user doesn't specify a course level, provide a mix of objectives across different levels.`;

// Types for Anthropic API
interface AnthropicMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface AnthropicRequest {
  model: string;
  messages: AnthropicMessage[];
  max_tokens: number;
  system: string;
}

// interface AnthropicResponse {
//   content: string;
//   model: string;
//   type: string;
// }

const ChatTool: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Welcome to the Learning Objectives Generator! Describe your course or topic, and I'll help you create appropriate learning objectives based on Bloom's Taxonomy.",
      sender: 'bot'
    }
  ]);
  const [input, setInput] = useState('');
  const [messageId, setMessageId] = useState(2);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const callAnthropicAPI = async (userInput: string): Promise<string> => {
    // Get API key from environment variables
    const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY;
    
    if (!apiKey) {
      throw new Error("Missing Anthropic API key. Please add VITE_ANTHROPIC_API_KEY to your environment variables.");
    }

    // Convert local messages to Anthropic format
    const apiMessages: AnthropicMessage[] = messages
      .filter(msg => msg.id > 1) // Skip welcome message
      .map(msg => ({
        role: msg.sender === 'user' ? 'user' : 'assistant',
        content: msg.text,
      }));
    
    // Add the new user message
    apiMessages.push({
      role: 'user',
      content: userInput,
    });

    // Prepare the request
    const request: AnthropicRequest = {
      model: "claude-3-sonnet-20240229",
      messages: apiMessages,
      max_tokens: 1000,
      system: systemPrompt,
    };

    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`API error: ${errorData.error?.message || response.statusText}`);
      }

      const data = await response.json();
      return data.content[0].text;
    } catch (err) {
      if (err instanceof Error) {
        throw new Error(`Failed to call Anthropic API: ${err.message}`);
      }
      throw err;
    }
  };

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;
    
    // Reset any previous errors
    setError(null);
    
    // Add user message
    const userMessage: Message = {
      id: messageId,
      text: input,
      sender: 'user'
    };
    
    setMessages(prev => [...prev, userMessage]);
    setMessageId(prev => prev + 1);
    setIsLoading(true);
    
    try {
      // Call Anthropic API
      const responseText = await callAnthropicAPI(input);
      
      const botResponse: Message = {
        id: messageId + 1,
        text: responseText,
        sender: 'bot'
      };
      
      setMessages(prev => [...prev, botResponse]);
      setMessageId(prev => prev + 2);
    } catch (err) {
      console.error('Error calling Anthropic API:', err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      
      // Add error message
      const errorMessage: Message = {
        id: messageId + 1,
        text: `Sorry, I encountered an error: ${err instanceof Error ? err.message : 'Unknown error'}. Please try again.`,
        sender: 'bot'
      };
      
      setMessages(prev => [...prev, errorMessage]);
      setMessageId(prev => prev + 2);
    } finally {
      setIsLoading(false);
      setInput('');
    }
  };

  return (
    <div className="page-container">
      <h2>Learning Objectives Generator</h2>
      <p>
        Describe your course or topic below, and our tool will suggest appropriate learning objectives
        based on Bloom's Taxonomy. Include details about the subject, course level, and specific topics
        for more tailored suggestions.
      </p>
      
      <div className="chat-container">
        {messages.map(message => (
          <div 
            key={message.id} 
            className={`message ${message.sender === 'user' ? 'user-message' : 'bot-message'}`}
          >
            {message.text.split('\n').map((line, i) => (
              <React.Fragment key={i}>
                {line}
                <br />
              </React.Fragment>
            ))}
          </div>
        ))}
        
        {isLoading && (
          <div className="message bot-message loading-message">
            <div className="loading-indicator">
              Generating learning objectives...
            </div>
          </div>
        )}
        
        <div className="chat-input">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Describe your course or topic (e.g., 'Basic programming for freshmen')"
            disabled={isLoading}
          />
          <button 
            onClick={handleSendMessage} 
            disabled={isLoading || !input.trim()}
          >
            {isLoading ? 'Sending...' : 'Send'}
          </button>
        </div>
        
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatTool;
