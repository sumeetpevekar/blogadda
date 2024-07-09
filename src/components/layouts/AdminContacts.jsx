import { useEffect, useState } from "react";
import { useAuth } from "../../store/auth";
import styles from "./styles/AdminContacts.module.css"
import "./styles/AdminUserTable.css"
import { toast } from "react-toastify";

const AdminContacts = () => {
    const {AuthorizationToken} = useAuth();
    const [messages, setMessages] = useState([])
    const getAllContactsData = async () => {
        try{
            const response = await fetch("http://localhost:5000/api/admin/contacts", {
                method : "GET",
                headers : {
                    "Authorization" : AuthorizationToken,
                }
            })
            const {message} = await response.json();
            console.log(message)
            setMessages(message);
        }catch(error){
            console.log(error);
        }
    }
    const deleteMessage = async (id) => {
            try{

                const response = await fetch(`http://localhost:5000/api/admin/contacts/delete/${id}`, {
                    method : "DELETE",
                    headers : {
                        "Authorization" : AuthorizationToken,
                    }
                })
                const data = await response.json();
                console.log(data)
                if(response.ok){
                    toast.success("Deleted successfully")
                    getAllContactsData();
                }else{
                    toast.error("Not updated")
                }
            }catch(error){
                console.log(error);
            }
        }
    useEffect(() => {
        getAllContactsData();
    }, [])
    return (
        <section className={styles.AdminUsersSection}>
            <div className={styles.container}>
                <h1 className={styles.heading}>Contacts data</h1>
                <div className={styles.adminUsers}>
                    <table className="tbl">
                        <thead className="thead">
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Message</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                        {Array.isArray(messages) ? (
                        messages.map((message, index) => (
                            <tr key={index}>
                                <td data-label="Name">{message.username}</td>
                                <td data-label="Email">{message.email}</td>
                                <td data-label="Message" className="messageTdBox"><div className="messageTd">{message.message}</div></td>
                                <td data-label="Delete"><button className={styles.deleteUser} onClick={() => deleteMessage(message._id)}>Delete</button></td>
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
export default AdminContacts;