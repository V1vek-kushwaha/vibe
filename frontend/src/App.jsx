

import { Route, Routes } from 'react-router-dom'
import './App.css'
import Signup from './pages/Signup'
import Signin from './pages/Signin'

function App() {


  return (
    <Routes>
      <Route path='/' element={<Signup />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/signin' element={<Signin />} />

    </Routes>
  )
}

export default App
