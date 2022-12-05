import React from "react";
import { useState} from "react";
import { useNavigate } from "react-router-dom";
import {ToastContainer,toast} from 'react-toastify'

function CreatePost(props) {
  const [title, setTitle] = useState(localStorage.getItem("name"));
  const [content, setContent] = useState("");
  const username=localStorage.getItem("username");

  const navigate = useNavigate();



  function submit(e) {

    e.preventDefault(); // Prevents page refresh on submit
    if (
      title === "" || content===""
    ) {
      toast.error("Fields cannot be Empty",{ autoClose:2000});
    } else {
      

      const user = {
        username: username,
        post_title:title,
        post_content:content,
      };
      fetch(`http://localhost:5000/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      }).then((res) => {
        if (res.status === 201) {
          toast.success("Data has been updated Successfully",{position:"top-center",
            autoClose:2000,onClose:()=>{
              navigate("/home");
            }
          })
         
        }
      });
    }
  }

  return (
    <div className="bg-dark" style={{ width: "100%", height: "100%", position: "absolute" }}>
      <div className="mt-5 w-50 mx-auto bg-white p-5 rounded-3">
        <div className="container">
          <h1 className="mb-4 display-7 text-sm-center text-lg-start text-md-start text-center">
            Create Post
          </h1>
          <form onSubmit={submit} className="row g-3">

            <div className="col-lg-8 col-md-12 col-sm-12 col-12">
              <label className="form-label">Title</label>
              <input
                type="text"
                className="form-control"
                required
                placeholder="Enter Title"
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="col-lg-8 col-md-6 col-sm-12 col-12">
              <label className="form-label">Content</label>
              <textarea
                type="text"
                className="form-control "
                required
                placeholder="Enter Content"
                onChange={(e) => setContent(e.target.value)}
              />
            </div>
            <div className="col-12 text-sm-center text-lg-start text-md-start text-center">
              <button type="submit" className="btn btn-danger px-5 mt-2"onClick={submit} id="btn">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer/>
    </div>
  );
}

export default CreatePost;
