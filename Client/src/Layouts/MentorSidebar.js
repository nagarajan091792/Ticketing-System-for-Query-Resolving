import React from "react";
import { 
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem } from "cdbreact";
import { NavLink } from "react-router-dom";

const MentorSidebar = () => {

  return (
    <div
      className={`app`}
      style={{ display: "flex", height: "100%", overflow:"scroll initial"}}
    >
      <CDBSidebar
        textColor="#fff"
        backgroundColor="#333"
      >
        <CDBSidebarHeader
          prefix={
            <i className="fa fa-bars fa-large"></i>
          }
        >
          <a href="/" className="text-decoration-none" style={{color:"white"}}>
            Zenclass
          </a>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
           
            <NavLink
              exact
              to="/mentorportal/getunsolvedquery"
              activeClassName="activeClicked"
            >
              <CDBSidebarMenuItem
                icon="exclamation-circle"
              >
                Unsolve Query
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink
              exact
              to="/mentorportal/getsolvedquery"
              activeClassName="exclamation-circle"
            >
              <CDBSidebarMenuItem
                icon="columns"
              >
                Solve Query
              </CDBSidebarMenuItem>
            </NavLink>
           
          </CDBSidebarMenu>
          <CDBSidebarMenu>
          </CDBSidebarMenu>
        </CDBSidebarContent>

        <CDBSidebarFooter style={{ textAlign: "center" }}>
          <div
            className="sidebar-btn-wrapper"
            style={{
              padding: "20px 5px"
            }}
          >
           Mentors
          </div>
        </CDBSidebarFooter>
      </CDBSidebar>
    </div>
  );
}

export default MentorSidebar;
