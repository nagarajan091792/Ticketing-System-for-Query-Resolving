
import { Outlet } from "react-router-dom";
import UserSidebar from "../Layouts/UserSidebar";
import UserTopbar from "../Layouts/UserTopbar";


function UserPortal() {

    return (
      <div className="dashboard d-flex">
    	<div>
      	<UserSidebar/>
      </div>
      <div style={{flex:"1 1 auto", display:"flex", flexFlow:"column", height:"100vh", overflowY:"hidden"}}>
        <UserTopbar/> 
        <div style={{height:"100%"}}>
	        <div style={{height:"calc(100% - 64px)", overflowY:"scroll"}}>
                     <Outlet/>
                     
                    </div></div>
        </div></div>

    )
}

export default UserPortal;
