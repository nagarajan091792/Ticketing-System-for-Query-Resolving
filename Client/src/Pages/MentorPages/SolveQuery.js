import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { config } from "../../config";
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
function SolveQuery() {
    let navigate = useNavigate();
    const formik = useFormik({
      initialValues: {
          answerthequery :"",
solvementorname:"",
action:"Closed",
         solvedate : new Date()
      },
      validate: (values) => {
        let error = {};
        if (!values.solvementorname) {
          error.solvementorname = "Please select your Name";
        }
        if (!values.answerthequery) {
          error.answerthequery = "Please Solve the query";
        }
        if (
          values.answerthequery &&
          (values.answerthequery.length <= 25 || values.answerthequery.length > 250)
        ) {
          error.answerthequery = "Your Answer must be between 25 to 250 Characters";
        }
        return error;
      },
      onSubmit: async (values) => {
        try {
          await axios.put(`${config.api}/mentorportal/solvequery/${params.id}`, values, {
            headers: {
              authorization: `${localStorage.getItem("mentortoken")}`,
            },
          });
          toast("Query Solve Successfully", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            });
            
         
          setTimeout(() => {  navigate("/mentorportal/getunsolvedquery")}, 3000);
          
        } catch (error) {
          console.log(error);
        }
      },
    });

        let params = useParams();  
        const [user, setUser] = useState([]);
  const [isloading,setloading] = useState(false)
        useEffect(() => {fetchData(); },[]);
        async function fetchData() {
            try {
              setloading(true)
              const response = await axios.get(`${config.api}/portal/query/${params.id}`,            
                 {
                   headers: {
                    authorization: `${localStorage.getItem("mentortoken")}`,
                  },
                 })               
            setUser(response.data);  
              setloading(false)
            } catch (error) {
              
              console.log("error"+error);
            }
          }

          
        
        
          
    return (
        <>
        
       {
                isloading ?  <div class="d-flex justify-content-center">
                <div class="spinner-border m-5" role="status">
                  
                </div>
              </div> : 
            <div className="container">
                <div className="row">
                    <div class="card-group">
                        <div className="col-sm-6">
                        <div class="card" style={{height: "40rem"}}>
                                <div class="card-body">
                                <h2>Student Query Details </h2><hr/>
                                <p>Student Name - {user.username}</p>
                                <p>Batch: {user.batch}</p>
                                <p>Query - {user.querytitle}</p>
                                
                                <p>Description: {user.querydescription}</p>
                                <p>Category: {user.category}</p>
                                <p>Preferred Language:{user.language}</p>
                                <p>Created at: {user.date}</p>
                               
                                </div>
                            </div>
                            
                            </ div>
                        <div className="col-sm-6">
                        <div class="card" style={{height: "40rem"}}>
                                <div class="card-body">
<h2>Solve Query</h2><hr/>
<p>Hello  {user.username}</p>
<form onSubmit={formik.handleSubmit}>
<label>Mentor Name</label>
<select className={`form-control w-50 ${
                  formik.touched.solvementorname && formik.errors.solvementorname
                    ? "error-box"
                    : "null"
                } ${
                  formik.touched.solvementorname && !formik.errors.solvementorname
                    ? "success-box"
                    : "null"
                }`} name="solvementorname" onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.solvementorname}>
                  <option value={""}>-- Select Category --</option>
                  <option>Kumaran</option>
                  <option>Deepika</option>
                </select>
                {formik.errors.solvementorname ? (
                  <div style={{ color: "red" }}>
                    {formik.errors.solvementorname}
                  </div>
                ) : null}
<label className="mt-4">Answer the Query</label>
<textarea className={`form-control  ${
                    formik.touched.answerthequery && formik.errors.answerthequery
                      ? "error-box"
                      : "null"
                  } ${
                    formik.touched.answerthequery && !formik.errors.answerthequery
                      ? "success-box"
                      : "null"
                  }`} placeholder="Enter the Description" rows="10" cols="50" name="answerthequery" onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.answerthequery} ></textarea>
                   {formik.errors.answerthequery ? (
                    <div style={{ color: "red" }}>
                      {formik.errors.answerthequery}
                    </div>
                  ) : null}
<button type="submit" className="btn btn-primary mt-2">Submit</button> <ToastContainer />
</form>
                                </div>
                            </div>
                        </div>
                        </div>
                </div>
            </div>
            }
        </>
    )
}
export default SolveQuery;
