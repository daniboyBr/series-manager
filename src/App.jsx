import { useState, useEffect } from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.css'
import AppMenu from './components/AppMenu'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'
import Generos from './components/generos/Generos'
import NovoGenero from './components/generos/NovoGenero'
import Home from './components/Home'
import EditarGenero from './components/generos/EditarGenero'
import NovaSerie from './components/series/NovaSerie'
import EditarSerie from './components/series/EditarSerie'
import Series from './components/series/Series'


function App() {
  const [data, setData] = useState({})

  useEffect(() => {
    axios.get('/api').then(resp =>{
      setData(resp.data)
    })
  }, [])

  return (
    <Router>
      <div className="App">
        <AppMenu />
        <Routes>
          <Route path='/' element={<Home />} ></Route>
          <Route exact path='/generos' element={<Generos />} ></Route>
          <Route exact path='/generos/novo' element={<NovoGenero />} ></Route>
          <Route exact path='/generos/:id' element={<EditarGenero />} ></Route>
          <Route exact path='/series' element={<Series />} ></Route>
          <Route exact path='/series/nova' element={<NovaSerie />} ></Route>
          <Route exact path='/series/:id' element={<EditarSerie />} ></Route>
        </Routes>
      </div>
    </Router>
  )
}

export default App
