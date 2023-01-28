
import { Outlet } from "react-router-dom";
import MentorSidebar from "../Layouts/MentorSidebar";
import MentorTopbar from "../Layouts/MentorTopbar";


function MentorPortal() {

    return (
      <div className="dashboard d-flex">
    	<div>
      	<MentorSidebar/>
      </div>
      <div style={{flex:"1 1 auto", display:"flex", flexFlow:"column", height:"100vh", overflowY:"hidden"}}>
        <MentorTopbar/> 
        <div style={{height:"100%"}}>
	        <div style={{height:"calc(100% - 64px)", overflowY:"scroll"}}>
                     <Outlet/>
                     
                    </div></div>
        </div></div>

    )
}

export default MentorPortal;
