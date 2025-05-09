import { useState } from 'react';
import './App.css';
import Navigation from './components/Navigation';
import BloomsTaxonomy from './pages/BloomsTaxonomy';
import ExampleObjectives from './pages/ExampleObjectives';
import ChatTool from './pages/ChatTool';

type Page = 'taxonomy' | 'examples' | 'chatTool';

function App() {
  const [activePage, setActivePage] = useState<Page>('taxonomy');

  return (
    <div className="app">
      <header>
        <h1>Learning Objectives Builder</h1>
        <p>A tool for instructors to create high quality learning objectives based on Bloom's Taxonomy</p>
      </header>
      
      <Navigation activePage={activePage} setActivePage={setActivePage} />
      
      <main className="app-content">
        {activePage === 'taxonomy' && <BloomsTaxonomy />}
        {activePage === 'examples' && <ExampleObjectives />}
        {activePage === 'chatTool' && <ChatTool />}
      </main>
      
      <footer style={{ marginTop: '2rem', fontSize: '0.9rem', color: '#666' }}>
        <p>© {new Date().getFullYear()} Learning Objectives Builder - Educational Tool</p>
      </footer>
    </div>
  );
}

export default App;
