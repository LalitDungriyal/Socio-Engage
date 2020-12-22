import React, {useState, useEffect} from 'react'

const Home  = ()=>{

   const [data, setData] = useState([])
   
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

    return(
        <div>
           {data.map((item, index) => {
              return (
                 <div key={index}>
                    <h1>{item.postedBy.name}</h1>
                    {/* <img src={item.photo}></img> */}
                 </div>
              )
           })}
        </div>
   )
}


export default Home