import { Navigate, Outlet } from "react-router-dom"


const MentorPrivateRoutes = () => {
    
    let auth = localStorage.getItem("mentortoken")
    return(
        auth ? <Outlet/> : <Navigate to="/"/>
    )
}
export default MentorPrivateRoutes