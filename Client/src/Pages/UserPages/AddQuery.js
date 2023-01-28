import axios from "axios";
import "../../App.css";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { config } from "../../config";
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
function Addquery() {
  var randomstring = require("randomstring");
  let navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      category: "",
      language: "",
      batch:"",
      querytitle: "",
      querydescription: "",
      from: "",
      till:"",
      querycode: randomstring.generate({
        length: 7,
        charset: 'ZQS091J'

      }),
       date : new Date()
    },
    validate: (values) => {
      let error = {};
      if (!values.category) {
        error.category = "Please select your category";
      }
      if (!values.language) {
        error.language = "Please select your language";
      }
      if (!values.batch) {
        error.batch = "Please select your batch";
      }
      if (!values.querytitle) {
        error.querytitle = "Please enter your Query title";
      }
      if (
        values.querytitle &&
        (values.querytitle.length <= 15 || values.querytitle.length > 40)
      ) {
        error.querytitle = "Query title must be between 15 to 40 Characters";
      }
      if (!values.querydescription) {
        error.querydescription = "Please enter your Query description";
      }
      if (
        values.querydescription &&
        (values.querydescription.length <= 30 || values.querydescription.length > 240)
      ) {
        error.querydescription = "Query description must be between 30 to 240 Characters";
      }
      if (!values.from) {
        error.from = "Please select your from time";
      }
      if (!values.till) {
        error.till = "Please select your till time";
      }
      return error;
    },
    onSubmit: async (values) => {
      try {
        await axios.post(`${config.api}/userportal/addquery`, values, {
          headers: {
            authorization: `${localStorage.getItem("usertoken")}`,
          },
        });
        toast("Added Successfully", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          });
       
        setTimeout(() => {  navigate("/userportal/dashboard")}, 3000);
       
      } catch (error) {
        console.log(error);
      }
    },
  });
  return (
    <>
   <div className="container card-text " >
    <div className="row">
    <h1 style={{textAlign:"center",margin:"5px"}}>Create Query</h1>
    </div>
    <div className="row d-flex flex-column align-items-center " >
    <div class="card " style={{width: "40rem"}} >
    <form onSubmit={formik.handleSubmit}>
    <div class="card-body " >
      
    <div><b style={{ color: "blue" }}>Topic</b></div><br />
    <label>Category</label>
                <select className={`form-control w-50 ${
                  formik.touched.category && formik.errors.category
                    ? "error-box"
                    : "null"
                } ${
                  formik.touched.category && !formik.errors.category
                    ? "success-box"
                    : "null"
                }`} name="category" onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.category}>
                  <option value={""}>-- Select Category --</option>
                  <option>Zen class Doubt</option>
                  <option>Coordination Related</option>
                </select>
                {formik.errors.category ? (
                  <div style={{ color: "red" }}>
                    {formik.errors.category}
                  </div>
                ) : null}
                <label className="mt-4" >Prefered Communication Language</label>
                <select className={`form-control w-50 ${
                  formik.touched.language && formik.errors.language
                    ? "error-box"
                    : "null"
                } ${
                  formik.touched.language && !formik.errors.language
                    ? "success-box"
                    : "null"
                }`} name="language" onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.language}>
                  <option value={""}>-- Select Language --</option>
                  <option>Tamil</option>
                  <option>English</option>
                </select>
                {formik.errors.language ? (
                  <div style={{ color: "red" }}>
                    {formik.errors.language}
                  </div>
                ) : null}
                <label className="mt-4" >Select Your Batch</label>
                <select className={`form-control w-50 ${
                  formik.touched.batch && formik.errors.batch
                    ? "error-box"
                    : "null"
                } ${
                  formik.touched.batch && !formik.errors.batch
                    ? "success-box"
                    : "null"
                }`} name="batch" onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.batch}>
                  <option value={""}>-- Select Batch --</option>
                  <option>B-49WD</option>
                  <option>B-50WD</option>
                </select>
                {formik.errors.batch ? (
                  <div style={{ color: "red" }}>
                    {formik.errors.batch}
                  </div>
                ) : null}
                <br/>
                <div><b style={{ color: "blue" }}>Details</b></div><br />
                <label>Query Title</label>
                <input className={`form-control w-50 ${
                    formik.touched.querytitle && formik.errors.querytitle
                      ? "error-box"
                      : "null"
                  } ${
                    formik.touched.querytitle && !formik.errors.querytitle
                      ? "success-box"
                      : "null"
                  }`} placeholder="Enter the Query Title" name="querytitle" onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.querytitle}></input>
                  {formik.errors.querytitle ? (
                    <div style={{ color: "red" }}>
                      {formik.errors.querytitle}
                    </div>
                  ) : null}
                <label className="mt-4">Query Description</label>
                <textarea className={`form-control w-50 ${
                    formik.touched.querydescription && formik.errors.querydescription
                      ? "error-box"
                      : "null"
                  } ${
                    formik.touched.querydescription && !formik.errors.querydescription
                      ? "success-box"
                      : "null"
                  }`} placeholder="Enter the Description" rows="4" name="querydescription" onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.querydescription}></textarea>
                  {formik.errors.querydescription ? (
                    <div style={{ color: "red" }}>
                      {formik.errors.querydescription}
                    </div>
                  ) : null}
                <br/>
                <div><b style={{ color: "blue" }}>Your available time? (Ours: 9:00 AM - 7:00 PM)</b></div><br />   
                <label>From</label>
                <input type="time"    className={`form-control w-50 ${
                    formik.touched.from && formik.errors.from
                      ? "error-box"
                      : "null"
                  } ${
                    formik.touched.from && !formik.errors.from
                      ? "success-box"
                      : "null"
                  }`} name="from" onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.from}></input> 
                  {formik.errors.from ? (
                    <div style={{ color: "red" }}>
                      {formik.errors.from}
                    </div>
                  ) : null}
                <label className="mt-4">Till</label>
                <input type="time"  className={`form-control w-50 ${
                    formik.touched.till && formik.errors.till
                      ? "error-box"
                      : "null"
                  } ${
                    formik.touched.till && !formik.errors.till
                      ? "success-box"
                      : "null"
                  }`} name="till" onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.till}></input> 
                  {formik.errors.till ? (
                    <div style={{ color: "red" }}>
                      {formik.errors.till}
                    </div>
                  ) : null}<br/>
                <button type="button" class="btn btn-outline-primary m-1" onClick={() => navigate("/userportal/dashboard")}>Cencel</button>
                
                <button type="submit" className="btn btn-primary">Create</button>
                <ToastContainer />
                
    </div> </form>
    </div>
    </div>
    </div>
  
  
   
    
    </>
  )
}
export default Addquery;