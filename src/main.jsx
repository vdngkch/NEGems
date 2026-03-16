import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import App from './App'
import {GemProvider} from './Components/GemContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GemProvider>

    <App/>
    </GemProvider>
  </StrictMode>,
)
