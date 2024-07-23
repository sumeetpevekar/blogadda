import { NavLink } from "react-router-dom";
import styles from "../components/styles/Home.module.css";
import { useAuth } from "../store/auth";
import { MdAddReaction, MdOutlineAddReaction } from "react-icons/md";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { useEffect, useState } from "react";
import Search from "../components/Search";

const Home = () => {
    const {sortedBlogs, storeBlogIdTokenInLocale, user} = useAuth();
    const [ page, setPage ] = useState(1);
    const setSingleBlogId = (id) => {
        // console.log(id)
        storeBlogIdTokenInLocale(id)
    }
    const selectedPage = (index) => {
        setPage(index)
        localStorage.setItem("currentPage", index);
    }
    const previousPage = () => {
        setPage((page) => page === 1 ? Math.ceil(sortedBlogs.length / 9) : page - 1)
        localStorage.setItem("currentPage", page - 1);
    }
    const nextPage = () => {
        setPage((page) => page === Math.ceil(sortedBlogs.length / 9) ? 1 : page + 1)
        localStorage.setItem("currentPage", page + 1);
    }
    useEffect(() => {
        const storedPage = localStorage.getItem("currentPage");
        if (storedPage) {
            setPage(parseInt(storedPage));
        }
    }, []);
    return ( 
        <div className={styles.container}>
            <Search></Search>
            <div className={styles.mainContainer}>
                <div className={styles.titleContainer}>
                    <p className={styles.websitePara}>Discover a world of ideas and inspiration at Blog Adda. Dive into engaging articles written by our passionate team of writers and contributors. Join our community today and let your journey of exploration begin. Blog Adda - Where knowledge meets adventure.</p>
                </div>
                <div className={styles.blogsContainer}>
                    {sortedBlogs.slice((page * 9) - 9, page * 9).map((blog, index) => {
                        // let likes = blog.reactions;
                        return (
                        <div className={styles.blogCard} key={index}>
                        <div className={styles.blogTitle}>{blog.title}</div>
                        <div className={styles.blogBody}><div className={styles.blogBodyText}>{blog.body}</div></div>
                        <div className={styles.reactionBox}>{blog.likedBy.includes(user._id) ? <MdAddReaction /> : <MdOutlineAddReaction  />} {blog.reactions?.likes || 0}</div>
                        <div className={styles.tagBox}>{blog.tags.map((tag, index) => <span key={index} className={styles.tagSpan}>#{tag}</span>)}</div>
                        <NavLink  aria-label="Go to the blog Page" to={`/blog/${blog.title.replace(/\s+/g, '-')}`}>
                        <button className={styles.readBtn} type="button" onClick={() => setSingleBlogId(blog._id)}>Read More</button>
                        </NavLink>
                        </div>
                    )
                    }
                    )}
                    {
                        sortedBlogs.length > 0 && <div className={styles.pagination}>
                            <span onClick={previousPage} className={styles.arrows}><MdKeyboardArrowLeft /></span>
                            {
                                [...Array(Math.ceil(sortedBlogs.length / 9))].map((_, index) => {
                                    return (
                                        <span onClick={() => selectedPage(index + 1)} key={index} className={`${page === index + 1 ? styles.selectedPage : ''}`}>{index + 1} </span>
                                    )
                                })
                            }
                            <span onClick={nextPage} className={styles.arrows}><MdKeyboardArrowRight /></span>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}
export default Home;
