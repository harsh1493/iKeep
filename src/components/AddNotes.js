import React, { useContext, useState, useRef, useEffect } from 'react';
import noteContext from '../context/Notes/NoteContext';
import alertContext from '../context/Alert/AlertContext';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import EditIcon from '@mui/icons-material/Edit';
import AddAlertIcon from '@mui/icons-material/AddAlert';
import ColorLensOutlinedIcon from '@mui/icons-material/ColorLensOutlined';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import { IconButton } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import '../styles/button.css';
import { Button } from '@mui/material';
const AddNotes = () => {


    const { showAlert } = useContext(alertContext);

    const context = useContext(noteContext);
    const { addNote } = context;

    // const [title,setTitle] = useState();
    // const [description,setDescription] = useState();
    const [note, setNote] = useState({title:"",description:"",tag:""});



    const handleClick = (event) => {
        //prevents reload of page on submit
        event.preventDefault();
        if(note.title.length>5 && note.description.length>5){
        showAlert("Note added", "success");
        console.log(note);
        addNote(note.title,note.description,note.tag);
 
        }
        setNote({});
        setShow(true);
    }
    const onChange=(event)=>{
        //spread the existing note and add/overwrite the respective target.name to respective target.value
        setNote({...note,[event.target.name]:event.target.value});
    }


    const [show, setShow] = useState(true);
    const handleFlick = (event) => {
       // console.log(show);
        setShow(!show);
    };


    // Hook that alerts clicks outside of the passed ref
    const useOutsideAlerter = (ref) => {
       // console.log(note.title,note.description);

        useEffect(() => {
            // if clicked on outside of element setShow to true && save/add note in that state
            function handleClickOutside(event) {
                if (ref.current && !ref.current.contains(event.target)) {
                    // console.log("You clicked outside of me!");
                    setShow(true);
                    note.title &&  note.description &&  note.title.length>5 && note.description.length>5 && addNote(note.title,note.description,note.tag);
                    setNote({});
                }
            } 

            // Bind the event listener
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                // Unbind the event listener on clean up
                document.removeEventListener("mousedown", handleClickOutside);
                
            };
        }, [ref,note]);
    }



    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef);

    //document.addEventListener('click', handleFlickOutside, true);

    return (
        <div className='d-flex justify-content-center'>
            <div className='d-flex justify-content-center' style={{ width: "80%" }}>
                {show ? <div className="shadow p-3 mb-5 bg-white rounded w-50 my-3 " onClick={handleFlick} >
                    <p>Take a note...</p>
                </div> : <div className="container my-3 shadow p-3 mb-5 bg-white rounded w-50" ref={wrapperRef}>
                    <form action=" ">

                        <div className="mb-3">
                            <input type="text" id="title" value={note.title} minLength={5} required name='title'  placeholder="Title" onChange={onChange} style={{ border: "none", outlineWidth: "0", width: "100%", fontWeight: "500" }} />
                        </div>
                        <div className="mb-3">
                            <input id="description" name='description' value={note.description} minLength={5} required onChange={onChange} placeholder='Take a note..' style={{ border: "none", outlineWidth: "0", width: "100%" }}></input>
                        </div>
                        <div className="row">
                            <div className='row'>
                                <div className='col-md-1 mx-1 '>
                                    <Tooltip title="Remind me">
                                        <IconButton disableTouchRipple={true} size="small">
                                            <AddAlertIcon fontSize='inherit' />
                                        </IconButton>
                                    </Tooltip>
                                </div>

                                <div className='col-md-1 mx-1'>
                                    <Tooltip title="Background Options">
                                        <IconButton disableTouchRipple="true" size="small">
                                            <ColorLensOutlinedIcon fontSize='inherit' />
                                        </IconButton>
                                    </Tooltip>
                                </div>
                                <div className='col-md-1 mx-1'>
                                    <Tooltip title="Add Image">
                                        <IconButton disableTouchRipple="true" size="small">
                                            <ImageOutlinedIcon fontSize='inherit' />
                                        </IconButton>
                                    </Tooltip>
                                </div>
                                <div className='col-md-1 mx-1'>
                                    <Tooltip title="Archive">
                                        <IconButton disableTouchRipple="true" size="small">
                                            <ArchiveOutlinedIcon fontSize='inherit' />
                                        </IconButton>
                                    </Tooltip>
                                </div>

                                <div className='col-md-1 mx-1'>
                                    <Tooltip title="Edit">
                                        <IconButton disableTouchRipple="true" size="small"  >
                                            <EditIcon fontSize='inherit' />
                                        </IconButton>
                                    </Tooltip>

                                </div>
                                <div className='col-md-1 mx-1'>
                                    <Tooltip title="More">
                                        <IconButton disableTouchRipple="true" size="small" aria-haspopup="true" aria-expanded="false" >
                                            <MoreVertOutlinedIcon fontSize='inherit' />
                                        </IconButton>
                                    </Tooltip>
                                </div>
                                <div className='col-md-1 mx-1'>
                                    <Tooltip title="Undo">
                                    <div style={{cursor:"no-drop"}}>
                                            <IconButton disableTouchRipple="true" size="small" disabled={!note.title && !note.description} >
                                                <UndoIcon fontSize='inherit' />
                                            </IconButton>
                                        </div>
                                    </Tooltip>
                                </div>
                                <div className='col-md-1 mx-1'>
                                    <Tooltip title="Redo" disabled="false">
                                        <div style={{cursor:"no-drop"}}>
                                            <IconButton disableTouchRipple="true" size="small" disabled={!note.title && !note.description} >
                                                <RedoIcon fontSize='inherit' />
                                            </IconButton>
                                        </div>
                                    </Tooltip>
                                </div>
                                &nbsp;&nbsp;&nbsp;
                                <div className='col-md-2 pl-5'>
                                    <Button disabled={!(note.title && note.description && note.title.length>5 && note.description.length>5)} type='submit' variant="text" color="inherit" size='small' onClick={handleClick}>Close</Button>
                                </div>

                            </div>
                        </div>
                    </form>                                                                                                                                        

                    {/* <button type="submit" className='btn btn-primary' onClick={handleClick}>Submit</button> */}
                </div>}
            </div>
        </div>
    );
};

export default AddNotes;



