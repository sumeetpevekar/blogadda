import { useEffect, useState } from "react";
import { useAuth } from "../../store/auth";
import styles from "./styles/AdminUsers.module.css"
import "./styles/AdminUserTable.css"
import {  NavLink } from "react-router-dom";
const AdminUsers = () => {
    const {AuthorizationToken} = useAuth();
    const [users, setUsers] = useState([])
    const getAllUsersData = async () => {
        try{
            const response = await fetch("https://blogadda-api.vercel.app/api/admin/users", {
                method : "GET",
                headers : {
                    "Authorization" : AuthorizationToken,
                }
            })
            const {message} = await response.json();
            // console.log(message)
            setUsers(message);
        }catch(error){
            console.log(error);
        }
    }
    const deleteUser = async (id) => {
            try{

                const response = await fetch(`https://blogadda-api.vercel.app/api/admin/users/delete/${id}`, {
                    method : "DELETE",
                    headers : {
                        "Authorization" : AuthorizationToken,
                    }
                })
                const data = await response.json();
                // console.log(data)
                if(response.ok){
                    getAllUsersData();
                }
            }catch(error){
                console.log(error);
            }
        }
    const editUser = async (id) => {
        try{
            const response = await fetch(`https://blogadda-api.vercel.app/api/admin/users/${id}/edit`, {
                method : "GET",
                headers : {
                    "Authorization" : AuthorizationToken,
                },
            })
            const data = await response.json();
            // console.log(response)
        }catch(error){
            console.log(error);
        }
            // console.log(JSON.stringify(id));
        }
    useEffect(() => {
        getAllUsersData();
    }, [])
    return (
        <section className={styles.AdminUsersSection}>
            <div className={styles.container}>
                <h1 className={styles.heading}>Users data</h1>
                <div className={styles.adminUsers}>
                    <table className="tbl">
                        <thead className="thead">
                            <tr>
                                <th>Name</th>
                                <th>Phone</th>
                                <th>Email</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                        {Array.isArray(users) ? (
                        users.map((user, index) => (
                            <tr key={index}>
                                <td data-label="Name">{user.username}</td>
                                <td data-label="Email">{user.email}</td>
                                <td data-label="Phone">{user.phone}</td>
                                <td data-label="Update"><NavLink aria-label="Go to the Admin Users Edit Page" className={styles.link} to={`/admin/users/${user._id}/edit`}><button className={styles.updateUser} onClick={() => editUser(user._id)}>Edit</button></NavLink></td>
                                <td data-label="Delete"><button className={styles.deleteUser} onClick={() => deleteUser(user._id)}>Delete</button></td>
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

export default AdminUsers;