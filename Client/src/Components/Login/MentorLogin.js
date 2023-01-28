import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useFormik } from "formik";
import { config } from "../../config";
import "./Login.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function MentorLogin () {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      mentoremail: "",
      mentorpassword: "",
    },
    validate: (values) => {
      let error = {};
    
      if (!values.mentoremail) {
        error.mentoremail = "Please enter your email";
      }
      if (
        values.mentoremail &&
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.mentoremail)
      ) {
        error.mentoremail = "Invalid email address";
      }
      if (!values.mentorpassword) {
        error.mentorpassword = "Please enter your password";
      }
     

      return error;
    },
    onSubmit: async (values) => {
      try {
        const login = await axios.post(`${config.api}/mentor/login`, values);
        
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
        localStorage.setItem("mentortoken", login.data.mentortoken);
        localStorage.setItem("mentorname", login.data.mentorname);
        if (login.data.message === "Successfully Login") {
          setTimeout(() => {  navigate("/mentorportal/getunsolvedquery")}, 3000);
         
        } else {
          navigate("/mentor/login");
        }
      } catch (error) {
        console.log(error);
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

              <h2 class="fw-bold mb-2 text-uppercase">Mentor Login</h2>
              <p class="text-white-50 mb-5">Please enter your login and password!</p>

              <div class="form-outline form-white mb-4">
              <label class="form-label" for="typeEmailX">Email</label>
                <input  id="typeEmailX" className={`form-control form-control-lg ${
                  formik.touched.mentoremail && formik.errors.mentoremail ? "error-box" : "null"
                } ${
                  formik.touched.mentoremail && !formik.errors.mentoremail
                    ? "success-box"
                    : "null"
                }`} name="mentoremail" onChange={formik.handleChange} value={formik.values.mentoremail} />
                {formik.errors.mentoremail ? (
                <div style={{ color: "red" }}>{formik.errors.mentoremail}</div>
              ) : null}
                
              </div>

              <div class="form-outline form-white mb-4">
              <label class="form-label" for="typePasswordX">Password</label>
                <input type="password" id="typePasswordX" className={`form-control form-control-lg ${
                  formik.touched.mentorpassword && formik.errors.mentorpassword ? "error-box" : "null"
                } ${
                  formik.touched.mentorpassword && !formik.errors.mentorpassword
                    ? "success-box"
                    : "null"
                }`} name="mentorpassword" onChange={formik.handleChange} value={formik.values.mentorpassword} />
                {formik.errors.mentorpassword ? (
                <div style={{ color: "red" }}>{formik.errors.mentorpassword}</div>
              ) : null}
                
              </div>

              <p class="small mb-5 pb-lg-2"><a class="text-white-50" href="#!">Forgot password?</a></p>

              <button class="btn btn-outline-light btn-lg px-5" type="submit" value="Login" >Login</button>

             

            </div>

            <div>
              <p class="mb-0">mentoremail -- nagarajan091792@gmail.com
              </p>
              <span>mentorpassword -- n</span>
              <p class="mb-0">Go to Student Login <Link to="/" class="text-white-50 fw-bold">Login</Link>
              </p><ToastContainer />
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
export default MentorLogin;