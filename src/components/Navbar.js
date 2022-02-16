import React, { useEffect, useContext } from 'react';
import navContext from '../context/Navbar/NavContext';
import { Link, useLocation, useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import { Tooltip } from '@mui/material';
import { IconButton } from '@mui/material';
import DensityMediumIcon from '@mui/icons-material/DensityMedium';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import { useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../state/index';
import { useDispatch } from 'react-redux';
const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  //to handle state of dark mode using redux
  const mode =useSelector(state=>state.mode);
  const dispatch = useDispatch();
  const actions = bindActionCreators(actionCreators, dispatch);
  const {changeMode } = actions;

  useEffect(() => {
    console.log(location.pathname);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  //for side nav bar
  const context = useContext(navContext);
  const { isExpanded, setIsExpanded } = context;
  function toggleNav() {
    isExpanded ? document.getElementById("mySidenav").style.width = "80px" : document.getElementById("mySidenav").style.width = "300px";
    setIsExpanded(!isExpanded);
  }



  return <div><nav className={`navbar navbar-expand-lg navbar-${mode} bg-${mode}`}>
    <div className="container-fluid">
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="flex space-x-4">
          <li className="px-3">
            <Tooltip title="Main menu">
              <IconButton onClick={toggleNav} disableTouchRipple="true" size="large" aria-haspopup="true" aria-expanded="false" >
                <DensityMediumIcon fontSize='inherit' className={`${mode==="dark"?"text-white":""}`}/>
              </IconButton>
            </Tooltip>
          </li>
          <li className="px-3 flex">
            <Link className="navbar-brand " to="/" >
              <img className="gb_sc gb_Zd" src="https://www.gstatic.com/images/branding/product/1x/keep_2020q4_48dp.png" srcSet="https://www.gstatic.com/images/branding/product/1x/keep_2020q4_48dp.png 1x, https://www.gstatic.com/images/branding/product/2x/keep_2020q4_48dp.png 2x "
                alt="" aria-hidden="true" style={{ width: "40px", height: "40px" }} /></Link>
            <h2 className={`text-2xl font-semibold pt-2 before:${mode==="dark"?"text-white":"text-black"}`}>IKeep</h2>
          </li>
        </ul>
        <form className="flex me-auto bg-white px-2  items-center ml-10 shadow-md rounded-md">
          <div className='flex'>
            <div className='py-2'>
              <Tooltip title="Search">
                <IconButton disableTouchRipple="true" size="medium" aria-haspopup="true" aria-expanded="false" >
                  <SearchIcon fontSize='inherit' />
                </IconButton>
              </Tooltip>
            </div>
            <input className="p-2 me-2 border-0 w-96 outline-0"   placeholder="Search" aria-label="Search" />
          </div>
          <div >
            <Tooltip title="Clear search">
              <IconButton disableTouchRipple="true" size="medium" aria-haspopup="true" aria-expanded="false" >
                <ClearIcon fontSize='inherit' />
              </IconButton>
            </Tooltip>
          </div>
        </form>
        <div className='px-4'>
        <Tooltip title="Dark mode">
              <IconButton disableTouchRipple="true" size="large" aria-haspopup="true" aria-expanded="false" onClick={() => {changeMode(mode);console.log(mode)}} >
                {mode==="dark"?<Brightness4Icon fontSize='inherit'className={`${mode==="dark"?"text-white":""}`} />:<Brightness7Icon fontSize='inherit'/>}
              </IconButton>
        </Tooltip>
        </div>
        {!localStorage.getItem('token') ? <form className="d-flex" style={{ visibility: location.pathname === '/' || location.pathname === '/about' ? "visible" : "hidden" }} >
          <Button variant='contained' className='mx-3'><Link style={{ textDecoration: "none", color: "white" }} to="/login">Login</Link></Button>
          <Button variant='contained'><Link to="/signup" style={{ textDecoration: "none", color: "white" }}>Signup</Link></Button>
        </form> : <button onClick={handleLogout} className='btn btn-primary'>Logout</button>}
      </div>
    </div>
  </nav>
  </div>;
};

export default Navbar;
