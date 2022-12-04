import { useState, useEffect } from "react";
import {useNavigate } from "react-router-dom";
import {ToastContainer,toast} from 'react-toastify'

function Signup() {
  const [data, setData] = useState([]);
  const [username, setUsername] = useState("");
  const [id, setID] = useState(data.length);

  const[response,setResponse]= useState(false)

  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((response) => response.json())
      .then((json) => setData(json));
    setID(data.length + 1);

  }, [response]);


  function submit(e) {

    let filteredData= data.find((user) => {
      return (user.username===username)
       })

    setResponse(true)
    e.preventDefault();
    setID(id + 1);
    if (
      id === "" ||
      username === ""
      ) {
      toast.error("Fields cannot be empty",{autoClose:3000});
    } else if (filteredData!==undefined) {

      toast.error("User Already Exists")
    }

    else{
      const user = {
        id: id,
        email: email,
      };
      fetch("http://localhost:5000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      }).then((res) => {
        if (res.status === 201) {
          toast.success("Registration Done, Please Login",{autoClose:3000, onClose:()=>{navigate("/login")}});
        }
      });
    }
  }

  return (
    <div className="bg-dark" style={{width:"100%",height:"100%",position:"absolute"}}>
    <div className="mt-5 w-50 mx-auto bg-white p-5 rounded-3">
      <div className="container">
        <h1 className="mb-4 display-7 text-sm-center text-lg-start text-md-start text-center">
          Create User
        </h1>
        <form onSubmit={submit} className="row g-3">
          <div className="col-lg-6 col-md-6 col-sm-12 col-12">
            <label className="form-label">UserName</label>
            <input
              type="email"
              className="form-control "
              required
              placeholder="Enter Username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="col-12 text-sm-center text-lg-start text-md-start text-center">
            <button
              type="submit"
              className="btn btn-danger px-5 mt-2"
              onClick={submit}
              id="btn">
              Create user
            </button>
          </div>
        </form>
      </div>
    </div>
    <ToastContainer/>
    </div>
  );
}
export default Signup;
