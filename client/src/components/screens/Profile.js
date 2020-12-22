import React, {useEffect, useState, useContext} from 'react'
import {UserContext} from '../../App'

const Profile  = ()=>{
    const [myposts, setMyPosts] = useState([])
    const {state, dispatch} = useContext(UserContext)

    useEffect(() => {
        fetch('/myposts', {
            headers: {
               "Authorization" : "Bearer " + localStorage.getItem("jwt")
            }
         }).then(res => res.json())
         .then((result) => {
            setMyPosts(result.myPost)
         })
    })

    return(
        <div>
            <h3>{state? state.name: "loading"}</h3>
            <h4>{state? state.email: "loading"}</h4>
            <p>{state?state.followers.length:"0"} followers</p>
            <p>{state?state.following.length:"0"} following</p>
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