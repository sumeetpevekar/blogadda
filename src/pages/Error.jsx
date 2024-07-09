import { NavLink } from "react-router-dom";
import styles from "../components/styles/Error.module.css"
const Error = () => {
  return (
    <section id={styles.errorPage}>
        <div className={styles.content}>
            <h2 className={styles.header}>404</h2>
            <h4>Sorry! Page not found</h4>
            <p>
            Oops! It seems like the page you're trying to access doesn't exist. If
            you believe there's an issue, feel free to report it, and we'll look
            into it.
            </p>
            <div className={styles.btns}>
            <NavLink aria-label="Go to the home Page" className={styles.link} to="/">return home</NavLink>
            <NavLink aria-label="Go to the contact Page" className={styles.link} to="/contact">report problem</NavLink>
            </div>
        </div>
    </section>
  );
};
export default Error;
