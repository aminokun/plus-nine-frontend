import { Toaster } from './components/ui/toaster'
import AppRoutes from './routes'
import { ThemeProvider } from "@/components/theme-provider"
import NotificationComponent from './hub/NotificationComponent'


function App() {


  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <AppRoutes />
        <NotificationComponent />
        <Toaster />
      </ThemeProvider>
    </>
  )
}

export default App
