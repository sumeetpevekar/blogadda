import { useEffect, useState } from "react";
import { useAuth } from "../../store/auth";
import styles from "./styles/AdminBlogs.module.css"
import "./styles/AdminBlogsTable.css"
import {  NavLink } from "react-router-dom";
const AdminBlogs = () => {
    const {AuthorizationToken, getBlogsData} = useAuth();
    const [blogs, setBlogs] = useState([])

    const getAllBlogsData = async () => {
        try{
            const response = await fetch("http://localhost:5000/api/admin/blogs", {
                method : "GET",
                headers : {
                    "Authorization" : AuthorizationToken,
                }
            })
            const {message} = await response.json();
            console.log(message)
            setBlogs(message.reverse());
        }catch(error){
            console.log(error);
        }
    }
    const deleteBlog = async (id) => {
            try{

                const response = await fetch(`http://localhost:5000/api/admin/blogs/delete/${id}`, {
                    method : "DELETE",
                    headers : {
                        "Authorization" : AuthorizationToken,
                    }
                })
                const data = await response.json();
                console.log(data)
                if(response.ok){
                    getAllBlogsData();
                    getBlogsData();
                }
            }catch(error){
                console.log(error);
            }
        }
    const editBlog = async (id) => {
        try{
            const response = await fetch(`http://localhost:5000/api/admin/users/${id}/edit`, {
                method : "GET",
                headers : {
                    "Authorization" : AuthorizationToken,
                },
            })
            const data = await response.json();
            console.log(response)
        }catch(error){
            console.log(error);
        }
            console.log(JSON.stringify(id));
        }
    useEffect(() => {
        getAllBlogsData();
    }, [])
    return (
        <section className={styles.AdminBlogsSection}>
            <div className={styles.container}>
                <h1 className={styles.heading}>Blogs data</h1>
                <div className={styles.adminBlogs}>
                    <table className="tbl">
                        <thead className="thead">
                            <tr>
                                <th>Username</th>
                                <th>Title</th>
                                <th>Body</th>
                                <th>tags</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                        {Array.isArray(blogs) ? (
                        blogs.map((blog, index) => (
                            <tr key={index}>
                                <td data-label="Username">{blog.username}</td>
                                <td data-label="Title">{blog.title}</td>
                                <td data-label="Body">{blog.body}</td>
                                <td data-label="Tags">{blog.tags.map((tag, index) => <span key={index}>{tag} </span>)}</td>
                                <td data-label="Update"><NavLink className={styles.link} aria-label="Go to the Admin Blogs Edit Page" to={`/admin/blogs/${blog._id}/edit`}><button className={styles.updateBlog} onClick={() => editBlog(blog._id)}>Edit</button></NavLink></td>
                                <td data-label="Delete"><button className={styles.deleteBlog} onClick={() => deleteBlog(blog._id)}>Delete</button></td>
                            </tr>
                        ))
                        ) : (
                            <p>Loading...</p>
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    )
}
export default AdminBlogs;