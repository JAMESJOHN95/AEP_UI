import {BrowserRouter as  Router, Routes, Route } from 'react-router-dom'
import './App.css'
import DashBoard from './Componants/DashBoard'
import Header from './Componants/Header'
import CreatePersona from './Componants/CreatePersona'

function App() {

  return (
    <>
      
      <Router>
      <Header />
        <Routes>
          <Route path="/" element={<DashBoard />} />
          <Route path="/Create-Persona" element={<CreatePersona />} />
        </Routes>
      </Router>

    </>
  )
}

export default App
