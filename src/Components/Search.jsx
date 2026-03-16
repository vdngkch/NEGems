import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Search(){
    const [search, setSearch] = useState("");

    const navigate = useNavigate();

    const handleSearch =(e)=> {
        e.preventDefult();

        if(search.trim()===!""){
            navigate(`/explore?search=${search}`)
        }
    }
    return(
    <>
     <form>
        <input type="text" value={search}
        placeholder="Search Hidden Gems..."
        onChange={(e)=>setSearch(e.target.value)}/>
        <button type="submit">Search</button>
     </form>
    </>
    )
}

export default Search