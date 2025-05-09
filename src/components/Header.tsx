import './Header.css';

type HeaderProps = {
  title: string;
};

/**
 * Application header with title
 */
const Header = ({ title }: HeaderProps) => {
  return (
    <header className="header">
      <h1>{title}</h1>
    </header>
  );
};

export default Header;
