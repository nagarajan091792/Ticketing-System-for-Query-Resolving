import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";
import { config } from "../../config";
import "./Login.css"
function MentorRegister () {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
        mentorname: "",
        mentoremail: "",
        mentorpassword: "",
    },
    onSubmit: async (values) => {
      try {
        const register = await axios.post(`${config.api}/mentor/register`, values);

        alert(register.data.message);
        navigate("/");
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

              <h2 class="fw-bold mb-2 text-uppercase">Mentor Signup</h2>
              <p class="text-white-50 mb-5">Please enter your Details!</p>

              <div class="form-outline form-white mb-4">
                <input type="text" id="username" class="form-control form-control-lg" name="mentorname" onChange={formik.handleChange} value={formik.values.mentorname} />
                <label class="form-label" for="username">Mentorname</label>
              </div>

              <div class="form-outline form-white mb-4">
                <input type="email" id="typeEmailX" class="form-control form-control-lg " name="mentoremail" onChange={formik.handleChange} value={formik.values.mentoremail.toLowerCase()} />
                <label class="form-label " for="typeEmailX">Email</label>
              </div>

              <div class="form-outline form-white mb-4">
                <input type="password" id="typePasswordX" class="form-control form-control-lg" name="mentorpassword" onChange={formik.handleChange} value={formik.values.mentorpassword} />
                <label class="form-label" for="typePasswordX">Password</label>
              </div>

              

              <button class="btn btn-outline-light btn-lg px-5" type="submit" value="Signup">Register</button>

             

            </div>

            <div>
              <p class="mb-0">Already have an account? <Link to="/mentor/login" class="text-white-50 fw-bold">Log In</Link>
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
export default MentorRegister;