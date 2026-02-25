import Footer from "./components/footer";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Resturents from "./pages/Resturents";
import Header from "./components/Header";
import About from "./pages/About";
import Admin from "./pages/Admin";
import { Route, Routes } from "react-router-dom";


function App() {
  return (
    <div>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/resturents" element={<Resturents />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>

    </div>
  )
}


export default App;



