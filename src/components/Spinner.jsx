import styles from "../components/styles/Spinner.module.css"
import { CgSpinner } from "react-icons/cg";

const Spinner = () => {
    return (
        <div className={styles.spinnerContainer}>
            <div className={styles.spinner}>
            <CgSpinner className={styles["spinner-icon"]} />
            </div>
        </div>
    )
}
export default Spinner;