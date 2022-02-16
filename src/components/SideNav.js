import React, { useState, useContext, useEffect } from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import navContext from "../context/Navbar/NavContext";
import "../main.css";
import { useSelector } from 'react-redux';

const SideNav = () => {
    const context = useContext(navContext);
    const { isExpanded, setIsExpanded } = context;
    const location = useLocation();
    const [selected, setSelected] = useState("Notes");
    const mode =useSelector(state=>state.mode);
    useEffect(() => {
        console.log(selected);
    }, [selected])


    const handleClick = (page) => {
        setSelected(page);
    }

    return (
        <div className={`${mode==="dark"?"bg-red-900":""} ${isExpanded ? "mr-60" : "mr-20"} mt-0`}>
            <div id="mySidenav" className="sidenav flex-col rounded-lg ">

                <Link to="/"  >
                    <div className={` flex justify-between mt-4 ${isExpanded ? selected === "Notes" ? "bg-green-300" : "bg-transparent" : ""} rounded-r-full hover:cursor-pointer hover:text-black`} onClick={() => handleClick("Notes")}>
                        <div className={`ml-2 mt-1 w-12 h-12 rounded-full ${selected === "Notes" ? "bg-green-300" : "bg-transparent"} z-10`}>
                            <i class="relative far fa-lightbulb text-2xl left-4 top-3"></i>
                        </div>
                        <div className='p-2 mt-2  text-l font-semibold absolute left-20'>Notes</div>
                    </div>
                </Link>
                <Link to="/reminders" >
                    <div className={`flex justify-between mt-1 ${isExpanded ? selected === "Reminders" ? "bg-green-300" : "bg-transparent" : ""} rounded-r-full hover:cursor-pointer hover:text-black`} onClick={() => handleClick("Reminders")} >
                        <div className={`ml-2 mt-1 w-12 h-12 rounded-full  ${selected==="Reminders"?"bg-green-300":"bg-transparent"} z-10`}>
                            <i class="relative far fa-bell text-xl left-4  top-3"></i>
                        </div>
                        <div className='p-2 mt-2  text-l font-semibold absolute left-20'>Reminders</div>
                    </div>
                </Link>
                <Link to="/archive" >
                    <div className={`flex justify-between mt-1 ${isExpanded ? selected === "Archive" ? "bg-green-300" : "bg-transparent" : ""} rounded-r-full hover:cursor-pointer hover:text-black`} onClick={() => handleClick("Archive")}>
                        <div className={`ml-2 mt-1 w-12 h-12 rounded-full  ${selected==="Archive"?"bg-green-300":"bg-transparent"} z-10`}>
                        <i class="relative fas fa-archive text-xl left-4  top-3"></i>
        
                        </div>
                        <div className='p-2 mt-2  text-l font-semibold absolute left-20'>Archive</div>
                    </div>
                </Link>
                <Link to="/bin" >
                    <div className={`flex justify-between mt-1 ${isExpanded ? selected === "Bin" ? "bg-green-300" : "bg-transparent" : ""} rounded-r-full hover:cursor-pointer hover:text-black`} onClick={() => handleClick("Bin")}>
                        <div className={`ml-2 mt-1 w-12 h-12 rounded-full  ${selected==="Bin"?"bg-green-300":"bg-transparent"} z-10`}>
                        <i class="relative fas fa-trash-alt text-xl left-4  top-3"></i>
                        </div>
                        <div className='p-2 mt-2  text-l font-semibold absolute left-20'>Bin</div>
                    </div>
                </Link>
                {/* <Link to="/" >Home</Link> */}

            </div>
        </div>
    );
};

export default SideNav;
