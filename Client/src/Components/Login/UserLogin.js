import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useFormik } from "formik";
import { config } from "../../config";
import "./Login.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function UserLogin () {
  

  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      useremail: "",
      userpassword: "",
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
      if (!values.userpassword) {
        error.userpassword = "Please enter your password";
      }
      if (values.userpassword && (values.userpassword.length < 8 || values.userpassword.length > 20)) {
        error.userpassword = "Password minimum 8 to 20 Characters";
      }

      return error;
    },
    onSubmit: async (values) => {
      try {
        const login = await axios.post(`${config.api}/user/login`, values);
        toast(login.data.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          });
        
       
        localStorage.setItem("usertoken", login.data.usertoken);
        localStorage.setItem("username", login.data.username);
       
        if (login.data.message === "Successfully Login") {
         
         setTimeout(() => { navigate("/userportal/class")}, 3000);
       
         
        } else {
          navigate("/");
        }
      } catch (error) {
        console.log("login error");
      }
    },
  });


    return (
<>
<section class="vh-150 gradient-custom">
  <div class="container py-5 h-100">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col-12 col-md-8 col-lg-6 col-xl-5">
        <div class="card bg-dark text-white" style={{borderRadius: "1rem"}}>
            <form onSubmit={formik.handleSubmit}>
          <div class="card-body p-5 text-center">

            <div class="mb-md-5 mt-md-3 pb-2">

              <h2 class="fw-bold mb-2 text-uppercase">Login</h2>
              <p class="text-white-50 mb-5">Please enter your login and password!</p>

              <div class="form-outline form-white mb-4">
              <label class="form-label" for="typeEmailX">Email</label>
                <input  id="typeEmailX" className={`form-control form-control-lg ${
                  formik.touched.useremail && formik.errors.useremail ? "error-box" : "null"
                } ${
                  formik.touched.useremail && !formik.errors.useremail
                    ? "success-box"
                    : "null"
                }`} name="useremail" onChange={formik.handleChange} value={formik.values.useremail} />
                {formik.errors.useremail ? (
                <div style={{ color: "red" }}>{formik.errors.useremail}</div>
              ) : null}
                
              </div>

              <div class="form-outline form-white mb-4">
              <label class="form-label" for="typePasswordX">Password</label>
                <input type="password" id="typePasswordX" className={`form-control form-control-lg ${
                  formik.touched.userpassword && formik.errors.userpassword ? "error-box" : "null"
                } ${
                  formik.touched.userpassword && !formik.errors.userpassword
                    ? "success-box"
                    : "null"
                }`} name="userpassword" onChange={formik.handleChange} value={formik.values.userpassword} />
                {formik.errors.userpassword ? (
                <div style={{ color: "red" }}>{formik.errors.userpassword}</div>
              ) : null}
                
              </div>

              <p class="small mb-5 pb-lg-2">
                <Link class="text-white-50" to="/user/forgetpassword">Forgot password?</Link></p>

              <button class="btn btn-outline-light btn-lg px-5" type="submit" value="Login" >Login</button>
              <ToastContainer />
             

            </div>

            <div>
              <p class="mb-0">Don't have an account? <Link to="/user/register" class="text-white-50 fw-bold">Sign Up</Link>
              </p>
              <p class="mb-0">Go to MentorLogin <Link to="/mentor/login" class="text-white-50 fw-bold">MentorLogin</Link>
              </p>
            </div>
            
          </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</section>

</>

    )
}
export default UserLogin;
