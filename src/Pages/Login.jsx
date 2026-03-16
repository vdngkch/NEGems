import { useState } from "react"
import { Link } from "react-router-dom"
import './Login.css'

function Login(){
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = (e)=>{
       e.preventDefault()

       if(email.trim()==="" || password.trim()===""){
        alert("Please fill all the fields")
        return
       }
    }
    console.log("Login data:", email,password)

    return(
        <div className="login-container">
            <div className="login-card">
                <h1>Login</h1>
                <form onSubmit={handleSubmit}>
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

                    <button type="submit">Login</button>
                </form>
                <p>Don't have an account? <Link to={'/register'}>Register</Link> </p>
            </div>
        </div>
    )
}

export default Login