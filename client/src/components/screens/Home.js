import React, {useState, useEffect, useContext} from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import {UserContext} from '../../App'

const Home  = ()=>{

   const [data, setData] = useState([])
   const {state, dispatch} = useContext(UserContext)
   
   useEffect(() => {
      fetch('/allposts', {
         headers: {
            "Authorization" : "Bearer " + localStorage.getItem("jwt")
         }
      }).then(res => res.json())
      .then((result) => {
         setData(result.posts)
      })
   }, [])

   const likePost = (id) => {
      fetch('/like', {
         method: "put",
         headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("jwt")
         },
         body: JSON.stringify({
            postId: id
         })
      }).then(res => res.json())
      .then(result => {
         const newData = data.map(item => {
            if(item._id == result._id) {
               return result
            }
            else {
               return item
            }
         })

         setData(newData)
      })
   }

   const unlikePost = (id) => {
      fetch('/unlike', {
         method: "put",
         headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("jwt")
         },
         body: JSON.stringify({
            postId: id
         })
      }).then(res => res.json())
      .then(result => {
         const newData = data.map(item => {
            if(item._id == result._id) {
               return result
            }
            else {
               return item
            }
         })

         setData(newData)
      })
   }

   const makeComment = (text,postId)=>{
      fetch('/comment',{
          method:"put",
          headers:{
              "Content-Type":"application/json",
              "Authorization":"Bearer "+localStorage.getItem("jwt")
          },
          body:JSON.stringify({
              postId,
              text
          })
      }).then(res=>res.json())
      .then(result=>{
          const newData = data.map(item=>{
            if(item._id==result._id){
                return result
            }else{
                return item
            }
         })
        setData(newData)
      }).catch(err=>{
          console.log(err)
      })
   }

   const deletePost = (postid)=>{
      fetch(`/deletepost/${postid}`,{
          method:"delete",
          headers:{
              Authorization:"Bearer "+localStorage.getItem("jwt")
          }
      }).then(res=>res.json())
      .then(result=>{
          console.log(result)
          const newData = data.filter(item=>{
              return item._id !== result._id
          })
          setData(newData)
      })
   }

   return(
        <div>
           {data.map((item, index) => {
              return (
                 <div key={index}>
                    <Link to={item.postedBy._id !== state._id?"/profile/"+item.postedBy._id :"/profile"  }>
                        <h1>{item.postedBy.name}</h1>
                    </Link>
                    {
                       item.postedBy._id == state._id 
                       &&
                       <Button 
                           variant="primary"
                           onClick={() => {deletePost(item._id)}}
                        >
                           Delete
                        </Button>
                    }
                     <p>{item.likes.length} likes</p>
                     {
                        item.likes.includes(state._id)
                        ? 
                        <Button 
                           variant="primary"
                           onClick={() => {unlikePost(item._id)}}
                        >
                           Unlike
                        </Button>
                        :
                        <Button 
                           variant="primary"
                           onClick={() => {likePost(item._id)}}
                        >
                           Like
                        </Button>
                     }

                     {
                        item.comments.map(record => {
                           return (
                              <div>
                                 <p>{record.postedBy.name}</p>
                                 <p>{record.text}</p>
                              </div>
                           )
                        })
                     }

                     <form onSubmit={(e) => {
                        e.preventDefault()
                        makeComment(e.target[0].value, item._id)
                     }}>
                        <input type="text" placeholder="add a comment" />
                     </form>
                     
                    {/* <img src={item.photo}></img> */}
                 </div>
              )
           })}
        </div>
   )
}


export default Home