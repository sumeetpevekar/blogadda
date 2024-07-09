import { useEffect, useState } from "react"
import styles from "./styles/AdminUserUpdate.module.css"
import { useAuth } from "../../store/auth"
import { Form, useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify";

const AdminUserUpdate = () => {
    const navigate = useNavigate();
    const [data, setData] = useState({
        username : "",
        phone : "",
        email: "",
    })
    const {AuthorizationToken} = useAuth();
    const params = useParams();
    console.log(params.id);
    const getSingleUserData = async () => {
        try{
            const response = await fetch(`https://blogadda-api.vercel.app/api/admin/users/${params.id}/edit`, {
                method : "GET",
                headers : {
                    "Authorization" :  AuthorizationToken,
                }
            })
            const {message} = await response.json();
            console.log(message)
            setData(message)
        }catch(err){
            console.log(err)
        }
    }
    useEffect(() => {
        getSingleUserData();
    }, [])
    const handleInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setData({
            ...data,
            [name] : value,
        })
        console.log(e.target.value)
    }
    const handleSubmit = async () => {
        event.preventDefault();
        try{
            const response = await fetch(`https://blogadda-api.vercel.app/api/admin/users/update/${params.id}`, {
                method : "PATCH",
                headers : {
                    "Authorization" : AuthorizationToken,
                    "Content-Type": "application/json"
                },
                body : JSON.stringify(data)
            })
            if(response.ok){
                toast.success("Updated successfully");
                navigate("/admin/users");
            }else{
                toast.error("Not updated")
            }
        }catch(err){
            console.log(err)
        }
    }
    return (
        <section className={styles.mainContainer}>
            <div className={styles.container}>
                <h1 className={styles.heading}>Update User Data</h1>
                <form onSubmit={handleSubmit} className={styles.inputContainer}>
                <label htmlFor="username" className={styles.label}>Username</label>
                <input type="text" id="username" name="username" value={data.username}  onInput={handleInput} className={styles.input}/>
                <label htmlFor="email" className={styles.label}>Email</label>
                <input type="email" id="email" name="email" value={data.email}  onInput={handleInput} className={styles.input}/>
                <label htmlFor="phone" className={styles.label}>Mobile</label>
                <input type="number" id="phone" name="phone" value={data.phone}  onInput={handleInput} className={`${styles.input} ${styles.inputNumber}`}/>
                <button type="submit" className={styles.updateBtn}>Update</button>
                </form>
            </div>
        </section>
    )
}
export default AdminUserUpdate;