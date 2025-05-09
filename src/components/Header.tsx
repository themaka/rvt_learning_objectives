import reactLogo from '../assets/react.svg';
import viteLogo from '/vite.svg';
import './Header.css';

type HeaderProps = {
  title: string;
};

/**
 * Application header with logos and title
 */
const Header = ({ title }: HeaderProps) => {
  return (
    <header className="header">
      <div className="logos">
        <a href="https://vite.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>{title}</h1>
    </header>
  );
};

export default Header;
