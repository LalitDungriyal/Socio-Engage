import React,{useEffect, useState} from 'react'
import {Link,useHistory} from 'react-router-dom'

const SignUp  = ()=>{
    const history = useHistory()
    const [name,setName] = useState("")
    const [password,setPasword] = useState("")
    const [email,setEmail] = useState("")
    const [image,setImage] = useState("")
    const [imgurl,setImgUrl] = useState(undefined)

    useEffect(() => {
        if(imgurl) {
            uploadFields()
        }
    }, [imgurl])

    const uploadPic = () => {
        const data = new FormData()
        data.append("file", image)
        data.append("upload_preset", "social-connect")
        data.append("cloud_name", "omanshu840")
        fetch("https://api.cloudinary.com/v1_1/omanshu840/image/upload", {
            method: "post",
            body: data
        })
        .then(res => res.json())
        .then(data => {
            console.log(data.url)
            setImgUrl(data.url)
        })
        .catch(err => {
            console.log(err)
        })
    }

    const uploadFields = () => {
        fetch("/signup",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                name,
                password,
                email,
                pic: imgurl
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

    const PostData = ()=>{

        if(image) {
            uploadPic()
        }
        else {
            uploadFields()
        }
        
        
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

            <input
                type="file"
                placeholder="upload pic"
                onChange={(e) => setImage(e.target.files[0])}
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