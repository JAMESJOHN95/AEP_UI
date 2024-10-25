import {BrowserRouter as  Router, Routes, Route } from 'react-router-dom'
import './App.css'
import DashBoard from './Componants/DashBoard'
import Header from './Componants/Header'
import CreatePersona from './Componants/CreatePersona'
import DataMonitoring from './Componants/DataMonitoring'
import { TokenProvider } from './Componants/TokenContext'
import Content from './Componants/Content'
import Campaign from './Componants/Campaign'

function App() {

  return (
    <>
      
      <TokenProvider >
        <Router>
        <Header />
          <Routes>
            <Route path="/" element={<DashBoard />} />
            <Route path="/Create-Persona" element={<CreatePersona />} />
            <Route path='/Data-Monitoring' element={<DataMonitoring/>}/>
            <Route path='/content' element={<Content/>}/>
            <Route path='/campaign' element={<Campaign/>}/>
          </Routes>
        </Router>
      </TokenProvider>

    </>
  )
}

export default App
