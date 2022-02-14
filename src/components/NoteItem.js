import React, { useContext, useState, useRef, useEffect } from 'react';
import '../styles/button.css';
import { IconButton } from '@mui/material';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import noteContext from '../context/Notes/NoteContext';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddAlertIcon from '@mui/icons-material/AddAlert';
import ColorLensOutlinedIcon from '@mui/icons-material/ColorLensOutlined';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import Tooltip from '@mui/material/Tooltip';
import { useTransition, animated } from 'react-spring';
import Dropdown from "react-bootstrap/Dropdown";
import alertContext from '../context/Alert/AlertContext';
import { gsap } from "gsap";
const NoteItem = (props) => {


    //context to change state of note
    const context = useContext(noteContext);
    const { deleteNote } = context;
    const { note, updateNote, setBackground, isExpanded } = props;
    const { showAlert } = useContext(alertContext);
    //add fade-away animation on delete note
    const [isVisible, setIsVisible] = useState(true);



    //adding animation
    const boxRef = useRef();
    useEffect(() => {
        if(isVisible){
        gsap.fromTo(boxRef.current, { opacity: 1,scale:0 }, {scale:1, opacity: 1, duration: 1,ease:"bounce"});
        }else{
            gsap.fromTo(boxRef.current, {opacity: 1 }, { opacity: 0,scale:0.5, duration:0.5});
        }
    }, [isVisible]);
    const focusNote = () => { 
        gsap.fromTo(boxRef.current, { opacity: 1,scale:1 }, {scale:1.5, opacity: 1,x:"40vw", duration: 1});
     }


    //pallet visible
    const [palletActive, setpalletActive] = useState(false);

    const handleDelete = async () => {
        showAlert("Note Deleted", "warning");
       
        setIsVisible(false);
        //wait to fade away
        await setTimeout(() => {
            deleteNote(note._id);
        }, 800);

    };

    //to implement 3 dot drop down menu in note item
    const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
        <a ref={ref} onClick={e => { e.preventDefault(); onClick(e); }} style={{ textDecoration: "none" }}>
            {children}
            <IconButton disableTouchRipple="true" size="small" aria-haspopup="true" aria-expanded="false">
                <MoreVertOutlinedIcon fontSize='inherit' />
            </IconButton>
        </a>
    ));

    const showPallet = () => {
        setpalletActive(!palletActive);
    };

    const pallet = {
        "red": "bg-red-400",
        "blue": "bg-blue-400",
        "green": "bg-green-400",
        "orange": "bg-orange-400",
        "violet": "bg-violet-400",
        "yellow": "bg-yellow-400",
    }



    return (
        <div ref={boxRef} className={`${isExpanded ? "col-md-4" : "col-md-3"} showhim `} >
            <div className={`card xl:mx-4 lg:mx-4 md:mx-3 sm:mx-2 ${note.background === "Default" ? pallet["white"] : pallet[note.background]}`} style={{ width: "18rem", margin: "10px" }}>
                <div className="card-body">
                    <div >
                        <div className='row '>
                            <div className='col-md-10 '>
                                <h5 className="card-title font-semibold text-lg ">{note.title}</h5>
                            </div>
                            <div className='col-md-2 '>
                                {/* <IconButton disableTouchRipple="true" size="small" aria-haspopup="true" aria-expanded="false">
                                <MoreVertOutlinedIcon fontSize='inherit' />
                            </IconButton> */}
                                <div className='App z-4'>
                                    <Dropdown>
                                        <Dropdown.Toggle as={CustomToggle} />
                                        <Dropdown.Menu size="sm" title="" >
                                            <Dropdown.Item size="sm">Delete note</Dropdown.Item>
                                            <Dropdown.Item>Add lable</Dropdown.Item>
                                            <Dropdown.Item>Make a copy</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </div>
                            </div>
                        </div>
                        <p className="card-text font-normal text-lg"> {note.description}</p>
                    </div>
                    <div className='showme'>
                        <div className='row'>
                            <div className='col-md-2 '>
                                <Tooltip title="Remind me">
                                    <IconButton disableTouchRipple="true" size="small">
                                        <AddAlertIcon fontSize='inherit' />
                                    </IconButton>
                                </Tooltip>
                            </div>

                            <div className='col-md-2'>
                                <Tooltip title="Background Options">
                                    <IconButton disableTouchRipple="true" size="small" onClick={showPallet}>
                                        <ColorLensOutlinedIcon fontSize='inherit' />
                                    </IconButton>
                                </Tooltip>
                            </div>

                            {palletActive ? <ColorPallete updateNote={updateNote} note={note} setBackground={setBackground} /> : ""}
                            <div className='col-md-2'>
                                <Tooltip title="Add Image">
                                    <IconButton disableTouchRipple="true" size="small">
                                        <ImageOutlinedIcon fontSize='inherit' />
                                    </IconButton>
                                </Tooltip>
                            </div>
                            <div className='col-md-2'>
                                <Tooltip title="Archive">
                                    <IconButton disableTouchRipple="true" size="small">
                                        <ArchiveOutlinedIcon fontSize='inherit' />
                                    </IconButton>
                                </Tooltip>
                            </div>
                            <div className='col-md-2'>
                                <Tooltip title="Delete">
                                    <IconButton disableTouchRipple="true" size="small" onClick={handleDelete}>
                                        <DeleteIcon fontSize='inherit' />
                                    </IconButton>
                                </Tooltip>
                            </div>
                            <div className='col-md-2'>
                                <Tooltip title="Edit">
                                    <IconButton disableTouchRipple="true" size="small" onClick={() => { updateNote(note);focusNote() }} >
                                        <EditIcon fontSize='inherit' />
                                    </IconButton>
                                </Tooltip>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>

    );



}

export default NoteItem;


const ColorPallete = (props) => {
    const [color, setColor] = useState("Default");
    const { note, setBackground } = props;
    const setcolor = (color) => {
        setColor(color);

        setBackground(color, note);

    };

    return (
        <div className="absolute h-12 p-2 -bottom-8 bg-white border-2 rounded-lg flex space-x-2 shadow-xl">
            <Tooltip title="Default"><div onClick={() => { setcolor("Default") }} className={`w-7 h-7 rounded-full bg-white  border-2 ${color === "Default" ? "border-blue-500" : "border-gray-"} hover:border-2 border-grey relative`}><i class="fas fa-tint-slash absolute left-1 mr-1 h-1 w-10"></i>{color === "Default" ? <Selected /> : ""}</div></Tooltip>
            <Tooltip title="Red"><div onClick={() => { setcolor("red"); }} className={`w-7 h-7 rounded-full  bg-red-400 border-2 ${color === "red" ? "border-blue-500" : "border-white"} hover:border-2 ${color === "red" ? "border-blue-500" : "border-black"}  relative`}>{color === "red" ? <Selected /> : ""}</div></Tooltip>
            <Tooltip title="Yellow"><div onClick={() => { setcolor("yellow") }} className={`w-7 h-7 rounded-full  bg-yellow-400 border-2 ${color === "yellow" ? "border-blue-500" : "border-white"} hover:border-2 ${color === "yellow" ? "border-blue-500" : "border-black"}  relative`}>{color === "yellow" ? <Selected /> : ""}</div></Tooltip>
            <Tooltip title="Blue"><div onClick={() => { setcolor("blue") }} className={`w-7 h-7 rounded-full  bg-blue-400 border-2 ${color === "blue" ? "border-blue-500" : "border-white"} hover:border-2 ${color === "blue" ? "border-blue-500" : "border-black"}  relative`}>{color === "blue" ? <Selected /> : ""}</div></Tooltip>
            <Tooltip title="Green"><div onClick={() => { setcolor("green") }} className={`w-7 h-7 rounded-full  bg-green-400 border-2 ${color === "green" ? "border-blue-500" : "border-white"} hover:border-2 ${color === "green" ? "border-blue-500" : "border-black"}  relative`}>{color === "green" ? <Selected /> : ""}</div></Tooltip>
            <Tooltip title="Violet"><div onClick={() => { setcolor("violet") }} className={`w-7 h-7 rounded-full  bg-violet-400 border-2 ${color === "violet" ? "border-blue-500" : "border-white"} hover:border-2 ${color === "violet" ? "border-blue-500" : "border-black"}  relative`}>{color === "violet" ? <Selected /> : ""}</div></Tooltip>
            <Tooltip title="Orange"><div onClick={() => { setcolor("orange") }} className={`w-7 h-7 rounded-full  bg-orange-400 border-2 ${color === "orange" ? "border-blue-500" : "border-white"} hover:border-2 ${color === "orange" ? "border-blue-500" : "border-black"}  relative`}>{color === "orange" ? <Selected /> : ""}</div></Tooltip>
        </div>);
};

const Selected = () => {
    return (
        <div className='w-3 h-3 rounded-full bg-blue-600 z-10 absolute bottom-4 left-4'>
            <i className="fas fa-check text-white z-20 absolute top-1 righ-4" style={{ fontSize: "6px" }}></i>
        </div>
    );
}