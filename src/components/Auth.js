import React, { useState, useEffect, useContext } from 'react';
import "../styles/auth.scss";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/Auth/AuthContext";
import alertContext from '../context/Alert/AlertContext';

const Auth = (props) => {

  const { showAlert } = useContext(alertContext);


  const navigate = useNavigate();
  const [mode, setMode] = useState(props.mode);
  const toggleMode = () => {
    var newMode = mode === 'login' ? 'signup' : 'login';
    const location = mode === 'login' ? '/signup' : '/login'
    setCredentials({name:"", email: "", password: "",cpass:"" });
    navigate(location);
    setMode(newMode);
  }

  const context = useContext(AuthContext);
  const { login,signup } = context;
  const [credentials, setCredentials] = useState({name:"", email: "", password: "",cpass:"" });

  // const [userInfo, setUserInfo] = useState({ name:"",email: "", password: "" });


  const onchange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
    console.log(credentials);
  };


  const handleSubmit = async(e) => {
    e.preventDefault();
    if (mode === "login") {
      const json =await login(credentials.email, credentials.password);
      if (json.success) {
        showAlert("Login Successful","success ")
        localStorage.setItem('token',json.authToken);
        navigate('../');
      } else {
        showAlert("Invalid Credentials","danger")
      }

    } else {
      const {name,email,password}= credentials; 
      const json =await signup(name,email, password);
      console.log("signup",json);
      if (json.success) {
        showAlert("Signup successfull","success")
        localStorage.setItem('token',json.authToken);
        navigate('../');
      } else {
        showAlert(json.error,"warning")
      }
    }


  };



  return (
    <div className={`app app--is-${props.mode} auth`}>
      <div className="d-flex align-items-end flex-column bd-highlight mb-3" >
        <div className="mt-auto p-2 bd-highlight">
          <Link to="/" style={{ textDecoration: "none", color: "white" }}>
            <i className="fas fa-times" style={{ zIndex: "1", position: "relative", fontSize: "2rem" }} />
          </Link>
        </div>
      </div>
      <div className='my-3 mx-3'>
        <div className={`form-block-wrapper form-block-wrapper--is-${mode}`} ></div>
        <section className={`form-block form-block--is-${mode}`}>
          <header className="form-block__header">
            <h1>{mode === 'login' ? 'Welcome back!' : 'Sign up'}</h1>
            <div className="form-block__toggle-block">
              <span className='mx-2'>{mode === 'login' ? 'Don\'t' : 'Already'} have an account? Click here</span>
              <input id="form-toggler" type="checkbox" onClick={toggleMode.bind(this)} />
              <label htmlFor="form-toggler"></label>
            </div>
          </header>
          {/* <AuthForm mode={mode} onSubmit={handleSubmit} /> */}
          <form onSubmit={handleSubmit}>
            <div className="form-block__input-wrapper my-5">
              <div className="form-group form-group--login ">
                <input className="form-group__input" value={credentials.email} name="email" type="text " id="username" placeholder="user name" disabled={mode === 'signup'} onChange={onchange} required/>
                <input className="form-group__input" value={credentials.password} name="password" type="password" id="password" placeholder="password" disabled={mode === 'signup'} onChange={onchange} required/>
              </div>
              <div className="form-group form-group--signup auth">
                <input className="form-group__input" value={credentials.name}  name="name" type="text" id="fullname" placeholder="full name" disabled={mode === 'login'} onChange={onchange} required/>
                <input className="form-group__input" value={credentials.email}  name="email" type="email" id="email" placeholder="email" disabled={mode === 'login'} onChange={onchange} required/>
                <input className="form-group__input" value={credentials.password} name="password" type="password" id="password" placeholder="password" disabled={mode === 'login'} onChange={onchange} required/>
                <input className="form-group__input" value={credentials.cpass} name="cpass"  type="password" id="confirmpassword" placeholder="confirm password" disabled={mode === 'login'} onChange={onchange} required/>
              </div>
            </div>
            <button className="button button--primary full-width" type="submit" >{mode === 'login' ? 'Log In' : 'Sign Up'}</button>
          </form>
        </section>
      </div>
    </div>);
};

export default Auth;
