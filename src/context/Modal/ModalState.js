import {useState} from "react";
import ModalContext from "./ModalContext";

const ModalState = (props) => {
    
    const [open, setOpen] =useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return(
    <ModalContext.Provider value={{ open, setOpen, handleOpen, handleClose }}>
        {props.children}
    </ModalContext.Provider>);
}

export default ModalState;
