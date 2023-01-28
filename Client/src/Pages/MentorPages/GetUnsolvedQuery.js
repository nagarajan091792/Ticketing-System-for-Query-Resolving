
import axios from "axios";
import { useEffect, useState } from "react";
import { config } from "../../config";
import { Link } from "react-router-dom"

function GetUnsolvedQuery(){
  const [user, setUser] = useState([]);
	const [isloading,setloading] = useState(false)
  useEffect(() => {fetchData(); },[]);
  let fetchData = async () => {
    try {
	    setloading(true)
      let response = await axios.get(`${config.api}/mentorportal/getunsolvedquery`, {
        headers: {
          'authorization': `${localStorage.getItem('mentortoken')}`
        }   
      }); 
    setUser(response.data);
	    setloading(false)
    } catch (error) {
      console.log(error)
    }
    let response = await axios.get(`${config.api}/mentorportal/getunsolvedquery`, {
      headers: {
        'authorization': `${localStorage.getItem('mentortoken')}`
      }   
    }); 
  setUser(response.data);
  };
    return(
        <>
       
       <h2 class="text-center">Unsolved Queries</h2>
	    {
                isloading ? <div class="d-flex justify-content-center">
                <div class="spinner-border m-5" role="status">
                 
                </div>
              </div> :
       <div> {user.map((e) => {
        return (
         
        <div class="container mb-1"> 
        <div class="card w-90" >
  <div class="card-body">
    
  <div class="container">
   
  <span><b>{e.querycode} - {e.querytitle}</b></span>
	<div style={{color:"blue"}}className=" text-end">{e.date}</div>
  <span style={{color:"blue"}}>{e.category}</span>
	<div class="text-center">
	  
     <Link
                    to={`/mentorportal/solvequery/${e._id}`}
                    className="btn btn-primary"
                  >
                    Open
                  </Link>
	</div>
</div>
</div>
</div></div>
       
       );
      })} </div>  } 
        </>
    )
}
export default GetUnsolvedQuery
