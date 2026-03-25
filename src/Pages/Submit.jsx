import { useState } from "react";
import './Submit.css'
import { useNavigate } from "react-router-dom";
import { addDoc,collection } from "firebase/firestore";
import { db } from "../firebase";
import { GoogleMap,Marker,useJsApiLoader } from "@react-google-maps/api";

const containerStyle ={
    width:"100%",
    height:"400px"
}
const center = {
  lat: 26.1445,
  lng: 91.7362
}

function Submit(){
    const navigate = useNavigate()

    const {isLoaded} = useJsApiLoader({
        googleMapsApiKey: import.meta.env.VITE_GMaps_APIKey
    })

    const [marker, SetMarker] = useState(null)

    const [formData, setFormData] = useState({
        place:"",
        category:"",
        description:"",
        tips:"",
        images:[],
        video: null,
        lat:null,
        lng:null
    })

    const handleChange = (e)=>{
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleImage = (e)=>{
        setFormData({
            ...formData,
            images: e.target.files
        })
    }

    const handleVideo = (e)=>{
        setFormData({
            ...formData,
            video: e.target.files[0]
        })
    }

    const handleMapClick = (e) =>{
        try {
        console.log("Map clickeed")
        const lat=e.latLng.lat()
        const lng=e.latLng.lng()

        console.log("Selected: ",lat,lng)

        SetMarker({lat,lng})

        setFormData((prev)=>({
            ...prev,
            lat,
            lng
        }))
        } catch (error) {
            console.log("Map click error: ", error)
        }
        
    }

    const uploadImages = async()=>{

        if(formData.images.length===0){
            alert("please upload an image")
            return;
        }

        const uploadedImages=[]

        for(let i=0;i<formData.images.length;i++){
            const file = formData.images[i];

            const data = new FormData();
            data.append('file',file)
            data.append("upload_preset", "NEGems_Upload")

            const res = await fetch(
            "https://api.cloudinary.com/v1_1/dmihryb82/auto/upload",
            {
                method:"POST",
                body:data
            });

            const result = await res.json();
            uploadedImages.push(result.secure_url);
        }
        return uploadedImages;
    }


    const handleSubmit = async (e)=>{
        e.preventDefault()

        console.log("submit clicked")
        const imageURLs = await uploadImages();

        await addDoc(collection(db,"gems"),{
            place:formData.place,
            category:formData.category,
            description:formData.description,
            tips:formData.tips,
            images:imageURLs,
            lat:formData.lat,
            lng:formData.lng
        })

        alert("Gem submitted successfully")
        navigate('/explore')
    }
    

    return(
        <div className="submit-container">
           <h1>Submit a Hidden Gem</h1>
           <p>Share beautiful unexplored places, vibrant cultures, delicious foods of North East India</p>

           <form className="submit-form" onSubmit={handleSubmit}>
            <label>Location /Name</label>
            <input
            type="text"
            name="place"
            onChange={handleChange}
            placeholder="Enter location"
            required/>

            <label>State</label>
            <input
            type="text"
            name="state"
            onChange={handleChange}
            placeholder="Enter state"
            required/>

            <label>Description</label>
             <input
            name="description"
            onChange={handleChange}
            placeholder="Describe this place"
            required/>

            <label>Category</label>
            <input name="category"
            onChange={handleChange}
            placeholder="Add category"
            required/>

            <label>Travel Tips</label>
            <textarea
            name="tips"
            onChange={handleChange}
            placeholder="Share tips"/>

            <label>Upload Images</label>
            <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImage}/>

            <label>Upload Videos</label>
            <input
            type="file"
            accept="video/*"
            onChange={handleVideo}/>

            <label>Pin Location</label>
            <p>Click on the map to pin the exact location</p>

            {isLoaded &&(
                <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={7}
                onClick={handleMapClick}>
                    {marker && <Marker position={marker}/>}
                </GoogleMap>
            )}

            <button type="submit" className="submit-btn" >Submit Gem</button>
           </form>
        </div>
    )
}

export default Submit