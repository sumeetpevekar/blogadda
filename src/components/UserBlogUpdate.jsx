import { useEffect, useState } from "react"
import styles from "./styles/UserBlogUpdate.module.css"
import { Form, useParams, useNavigate } from "react-router-dom"
import { toast } from "react-toastify";
import { useAuth } from "../store/auth";

const UserBlogUpdate = () => {
    const {AuthorizationToken, getBlogsData} = useAuth();
    const [blog, setBlog] = useState({
        title : "",
        body : "",
        tags: "",
    })
    const navigate = useNavigate()
    const params = useParams();
    // console.log(params.id);
    const getUserBlogEditData = async () => {
        try{
            const response = await fetch(`https://blogadda-api.vercel.app/api/user/blogs/${params.id}/edit`, {
                method : "GET",
                headers : {
                    "Authorization" :  AuthorizationToken,
                }
            })
            const {message} = await response.json();
            // console.log(message)
            setBlog(message)
        }catch(err){
            console.log(err)
        }
    }
    useEffect(() => {
        getUserBlogEditData();
    }, [])
    const handleInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        if (name === "tags") {
            const Tags = value.replace(/,/g , " ");
            const tagsArray = Tags.split(" ")
            setBlog({ ...blog, [name]: tagsArray });
        } else {
            setBlog({ ...blog, [name]: value });
        }
        // console.log(e.target.value)
    }
    const handleSubmit = async () => {
        event.preventDefault();
        try{
            const response = await fetch(`https://blogadda-api.vercel.app/api/user/blogs/update/${params.id}`, {
                method : "PATCH",
                headers : {
                    "Authorization" : AuthorizationToken,
                    "Content-Type": "application/json"
                },
                body : JSON.stringify(blog)
            })
            if(response.ok){
                toast.success("Updated successfully")
                navigate("/my/profile")
                getBlogsData();
            }else{
                toast.error("Not updated")
            }
        }catch(err){
            console.log(err)
        }
        // console.log(blog)
    }
    return (
        <section className={styles.mainContainer}>
            <div className={styles.container}>
                <h1 className={styles.heading}>Edit Blog</h1>
                <form onSubmit={handleSubmit} className={styles.inputContainer}>
                <label htmlFor="title" className={styles.label}>Title</label>
                <input type="text" id="title" name="title" value={blog.title}  onInput={handleInput} className={styles.input}/>
                <label htmlFor="body" className={styles.label}>Content</label>
                <textarea  cols="30" rows="10" id="body" name="body" value={blog.body}  onInput={handleInput} className={styles.textarea}></textarea>
                <label htmlFor="tags" className={styles.label}>Tags</label>
                <input type="text" id="tags" name="tags" value={blog.tags}  onInput={handleInput} className={styles.input}/>
                <button type="submit" className={styles.updateBtn}>Update</button>
                </form>
            </div>
        </section>
    )
}
export default UserBlogUpdate;