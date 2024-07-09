import { MdOutlineAddReaction } from "react-icons/md";
import styles from "../components/styles/Blogs.module.css"
import { useAuth } from "../store/auth";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Spinner from "../components/Spinner";
const Blogs = () => {
    const {singleBlog, blogs, storeBlogIdTokenInLocale, AuthorizationToken, user, getBlogsData} = useAuth();
    const sortedBlogs = [...blogs].reverse();
    const firstFiveBlogs = sortedBlogs.slice(0, 5);
    // console.log(firstFiveBlogs);
    const [blog, setBlog] = useState(null);
    const [liked, setLiked] = useState(false);
    const [loaded, setLoaded] = useState(true);
    const getSingleBlogData = async () => {
        try{
            const response = await fetch(`http://localhost:5000/api/user/blogs/read/${singleBlog}`, {
                method : "GET",
            })
            const {message} = await response.json();
            // console.log(message)
            setBlog(message);
        }catch(err){
            console.log(err);
        }
    }
    // console.log(user)
    useEffect(() => {
        getSingleBlogData();
    }, [singleBlog])
    // Render loading state if blog data is not yet fetched
    if (!blog) {
        return <Spinner></Spinner>;
    }
    if(blog && loaded){
        setLiked(blog.likedBy?.includes(user._id)); 
        setLoaded(false);
    }
    const setBlogId = (id) => {
        storeBlogIdTokenInLocale(id)
        // console.log(id)
    }
    const handleReactionClick = async () => {
        try {
            // Send a request to your backend to update the reaction count
            const res = await fetch(`http://localhost:5000/api/user/blogs/${blog._id}/reactions`, {
                method: "POST",
                headers : {
                    "Content-Type": "application/json",
                    "Authorization" : AuthorizationToken,
                },
                body: JSON.stringify({ userId: user._id})
            });
            const data = await res.json();
            data.message === "LIKE" ? setLiked(true) : setLiked(false)
            console.log(data.message)
            if(res.ok){
                getSingleBlogData();
                getBlogsData();
            }
        } catch (err) {
            console.error("Error updating reaction count:", err);
        }
    };
    return (
        <div className={styles.container}>
           <div className={styles.cardContainer}>
                <div className={styles.blogDetailsContainer}>
                    <div className={styles.blogTitle}>{blog.title}</div>
                    <div className={styles.blogBody}>{blog.body}</div>
                    <div className={styles.blogTagsContainer}>
                        <span>Popular Tags: </span>
                        {blog.tags && blog.tags.map((tag, index) => (
                            <span key={index} className={styles.tags}>{tag}</span>
                        ))}
                    </div>
                    <div className={styles.blogReactions}><MdOutlineAddReaction className={liked ? styles.emojiLiked : ""}  onClick={handleReactionClick} /> {blog.reactions?.likes}</div>
                </div>
                <div className={styles.recentBlogsContainer}>
                    <div className={styles.recentBlogHeading}>Recent News</div>
                    <div className={styles.blogListContainer}>
                        {firstFiveBlogs.map((recentBlog, index) => 
                        <div className={styles.recentBlogs} key={index}>
                            <div onClick={() => setBlogId(recentBlog._id)}><NavLink aria-label="Go to Recent Blogs Page" className={styles.links} to={`/blog/${recentBlog.title.replace(/\s+/g, '-')}`}>{recentBlog.title}</NavLink></div>
                            <div><MdOutlineAddReaction /> {recentBlog.reactions?.likes || 0}</div>
                        </div>
                        )}
                    </div>
                </div>
           </div>
        </div>
    )
}
export default Blogs;