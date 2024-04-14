import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard'

function App() {
  return (
    <Router>
      hello world
      <Routes>
        <Route exact path='/maktabati_client_side/Adminpage/*' element={<Dashboard />} />
        <Route exact path='/maktabati_client_side/Auth' element={<Auth />} />
      </Routes>
    </Router>
  )
}
const Auth = () => {
  return (
    <div>
      Login
    </div>
  )
}

export default App