import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Dashboard from './pages/Dashboard'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/maktabati_client_side/Adminpage/*' element={<Dashboard />} />
        <Route exact path='/maktabati_client_side/Auth' element={<Auth />} />
      </Routes>
    </BrowserRouter>
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