import React, {useEffect, useState, useContext} from 'react'
import { useParams } from 'react-router-dom'
import {UserContext} from '../../App'

const UserProfile  = ()=>{
    const [userProfile,setProfile] = useState(null)
    const {state,dispatch} = useContext(UserContext)
    const {userid} = useParams()

    useEffect(()=>{
        fetch(`/user/${userid}`,{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            setProfile(result)
        })
    },[])

    return(
        <>
        {
            userProfile 
            ?
            <div>
                <h3>{userProfile.user.name}</h3>
                <h5>{userProfile.user.email}</h5>
                {userProfile.posts.map((item, index) => {
                    return (
                        <div key={index}>
                            users posts will appear here
                        </div>
                    )
                })}
            </div> 
            :
            <h2>Loading .. </h2>
        }
        </>
   )
}


export default UserProfile;