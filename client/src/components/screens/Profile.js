import React, {useEffect, useState, useContext} from 'react'
import { Button } from 'react-bootstrap'
import {UserContext} from '../../App'

const Profile  = ()=>{
    const [myposts, setMyPosts] = useState([])
    const {state, dispatch} = useContext(UserContext)
    const [image,setImage] = useState("")

    useEffect(() => {
        fetch('/myposts', {
            headers: {
               "Authorization" : "Bearer " + localStorage.getItem("jwt")
            }
         }).then(res => res.json())
         .then((result) => {
            setMyPosts(result.myPost)
         })
    }, [])

    useEffect(() => {
        if(image) {
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
                fetch('/updatepic',{
                    method:"put",
                    headers:{
                        "Content-Type":"application/json",
                        "Authorization":"Bearer "+localStorage.getItem("jwt")
                    },
                    body:JSON.stringify({
                        pic:data.url
                    })
                }).then(res=>res.json())
                .then(result=>{
                    console.log(result)
                    localStorage.setItem("user",JSON.stringify({...state,pic:result.pic}))
                    dispatch({type:"UPDATEPIC",payload:result.pic})
                    //window.location.reload()
                })
            })
            .catch(err => {
                console.log(err)
            })
        }
    }, [image])

    const updatePhoto = (file) => {
        setImage(file)
    }

    return(
       
        <div>
            <img src={state? state.pic: "loading"}></img>
            <h3>{state? state.name: "loading"}</h3>
            <h4>{state? state.email: "loading"}</h4>
            <p>{state?state.followers.length:"0"} followers</p>
            <p>{state?state.following.length:"0"} following</p>
            <input
                type="file"
                placeholder="update pic"
                onChange={(e) => updatePhoto(e.target.files[0])}
            />
            {myposts.map((item, index) => {
                return (
                    <div key={index}>
                        myposts will appear here
                    </div>
                )
            })}
        </div>
   )
}


export default Profile