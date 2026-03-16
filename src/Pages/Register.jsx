import { useState } from "react";
import { Link } from "react-router-dom";
import './Register.css'

function Register(){
    const [name, setName] =useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = (e)=>{
        e.preventDefault()

        if(name.trim==="" || email.trim()==="" || password.trim()===""){
            alert("Please fill all fields");
            return;
        }

        console.log("User Registered: ",{name,email,password})
    }

    return(
        <div className="register-container">
            <div className="register-card">
                <h1>Create an account</h1>
                <form onSubmit={handleSubmit}>
                    <label>Your Name</label>
                    <input type="text"
                    placeholder="Enter your name.."
                    value={name}
                    onChange={(e)=>setName(e.target.value)}
                    />

                    <label>Your Email</label>
                    <input type="email"
                    placeholder="Enter your email.."
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    />

                    <label>Password</label>
                    <input type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}/>

                    <button type="submit">Register</button>
                </form>

                <p>Already have an account? <Link to={'/login'}>Login</Link></p>
            </div>
        </div>
    )
}
export default Register