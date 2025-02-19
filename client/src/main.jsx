import { StrictMode } from 'react'
import * as ReactDom  from 'react-dom/client'
// import './index.css'
import App from './App.jsx'
import {CssBaseline} from '@mui/material'
import {HelmetProvider} from 'react-helmet-async'

ReactDom.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
    <CssBaseline />
    <App />
    </HelmetProvider>
  </StrictMode>,
)
