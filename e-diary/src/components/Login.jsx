import React from 'react'
import "../css/Login.css";
import { useState } from 'react';
import { useForm } from "react-hook-form"
import axios from "axios"
import {useNavigate} from "react-router-dom"



const Login = () => {

    const [auth, setAuth] = useState("auth");

    const navigate = useNavigate();
    axios.defaults.withCredentials = true;

    const { register: registerSignIn, handleSubmit: handleSubmitSignIn, formState: { errors: errorsSignIn } } = useForm();
    const { register: registerSignUp, handleSubmit: handleSubmitSignUp, formState: { errors: errorsSignUp } } = useForm();


    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const onSubmitSignIn = async (data, e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/auth/login', data)
      .then(result => {
        if(result.data.loginStatus){
          navigate('/dashboard')
        } else {
          setError(result.data.error);
        }
        
      })


    } catch (error) {
      console.error('Sign In Error:', error);
    }
  };

  const onSubmitSignUp = async (data, e) => {
    e.preventDefault();
    const signUpData = { ...data, signup: "true" };

    try {
      const response = await axios.post('http://localhost:3000/auth/login', signUpData)
      .then(result => {
        if(result.data.signupStatus){
          setSuccess(result.data.success);
          setError(result.data.message);
          setTimeout(() => {
            navigate('/dashboard');
          }, 3000);
        } else {
          setError(result.data.error);
        }
        
      })


     
    } catch (error) {
    }
  };





    
  return (
    <div className="auth-container">
      
    <div className={auth}>
    <div className="forms-container">
      <div className="signin-signup">



        <form className="sign-in-form" onSubmit={handleSubmitSignIn(onSubmitSignIn)}>
          <h2 className="title">Sign in</h2>
          <div className="input-field">
            <i className="fas fa-user"></i>
            <input type="text" placeholder="Username" {...registerSignIn("username", {required :{value:true, message:"Username is required"}})} />
          </div>
          {errorsSignIn.username && <div>{errorsSignIn.username.message}</div>}

          <div className="input-field">
            <i className="fas fa-lock"></i>
            <input type="password" placeholder="Password" {...registerSignIn("password", {required :{value:true, message:"Password is required"}, minLength:{value: 3, message:"Password must have minimum 3 character"}})}/>
          </div>
          {errorsSignIn.password && <div>{errorsSignIn.password.message}</div>}

          <input type="submit" value="Login" className="btn solid" />
          
          <div>{error && error}</div>
        </form>



        <form className="sign-up-form" onSubmit={handleSubmitSignUp(onSubmitSignUp)}>
          <h2 className="title">Sign up</h2>
          <div className="input-field">
            <i className="fas fa-user"></i>
            <input type="text" placeholder="Username" {...registerSignUp("username", {required :{value:true, message:"Username is required"}})} />
          </div>
          {errorsSignUp.username && <div>{errorsSignUp.username.message}</div>}
          
          <div className="input-field">
            <i className="fas fa-user"></i>
            <input type="text" placeholder="Full Name" {...registerSignUp("fullname", {required :{value:true, message:"Full Name is required"}})} />
          </div>
          {errorsSignUp.fullname && <div>{errorsSignUp.fullname.message}</div>}
          


          <div className="input-field">
            <i className="fas fa-lock"></i>
            <input type="password" placeholder="Password" {...registerSignUp("password", {required :{value:true, message:"Password is required"}, minLength:{value: 4, message:"Password must have minimum 4 character"}})}/>
          </div>
          {errorsSignUp.password && <div>{errorsSignUp.password.message}</div>}
          
          <input type="submit" className="btn" value="Sign up" />
          
          <div>{error && error}</div>
          <div>{success && <span>Redirecting to Dashboard</span>}</div>
          <div>{success && <div class="spinner-border" role="status"></div>}</div>
        </form>
      </div>
    </div>




    <div className="panels-container">
      <div className="panel left-panel">
        <div className="content">

          <button className="btn transparent" id="sign-up-btn" onClick={() => setAuth("auth sign-up-mode")}>
            Sign up
          </button>
          <h3>Create A New Classroom</h3>
        </div>
        <img src="./src/assets/student.webp" className="image" alt="" />
      </div>
      <div className="panel right-panel">
        <div className="content">
          <button className="btn transparent" id="sign-in-btn" onClick={() => setAuth("auth")}>
            Sign in
          </button>
          <h3>Join A ClassRoom</h3>
        </div>
        <img src="./src/assets/class.webp" className="image" alt="" />
      </div>
    </div>
  </div>
  </div>
  )
}

export default Login