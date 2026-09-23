import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import 'src/index.css'
import RouterApp from 'src/App.tsx'
import { IdleTimerProvider } from 'src/providers/IdleTimerProvider.tsx'
import { ThemeProvider } from 'src/providers/ThemeProvider.tsx'
import { Toaster } from 'src/core/components/ui/sonner.tsx'

createRoot(document.getElementById('root')!).render(
  <ThemeProvider>
    <BrowserRouter>
      <IdleTimerProvider>
        <RouterApp />
      </IdleTimerProvider>
    </BrowserRouter>
    <Toaster />
  </ThemeProvider>
)
