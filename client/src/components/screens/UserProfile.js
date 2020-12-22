import React, {useEffect, useState, useContext} from 'react'
import { Button } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import {UserContext} from '../../App'

const UserProfile  = ()=>{
    const [userProfile,setProfile] = useState(null)
    const {state,dispatch} = useContext(UserContext)
    const {userid} = useParams()
    const [showfollow,setShowFollow] = useState(state?!state.following.includes(userid):true)

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

    const followUser = ()=>{
        fetch('/follow',{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem('jwt')
            },
            body:JSON.stringify({
                followId:userid
            })
        }).then(res=>res.json())
        .then(data=>{
        
            dispatch({type:"UPDATE",payload:{following:data.following,followers:data.followers}})
            localStorage.setItem("user",JSON.stringify(data))
            setProfile((prevState)=>{
                return {
                    ...prevState,
                    user:{
                        ...prevState.user,
                        followers:[...prevState.user.followers,data._id]
                    }
                }
            })
            setShowFollow(false)
        })
    }

    const unfollowUser = ()=>{
        fetch('/unfollow',{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem('jwt')
            },
            body:JSON.stringify({
                unfollowId:userid
            })
        }).then(res=>res.json())
        .then(data=>{
            
            dispatch({type:"UPDATE",payload:{following:data.following,followers:data.followers}})
            localStorage.setItem("user",JSON.stringify(data))
        
            setProfile((prevState)=>{
                const newFollower = prevState.user.followers.filter(item=>item != data._id )
                return {
                    ...prevState,
                    user:{
                        ...prevState.user,
                        followers:newFollower
                    }
                }
            })
            setShowFollow(true)
        })
    }

    return(
        <>
        {
            userProfile 
            ?
            <div>
                <img src={userProfile.user.pic}></img>
                <h3>{userProfile.user.name}</h3>
                <h5>{userProfile.user.email}</h5>
                {userProfile.posts.map((item, index) => {
                    return (
                        <div key={index}>
                            users posts will appear here
                        </div>
                    )
                })}
                <p>{userProfile.user.followers.length} followers</p>
                <p>{userProfile.user.following.length} following</p>
                {
                    showfollow
                    ?
                    <Button
                    variant="primary"
                    onClick={()=>followUser()}
                    >
                        follow
                    </Button>
                    :
                    <Button
                    variant="primary"
                    onClick={()=>unfollowUser()}
                    >
                        Unfollow
                    </Button>
                }
                
            </div> 
            :
            <h2>Loading .. </h2>
        }
        </>
   )
}


export default UserProfile;