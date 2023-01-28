import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";
import { config } from "../../config";
import "./Login.css";
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
function UserRegister () {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      username: "",
      useremail: "",
      userpassword: "",
    },
    validate: (values) => {
      let error = {};
      if (!values.username) {
        error.username = "Please enter your name";
      }
      if (values.username && (values.username.length <= 2 || values.username.length > 15)) {
        error.username = "Username must be between 3 to 15 Characters";
      }
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
      if (values.userpassword && (values.userpassword.length <= 8 || values.userpassword.length > 20)) {
        error.userpassword = "Password minimum 8 to 20 Characters";
      }

      return error;
    },
    onSubmit: async (values) => {
      try {
        const register = await axios.post(`${config.api}/user/register`, values);
        toast(register.data.message, {
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
        console.log("register error");
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

              <h2 class="fw-bold mb-2 text-uppercase">Signup</h2>
              <p class="text-white-50 mb-5">Please enter your Details!</p>

              <div class="form-outline form-white mb-4">
              <label class="form-label" for="username">Username</label>
                <input type="text" id="username"  name="username" onChange={formik.handleChange} value={formik.values.username} className={`form-control form-control-lg ${
                  formik.touched.username && formik.errors.username ? "error-box" : "null"
                } ${
                  formik.touched.username && !formik.errors.username
                    ? "success-box"
                    : "null"
                }`}/>
                 {formik.errors.username ? (
                <div style={{ color: "red" }}>{formik.errors.username}</div>
              ) : null}
               
              </div>

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

              

              <button class="btn btn-outline-light btn-lg px-5" type="submit" value="Signup">Register</button><ToastContainer />

             

            </div>

            <div>
              <p class="mb-0">Already have an account? <Link to="/" class="text-white-50 fw-bold">Log In</Link>
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
export default UserRegister;