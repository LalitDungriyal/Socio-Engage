import React, {useState, useEffect} from 'react'
import {Link,useHistory} from 'react-router-dom'

const CreatePost = () => {

    const history = useHistory()

    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")
    const [image, setImage] = useState("")
    const [imgUrl, setImgUrl] = useState("")

    useEffect(() => {
        if(imgUrl) {
            fetch("/createpost", {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer "+localStorage.getItem('jwt')
                },
                body: JSON.stringify({
                    title,
                    body,
                    imgUrl,
                })
            }).then(res => res.json())
            .then(data => {
    
                if(data.error) {
                    alert(data.error)
                }
                else {
                    alert("created post successfully")
                    history.push('/')
                }
            })
        }
    }, [imgUrl])

    
    const postDetails = () => {
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

    return (
        <div>
          <div className="card auth-card input-field">
            <h2>Create Post</h2>
            
            <input
                type="text"
                placeholder="title"
                value={title}
                onChange={(e)=>setTitle(e.target.value)}
            />

            <input
                type="text"
                placeholder="body"
                value={body}
                onChange={(e)=>setBody(e.target.value)}
            />

            <input
                type="file"
                placeholder="upload image"
                onChange={(e) => setImage(e.target.files[0])}
            />

            <button className="btn waves-effect waves-light #64b5f6 blue darken-1"
            onClick={()=>postDetails()}
            >
                SignIn
            </button>
            <h5>
                <Link to="/signup">Don't have an account ?</Link>
            </h5>
    
        </div>
      </div>
    )
}

export default CreatePost;