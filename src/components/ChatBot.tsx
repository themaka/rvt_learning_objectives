import { useState, useRef, useEffect } from 'react';
import type { FormEvent } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Button from './Button';
import type { ChatMessage } from '../types/chat';
import { sendMessage } from '../services/anthropicService';
import './ChatBot.css';

/**
 * ChatBot component that integrates with Anthropic's Claude
 */
const ChatBot = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: uuidv4(),
      role: 'assistant',
      content: `Hello! I'm Claude, an AI assistant. How can I help you today?

To use this chatbot, you'll need to:
1. Get an API key from https://console.anthropic.com/
2. Create a .env file based on .env.example
3. Add your API key to the .env file
4. Restart the development server`
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to the bottom of the chat when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!input.trim() || isLoading) return;
    
    // Add user message to chat
    const userMessage: ChatMessage = {
      id: uuidv4(),
      role: 'user',
      content: input.trim()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    
    try {
      // Get response from Anthropic
      const assistantResponse = await sendMessage(messages, userMessage.content);
      
      // Add assistant response to chat
      const assistantMessage: ChatMessage = {
        id: uuidv4(),
        role: 'assistant',
        content: assistantResponse
      };
      
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error in chat:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="chatbot">
      <div className="chatbot-header">
        <h2>Chat with Claude</h2>
      </div>
      
      <div className="chat-messages">
        {messages.map(message => (
          <div 
            key={message.id} 
            className={`chat-message ${message.role}`}
          >
            <div className="message-role">
              {message.role === 'assistant' ? 'Claude' : 'You'}
            </div>
            <div className="message-content">{message.content}</div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="chat-input-container">
          <input
            type="text"
            className="chat-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            disabled={isLoading}
          />
          <Button 
            type="submit" 
            disabled={isLoading || !input.trim()} 
            variant="primary"
          >
            Send
          </Button>
        </div>
        <div className="chat-status">
          {isLoading ? (
            <>
              Claude is thinking...
              <div className="loading-indicator">
                <div></div><div></div><div></div><div></div>
              </div>
            </>
          ) : ''}
        </div>
      </form>
    </div>
  );
};

export default ChatBot;
