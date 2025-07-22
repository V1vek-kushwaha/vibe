

import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import ForgotPassword from './pages/ForgotPassword'
import Home from './pages/Home'
import { useSelector } from 'react-redux'
import getCurrentUser from './hooks/getCurrentUser'

// PrivateRoute component
const PrivateRoute = ({ children }) => {
  const { userData } = useSelector(state => state.user)
  console.log(userData);

  return userData ? children : <Navigate to="/signin" replace />
}


function App() {
  getCurrentUser()

  return (
    <Routes>
      <Route path='/' element={
        <PrivateRoute>
          <Home />
        </PrivateRoute>
      } />
      <Route path='/signup' element={<Signup />} />
      <Route path='/signin' element={<Signin />} />
      <Route path='/forgotpassword' element={<ForgotPassword />} />

    </Routes>
  )
}

export default App



