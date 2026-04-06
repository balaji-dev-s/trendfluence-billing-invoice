import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';   // CSS
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // JS
import 'bootstrap-icons/font/bootstrap-icons.css'; // Icons
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
