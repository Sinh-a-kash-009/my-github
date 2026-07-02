import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import {Route , Routes} from 'react-router-dom'
import Sidebar from './components/Sidebar.jsx'
import HomePage from './pages/HomePage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import SignUpPage from './pages/SignUpPage.jsx'
import LikesPage from './pages/LikesPage.jsx'
import ExplorePage from './pages/ExplorePage.jsx'
import './index.css'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="flex  text-white">
      <Sidebar/>
      <div className='max-w-5xl my-5 text-white mx-auto transition-all duration-300 flex-1' >
        <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/likes" element={<LikesPage />} />
        <Route path="/explore" element={<ExplorePage />} />
      </Routes>
      </div>
      </div>
    </>
  )
}

export default App
