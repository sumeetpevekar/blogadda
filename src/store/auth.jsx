import { createContext, useContext, useEffect, useMemo, useState } from "react";

export const AuthContext = createContext([{
    storeTokenInLocale : () => {},
    LogoutUser : () => {},
}])

const AuthProvider = ({children}) => {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [user, setUser] = useState('');
    const [isLoading, setIsLoading] = useState(true)
    const [loading, setLoading] = useState("")
    const [blogs,  setBlogs] = useState([]);
    const [singleBlog, setSingleBlog] = useState(localStorage.getItem('blogId'));
    const AuthorizationToken = `Bearer ${token}`;
    const [userBlogs, setUserBlogs] =  useState([]);

    // console.log(singleBlog)
    // storing token in localStorage
    const storeTokenInLocale = (token) => {
        setToken(token)
        return localStorage.setItem('token', token);
    }
    // storing blog id token in localStorage
    const storeBlogIdTokenInLocale = (token) => {
        setSingleBlog(token)
        return localStorage.setItem('blogId', token);
    }
    // logout operation
    const LogoutUser = () => {
        setToken("");
        localStorage.removeItem("currentSearchPage");
        localStorage.removeItem("currentPage");
        return localStorage.removeItem("token");
    }
    // check whether user is logged in
    const isLoggedIn = !!token;

    // JWT authentication - to get currently logged in user data
    const userAuthentication = async () => {
        try{
            setIsLoading(true);
            const response = await fetch("https://blogadda-api.vercel.app/api/auth/user", {
                method : "GET",
                headers : {
                    Authorization: AuthorizationToken
                }
            })
            if(response.ok){
                const {userData} = await response.json();
                // console.log(userData);
                setUser(userData);
                setIsLoading(false);
            }else{
                console.log("Error fetching user data")
                setIsLoading(false);
            }
        }catch(error){
            console.log(error)
        }
    }

    // fetch blogs  data from the databse
    const getBlogsData = async () => {
        try{
            const response = await fetch("https://blogadda-api.vercel.app/api/user/blogs", {
                method : "GET",
            })
            const {message} = await response.json();
            console.log(message)
            setBlogs(message)
        }catch(error){
            console.log(error)
        }
    }
    // fetch user blogs  data from the databse
    const getUsersBlogs = async () => {
        try{    
            const response = await fetch(`https://blogadda-api.vercel.app/api/user/blogs/${user.username}/get`, {
                method: "GET",
                headers : {
                    "Authorization" : AuthorizationToken,
                }
            })
            const data = await response.json();
            // console.log(data)
            const blogData = data.message;
            console.log(blogData)
            if(response.ok){
                setUserBlogs(blogData);
            }
        }catch(error){
            console.log(error)
        }
        // console.log(userBlogs)
    }
    // search blog functionality
    const [filteredList, setFilteredList] = useState([]);
    const sortedBlogs = [...blogs].reverse();
    const [searchedBlog, setSearchedBlog] = useState(localStorage.getItem('searchBlog'));

    const setSearchBlog = (searchValue) => {
        localStorage.setItem("searchBlog", searchValue);
        const searchList = sortedBlogs.filter((item) =>
            item.body.toLowerCase().includes(searchValue) || item.title.toLowerCase().includes(searchValue)
        );
        setFilteredList(searchList);
        console.log("called", searchValue);
    }

    const loadFilteredList = () => {
        console.log(searchedBlog);
        const searchList = sortedBlogs.filter((item) =>
            item.body.toLowerCase().includes(searchedBlog) || item.title.toLowerCase().includes(searchedBlog)
        );
        setFilteredList(searchList);
        // console.log(filteredList);
        console.log("called");
    }
   useEffect(() => { 
        loadFilteredList();
   }, [user]);

    useEffect(() => {
        getBlogsData();
        userAuthentication();
        getUsersBlogs();
        token;
    }, [token])

    return <AuthContext.Provider value={{
        AuthorizationToken,
        user,
        storeTokenInLocale,
        storeBlogIdTokenInLocale,
        LogoutUser,
        isLoggedIn,
        isLoading,
        userAuthentication,
        token,
        blogs,
        getBlogsData,
        setSingleBlog,
        singleBlog,
        getUsersBlogs,
        userBlogs,
        sortedBlogs,
        filteredList,
        setFilteredList,
        setSearchBlog,
    }}>
        {children}
    </AuthContext.Provider>
}
export default AuthProvider;

export const useAuth = () => {
    const AuthContextValue = useContext(AuthContext);
    if(!AuthContextValue){
        throw new Error("useAuth used outside of the Provider")
    }
    return AuthContextValue;
}