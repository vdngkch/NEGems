import { useEffect, useState } from "react";
import "./Slider.css";

function Slider() {
  const data = [
    { image: "./images/Tawang.jpg", title: "Tawang", desc: "Place in Arunachal Pradesh" },
    { image: "./images/ziro valley.jpg", title: "Ziro Valley", desc: "Scenic valley in Arunachal Pradesh" },
    { image: "./images/Dawki.jpg", title: "Dawki River", desc: "Crystal clear river in Meghalaya" },
    { image: "./images/Meghalaya.jpg", title: "Wari Chora", desc: "Beautiful river lake" },
    { image: "./images/loktak lake.jpg", title: "Loktak Lake", desc: "Floating lake in Manipur" },
  ];

  const visibleCount = 3;

  // Clone items for infinite effect
  const extendedData = [
    ...data.slice(-visibleCount),
    ...data,
    ...data.slice(0, visibleCount),
  ];

  const [index, setIndex] = useState(visibleCount);
  const [transition, setTransition] = useState(true);

  const nextSlide = () => {
    setIndex((prev) => prev + 1);
  };

  const prevSlide = () => {
    setIndex((prev) => prev - 1);
  };

  useEffect(() => {
    if (index === data.length + visibleCount) {
      setTimeout(() => {
        setTransition(false);
        setIndex(visibleCount);
      }, 600);
    }

    if (index === 0) {
      setTimeout(() => {
        setTransition(false);
        setIndex(data.length);
      }, 600);
    }
  }, [index, data.length, visibleCount]);

  useEffect(() => {
    if (!transition) {
      requestAnimationFrame(() => {
        setTransition(true);
      });
    }
  }, [transition]);

  

  return (
    <div className="slider">
      <button className="prev" onClick={prevSlide}>❮</button>

      <div className="slider-window">
        <div
          className="slides"
          style={{
            transform: `translateX(-${index * (100 / visibleCount)}%)`,
            transition: transition ? "transform 0.6s ease-in-out" : "none",
          }}
        >
          {extendedData.map((item, i) => (
            <div className="card" key={i}>
              <img src={item.image} alt={item.title} />
              <div className="card-content">
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
                <button className="view-btn">Explore</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button className="next" onClick={nextSlide}>❯</button>
    </div>
  );
}

export default Slider;