import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from "@react-google-maps/api"
import { useState, useRef,useEffect } from "react";
import './Map.css'
import { getDocs, collection } from "firebase/firestore";
import { db } from "../firebase";
import { Circle } from "@react-google-maps/api";

const containerSTyle={
  width:"100%",
  height: "500px"
}

// const center= userLocation || {
//   lat:25.5,
//   lng:92.5
// }

function Map(){
  const [search, setSearch] =useState("")
  const mapRef = useRef(null);
  const [selected, setSelected] = useState(null)
  const {isLoaded} = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GMaps_APIKey
  })

  const [gems, setGems] = useState([])

  const [userLocation, setUserLocation] = useState(null);
  const [distance, setDistance] = useState(null);

  const center = userLocation || {
    lat: 25.5,
    lng: 92.5
  };


  //fetching location from firebase

  useEffect(()=>{
    const fetchGems = async ()=>{
      const snapshot = await getDocs(collection(db,"gems"))

      const data = snapshot.docs.map((doc)=>({
        id:doc.id,
        ...doc.data()
      }))

      setGems(data)
    }
    fetchGems()
  },[])


  //calculating distance
  const calculateDist = (lat1,lon1,lat2,lon2)=>{
    const R = 6371;//km
    const Dlat = (lat2-lat1) * Math.PI/180
    const Dlon = (lon2-lon1) * Math.PI/180

    const a = Math.sin(Dlat/2)*Math.sin(Dlat/2) + 
    Math.cos(lat1*Math.PI/180) *
    Math.cos(lat2*Math.PI/180)*
    Math.sin(Dlon/2)*
    Math.sin(Dlon/2)

    const c = 2*Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R*c;
  }


//users current location
useEffect(()=>{
  navigator.geolocation.getCurrentPosition(
    (position)=>{
      setUserLocation({
        lat:position.coords.latitude,
        lng:position.coords.longitude
      })
    },(error)=>{
      console.log("Location access Denied",error)
    }
  )
},[]);

useEffect(()=>{
  if(userLocation && mapRef.current){
     mapRef.current.panTo(userLocation)
     mapRef.current.setZoom(10)
  }
},[userLocation])

//search Function
const handleSearch=(e)=>{
   const place = gems.find(gem=>
    gem.place?.toLowerCase().includes(search.trim().toLowerCase())
   );

   if(!place){
     alert("Location Not Found");
     return;
   }

  if(!userLocation){
    alert("Allow location access");
    return;
  }

  //  if(place && userLocation){}
    const dist = calculateDist(
      userLocation.lat,
      userLocation.lng,
      place.lat,
      place.lng
    )

    setDistance(dist.toFixed(2))
    setSelected(place)

    if(mapRef.current){
      mapRef.current.panTo({lat:place.lat, lng:place.lng})
      mapRef.current.setZoom(10)
    }

   

   console.log("Searching:", search);
   console.log("Found:", place);
}


  if(!isLoaded) return <div>Loading Map..</div>
    return(
        <>
        <div className="map-page">
           <h1>Explore Hidden Gems of Northeast</h1>

           <div className="map-search">
             <input type="text"
             placeholder="Enter location..."
             value={search}
             onChange={(e)=>setSearch(e.target.value)}
             onKeyDown={(e)=>{
              if(e.key==="Enter"){
                handleSearch();
              }
             }}/>
             <button onClick={handleSearch} className="src-btn">Search</button>
           </div>

          
              <GoogleMap
              mapContainerStyle={containerSTyle}
              center={center}
              zoom={7}
              onLoad={(map)=>mapRef.current=map}>
                {userLocation && (
                <Circle center={userLocation}
                  radius={1000}
                  options={{
                      strokeColor: "#4285F4",
                      strokeOpacity: 0.8,
                      strokeWeight: 2,
                      fillColor: "#1a4180",
                      fillOpacity: 100
                  }}/>
                )}

                {gems.map((gem)=> (
                  gem.lat && gem.lng && (
                  <Marker 
                  key={gem.id}
                   position={{ lat: gem.lat, lng: gem.lng }}
                   onClick={()=>setSelected(gem)}
                  />
                  )
                ))}

                {selected &&(
                  <InfoWindow position={{lat:selected.lat, lng:selected.lng}}>
                    <div>
                      <h3>{selected.place}</h3>
                      <p>{selected.description}</p>
                       
                      {distance &&(
                        <p className="distance">Distance from your location:{distance}km</p>
                      )}
                    </div>
                  </InfoWindow>
                )}

               
              </GoogleMap>
           
        </div>
        
        </>
    )
}

export default Map