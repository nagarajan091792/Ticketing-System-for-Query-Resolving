import { Navigate, Outlet } from "react-router-dom"


const UserPrivateRoutes = () => {
    
    let auth = localStorage.getItem("usertoken")
    return(
        auth ? <Outlet/> : <Navigate to="/"/>
    )
}
export default UserPrivateRoutes