import styles from "../components/styles/About.module.css"
import { useAuth } from "../store/auth";
const About = () => {
    const {user} = useAuth();
    return (
            <main>
                <div className={`${styles.sectionAbout}`}>
                    <div className={`${styles.container}`}>
                        <div className={`${styles.aboutPara}`}>
                            {user ?  <p>Hello {user.username}</p> : ""}
                            <h1 >Welcome to Blog Adda</h1>
                            <br />
                            <div>
                            Your ultimate destination for insightful content and engaging discussions! At Blogs Adda, we're passionate about creating a platform where readers can discover enriching articles, ranging from lifestyle and wellness to technology and beyond. 
                            <br /><br />
                            Our team of talented writers and contributors strives to deliver thought-provoking content that not only informs but also inspires. Whether you're seeking practical advice, exploring new perspectives, or simply looking for a dose of inspiration, you'll find it all here at Blogs Adda. 
                            <br /><br />
                            Join us on this journey as we explore the vast landscape of ideas, creativity, and knowledge, one blog post at a time. Thank you for being a part of our community!
                            </div>
                        </div>
                        <div className={`${styles.aboutImage}`}>
                            <img src="images/about.jpg" alt="register-background-image"/>
                        </div>
                    </div>
                </div>
            </main>
    )
}
export default About;