import { BrowserRouter, Routes, Route } from "react-router-dom"
import SignIn from "./pages/SignIn"
import About from "./pages/About"
import SignUp from "./pages/SignUp"
import Profile from "./pages/Profile"
import Home from "./pages/Home"

import HeaderBar from "./components/Header"
import PrivateRoute from "./components/PrivateRoute"

export default function App() {
  return (
    <BrowserRouter>
      <HeaderBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/about" element={<About />} />
       
        <Route element={<PrivateRoute />}>

        <Route path="/profile" element={<Profile />} />
        </Route>
        
      </Routes>
    </BrowserRouter>
  );
}
