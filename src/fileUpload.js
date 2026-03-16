const fileUpload = async(file) =>{
    const formData = new formData();
    formData.append('file',file)
    formData.append("upload_preset", "NEGems_Upload")

    const res = await fetch(
        "https://api.cloudinary.com/v1_1/dmihryb82/auto/upload",{
            method:"POST",
            body:formData
        }
    );

    const data = await res.json();
    return data.secure_url;
}