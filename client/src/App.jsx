import { BrowserRouter, Routes, Route } from "react-router-dom"
import SignIn from "./pages/SignIn"
import About from "./pages/About"
import SignUp from "./pages/SignUp"
import Profile from "./pages/Profile"
import Home from "./pages/Home"
import Header from "./components/Header"

export default function App() {
  return (
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/about" element={<About />} /> {/* Use lowercase "about" */}
        <Route path="/profile" element={<Profile />} /> {/* Use lowercase "profile" */}
      </Routes>
    </BrowserRouter>
  );
}
