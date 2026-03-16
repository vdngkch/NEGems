import { useState,useEffect } from "react";
import { useLocation,useNavigate } from "react-router-dom";
import './Explore.css'
import { getDocs,collection } from "firebase/firestore";
import { db } from "../firebase";


function Explore(){

  const location = useLocation();
  const query = new URLSearchParams(location.search)
  const navigate = useNavigate();

  const selectedState = query.get("state")
  const searchTerm = query.get("search")

  const [gems,setGems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");

   const places = [
    {
        name:"Wah Rilang",
        state:"Meghalaya",
        category:"Nature",
        image:"./images/Wah Rilang.jpg"
    }
   ]

   const foods = [
    {
      name:"Pitha",
      state:"Assam",
      category:"Food",
      image:"./images/Pitha.jpg"
    }
   ]

   const culture = [{
    name:"Manipuri dance",
    state:"Manipur",
    category:"Culture",
    image:"./images/Manipuri dance.jpg"
   }]


   //load gems from firebase
   useEffect(()=>{
    const fetchGems = async()=>{
      const snapshot = await getDocs(collection(db,"gems"));

      const gemList = snapshot.docs.map((doc)=>({
        id:doc.id,
        ...doc.data()
      }));

      setGems(gemList)
      console.log(gemList);
    };

    fetchGems()
   },[]);



   const All =[...places,...foods,...culture,...gems]

   const [filter, setFilter] = useState("All")

   let filteredPlaces = All;;

   if(selectedState && selectedState !=="All"){
    filteredPlaces = filteredPlaces.filter(
      place => place.state === selectedState
    )
   }

   if(searchTerm){
    filteredPlaces = filteredPlaces.filter(
      place => place.name.toLowerCase().includes(searchTerm.toLowerCase()) 
    )
   }

   if(filter !== "All"){
    filteredPlaces = filteredPlaces.filter(
      place=>place.category===filter
    )
   }


  //filtered gems
  const filteredGems = 
     selectedCategory ==="all" ?gems:gems.filter(gem=>gem.category.toLowerCase()===selectedCategory)


     return(
      <>
          <div className="explore-page">
              <h1>Explore Hidden Gems</h1>  

              <div className="filters">
                <button onClick={()=> setFilter("All")}>All</button>
                <button onClick={()=> setFilter("Nature")}>Nature</button>
                <button onClick={()=> setFilter("Culture")}>Culture</button>
                <button onClick={()=> setFilter("Food")}>Food</button>
              </div>

              <div className="explore-grid">
                {filteredPlaces.map((place, index)=>(
                    <div className="explore-card"
                      key={index}
                      onClick={()=>navigate(`/gem/${place.id || place.name}`,{state:place})}>
                        <img src={place.images?.[0] || place.image }
                         alt={place.place||place.name}/>

                        <div className="explore-content">
                            <h3>{place.place || place.name}</h3>
                            <p>{place.category}</p>
                            <p>{place.description}</p>
                        </div>
                    </div>
                ))}
              </div>
          </div> 
          
      </>
     )

}

export default Explore