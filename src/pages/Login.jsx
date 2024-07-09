import { useState } from "react";
import styles from "../components/styles/Login.module.css"
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { FaRegEyeSlash, FaRegEye  } from "react-icons/fa";
const Login = () => {
    const {storeTokenInLocale} = useAuth();
    const [open, setOpen] = useState(false)
    const [loginUser, setLoginUser] = useState({
        emailOrUsername: "",
        password: "",
    });
    const viewPassword  = () => {
        setOpen(!open);
    }
    const handleInput = (e) => {
        console.log(e.target.value)
        let name = e.target.name;
        let value = e.target.value;
        setLoginUser({...loginUser, 
            [name] : value.trim(),
        })
    }
    const navigate = useNavigate()
    const handleSubmit = async (event) => {
        console.log(event)
        event.preventDefault();
        console.log(loginUser)
        try{
            const response  = await fetch("http://localhost:5000/api/auth/login", {
                method : "POST",
                headers : {
                    "Content-Type" : "application/json",
                },
                body: JSON.stringify(loginUser),
            })
            const data = await response.json();
            console.log(response)
            if(response.ok){
                setLoginUser({
                    emailOrUsername  : "",
                    password: "",
                })
                storeTokenInLocale(data.token);
                navigate("/")
                toast.success("Login successful")
            }else{
                toast.warning(data.extraDetails ? data.extraDetails : data.message)
                return;
            }
            console.log(response);
        }catch(error){
            console.log(error)
        }
    }
    return (
            <main>
                <div className={`${styles.sectionLogin}`}>
                    <div className={`${styles.container}`}>
                        <div className={`${styles.loginImage}`}>
                            <img src="images/login.jpg" alt="register-background-image"/>
                        </div>
                        <div className={`${styles.loginForm}`}>
                            <h1 className={`${styles.mainHeading}`}>Login</h1>
                            <br />
                            <form action="" onSubmit={handleSubmit} className={styles.formContainer}>
                                <div>
                                    <span><FaUser /></span>
                                    <input value={loginUser.emailOrUsername} onChange={handleInput}  type="text" name="emailOrUsername" id="emailOrUsername " placeholder="Email or Username" required autoComplete="off"/>
                                </div>
                                <div>
                                    <span><FaLock /></span>
                                    <input value={loginUser.password} onChange={handleInput} use  type={!open ? "password" : "text"} name="password" id="password" placeholder="Password" autoComplete="off"/>
                                    <span className={styles.viewToggle} onClick={viewPassword}>{!open ? <FaRegEyeSlash /> : <FaRegEye />}</span>
                                </div>
                                <button className={`${styles.submitBtn}`} type="submit">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
    )
}
export default Login;