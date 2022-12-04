import React from "react";

import {useEffect, useState } from "react";
import {useNavigate } from "react-router-dom";
import {ToastContainer,toast} from 'react-toastify'

function Home(props) {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/posts")
      .then((response) => response.json())
      .then((json) => setData(json));
  }, []);

  function logout() {
    //Removes all Local storage data.
    toast.info("successfully Logged Out",{position:"top-center",autoClose:2000, onClose: () => {
      localStorage.clear();
      navigate("/login");
    }})
  }

  function createPost() {
    navigate("/createpost");
  }

  return (
    <div>
      <div
        className="bg-dark"
        style={{ width: "100%", height: "1000%", position: "absolute" }}
      >
        <h1 className="text-center text-white">Welcome to Homepage</h1>
        <h4 className="text-white ms-3">
          HELLO {localStorage.getItem("username").toUpperCase()}
        </h4>
        <button className="btn btn-warning ms-3" onClick={logout}>
          Logout
        </button>
        <button className="btn btn-danger ms-3" onClick={createPost}>
          Create Post
        </button>
        <div className="container">
       
        {data.map((data) => (
          //row row-cols-1 row-cols-md-3 g-4
                 <div className="m-3" key={data.id}>
                <div className="col-12">
                  <div className="card">
                    <div className="card-header"><h5 className="card-title">{data.post_title}</h5></div>
                    <div className="card-body">
                      <p className="card-text">{data.post_content}</p>
                    </div>
                    <div className="card-footer"><b>Posted by {data.username}</b></div>
                  </div>
                </div>
                </div>
              ))}
        </div>
      </div>
      <ToastContainer/>
    </div>
  );
}

export default Home;
