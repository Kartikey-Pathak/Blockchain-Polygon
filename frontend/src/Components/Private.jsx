import { use } from "react";
import { Navigate,Outlet, useNavigate } from "react-router-dom";

function Private(){
    const navigate=useNavigate();
    const auth=localStorage.getItem('user');

    return auth?<Outlet/>: <Navigate to='/user/create'/>
}
export default Private;