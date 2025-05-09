import React from 'react';

type Page = 'taxonomy' | 'examples' | 'chatTool';

interface NavigationProps {
  activePage: Page;
  setActivePage: (page: Page) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activePage, setActivePage }) => {
  return (
    <div className="nav-container">
      <span 
        className={`nav-link ${activePage === 'taxonomy' ? 'active' : ''}`}
        onClick={() => setActivePage('taxonomy')}
      >
        Bloom's Taxonomy
      </span>
      <span 
        className={`nav-link ${activePage === 'examples' ? 'active' : ''}`}
        onClick={() => setActivePage('examples')}
      >
        Example Objectives
      </span>
      <span 
        className={`nav-link ${activePage === 'chatTool' ? 'active' : ''}`}
        onClick={() => setActivePage('chatTool')}
      >
        Objective Builder
      </span>
    </div>
  );
};

export default Navigation;
