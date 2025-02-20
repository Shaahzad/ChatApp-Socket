import React, { lazy } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ProtectedRoutes from './components/Auth/ProtectedRoutes'


const Login = lazy(() => import('./pages/Login'))
const Home = lazy(() => import('./pages/Home'))
const Chat = lazy(() => import('./pages/Chat'))
const Groups = lazy(() => import('./pages/Groups'))
const Notfound = lazy(() => import('./pages/Notfound'))
let user = true
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<ProtectedRoutes user={user}/>}> 
        <Route path="/" element={<Home/>}/>
        <Route path="/chat/:chatId" element={<Chat/>} />
        <Route path="/groups" element={<Groups/>} />
        </Route>
        <Route path="/login" element={<ProtectedRoutes>
          <Login/>
        </ProtectedRoutes>} 
        />
        <Route path="*" element={<Notfound/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App