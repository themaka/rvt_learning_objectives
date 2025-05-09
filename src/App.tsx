import { useState, useEffect } from 'react'
import './App.css'
import Header from './components/Header'
import Counter from './components/Counter'
import Button from './components/Button'
import ThemeToggle from './components/ThemeToggle'
import ContactForm from './components/ContactForm'
import ChatBot from './components/ChatBot'
import { useTheme } from './context/ThemeContext'

function App() {
  const [showExtraCounter, setShowExtraCounter] = useState(false)
  const [showContactForm, setShowContactForm] = useState(false)
  const [showChatBot, setShowChatBot] = useState(false)
  const { theme } = useTheme()

  useEffect(() => {
    document.body.setAttribute('data-theme', theme)
  }, [theme])

  return (
    <div className="app" data-theme={theme}>
      <Header title="React + Vite + TypeScript" />
      
      <div className="app-content">
        <ThemeToggle />
        
        <Counter initialValue={0} step={1} />
        
        <div className="card">
          <div className="button-group">
            <Button 
              onClick={() => setShowExtraCounter(!showExtraCounter)}
              variant="outline"
            >
              {showExtraCounter ? 'Hide' : 'Show'} Extra Counter
            </Button>
            
            <Button 
              onClick={() => setShowContactForm(!showContactForm)}
              variant="primary"
            >
              {showContactForm ? 'Hide' : 'Show'} Contact Form
            </Button>
            
            <Button 
              onClick={() => setShowChatBot(!showChatBot)}
              variant="secondary"
            >
              {showChatBot ? 'Hide' : 'Show'} Claude Chat
            </Button>
          </div>
        </div>
        
        {showExtraCounter && (
          <Counter initialValue={10} step={5} />
        )}
        
        {showContactForm && (
          <ContactForm />
        )}
        
        {showChatBot && (
          <ChatBot />
        )}
        
        <p className="read-the-docs">
          Click on the Vite and React logos to learn more
        </p>
      </div>
    </div>
  )
}

export default App
