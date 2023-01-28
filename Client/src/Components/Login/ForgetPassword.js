import { useFormik } from "formik";
import { config } from "../../config";
import axios from "axios";
import { useNavigate ,Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
function Resetpassword () {
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
          useremail: ""
        },
        validate: (values) => {
          let error = {};
         
          if (!values.useremail) {
            error.useremail = "Please enter your email";
          }
          if (
            values.useremail &&
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.useremail)
          ) {
            error.useremail = "Invalid email address";
          }
         
    
          return error;
        },
        onSubmit: async (values) => {
          try {
         const forgetpassword=   await axios.post(`${config.api}/forgot-password`, values);
            
            toast(forgetpassword.data.message, {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
              });
              setTimeout(() => {  navigate("/")}, 3000);
           
          } catch (error) {
            console.log("login error");
            alert("Incorrect email / User Not Exists!!")
          }
        },
      });
    return(
        <> 
        <div class="container d-flex flex-column">
        <div class="row align-items-center justify-content-center
            min-vh-100 g-0">
          <div class="col-12 col-md-8 col-lg-4 border-top border-3 border-primary">
            <div class="card shadow-sm">
              <div class="card-body">
                <div class="mb-4">
                  <h5>Forgot Password?</h5>
                  <p class="mb-2">Enter your registered email ID to reset the password
                  </p>
                </div>
                <form onSubmit={formik.handleSubmit}>
                  <div class="mb-3">
                    <label for="email" class="form-label">Email</label>
                    <input type="email" id="email" className={`form-control form-control-lg ${
                  formik.touched.useremail && formik.errors.useremail ? "error-box" : "null"
                } ${
                  formik.touched.useremail && !formik.errors.useremail
                    ? "success-box"
                    : "null"
                }`} name="useremail" placeholder="Enter Your Email"
                      required="" onChange={formik.handleChange}
                      value={formik.values.useremail}/>
                       {formik.errors.useremail ? (
                <div style={{ color: "red" }}>{formik.errors.useremail}</div>
              ) : null}
                  </div>
                  <div class="mb-3 d-grid">
                    <input type="submit" class="btn btn-primary"/>
                     
                  </div>
                  <label>
                  Already have an account? 
                            <Link style={{ color: "blue" }} to="/">
                              {" "}
                              Login
                            </Link><ToastContainer />
                          </label>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
        
        </>
    )
}
export default Resetpassword