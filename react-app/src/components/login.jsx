import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {ToastContainer,toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function Login(props) {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loginUsername, setLoginUsername] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((response) => response.json())
      .then((json) => setData(json));
  }, []);

  function login(e) {
    e.preventDefault();
   let filteredData= data.find((user) => {
   return (user.username===loginUsername)
    });
  
if (filteredData===undefined){ // Find Method returns undefined if find condition is false.
  toast.error("Account against this user does not exist",{autoClose:3000})
  console.log(filteredData)
}
else{
   /* props.nameSetter(email); */
    toast.success("successfully Logined",{position:"top-center",autoClose:2000, onClose: () => {
      navigate("/home");
    }});
   

    const {username} = filteredData;

    // localStorage.setItem("id", id);
    localStorage.setItem("username", username);
  }
}



  return (
    <div className="bg-dark" style={{width:"100%",height:"100%",position:"absolute"}}>
      <div className="mt-5 w-50 mx-auto bg-white p-5 rounded-3">
        <div className="container justify-content-center mt-5 ms-5 ">
          <h1 className="mb-4 display-7 ms-5 text-sm-center text-lg-start text-md-start text-center">
            Login
          </h1>
          <form className="ms-5">
            <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                <label className="form-label py-2">Username</label>
                <input
                  type="text"
                  className="form-control "
                  placeholder="Enter UserName"
                  required
                  onChange={(e) => setLoginUsername(e.target.value)}
                />
              </div>
            </div>

            <div className="col-12 text-sm-center text-lg-start text-md-start text-center">
              <button
                type="submit"
                className="btn btn-danger px-5 mt-4"
                onClick={login}
                id="btn">
                Login
              </button>
            </div>
            <div className="col-12 text-sm-center text-lg-start text-md-start text-center mt-3">
              <Link className="text-primary" to={"/signup"}>Not a Member? Create User</Link>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer/>
    </div>
  );
}
export default Login;
