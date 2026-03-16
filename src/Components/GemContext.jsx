import {  createContext, useState } from "react";

export const GemContext = createContext();

export function GemProvider({children}){
    const [gems,setGems] = useState([])

    const addGem = (gem)=>{
        setGems((prev)=>[...prev,gem])
    }

    return(
        <GemContext.Provider value={{gems,addGem}}>
            {children}
        </GemContext.Provider>
    )
}

