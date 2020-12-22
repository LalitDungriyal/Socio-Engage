import React,{useState} from 'react'
import {Link,useHistory} from 'react-router-dom'

const SignUp  = ()=>{
    const history = useHistory()
    const [name,setName] = useState("")
    const [password,setPasword] = useState("")
    const [email,setEmail] = useState("")
    
    const PostData = ()=>{
        
        fetch("/signup",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                name,
                password,
                email,
            })
        }).then(res=>res.json())
        .then(data=>{
           if(data.error){
              alert(data.error)
           }
           else{
               alert("signed up successfully")
               history.push('/signin')
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
            placeholder="name"
            value={name}
            onChange={(e)=>setName(e.target.value)}
            />
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
                SignUP
            </button>
            <h5>
                <Link to="/signin">Already have an account ?</Link>
            </h5>
    
        </div>
      </div>
   )
}


export default SignUp