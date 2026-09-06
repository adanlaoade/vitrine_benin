import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AppHeader } from '@/components/layout/AppHeader'
import { BottomNav } from '@/components/layout/BottomNav'
import { DemandesPage } from '@/features/requests/pages/DemandesPage'
import { MonEspacePage } from '@/features/workspace/pages/MonEspacePage'
import { AuthProvider } from '@/features/auth/AuthProvider'
import { ProfessionalProfilePage } from '@/features/professionals/pages/ProfessionalProfilePage'
import { HomePage } from '@/features/search/pages/HomePage'
import { TrouverPage } from '@/features/search/pages/TrouverPage'

export function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppHeader />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/trouver" element={<TrouverPage />} />
          <Route path="/demandes" element={<DemandesPage />} />
          <Route path="/mon-espace" element={<MonEspacePage />} />
          <Route path="/professionnel/:id" element={<ProfessionalProfilePage />} />
        </Routes>
        <BottomNav />
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
