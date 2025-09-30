// src/main.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Simple error boundary
const Root = () => (
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

// Safe rendering with error handling
const rootElement = document.getElementById('root');
if (rootElement) {
  try {
    const root = ReactDOM.createRoot(rootElement);
    root.render(<Root />);
  } catch (error) {
    console.error('React rendering error:', error);
    rootElement.innerHTML = '<div style="padding: 20px; text-align: center;">Error loading app</div>';
  }
} else {
  console.error('Root element not found');
}
