import React, { useState } from "react";
import NavContext from "./NavContext";
const NavState = (props) => {
    const [isExpanded, setIsExpanded] = useState(false);

    
    return (
    <NavContext.Provider value={{isExpanded,setIsExpanded}}>
        {props.children}

    </NavContext.Provider>);
};

export default NavState;
