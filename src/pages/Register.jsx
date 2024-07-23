import { useContext, useState } from "react";
import styles from "../components/styles/Register.module.css"
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
// const {storeTokenInLocale} = useAuth();

const Register = () => {
    const [user, setUser] = useState({
        name : "",
        username : "",
        email : "",
        phone : "",
        password: "",
    });
    const handleInput = (e) => {
        // console.log(e.target.value)
        let name = e.target.name;
        let value = e.target.value;
        setUser({...user, 
            [name] : value.trim(),
        })
    }
    const navigate = useNavigate()
    const handleSubmit = async (event) => {
        event.preventDefault();
        // console.log(event)
        // console.log(user)
        if(user.username.includes(" ")){
            return toast.warning("Username cannot include spaces");
        }
        try{
            const response = await fetch("https://blogadda-api.vercel.app/api/auth/register", {
                method: "POST",
                headers : {
                    "Content-Type" : "application/json",
                },
                body : JSON.stringify(user)
            });
            const data = await response.json();
            // console.log(data);
            // console.log(response)
            if(response.ok){
                storeTokenInLocale(data.token);
                setUser({name : "", username : "", email : "", phone : "", password: ""})
                navigate("/")
                toast.success("Registration successful");
            }else{
                toast.warning(data.extraDetails ? data.extraDetails : data.message);
            }
        }catch(err){
            console.log("register", err)
        }
    }
    return (
            <main>
                <div className={`${styles.sectionRegistration}`}>
                    <div className={`${styles.container}`}>
                        <div className={`${styles.registrationImage}`}>
                            <img src="images/registration.jpg" alt="register-background-image"/>
                        </div>
                        <div className={`${styles.registrationForm}`}>
                            <h1 className={`${styles.mainHeading}`}>Register</h1>
                            <br />
                            <form action="" onSubmit={handleSubmit}>
                                <div>
                                <label htmlFor="name">Name</label>
                                    <input value={user.name} onChange={handleInput} type="text" name="name" id="name" placeholder="name" required autoComplete="off"/>
                                </div>
                                <div>
                                <label htmlFor="username">UserName</label>
                                    <input value={user.username} onChange={handleInput} type="text" name="username" id="username" placeholder="username" required autoComplete="off"/>
                                </div>
                                <div>
                                <label htmlFor="email">Email</label>
                                    <input value={user.email} onChange={handleInput}  type="email" name="email" id="email" placeholder="Enter your email" required autoComplete="off"/>
                                </div>
                                <div>
                                <label htmlFor="phone">Phone</label>
                                    <input className={styles.inputNumber} value={user.phone} onChange={handleInput}  type="number" name="phone" id="phone" placeholder="phone" required autoComplete="off"/>
                                </div>
                                <div>
                                <label htmlFor="password">Password</label>
                                    <input value={user.password} onChange={handleInput}  type="password" name="password" id="password" placeholder="password" required autoComplete="off"/>
                                </div>
                                <br />
                                <button className={`${styles.submitBtn}`} type="submit">Register</button>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
    )
}
export default Register;