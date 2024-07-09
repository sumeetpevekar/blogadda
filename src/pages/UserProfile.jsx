import { NavLink, useNavigate } from "react-router-dom";
import styles from "../components/styles/UserProfile.module.css"
import { IoIosLogOut } from "react-icons/io";
import { useAuth } from "../store/auth";
import { CiEdit } from "react-icons/ci";
import { useEffect, useState } from "react";
import { MdAddReaction, MdOutlineAddReaction } from "react-icons/md";
import { GoKebabHorizontal } from "react-icons/go";
import { HiMiniXMark } from "react-icons/hi2";
import { toast } from "react-toastify";
const UserProfile = () => {
    const {user, token, AuthorizationToken, storeBlogIdTokenInLocale, userBlogs, getUsersBlogs, getBlogsData} = useAuth();
    const username = user.username;
    const navigate = useNavigate();
    const [openDeleteIcons, setOpenDeleteIcons] = useState(Array(userBlogs.length).fill(false));
    if(!token){
        navigate("/")
    }
    const finalBlogs = [...userBlogs].reverse();
    console.log(userBlogs);
    console.log(finalBlogs);
    useEffect(() => {
        getUsersBlogs();
    }, [])

    const setSingleBlogId = (id) => {
        console.log(id)
        storeBlogIdTokenInLocale(id)
    }

    const toggleDeleteIcon = (index) => {
        const updatedDeleteIcons = [...openDeleteIcons];
        updatedDeleteIcons[index] = !updatedDeleteIcons[index];
        setOpenDeleteIcons(updatedDeleteIcons);
    };
    const deleteUserBlog = async (id, index) => {
        console.log(id)
        const updatedDeleteIcons = [...openDeleteIcons];
        updatedDeleteIcons[index] = !updatedDeleteIcons[index];
        setOpenDeleteIcons(updatedDeleteIcons);
        try{
            const response = await fetch(`http://localhost:5000/api/user/blogs/delete/${id}`, {
                method : "DELETE",
                headers : {
                    "Authorization" : AuthorizationToken,
                },
            })
            if(response.ok){
                toast.success("Message Deleted successfully");
                getUsersBlogs();
                getBlogsData();
            }else{
                toast.error("Message not Deleted")
            }
        }catch(error){
            console.log(error);
        }
    }
    return (
        <div className={styles.container}>
            <div className={styles.detailsContainer}>
                <div className={styles.heading}>
                    <h2>Profile Details</h2>
                </div>
                <table className={styles.profileInfoTable}>
                    <tbody  className={styles.tbody}>
                        <tr className={styles.tr}>
                            <td>Full Name</td>
                            <td>{user.name}</td>
                        </tr>
                        <tr className={styles.tr}>
                            <td>Username</td>
                            <td>{user.username}</td>
                        </tr>
                        <tr className={styles.tr}>
                            <td>Mobile Number</td>
                            <td>{user.phone}</td>
                        </tr>
                        <tr className={styles.tr}>
                            <td>Email ID</td>
                            <td>{user.email}</td>
                        </tr>
                    </tbody>
                </table>
                <div>
                    <NavLink aria-label="Go to User Profile update Page" to="/my/profile/update-details">
                        <button type="button" className={styles.editBtn}><CiEdit />Edit</button>
                    </NavLink>
                </div>
            </div>
            <div className={styles.userBlogContainer}>
                <div className={styles.heading}>
                {userBlogs.length === 0 ? <h2>You have not uploaded blogs yet</h2> : <h2>Your blogs</h2> }
                </div>
                <div className={styles.blogsContainer}>
                    {Array.isArray(userBlogs) ? (finalBlogs.map((blog, index) => (
                    <div className={styles.blogCard} key={index}>
                        <div className={styles.blogTitle}><div className={styles.blogTitleText}>{blog.title}</div></div>
                        <div className={styles.blogBody}><div className={styles.blogBodyText}>{blog.body}</div></div>
                        <div className={styles.reactionBox}>{blog.likedBy.includes(user._id) ? <MdAddReaction /> : <MdOutlineAddReaction  />} {blog.reactions?.likes || 0}</div>
                        <div className={styles.tagBox}>{blog.tags.map((tag, index) => <span key={index} className={styles.tagSpan}>#{tag}</span>)}</div>
                        <div  className={styles.readMoreBox}>
                        <NavLink aria-label="Go to the blog Page" to={`/blog/${blog.title.replace(/\s+/g, '-')}`}>
                        <button className={styles.readBtn} type="button" onClick={() => setSingleBlogId(blog._id)}>Read More</button>
                        </NavLink>
                        </div>
                        <div className={styles.editIconBox}><div className={styles.editIcon}><NavLink aria-label="Go to User Profile update Page" to={`/my/profile/blog/edit/${blog._id}`}><CiEdit   /></NavLink></div></div>
                        <div className={styles.menuIconBoxContainer}>
                            <div className={styles.menuIconBox}>
                            {openDeleteIcons[index] && <button className={styles.deleteIcon} onClick={() => deleteUserBlog(blog._id, index)}>Delete</button>}
                                <div className={styles.menuIcon}>
                                    {openDeleteIcons[index] ? (
                                        <HiMiniXMark onClick={() => toggleDeleteIcon(index)} />
                                    ) : (
                                        <GoKebabHorizontal onClick={() => toggleDeleteIcon(index)} />
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>)
                    )
                    ) : ""
                }
                </div>
            </div>
            <div className={styles.logoutBox}><NavLink className={`${styles.logoutLink}`} to="/logout"><span className={styles.logoutSpan}>Logout <IoIosLogOut /></span></NavLink></div>
        </div>
    )
}
export default UserProfile;