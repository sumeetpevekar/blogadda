import { useEffect, useState } from "react";
import styles from "../components/styles/Login.module.css"
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { FaRegEyeSlash, FaRegEye  } from "react-icons/fa";
import { useGoogleLogin } from '@react-oauth/google'

const Login = () => {
    const {storeTokenInLocale} = useAuth();
    const [open, setOpen] = useState(false);
    const [errorInfo, setErrorInfo] = useState(null);
    const [authInfo, setAuthInfo] = useState(null);
    const [loginUser, setLoginUser] = useState({
        emailOrUsername: "",
        password: "",
    });
    const viewPassword  = () => {
        setOpen(!open);
    }
    const handleInput = (e) => {
        // console.log(e.target.value)
        let name = e.target.name;
        let value = e.target.value;
        setLoginUser({...loginUser, 
            [name] : value.trim(),
        })
    }
    const navigate = useNavigate()
    const handleSubmit = async (event) => {
        // console.log(event)
        event.preventDefault();
        // console.log(loginUser)
        try{
            const response  = await fetch("https://blogadda-api.vercel.app/api/auth/login", {
                method : "POST",
                headers : {
                    "Content-Type" : "application/json",
                },
                body: JSON.stringify(loginUser),
            })
            const data = await response.json();
            // console.log(response)
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
            // console.log(response);
        }catch(error){
            console.log(error)
        }
    }
    const googleAuth = useGoogleLogin({
        onSuccess : (response) => setAuthInfo(response),
        onError : (error) => setErrorInfo(error)
    });
    const googleLogin = async (data) => {
        const res = await fetch("https://blogadda-api.vercel.app/api/auth/googleLogin", {
            method: "POST",
            headers: {
                "Content-Type" : "application/json",
            },
            body: JSON.stringify(data)
        });
        const response = await res.json();
        console.log(response);
        if(res.ok){
            const token = response.token.replace("Bearer ", "");
            storeTokenInLocale(token);
            navigate("/")
            toast.success("Login successful")
        }   
    }
    const fetchProfileInfo  = async ( ) => {
        try{
          const res = await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${authInfo?.access_token}`, {
            method: "GET",
            headers : {
              Authorization : `Bearer ${authInfo?.access_token}`,
              Accept: 'application/json',
            }
          });
          const response = await res.json();
          console.log(response);
          if(res.ok){
            googleLogin(response);
          }
        }catch(error){
          console.log(error);
        }
      }
      useEffect(() => {
        if(authInfo) fetchProfileInfo();
      }, [authInfo]);
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
                            <div style={{margin: "20px"}}>or</div>
                            <button className={`${styles.googleButton}`} type="button" onClick={googleAuth}>
                                <img src="images/google.png" alt="" />
                                Continue with Google
                            </button>
                        </div>
                    </div>
                </div>
            </main>
    )
}
export default Login;