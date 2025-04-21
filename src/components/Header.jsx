import { NavLink } from "react-router-dom";
import styles from "./styles/Header.module.css"
import { FaBars, FaTimes } from 'react-icons/fa';
import { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import { IoIosLogOut } from "react-icons/io";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { FaPencilAlt } from "react-icons/fa";

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const {user} = useAuth();
    // console.log(user.name)
    // const name = [user.name.split(' ')]
    const userName = String(user.name).split(' ');
    // console.log(userName)
    // console.log(name)
    const {isLoggedIn} = useAuth();
    const toggleMenu = () => {
      setIsOpen(!isOpen);
    };
    return (
        <header>
            <div className={`${styles.container}`}>
                <div className={`${styles.linksContainer}`}>
                <div className={`${styles.logoName}`}>
                    <NavLink className={`${styles.link} ${styles.logo}`} onClick={() => localStorage.setItem('currentPage', 1)} to="/">Blog Adda</NavLink>
                </div>
                <nav>
                    <ul className={styles.ulLinksContainer}>
                        {isLoggedIn && <li><NavLink className={`${styles.link, styles.createBlog}`} to="/create-blog">Create Blog <FaPencilAlt /></NavLink></li>}
                        <li><NavLink className={`${styles.link}`} aria-label="Go to the Home Page" to="/">Home</NavLink></li>
                        <li><NavLink className={`${styles.link}`} aria-label="Go to the About Page" to="/about">About</NavLink></li>
                        <li><NavLink className={`${styles.link}`} aria-label="Go to the Contact Page" to="/contact">Contact</NavLink></li>
                        {isLoggedIn ? 
                            <NavLink className={`${styles.link}`}  aria-label="Go to the User Profile Page" to="/my/profile"><span className={styles.userSpan}><span className={styles.userIcon}>{user?.picture ? <img style={{borderRadius: "50%"}} src={user.picture} alt="mdo" width="38" height="38" class="rounded-circle"></img> : <HiOutlineUserCircle />}</span> <span>{userName[0]}</span></span> </NavLink>
                            : <>
                            <NavLink className={`${styles.link}`} aria-label="Go to the Register Page" to="/register">Register</NavLink>
                            <NavLink className={`${styles.link}`} aria-label="Go to the Login Page" to="/login">Login</NavLink> 
                            </>
                        }
                    </ul>
                </nav>
                <div className={styles.hamburgerMenu}>
                    <button className={styles.hamburgerIcon} onClick={toggleMenu}>
                        {isOpen ? <FaTimes /> : <FaBars />}
                    </button>
                </div>
                </div>
                <div className={isOpen ? styles.menuItems : styles.menuItemsHidden}>
                    <NavLink className={`${styles.link}`} aria-label="Go to the Home Page" onClick={toggleMenu} to="/">Home</NavLink>
                    <NavLink className={`${styles.link}`} aria-label="Go to the About Page" onClick={toggleMenu} to="/about">About</NavLink>
                    <NavLink className={`${styles.link}`} aria-label="Go to the Contact Page" onClick={toggleMenu} to="/contact">Contact</NavLink>
                    {isLoggedIn && <NavLink className={`${styles.link, styles.createBlog}`} onClick={toggleMenu} to="/create-blog">Create Blog <FaPencilAlt /></NavLink>}
                    {isLoggedIn ? 
                    <NavLink className={`${styles.link}`} aria-label="Go to the User Profile Page" onClick={toggleMenu} to="/my/profile"><div className={styles.userSpan}><span className={styles.userIcon}>{user?.picture ? <img style={{borderRadius: "50%"}} src={user.picture} alt="mdo" width="30" height="30" class="rounded-circle"></img> : <HiOutlineUserCircle />}</span><span>{userName[0]}</span></div> </NavLink> :
                    <>
                    <NavLink className={`${styles.link}`} aria-label="Go to the Register Page" onClick={toggleMenu} to="/register">Register</NavLink>
                    <NavLink className={`${styles.link}`} aria-label="Go to the Login Page" onClick={toggleMenu} to="/login">Login</NavLink> 
                    </>
                    }
                </div>
            </div>
        </header>
    )
}
export default Header;