import { useNavigate } from "react-router-dom";
import styles from "../components/styles/UpdateUserDetails.module.css"
import { IoIosLogOut } from "react-icons/io";
import { useAuth } from "../store/auth";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const UpdateUserDetails = () => {
    const {user, AuthorizationToken, userAuthentication, token} = useAuth();
    const navigate = useNavigate()
    if(!token){
        navigate("/")
    }
    console.log(user)
    const [data, setData] = useState({
        name : "",
        username : "",
        phone : "",
        email: "",
    })
    useEffect(() => {
        setData(user)
    }, [user])
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
            const response = await fetch(`https://blogadda-api.vercel.app/api/user/update-user-details/${user._id}`, {
                method : "PATCH",
                headers : {
                    "Content-Type": "application/json",
                    "Authorization" : AuthorizationToken
                },
                body : JSON.stringify(data)
            })
            const gettingResponse = await response.json();
            console.log(gettingResponse)
            console.log(response)
            if(response.ok){
                toast.success("Updated successfully")
                navigate("/my/profile")
                userAuthentication();
            }else{
                toast.warning(gettingResponse.extraDetails ? gettingResponse.extraDetails : gettingResponse.message)
                // toast.error("Not updated")
            }
        }catch(err){
            console.log(err)
        }
    }
    return (
        <div className={styles.container}>
            <div className={styles.detailsContainer}>
                <div>
                    <h2>Edit Details</h2>
                </div>
                <form className={styles.profileInfoTable} onSubmit={handleSubmit}>
                <label htmlFor="name">Full Name</label>
                <input  onChange={handleInput} value={data.name} className={styles.input}  type="text" name="name" id="name"/>
                <label htmlFor="username">Username</label>
                <input onChange={handleInput} readOnly value={data.username} className={styles.input}  type="text" name="username" id="username"/>
                <label htmlFor="phone">Mobile Number</label>
                <input  onChange={handleInput} value={data.phone}  className={`${styles.input} ${styles.inputNumber}`}  type="number" name="phone" id="phone"/>
                <label htmlFor="email">Email ID</label>
                <input onChange={handleInput} readOnly value={data.email} className={styles.input}  type="email" name="email" id="email"/>
                <button type="submit" className={styles.editBtn}>Save Details</button>
                </form>
            </div>
        </div>
    )
}
export default UpdateUserDetails;