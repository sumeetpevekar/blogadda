import { NavLink, Navigate, Outlet } from "react-router-dom";
import { AdminLayout } from "./AdminLayout";
import { FaBars, FaTimes } from 'react-icons/fa';
import styles from "./styles/AdminPageContainer.module.css"
import { useState } from "react";
import { useAuth } from "../../store/auth";

const AdminContainer = () => {
    const [active, setActive] = useState(false)
    const {user} = useAuth();
    if(!user.isAdmin){
        return <Navigate to="/" />
    }
    const toggleMenu = () => {
        setActive(!active)
    }
    return (
        <div className={styles.AdminPageContainer}>
            <header className={styles.headingContainer}>
                <div className={styles.linksContainer}>
                    <div>
                        <h1 className={styles.heading}>Blog Adda</h1>
                    </div>
                    <div className={styles.hamburgerMenu}>
                        <button className={styles.hamburgerIcon} onClick={toggleMenu}>
                            {active ? <FaTimes /> : <FaBars />}
                        </button>
                    </div>
                </div>
                <div className={active ? styles.menuItems : styles.menuItemsHidden}>
                    <NavLink aria-label="Go to the Admin Users Page" className={`${styles.link}`} onClick={toggleMenu} to="/admin/users">Users</NavLink>
                    <NavLink aria-label="Go to the Admin Blogs Page" className={`${styles.link}`} onClick={toggleMenu} to="/admin/blogs">Blogs</NavLink>
                    <NavLink aria-label="Go to the Admin Contacts Page" className={`${styles.link}`} onClick={toggleMenu} to="/admin/Contacts">Contacts</NavLink>
                    <NavLink aria-label="Go to the Home Page" className={`${styles.link}`} onClick={toggleMenu} to="/">Home</NavLink>
                </div>
            </header>
            <div className={styles.container}>
                <div className={styles.navigationMenus}>
                    <AdminLayout></AdminLayout>
                </div>
                <div className={styles.pageMenus}>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}
export default AdminContainer;