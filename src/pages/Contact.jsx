import { useState } from "react";
import styles from "../components/styles/Contact.module.css"
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
const Contact = () => {
    const {user} = useAuth();

    const [contactUser, setContactUser] = useState({
        username : "",
        email : "",
        message: "",
    });
    const [userData, setUserData] = useState(true);
    if(userData && user){
        setContactUser({
            username : user.username,
            email : user.email,
            message : "",
        })
        setUserData(false)
    }
    const handleInput = (e) => {
        // console.log(e.target.value)
        let name = e.target.name;
        let value = e.target.value;
        setContactUser({...contactUser, 
            [name] : value,
        })
    }
    const handleSubmit = async (event) => {
        // console.log(event)
        event.preventDefault();
        // console.log(contactUser)
        try{
            const response = await fetch("https://blogadda-api.vercel.app/api/form/contact", {
                method : "POST",
                headers : {
                    "Content-Type" : "application/json",
                },
                body : JSON.stringify(contactUser),
            })
            // console.log(response); 
            const data = await response.json();
            // console.log(data)
            if(response.ok){
                setContactUser({
                    username : "",
                    email : "",
                    message : "",
                })
                toast.success("Message sent Successfully")
            }else{
                toast.warning(data.message)
            }
        }catch(error){
            console.log(error);
        }
    }
    return (
            <main>
                <div className={`${styles.sectionContact}`}>
                    <div className={`${styles.container}`}>
                        <div className={`${styles.contactImage}`}>
                            <h1 className={`${styles.mainHeading}`}>Contact Us</h1>
                            <img src="images/contact.jpg" alt="register-background-image"/>
                        </div>
                        <div className={`${styles.contactForm}`}>
                            <form action="" onSubmit={handleSubmit}>
                                <div>
                                <label htmlFor="username">Username</label>
                                    <input value={contactUser.username} onChange={handleInput} type="text" name="username" id="username"  required autoComplete="off"/>
                                </div>
                                <div>
                                <label htmlFor="email">Email</label>
                                    <input value={contactUser.email} onChange={handleInput}  type="email" name="email" id="email"  required autoComplete="off"/>
                                </div>
                                <div>
                                <label htmlFor="message">Message</label>
                                    <textarea className={styles.messageInput} value={contactUser.message} onChange={handleInput} name="message" id="message" cols="40" rows="10" required autoComplete="off"></textarea>
                                </div>
                                <br />
                                <button className={`${styles.submitBtn}`} type="submit">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
    )
}
export default Contact;