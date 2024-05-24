import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Auth from './pages/Auth/Auth';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/maktabati_client_side/" element={<Navigate to="/maktabati_client_side/Adminpage/books" replace />} />
        <Route path="/maktabati_client_side/Adminpage/*" element={<Dashboard />} />
        <Route path="/maktabati_client_side/Auth" element={<Auth />} />
      </Routes>
    </Router>
  );
}

export default App;
