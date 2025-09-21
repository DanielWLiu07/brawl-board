import 'normalize.css'; 
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import WhiteBoardCreationPage from './pages/WhiteBoardCreationPage.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <WhiteBoardCreationPage />
  </StrictMode>,
)
