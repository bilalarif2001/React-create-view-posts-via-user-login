import React from "react";
import { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import {ToastContainer,toast} from 'react-toastify'

function Auth(props) {
  const navigate = useNavigate();
  const [isLogin, setisLogin] = useState(false);
  const username = localStorage.getItem("username");

  useEffect(() => {
    // Checking if Email exists in Local storage
    if (username) {
      setisLogin(true);
    } else {
      setisLogin(false);
      
        toast.error("You Must Login First",{position:"top-center",
        autoClose:1000,onClose:()=>{
          navigate("/login");
        }
      })
    }
  }, [username]);

  return (
  <div>
    {isLogin && props.children}
  <ToastContainer/>
  </div>
  );
}

export default Auth;
