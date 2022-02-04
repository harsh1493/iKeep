import React, { useEffect } from 'react';
import { Link, useLocation,useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    console.log(location.pathname);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };
  
  return <div><nav className="navbar navbar-expand-lg navbar-dark bg-dark ">
    <div className="container-fluid">
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link className="navbar-brand " to="/" ><img className="gb_sc gb_Zd" src="https://www.gstatic.com/images/branding/product/1x/keep_2020q4_48dp.png" srcSet="https://www.gstatic.com/images/branding/product/1x/keep_2020q4_48dp.png 1x, https://www.gstatic.com/images/branding/product/2x/keep_2020q4_48dp.png 2x " alt="" aria-hidden="true" style={{ width: "40px", height: "40px" }} />      IKeep</Link>
          </li>
          <li className="nav-item">
            <Link className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} to="/" >Home</Link>
          </li>
          <li className="nav-item">
            <Link className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`} to="/about" >About</Link>
          </li>
        </ul>
        {!localStorage.getItem('token')?<form className="d-flex" style={{visibility:location.pathname==='/' || location.pathname==='/about'?"visible":"hidden"}} >
          <Button variant='contained' className='mx-3'><Link style={{ textDecoration: "none", color: "white" }} to="/login">Login</Link></Button>
          <Button variant='contained'><Link to="/signup" style={{ textDecoration: "none", color: "white" }}>Signup</Link></Button>
        </form>:<button onClick={handleLogout} className='btn btn-primary'>Logout</button>}
      </div>
    </div>
  </nav>
  </div>;
};

export default Navbar;
