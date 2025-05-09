import Button from './Button';
import { useTheme } from '../context/ThemeContext';
import './ThemeToggle.css';

/**
 * A theme toggle button that uses ThemeContext
 */
const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="theme-toggle">
      <Button 
        onClick={toggleTheme}
        variant="secondary"
        className="theme-toggle-button"
      >
        Switch to {theme === 'light' ? 'Dark' : 'Light'} Theme
      </Button>
      <p className="theme-status">Current theme: {theme}</p>
    </div>
  );
};

export default ThemeToggle;
