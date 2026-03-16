import { useState } from "react";
import Header from "./Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Map from "./Pages/Map";
import Explore from "./Pages/Explore";
import Home from "./Pages/Home";
import Submit from "./Pages/Submit";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Footer from "./Components/Footer";
import GemDetails from "./Pages/GemDetails";

function App(){
  const [state, setState] = useState("All")
  return(
    <>
      <Router>
        <Header onStateChange={setState}/>
        <Routes>
          <Route path="/" element={<Home state={state}/>}/>
          <Route path="/home" element={<Home state={state}/>}/>
          <Route path="/submit" element={<Submit/>}/>
          < Route path="/map" element={<Map/>}/>
          < Route path="/explore" element={<Explore/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/gem/:id" element={<GemDetails/>}/>
        </Routes>
        <Footer/>
      </Router>
    </>
  )
}

export default App