import {useState} from 'react';
import { Link } from 'react-router-dom';
import './Header.css'
import { useNavigate } from 'react-router-dom';


function Header(){

    const [active, setActive] = useState("home")
    const [search, setSearch] = useState("")
    const [state, setState] = useState("")
    const navigate = useNavigate()

    const states = [
        "All",
        "Assam",
        "Arunachal Pradesh",
        "Meghalaya",
        "Manipur",
        "Mizoram",
        "Nagaland",
        "Tripura",
        "Sikkim"
    ]

    const handleSearch = (e)=>{
        e.preventDefault();

        const params = new URLSearchParams();

        if(state && state !=="All"){
            params.set("state",state)
        }
       
        if(search.trim() !== ""){
            params.set('search',search.trim())
        }

        if(params.toString() === "") return;
        
        params.set("search",search)
        navigate(`/explore?${params.toString()}`)
    }

    const handleState= (e)=>{
        const value = e.target.value;
        setState(value);
        const params = new URLSearchParams();

        if(value && value !=="All"){
            params.set('state',value)
        }

        if(search.trim() !==""){
            params.set('search',search)
        }

        navigate(`/explore?state=${params.toString()}`)
    }

    const navItems = [
         {name:"Home", path:"/home"},
         {name: "Map", path:"/map"},
         {name: "Explore", path:"/explore"},
         {name:"Submit", path:"/submit"}
         
        ]

    return(
        <>
         <nav className='navbar'>
           <div className='container'>
              <div className="logo">NEGems</div>
           
                <ul className='nav-links'>
                    {navItems.map((item)=>(
                        <li key={item.name} className={active===item.name ? "active":""}
                        onClick={()=>setActive(item.name)}>
                            <Link to={item.path}>{item.name}</Link>
                        </li>
                    ))}
                </ul>

                <div className='right-section'>
                    <select className='state-dropdown'
                    value={state}
                    onChange={handleState}>
                        {states.map((state)=>(
                            <option key={state} value={state}>
                                {state}
                            </option>
                        ))}
                    </select>
                </div>

                <form className="search-box" onSubmit={handleSearch}>
                    <input type="text" 
                    placeholder='Find Hidden Gems...'
                    value={search}
                    onChange={(e)=> {
                        const value=e.target.value
                        setSearch(value)
                        //navigate(`/explore?search=${value}`)
                        }}/>
                    <button type='submit'>Search</button>
                </form>

               <Link to={'/login'}>
                     <button className='login-btn'>login/Signup</button>
               </Link>
           </div>
         </nav>
        </>
    )
}

export default Header