import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

((d) => {
  const main = d.createElement('main');
  main.style.display = 'contents';
  d.body.appendChild(main);
  const root = createRoot(main);
  root.render(<App />);
})(document);
