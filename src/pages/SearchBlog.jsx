import { Link, NavLink, useLocation, useNavigate, useParams } from "react-router-dom";
import styles from "../components/styles/Home.module.css"
import { useAuth } from "../store/auth";
import { MdAddReaction, MdOutlineAddReaction } from "react-icons/md";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { useEffect, useRef, useState } from "react";
import Search from "../components/Search";


const SearchBlog = () => {
    const {user, setSearchBlog, filteredList, storeBlogIdTokenInLocale} = useAuth();
    const searchElement = useRef("");
    const [ page, setPage ] = useState(1);
    const params = useParams();
    const navigate  = useNavigate();
    const hasValue = localStorage.getItem('searchBlog');
    
    let str = params.data;
    let finalStr = str.split("_").join(" ").toLowerCase();

    useEffect(() => {
        let str = params.data;
        let finalStr = str.split("_").join(" ").toLowerCase();
        if (finalStr !== hasValue) {
            setSearchBlog(finalStr);
            localStorage.setItem('currentSearchPage', 1);
            setPage(1);
        } else {
            const storedPage = localStorage.getItem('currentSearchPage');
            if (storedPage) {
                setPage(parseInt(storedPage));
            }
        }
    }, [params.data]);

    useEffect(() => {
        // console.log("switched");
        // console.log(finalStr);
        setSearchBlog(finalStr);
    }, [])

    const setSingleBlogId = (id) => {
        // console.log(id);
        storeBlogIdTokenInLocale(id);
    }

    const selectedPage = (index) => {
        setPage(index)
        localStorage.setItem("currentSearchPage", index);
    }
    const previousPage = () => {
        setPage((page) => page === 1 ? Math.ceil(filteredList.length / 9) : page - 1)
        localStorage.setItem("currentSearchPage", page - 1);
    }
    const nextPage = () => {
        setPage((page) => page === Math.ceil(filteredList.length / 9) ? 1 : page + 1)
        localStorage.setItem("currentSearchPage", page + 1);
    }
    useEffect(() => {
        const storedPage = localStorage.getItem("currentSearchPage");
        if (storedPage) {
            setPage(parseInt(storedPage));
        }
    }, []);
    return ( 
        <div className={styles.container}>
            <Search></Search>
            <div className={styles.mainContainer}>
                {filteredList.length > 0 && 
                <div className={styles.titleContainer}>
                    <h2 className={styles.headingTitle}>Search results For : {finalStr}</h2>
                </div> 
                }
                <div className={styles.blogsContainer} style={{justifyContent : filteredList && filteredList.length === 0 ? "flex-start" : "center"}}>
                    {filteredList && filteredList.length === 0 ? (<h2 className={styles.emptyMessage}>Cannot find the data for: {params.data}</h2>) : (filteredList.slice((page * 9) - 9 , page * 9).map((blog, index) => 
                    <div className={styles.blogCard} key={index}>
                        <div className={styles.blogTitle}>{blog.title}</div>
                        <div className={styles.blogBody}><div className={styles.blogBodyText}>{blog.body}</div></div>
                        <div className={styles.reactionBox}>{blog.likedBy.includes(user._id) ? <MdAddReaction /> : <MdOutlineAddReaction  />} {blog.reactions?.likes}</div>
                        <div className={styles.tagBox}>{blog.tags.map((tag, index) => <span key={index} className={styles.tagSpan}>#{tag}</span>)}</div>
                        <NavLink  aria-label="Go to the blog Page" to={`/blog/${blog.title.replace(/\s+/g, '-')}`}>
                        <button className={styles.readBtn} type="button" onClick={() => setSingleBlogId(blog._id)}>Read More</button>
                        </NavLink>
                    </div>
                    ))}
                </div>
                    {
                        filteredList.length > 0 && <div className={styles.pagination}>
                            <span onClick={previousPage} className={styles.arrows}><MdKeyboardArrowLeft /></span>
                            {
                                [...Array(Math.ceil(filteredList.length / 9))].map((_, index) => {
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
    )
}
export default SearchBlog;
