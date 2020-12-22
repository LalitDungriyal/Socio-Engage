import React, {useState, useEffect, useContext} from 'react'
import { Button } from 'react-bootstrap'
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

   return(
        <div>
           {data.map((item, index) => {
              return (
                 <div key={index}>
                    <h1>{item.postedBy.name}</h1>
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
                     
                    {/* <img src={item.photo}></img> */}
                 </div>
              )
           })}
        </div>
   )
}


export default Home