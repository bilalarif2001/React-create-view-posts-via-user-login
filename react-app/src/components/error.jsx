import React from "react";
import { Link } from "react-router-dom";

function Error(props) {
  return (
    <div>
      <h1>Error 404! Page not Found.</h1>
      <Link to={"/home"}>Redirect to Home Page</Link>
    </div>
  );
}

export default Error;
