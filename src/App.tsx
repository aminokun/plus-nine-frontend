import { Toaster } from './components/ui/toaster'
import AppRoutes from './routes'
import { ThemeProvider } from "@/components/theme-provider"


function App() {


  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <AppRoutes />
        <Toaster />
      </ThemeProvider>
    </>
  )
}

export default App
