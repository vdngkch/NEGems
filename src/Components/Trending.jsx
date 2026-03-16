import { useState } from "react";
import './Trending.css'

function Trending(){
    const trendingData = [
        {
            image:"./images/Tawang.jpg",
            title: "Tawang",
            state:"Arunachal Pradesh",
            rating: 4.8
        },{
            image:"./images/loktak lake.jpg",
            title:"Loktak Lake",
            state:"Manipur",
            rating:4.7
        },{
            image:"./images/Meghalaya.jpg",
            title:"Wari Chora",
            state:"Meghalay",
            rating:4.1
        }
    ]
    return(
        <>
          <section className="trending-section">
            <h2 className="section-title">Trending Gems</h2>

            <div className="trending-grid">
                {trendingData.map((item,index)=>(
                    <div className="trending-card" key={index}>
                        <img src={item.image} alt={item.title}/>

                        <div className="card-body">
                            <span className="state-badge">{item.state}</span>
                            <h3>{item.title}</h3>
                            <p>{item.rating}</p>
                            <button>Explore</button>
                        </div>
                    </div>
                ))}
            </div>
          </section>
        </>
    )
}

export default Trending