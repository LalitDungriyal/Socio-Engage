import React,{useState} from 'react'
import {Link,useHistory} from 'react-router-dom'

const SignIn = ()=>{
    const history = useHistory()
    const [password,setPasword] = useState("")
    const [email,setEmail] = useState("")
    
    const PostData = ()=>{
        
        fetch("/signin",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                password,
                email,
            })
        }).then(res=>res.json())
        .then(data=>{
           if(data.error){
              alert(data.error)
           }
           else{
               localStorage.setItem("jwt", data.token)
               localStorage.setItem("user", JSON.stringify(data.user))
               alert("Signed in Successfully")
               history.push('/')
           }
        }).catch(err=>{
            console.log(err)
        })
    }

   return (
      <div>
          <div className="card auth-card input-field">
            <h2>Instagram</h2>
            
            <input
            type="text"
            placeholder="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            />

            <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e)=>setPasword(e.target.value)}
            />

            <button className="btn waves-effect waves-light #64b5f6 blue darken-1"
            onClick={()=>PostData()}
            >
                SignIn
            </button>
            <h5>
                <Link to="/signup">Don't have an account ?</Link>
            </h5>
    
        </div>
      </div>
   )
}


export default SignIn