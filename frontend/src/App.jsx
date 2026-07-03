// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import heroImg from './assets/hero.png'
// import './App.css'
// import {Route , Routes} from 'react-router-dom'
// import Sidebar from './components/Sidebar.jsx'
// import HomePage from './pages/HomePage.jsx'
// import LoginPage from './pages/LoginPage.jsx'
// import SignUpPage from './pages/SignUpPage.jsx'
// import LikesPage from './pages/LikesPage.jsx'
// import ExplorePage from './pages/ExplorePage.jsx'
// import './index.css'
// import {useAuthContext} from './context/AuthContext.jsx'
// function App() {
//   const [count, setCount] = useState(0)
//   const {authUser}=useAuthContext();

//   return (
//     <>
//       <div className="flex  text-white">
//       <Sidebar/>
//       <div className='max-w-5xl my-5 text-white mx-auto transition-all duration-300 flex-1' >
//         <Routes>
//         <Route path="/" element={<HomePage />} />
//         <Route path="/login" element={<LoginPage />} />
//         <Route path="/signup" element={<SignUpPage />} />
//         <Route path="/likes" element={<LikesPage />} />
//         <Route path="/explore" element={<ExplorePage />} />
//       </Routes>
//       </div>
//       </div>
//     </>
//   )
// }

// export default App



import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import HomePage from "./pages/HomePage";
import ExplorePage from "./pages/ExplorePage";
import LikesPage from "./pages/LikesPage";

import Sidebar from "./components/Sidebar";
import { useAuthContext } from "./context/AuthContext";

function App() {
	const { authUser, loading } = useAuthContext();
	console.log("Authenticated user:", authUser);

	if (loading) return null;

	return (
		<div className='flex'>
			<Sidebar />
			<div className='max-w-5xl my-5 text-white mx-auto transition-all duration-300 flex-1'>
				<Routes>
					<Route path='/' element={<HomePage />} />
					<Route path='/login' element={!authUser ? <LoginPage /> : <Navigate to={"/"} />} />
					<Route path='/signup' element={!authUser ? <SignUpPage /> : <Navigate to={"/"} />} />
					<Route path='/explore' element={authUser ? <ExplorePage /> : <Navigate to={"/login"} />} />
					<Route path='/likes' element={authUser ? <LikesPage /> : <Navigate to={"/login"} />} />
				</Routes>
				<Toaster />
			</div>
		</div>
	);
}

export default App;
