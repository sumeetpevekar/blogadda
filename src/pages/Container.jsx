import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";

const Container = () => {
    return (
        <>
        <div className="mainContainer">
        <Header></Header>
           <Outlet />
        <Footer></Footer>
        </div>
        </>
    )
}
export default Container;