import React from "react";
import Base from "../Elements/Base";
import FormUser from "../Elements/FormUser";
import { Link } from "./styles";

const Login = () => {
  return (
    <Base>
      <div class="d-flex align-items-center justify-content-center">
        <FormUser isLogin={true}/>
      </div>
    </Base>
  );
};

export default Login;
