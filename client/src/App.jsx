import React from 'react'
import {
  Route,
  Routes,
} from 'react-router-dom'

import ForgotPasswordPage from './pages/ForgotPassword';
import RegisterPage from './pages/RegisterPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import Login from './pages/Login';
import Home from './pages/Home';

const App = () => {
  return (
    <div>
     <Routes>
      <Route path='/' element=
      {<RegisterPage />} />

      <Route path='/login' element={<Login />} /> 

      <Route path='/forgot-password' element=
      {<ForgotPasswordPage />} />

      <Route path='/reset-password/:token' element=
      {<ResetPasswordPage />} />

      <Route path='/home' element=
      {<Home />} />

      
     </Routes>
    </div>
  )
}

export default App
