import {BrowserRouter, Route, Routes} from "react-router-dom"
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Error from "./pages/Error";
import Logout from "./pages/Logout";
import AdminUsers from "./components/layouts/AdminUsers";
import AdminContacts from "./components/layouts/AdminContacts";
import AdminContainer from "./components/layouts/AdminPageContainer";
import Container from "./pages/Container";
import AdminUserUpdate from "./components/layouts/AdminUserUpdate";
import { useAuth } from "./store/auth";
import UserProfile from "./pages/UserProfile";
import UpdateUserDetails from "./components/UpdateUserDetails";
import Blogs from "./pages/Blogs";
import AdminBlogs from "./components/layouts/AdminBlogs";
import CreateBlog from "./components/CreateBlog";
import AdminBlogUpdate from "./components/layouts/AdminBlogUpdate";
import UserBlogUpdate from "./components/UserBlogUpdate";
import SearchBlog from "./pages/SearchBlog";
const App = () => {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" Component={Container} >
        <Route path="/"  Component={Home} />
        <Route path="/about"  Component={About} />
        <Route path="/search/:data"  Component={SearchBlog} />
        <Route path="/contact"  Component={Contact} />
        <Route path="/login"  Component={Login} />
        <Route path="/register"  Component={Register} />
        <Route path="/logout"  Component={Logout} />
        <Route path="/create-blog"  Component={CreateBlog} />
        <Route path="/my/profile"  Component={UserProfile} />
        <Route path="/my/profile/update-details"  Component={UpdateUserDetails} />
        <Route path="/my/profile/blog/edit/:id"  Component={UserBlogUpdate} />
        <Route path="/blog/:title" Component={Blogs} />
      </Route>
      <Route path="/admin" Component={AdminContainer}>
        <Route path="users" Component={AdminUsers}/>
        <Route path="blogs" Component={AdminBlogs}/>
        <Route path="contacts" Component={AdminContacts}/>
        <Route path="users/:id/edit" Component={AdminUserUpdate}/>
        <Route path="blogs/:id/edit" Component={AdminBlogUpdate}/>
      </Route>
      <Route path="*"  Component={Error} />
    </Routes>
    </BrowserRouter>
    </>
  )
}
export default App;