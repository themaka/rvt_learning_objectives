import { ButtonHTMLAttributes, ReactNode } from 'react';
import './Button.css';

type ButtonProps = {
  variant?: 'primary' | 'secondary' | 'outline';
  children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

/**
 * A reusable button component with different style variants
 */
const Button = ({ 
  variant = 'primary', 
  children, 
  className = '', 
  ...props 
}: ButtonProps) => {
  return (
    <button 
      className={`button button-${variant} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
