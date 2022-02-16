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

import ColorPalette from './ColorPalette';
const AddNotes = () => {


    const { showAlert } = useContext(alertContext);

    const context = useContext(noteContext);
    const { addNote } = context;

    // const [title,setTitle] = useState();
    // const [description,setDescription] = useState();
    const [note, setNote] = useState({ title: "", description: "", tag: "", background: "Default" });
    const [noteStates, setNoteStates] = useState([]);
    const [currentState, setCurrentState] = useState(0);

    //palette visible
    const [paletteActive, setpaletteActive] = useState(false);
    const pallet = {
        "red": "bg-red-400",
        "blue": "bg-blue-400",
        "green": "bg-green-400",
        "orange": "bg-orange-400",
        "violet": "bg-violet-400",
        "yellow": "bg-yellow-400",
    }
    const showPalette = () => {
        setpaletteActive(!paletteActive);
    };
    const setBackground = (color, note) => {

        setNote({
            title: note.title,
            description: note.description,
            tag: note.tag,
            background: color
        });
        console.log(color, note);

        // addNote(note.title,note.description,note.tag,color);
    };




    const handleClick = (event) => {
        //prevents reload of page on submit
        event.preventDefault();
        if (note.title.length > 5 && note.description.length > 5) {
            showAlert("Note added", "success");
            console.log(note);
            addNote(note.title, note.description, note.tag, note.background);

        }
        setNote({});
        setShow(true);
        setpaletteActive(false);
    }
    const onChange = (event) => {
        //spread the existing note and add/overwrite the respective target.name to respective target.value
        setNote({ ...note, [event.target.name]: event.target.value });
        setNoteStates(noteStates.concat(note));
        setCurrentState(currentState + 1);
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
                    note.title && note.description && note.title.length > 5 && note.description.length > 5 && addNote(note.title, note.description, note.tag);
                    setNote({});
                }
            }

            // Bind the event listener
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                // Unbind the event listener on clean up
                document.removeEventListener("mousedown", handleClickOutside);

            };
        }, [ref, note]);
    }

    //to undo and redo input text to previous state
    const undo = () => {
        console.log(noteStates);
        setNote(noteStates.at(currentState - 1));
        setCurrentState(currentState - 1);
    }
    const redo = () => {
        if (currentState < noteStates.length - 1) {
            setNote(noteStates.at(currentState + 1));
            setCurrentState(currentState + 1);
        } else {
            console.log(noteStates);
        }
        console.log(noteStates.at(currentState), currentState);
    }



    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef);

    //document.addEventListener('click', handleFlickOutside, true);

    return (
        <div className='container '>
            <div className='flex justify-content-center' style={{ width: "100%" }}>
                {show ? <div className="shadow p-3 mb-5 w-50 my-3 text-slate-900" onClick={handleFlick} >
                    <p >Take a note...</p>
                </div> : <div className={` relative container my-3 shadow-2xl  p-3 mb-5 rounded w-50 ${note.background === "Default" ? pallet["white"] : pallet[note.background]}`} ref={wrapperRef}>
                    <form action=" " className='w-4/5'>

                        <div className="mb-3 bg-transparent">
                            <input className='bg-transparent text-black w-max border-0 outline-0 font-semibold' type="text" id="title" value={note.title} minLength={5} required name='title' placeholder="Title" onChange={onChange} />
                        </div>
                        <div className="mb-3">
                            <input className='bg-transparent text-black w-max border-0 outline-0 font-normal' id="description" name='description' value={note.description} minLength={5} required onChange={onChange} placeholder='Take a note..' style={{ border: "none", outlineWidth: "0", width: "100%" }}></input>
                        </div>

                        <div className='flex space-x-4 '>
                            <div >
                                <Tooltip title="Remind me">
                                    <IconButton disableTouchRipple={true} size="small">
                                        <AddAlertIcon fontSize='inherit' />
                                    </IconButton>
                                </Tooltip>
                            </div>

                            <div >
                                <Tooltip title="Background Options">
                                    <IconButton disableTouchRipple="true" size="small" onClick={showPalette} >
                                        <ColorLensOutlinedIcon fontSize='inherit' />
                                    </IconButton>
                                </Tooltip>
                            </div>
                            {paletteActive ? <ColorPalette note={note} setBackground={setBackground} /> : ""}

                            <Tooltip title="Add Image">
                                <IconButton disableTouchRipple="true" size="small">
                                    <ImageOutlinedIcon fontSize='inherit' />
                                </IconButton>
                            </Tooltip>

                            <Tooltip title="Archive">
                                <IconButton disableTouchRipple="true" size="small">
                                    <ArchiveOutlinedIcon fontSize='inherit' />
                                </IconButton>
                            </Tooltip>

                            <Tooltip title="More">
                                <IconButton disableTouchRipple="true" size="small" aria-haspopup="true" aria-expanded="false" >
                                    <MoreVertOutlinedIcon fontSize='inherit' />
                                </IconButton>
                            </Tooltip>

                            <Tooltip title="Undo">
                                <div style={{ cursor: "no-drop" }}>
                                    <IconButton onClick={undo} disableTouchRipple="true" size="small" disabled={!note.title && !note.description} >
                                        <UndoIcon fontSize='inherit' />
                                    </IconButton>
                                </div>
                            </Tooltip>
                            <Tooltip title="Redo" disabled="false">
                                <div style={{ cursor: "no-drop" }}>
                                    <IconButton onClick={redo} disableTouchRipple="true" size="small" disabled={noteStates.length <= currentState}  >
                                        <RedoIcon fontSize='inherit' />
                                    </IconButton>
                                </div>
                            </Tooltip>


                            <div className='text-black absolute right-0 pr-5 hover:text-white' >
                                <Button  disabled={!(note.title && note.description && note.title.length > 5 && note.description.length > 5)} type='submit' variant="text" color="inherit" size='small' onClick={handleClick}>Close</Button>
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



