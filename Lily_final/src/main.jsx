// src/main.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'  // Remove .jsx extension
import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
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

