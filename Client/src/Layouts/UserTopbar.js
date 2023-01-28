import React from "react";
import {  useNavigate } from "react-router-dom";
import { CDBNavbar} from "cdbreact";
import { Header } from "./Topbar.style";

const UserTopbar = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");

  
  let logout = () => {
     localStorage.removeItem("usertoken");
    localStorage.removeItem("username");
    // localStorage.clear()
    navigate("/");
  };
 
	return (
        <Header style={{background:"#333", color:"#fff"}}>
          <CDBNavbar dark expand="md" scrolling className="justify-content-start">
            <h1 >Hello {username} </h1>
           
            <button style={{marginLeft:"auto"}} type="button" class="btn btn-danger" onClick={logout} >Logout</button>
            
            
            
          </CDBNavbar>
        </Header>
	);
}

export default UserTopbar;
