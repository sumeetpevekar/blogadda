import { Link, NavLink, useLocation, useNavigate, useParams } from "react-router-dom";
import styles from "../components/styles/Home.module.css"
import { useAuth } from "../store/auth";
import { MdAddReaction, MdOutlineAddReaction } from "react-icons/md";
import { IoSearch } from "react-icons/io5";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { useCallback, useEffect, useRef, useState } from "react";


const SearchBlog = () => {
    const {blogs, user, sortedBlogs, setSearchBlog, filteredList, storeBlogIdTokenInLocale} = useAuth();
    const searchElement = useRef("");
    const [ page, setPage ] = useState(1);
    const params = useParams();
    const navigate  = useNavigate();
    const hasValue = localStorage.getItem('searchBlog');
    
    let str = params.data;
    let finalStr = str.split("_").join(" ");

    useEffect(() => {
        let str = params.data;
        let finalStr = str.split("_").join(" ");
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
        console.log("switched");
        console.log(finalStr);
        setSearchBlog(finalStr);
    }, [])

    const setSingleBlogId = (id) => {
        console.log(id);
        storeBlogIdTokenInLocale(id);
    }

    const handleSearch = (event) => {
        event.preventDefault();
        const searchValue = searchElement.current.value.trim();
        if (!searchValue) {
            return;
        }
        setSearchBlog(searchValue);
        localStorage.setItem('searchBlog', searchValue)
        navigate(`/search/${searchValue.replace(/\s+/g, '_')}`);
        searchElement.current.value = "";
        localStorage.setItem("currentSearchPage", 1)
    };

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
            <div className={styles.wallpaperContainer}>
                <div className={styles.wallpaperImgContainer}>
                    <img className={styles.wallpaperImg} src="/images/homepage.jpg" alt="wallpaper image" />
                </div>
                <div className={styles.searchBoxContainer}>
                    <form action="" onSubmit={handleSearch} className={styles.searchFormContainer}>
                    <input type="text" className={styles.searchBlogInput} ref={searchElement} name="blog" id="blog" placeholder="Search blog here..."/>
                    <button type="submit" className={styles.searchBlogBtn}><IoSearch /></button>
                    </form>
                </div>
            </div>
            <div className={styles.mainContainer}>
                <div className={styles.titleContainer}>
                    <h1 className={styles.headingTitle}><NavLink  aria-label="Go to the blog Page">Blogs</NavLink></h1>
                    <p className={styles.websitePara}>Discover a world of ideas and inspiration at Blog Adda. Dive into engaging articles written by our passionate team of writers and contributors. Join our community today and let your journey of exploration begin. Blog Adda - Where knowledge meets adventure.</p>
                </div>
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
