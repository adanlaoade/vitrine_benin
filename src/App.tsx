import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AppHeader } from '@/components/layout/AppHeader'
import { BottomNav } from '@/components/layout/BottomNav'
import {
  DemandesPage,
  MonEspacePage,
  ProfessionalProfilePage,
  TrouverPage,
} from '@/app/pages/PlaceholderPages'
import { HomePage } from '@/features/search/pages/HomePage'

export function App() {
  return (
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
  )
}

export default App
