import axios from "axios";
import { useEffect, useState } from "react";
import { config } from "../../config";
import { Link } from "react-router-dom"

function Dashboard(){
  const [user, setUser] = useState([]);
  const [isloading,setloading] = useState(false)
  useEffect(() => {fetchData(); },[]);
  let fetchData = async () => {
    try {
	    setloading(true)
      let response = await axios.get(`${config.api}/userportal/getquery`, {
        headers: {
          'authorization': `${localStorage.getItem('usertoken')}`
        }   
      }); 
    setUser(response.data);
     setloading(false)
    
    } catch (error) {
      console.log(error)
    }
  }
    return(
        <>
        <div class="card-body d-flex flex-column align-items-center" style={{margin:"10px"}}>
       <Link to="/userportal/addquery"><button class=" btn btn-outline-primary "> + Create Query</button></Link> 
        </div>
     {
                isloading ? <div class="d-flex justify-content-center">
  <div class="spinner-border m-5" role="status">
    <span class="sr-only">Loading...</span>
  </div>
</div> :  
       <div> {user.slice(0).reverse().map((e) => {
        return (
         
        <div class="container mb-1"> 
        <div class="card w-90" >
  <div class="card-body">
    
  <div class="container">
  <div className=" badge text-bg-success">{e.action}</div> 
  <div className=" text-end"><b>{e.querycode} - {e.querytitle}</b></div>
 
  
  <div style={{color:"blue"}}>{e.category}</div>
 <div style={{color:"blue"}} className=" text-end">{e.date}</div>

	<div class="text-center">
	  
     <Link
                    to={`/userportal/query/${e._id}`}
                    className="btn btn-primary "
                   
                  >
                   Open
                  </Link>
	</div>
</div>
</div>
</div></div>


       
       );
      })}</div>    }
        </>
    )
}
export default Dashboard
