import { NavLink } from "react-router-dom";
import {useAuth} from "../../context/auth";
import { useNavigate } from "react-router-dom";
import Search from "../forms/Search";
import useCategory from "../../hooks/useCategory";

export default function Menu () 
{
    //context 
    const [auth,setAuth] = useAuth();

    //hooks
    const categories = useCategory();
    const navigate = useNavigate();


    console.log('categories in menu=>',categories);     


    const logout = () => 
    {
        setAuth({...auth,user:null,token:""});
        localStorage.removeItem("auth");
        navigate("/login");
    }
    return( <>

    <ul className="nav d-flex justify-content-between shadow-sm mb-2">
        <li className="nav-item">
            <NavLink className="nav-link " aria-current="page" to="/">Home</NavLink>
        </li>

        <li className="nav-item">
            <NavLink className="nav-link " aria-current="page" to="/shop">Shop</NavLink>
        </li>

        <Search/>

        
                {/* condition ? true : false*/}
        {!auth?.user ?  
        (
                    <>

                    <li className="nav-item">
                    <NavLink className="nav-link" to="/login">Login</NavLink>
                    </li>
            
                    <li className="nav-item">
                    <NavLink className="nav-link" to="/register">Register</NavLink>
                    </li>
            
                    </>
        ) : 
        (
            <div className="dropdown">
                <li>
                    <a className="nav-link pointer dropdown-toggle" data-bs-toggle ="dropdown">
                        {auth?.user?.name}
                    </a>

                    <ul className="dropdown-menu ">
                    <li>
                        <li className="nav-item">
                        <NavLink className="nav-link" to={`/dashboard/${auth?.user?.role === 1 ?'admin':'user'}`}>Dashboard</NavLink>
                        </li>

                        <li className="nav-item pointer">
                            <a onClick={logout} className="nav-link" >Logout</a>
                        </li>  
                    </li>
                </ul>

                </li>

               

                 
            </div>
            
      
        )}



    </ul>

            </>)
    
};