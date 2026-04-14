import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";
import Dashboard from "./pages/Dashboard";

const Placeholder = ({ title }) => {
  return (
    <div className="flex items-center justify-center h-64 rounded-2xl border-2 border-dashed border-gray-200">
      <p className="text-gray-400 text-sm font-medium">{title} - à venir</p>
    </div>
  )
}

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          {/* <Route path="/" element={<Placeholder title="Mes statistiques"/>} /> */}
          <Route path="/" element={<Dashboard />}/>
          <Route path="/envois" element={<Placeholder title="Mes envois"/>} />
          <Route path="/mes-demandes" element={<Placeholder title="Mes demandes de modification"/>} />
          <Route path="/demandes" element={<Placeholder title="Demandes de modification"/>} />
          <Route path="/creer-client" element={<Placeholder title="Creer un client"/>} />
          <Route path="/creer-utilisateur" element={<Placeholder title="Creer un utilisateur"/>} />
          <Route path="/utilisateurs" element={<Placeholder title="Liste des utilisateurs" />}/>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes> 
    </BrowserRouter>
  )
}

export default App;
