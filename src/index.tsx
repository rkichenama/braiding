import { createRoot } from 'react-dom/client';
import App from './App';

const container = document.getElementById('root');
if (!container) {
  const main = document.createElement('main');
  main.id = 'root';
  main.style.display = 'contents';
  document.body.appendChild(main);
  const root = createRoot(main);
  root.render(<App />);
} else {
  const root = createRoot(container);
  root.render(<App />);
}
