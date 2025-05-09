# RVT Learning Objectives

This project is a modern React application built with TypeScript and Vite. It demonstrates the use of various React patterns and best practices.

## Features

- 🚀 **Vite** - Fast development server and optimized build
- 💪 **TypeScript** - Type-safe code
- 🧩 **Component Organization** - Clean component structure
- 🌙 **Theme System** - Dynamic light/dark theme
- 🪝 **Custom Hooks** - Demonstrates reusable logic
- 🌐 **Context API** - For global state management
- 📝 **Form Handling** - With validation and error handling
- 🤖 **Chatbot** - Integration with Anthropic's Claude API

## Project Structure

```txt
src/
├── assets/          # Static assets
├── components/      # Reusable UI components
├── context/         # React Context API definitions
├── hooks/           # Custom React hooks
├── services/        # API services and external integrations
├── types/           # TypeScript type definitions
├── App.tsx          # Main application component
└── main.tsx         # Application entry point
```

## Key Components

- **Header**: Application title and logos
- **Counter**: Interactive counter with increment/decrement
- **ThemeToggle**: Switch between light and dark themes
- **ContactForm**: Form demonstration using custom hook
- **Button**: Reusable button with multiple variants
- **ChatBot**: Integrated AI chatbot using Anthropic's Claude API

## Setup

1. Clone the repository
2. Install dependencies with `npm install`
3. Copy `.env.example` to `.env` and add your Anthropic API key:
   ```bash
   cp .env.example .env
   ```
4. Edit `.env` and replace `your_api_key_here` with your actual API key from [Anthropic Console](https://console.anthropic.com/)
5. Start the development server with `npm run dev`

## Usage

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Technologies

- React 19
- TypeScript
- Vite 6
- Modern CSS with variables

## Learn More

- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/)

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules.
