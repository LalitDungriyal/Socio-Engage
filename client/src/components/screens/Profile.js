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
            {myposts.map((item, index) => {
                return (
                    <div key={index}>
                        myposts will appear here
                        <p>{state? state.name: "loading"}</p>
                    </div>
                )
            })}
        </div>
   )
}


export default Profile