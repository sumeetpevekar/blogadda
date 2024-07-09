import { NavLink, Outlet, useLocation, Navigate } from "react-router-dom"
import styles from "./styles/AdminLayout.module.css"
import { FaUserAlt } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";
import { SiBookstack } from "react-icons/si";
import { IoHome } from "react-icons/io5";
import { useAuth } from "../../store/auth";
export const AdminLayout = () => {
    const {user, isLoading} = useAuth();
    const location = useLocation()

    if(isLoading){
        return <h1>Loading...</h1>
    }
    if(!user.isAdmin){
        return <Navigate to="/" />
    }
return (
    <>
        <nav className={`${styles.container}`}>
            <ul className={styles.navRoutes}>
            <li className={` ${styles.lists}`}><NavLink aria-label="Go to the Admin Users Page" className={`${location.pathname === "/admin/users" ? styles.activeIcon : ""} ${styles.link}`} to="/admin/users"><span><FaUserAlt /> </span> <span>Users</span> </NavLink></li>
                <li className={`${styles.lists}`}><NavLink aria-label="Go to the Admin Contacts Page" className={`${location.pathname === "/admin/contacts" ? styles.activeIcon : ""} ${styles.link}`} to="/admin/contacts"><span><FaMessage /> </span> <span>Contacts</span></NavLink></li>
                <li className={`${styles.lists}`}><NavLink aria-label="Go to the Admin Blogs Page" className={`${location.pathname === "/admin/blogs" || location.pathname === "/admin/blogs/:id/edit" ? styles.activeIcon : ""} ${styles.link}`} to="/admin/blogs"><span><SiBookstack /></span> <span>Blogs</span></NavLink></li>
                <li className={`${styles.lists}`}><NavLink aria-label="Go to the Home Page" className={`${styles.link}`} to="/"><span><IoHome /></span> <span>Home</span></NavLink></li>
            </ul>
        </nav>
    </>
)
}