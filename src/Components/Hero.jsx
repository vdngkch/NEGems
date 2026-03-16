import { useNavigate } from 'react-router-dom'
import './Hero.css'
import Submit from '../Pages/Submit';

function Hero(){

    const navigate = useNavigate();

    const handleExplore =()=>{
        navigate("/explore");
    };

    const handleSubmit =()=>{
        navigate("/submit");
    
    }

    return(
        <>
          <div className="hero">
            <div className="hero-overlay">
                <h1>Discover Hidden Gems of North East India</h1>
                <p>Explore places untouched waterfalls, villages, valleys shared by real travellers</p>

                <div className="hero-btn">
                    <button className="explore-btn" onClick={handleExplore}>Explore now</button>
                    <button className="submit-btn" onClick={handleSubmit}>Submit a Gem</button>
                </div>
            </div>
          </div>
        </>
    )

}

export default Hero