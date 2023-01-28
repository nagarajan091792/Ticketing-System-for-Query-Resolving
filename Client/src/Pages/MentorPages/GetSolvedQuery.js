
import axios from "axios";
import { useEffect, useState } from "react";
import { config } from "../../config";
import { Link } from "react-router-dom"

function GetSolvedQuery(){
  const [user, setUser] = useState([]);
	 const [isloading,setloading] = useState(false)
  useEffect(() => {fetchData(); },[]);

  let fetchData = async () => {
    try {
	    setloading(true)
      let response = await axios.get(`${config.api}/mentorportal/getsolvedquery`, {
        headers: {
          'authorization': `${localStorage.getItem('mentortoken')}`
        }   
      }); 
    setUser(response.data);
	    setloading(false)
    } catch (error) {
      console.log(error)
    }
 
  };
    return(
        <>
       <h2 class="text-center">Solved Queries</h2>
        {
                isloading ?  <div class="d-flex justify-content-center">
                <div class="spinner-border m-5" role="status">
                  
                </div>
              </div> :
	   <div> 
       {user.slice(0).reverse().map((e) => {
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
                    to={`/mentorportal/solvedquery/${e._id}`}
                    className="btn btn-primary"
                  >
                    Open
                  </Link>
	</div>
</div>
</div>
</div></div>
       
       );
      })} </div>}   
        </>
    )
}
export default GetSolvedQuery;
