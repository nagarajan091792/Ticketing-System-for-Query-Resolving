import React from "react";
import {  useNavigate } from "react-router-dom";
import { CDBNavbar} from "cdbreact";
import { Header } from "./Topbar.style";

const MentorTopbar = () => {
  const navigate = useNavigate();
  
  const mentorname = localStorage.getItem("mentorname");
  
  let logout = () => {
    localStorage.removeItem("mentortoken");
    localStorage.removeItem("mentorname");
    navigate("/");
  };
 
	return (
        <Header style={{background:"#333", color:"#fff"}}>
          <CDBNavbar dark expand="md" scrolling className="justify-content-start">
            <h1 >Hello {mentorname}</h1>
           
            <button style={{marginLeft:"auto"}} type="button" class="btn btn-danger" onClick={logout} >Logout</button>
            
            
            
          </CDBNavbar>
        </Header>
	);
}

export default MentorTopbar;
