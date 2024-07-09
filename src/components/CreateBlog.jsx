import { Navigate } from "react-router-dom"
import styles from "../components/styles/CreateBlog.module.css"
import { useAuth } from "../store/auth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const CreateBlog = () => {
    const navigate = useNavigate();
    const {token, AuthorizationToken, user, getBlogsData} = useAuth();
    if(!token){
        return <Navigate to="/register"/>
    }

    console.log(user)
    const username = user.username;
    // console.log(username)
    const [blogData, setBlogData] = useState({
        username : username,
        title : "",
        tags : "",
        body: "",
        reactions : {
            likes : 0
        },
    });
    const handleInput = (e) => {
        const { name, value } = e.target;
        if (name === "tags") {
            const tagsArray = value.trim().split(" ");
            setBlogData({ ...blogData, [name]: tagsArray });
        } else {
            setBlogData({ ...blogData, [name]: value });
        }
    }
    const handleSubmit = async () => {
        event.preventDefault();
        console.log("clicked")
        console.log(blogData)
        try{
            const response = await fetch("https://blogadda-api.vercel.app/api/user/blogs/post", {
                method : "POST",
                headers : {
                    "Content-Type": "application/json",
                    "Authorization" : AuthorizationToken,
                },
                body : JSON.stringify(blogData),
            })
            if(response.ok){
                navigate("/")
                getBlogsData();
            }

        }catch(err){
            console.log(err);
        }
    }
    return (
        <div className={styles.createBlogContainer}>
            <div className={styles.heading}>Create Blog</div>
            <form action="" className={styles.formContainer} onSubmit={handleSubmit}>
                <div>Title</div>
                <input type="text" name="title" id="title"  onChange={handleInput} placeholder="Title" />
                <div>Tags</div>
                <input type="text" name="tags" id="tags"  onChange={handleInput} placeholder="Enter tags with space"/>
                <div>Content</div>
                <textarea name="body" id="body" cols="30" rows="10"  onChange={handleInput}  placeholder="Write your blog content here..."></textarea>
                <button type="submit">Post</button>
            </form>
        </div>
    )
}
export default CreateBlog;