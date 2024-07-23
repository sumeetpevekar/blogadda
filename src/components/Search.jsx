import { useNavigate } from "react-router-dom";
import styles from "./styles/Search.module.css";
import { useRef } from "react";
import { useAuth } from "../store/auth";
import { IoSearch } from "react-icons/io5";
const Search = () => {
    const {setSearchBlog} = useAuth();
    const searchElement = useRef("");
    const navigate = useNavigate();

    const handleSearch = (event) => {
        event.preventDefault();
        const searchValue = searchElement.current.value.trim().toLowerCase();
        // console.log(searchValue);
        // console.log("lower case search value", searchValue.toLowerCase())
        if (!searchValue) {
            return;
        }
        setSearchBlog(searchValue);
        navigate(`/search/${searchElement.current.value.replace(/\s+/g, '_')}`)
        searchElement.current.value = "";
        localStorage.setItem("currentSearchPage", 1);
    };
    return (
        <div className={styles.searchContainer}>
                <div className={styles.wallpaperImgContainer}>
                    <img className={styles.wallpaperImg} src="/images/homepage.jpg" alt="wallpaper image" />
                </div>
                <div className={styles.searchBoxContainer}>
                    <form action="" onSubmit={handleSearch} className={styles.searchFormContainer}>
                    <input type="text" className={styles.searchBlogInput} ref={searchElement} name="blog" id="blog" placeholder="Search blog here..."/>
                    <button type="submit" className={styles.searchBlogBtn} ><IoSearch /></button>
                    </form>
                </div>
            </div>
    )
}
export default Search;