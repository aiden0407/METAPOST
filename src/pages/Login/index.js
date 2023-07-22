//React
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {

  const navigate = useNavigate();

  return (
    <div class="loginContainer">
      <p class="loginTitle">Health-tomize</p>
    </div>
  );
}

export default Login;
