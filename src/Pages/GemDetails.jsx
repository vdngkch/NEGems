import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import './GemDetails.css'
import { addDoc,collection,query,where,getDocs } from "firebase/firestore";
import { db } from "../firebase";


function GemDetails(){
    const location = useLocation()
    const place = location.state || {}

    const [reviews, setReviews] = useState([])
    const [comments, setComments] = useState("")
    const [rating, setRating] = useState(0)

    const addReview = async ()=>{

        console.log("Addreview")

        if(comments.trim()==="") return;

        const newReview = {
            gemId:place.id,
            comments:comments,
            rating: rating,
            date: new Date().toLocaleDateString()
        }
        console.log(place)

        await addDoc(collection(db,"reviews"), newReview)

        console.log("Review stored successfully")

        setReviews([...reviews,newReview])
        setComments("");
        setRating(0)
    }

    //storing reviews in firebase
    useEffect(()=>{

        if(!place?.id) return;

        const fetchReviews = async()=>{
            const q = query(
                collection(db,"reviews"),
                where("gemId", "==",place.id)
            )
            const snapshot = await getDocs(q)

            const reviewList = snapshot.docs.map(doc=>({
                id:doc.id,
                ...doc.data()
            }))

            setReviews(reviewList)
        }
        fetchReviews();
    },[place.id])

    return(
        <div className="gem-details">
            <h1>{place.place || place.name}</h1>

            <img src={place.images?.[0] ?? place.image ?? ""}
            className="full-image"/>
            <p>{place.description}</p>

            <h2>Reviews</h2>

            <div className="rating">
                {[1,2,3,4,5].map(star=>(
                    <span key={star}
                    onClick={()=>setRating(star)}
                    style={{
                        cursor:"pointer",
                        color: star<=rating?"gold":"gray",
                        fontSize:"22px"
                    }}>★</span>
                ))}
            </div>

            <div className="review-input">
                <textarea 
                placeholder="Write your review..."
                value={comments}
                onChange={(e)=>setComments(e.target.value)}/>

                <button onClick={() => addReview()}>Add Review</button>
            </div>

            <div className="review-list">
                {reviews.map((r,index)=>(
                    <div key={index} className="review">
                        <div className="stars">
                            {"★".repeat(r.rating)}
                        </div>
                        <p>{r.comments}</p>
                        <small>{r.date}</small>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default GemDetails;