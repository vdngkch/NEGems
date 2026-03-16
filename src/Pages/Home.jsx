import { useState } from "react";
import Slider from "../Silder";
import Trending from "../Components/Trending";
import Hero from "../Components/Hero";
import Footer from "../Components/Footer";

function Home(){
    const [state, setState] = useState("All");
    return (
        <>
        <Hero/>
        <Slider state={state}/>
        <Trending/>
        
        </>
    )
}

export default Home