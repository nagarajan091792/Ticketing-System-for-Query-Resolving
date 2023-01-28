
import { BrowserRouter, Route, Routes } from 'react-router-dom';

  import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import ForgetPassword from './Components/Login/ForgetPassword';
import MentorLogin from './Components/Login/MentorLogin';
import UserLogin from './Components/Login/UserLogin';
import MentorRegister from './Components/Register/MentorRegister';
import UserRegister from './Components/Register/UserRegister';
import GetSolvedQuery from './Pages/MentorPages/GetSolvedQuery';
import GetUnsolvedQuery from './Pages/MentorPages/GetUnsolvedQuery';
import SolvedQuery1 from './Pages/MentorPages/SolvedQuery1';
import SolveQuery from './Pages/MentorPages/SolveQuery';
import Addquery from './Pages/UserPages/AddQuery';
import Class from './Pages/UserPages/Class';
import Dashboard from './Pages/UserPages/Dashboard';
import SolvedQuery from './Pages/UserPages/SolvedQuery';
import MentorPortal from './Portals/MentorPortal';
import UserPortal from './Portals/UserPortal';
import MentorPrivateRoutes from './PrivateRoutes/MentorPrivateRoute';
import UserPrivateRoutes from './PrivateRoutes/UserPrivateRoute';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<UserLogin />} />
      <Route path="/user/register" element={<UserRegister />} />
      <Route path="/mentor/login" element={<MentorLogin />} />
      <Route path="/mentor/register" element={<MentorRegister />} />
      <Route path="/user/forgetpassword" element={<ForgetPassword />} />

      <Route element={<UserPrivateRoutes />}>
        <Route path="/userportal" element={<UserPortal />}>

          <Route path="class" element={<Class />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="query/:id" element={<SolvedQuery />} />
          <Route path="addquery" element={<Addquery/>} />
         
        </Route>
        </Route>

        <Route element={<MentorPrivateRoutes />}>
         <Route path="/mentorportal" element={<MentorPortal />}>

          <Route path="getunsolvedquery" element={<GetUnsolvedQuery />} />
          <Route path="getsolvedquery" element={<GetSolvedQuery />} />
          <Route path="solvequery/:id" element={<SolveQuery />} />
          <Route path="solvedquery/:id" element={<SolvedQuery1 />} />
         
        </Route>
        </Route>

      
    </Routes>
  </BrowserRouter>
  );
}

export default App;
