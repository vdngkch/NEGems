import { addDoc,collection } from "firebase/firestore";
import { db } from "./firebase";

const handleSubmit = async()=>{
    const imgURL = await fileUpload(file)

    await addDoc(collection(db,"gems"),{
        title,
        description,
        image:imgURL,
        lat,
        lng
    })
}