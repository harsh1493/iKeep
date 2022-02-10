import React from 'react';
import { useContext, useEffect, useRef,useState } from 'react/cjs/react.development';
import NoteItem from './NoteItem';
import noteContext from '../context/Notes/NoteContext';
import alertContext from '../context/Alert/AlertContext';
import navContext from '../context/Navbar/NavContext';
import AddNotes from './AddNotes';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import AddAlertIcon from '@mui/icons-material/AddAlert';
import ColorLensOutlinedIcon from '@mui/icons-material/ColorLensOutlined';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import { IconButton } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import { Button } from '@mui/material';
import "../styles/alternate.css";
import {useLocation, useNavigate } from 'react-router-dom';
import ColorPalette from './ColorPalette';
import Reminders from './Reminders';
const Notes = (props) => {
  const context = useContext(noteContext);
  const { notes, getNotes,editNote } = context;
  const navigate = useNavigate();
  const location=useLocation();
  //to access sideNav state
  const sideNavContext = useContext(navContext);
  const {isExpanded,setIsExpanded}=sideNavContext;


  //to access alert state
  const { showAlert } = useContext(alertContext);

  const [paletteActive, setpaletteActive] = useState(false);
  const pallet={
      "red":"bg-red-400",
      "blue":"bg-blue-400",
      "green":"bg-green-400",
      "orange":"bg-orange-400",
      "violet":"bg-violet-400",
      "yellow":"bg-yellow-400",
  }
  const showPalette = () => {
      console.log("ss")
      setpaletteActive(!paletteActive);
  };
  const setBackground=(color,note)=>{
    console.log(color,note);
    setNote({
         _id:note._id,
         title:note.title,
         description:note.description,
         tag:note.tag,
         background:color
         });
         console.log(color,note);

    editNote(note._id,note.title,note.description,note.tag,color);
}

  //add ref for modal access and call modal button click using a method
  const ref = useRef(null);
  const updateNote = (currentNote) => {
    ref.current.click();
    setNote(currentNote);
  }

  //hamdle edit fuctionality
  const [note, setNote] = useState({id:"",title:"",description:"",tag:"",background:""});


  //to fetch notes at init state
  useEffect(() => {
    //if auth toke exists return notes
    if(localStorage.getItem('token')){
      getNotes();
    }else{
        navigate('/login');
    }

  // eslint-disable-next-line
}, [note]);


  const handleClick = (event) => {
    //prevents reload of page on submit
     event.preventDefault();
     showAlert("Note updated", "success");
     console.log(note);
     editNote(note._id,note.title,note.description,note.tag,note.background);
    
    // note.title && note.description && addNote(note.title,note.description,note.tag);
    // setShow(true);
    // setNote({});
}
const onChange=(event)=>{
    //spread the existing note and add/overwrite the respective target.name to respective target.value
    setNote({...note,[event.target.name]:event.target.value});
    
}

  
  return (
    <div className={`flex flex-col  ${isExpanded?"ml-56":""}`}>
      <AddNotes />
      
      <button  style={{display:"none"}}type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" ref={ref}>
        Launch demo modal
      </button>
      <div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">  
            <div className="relative container  shadow p-3  bg-white rounded" >
                    <form action=" ">

                        <div className="mb-3">
                            <input type="text" value={note.title} id="title" name='title' placeholder="Title" minLength={5} required onChange={onChange}  style={{ border: "none", outlineWidth: "0", width: "100%", fontWeight: "500" }} />
                        </div>
                        <div className="mb-3">
                            <input id="description" value={note.description} name='description'  placeholder='Take a note..'  onChange={onChange} style={{ border: "none", outlineWidth: "0", width: "100%" }} minLength={5} required/>
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
                                        <IconButton disableTouchRipple="true" size="small"  onClick={showPalette}>
                                            <ColorLensOutlinedIcon fontSize='inherit' />
                                        </IconButton>
                                    </Tooltip>
                                </div>
                                {paletteActive?<ColorPalette  note={note}  setBackground={setBackground}/>:""}
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
                                    <Tooltip title="More">
                                        <IconButton disableTouchRipple="true" size="small" aria-haspopup="true" aria-expanded="false" >
                                            <MoreVertOutlinedIcon fontSize='inherit' />
                                        </IconButton>
                                    </Tooltip>
                                </div>
                                <div className='col-md-1 mx-1'>
                                    <Tooltip title="Undo">
                                    <div style={{cursor:"no-drop"}}>
                                            <IconButton disableTouchRipple="true" size="small"  >
                                                <UndoIcon fontSize='inherit' />
                                            </IconButton>
                                        </div>
                                    </Tooltip>
                                </div>
                                <div className='col-md-1 mx-1'>
                                    <Tooltip title="Redo" disabled="false">
                                        <div style={{cursor:"no-drop"}}>
                                            <IconButton disableTouchRipple="true" size="small"  >
                                                <RedoIcon fontSize='inherit' />
                                            </IconButton>
                                        </div>
                                    </Tooltip>
                                </div>
                                &nbsp;&nbsp;&nbsp;
                                <div className='col-md-2 pl-5'>
                                    <Button disabled={note.title.length<5 || note.description.length<5} variant="text" color="inherit" data-bs-dismiss="modal" onClick={handleClick}   size='small'>Update</Button>
                                </div>

                            </div>
                        </div>
                    </form>
                </div>
      
            {/* <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary">Save changes</button>
            </div> */}
          </div>
        </div>
      </div>
      {notes.length===0?<div className="RfDI4d-neVct-Ne3sFf-haAclf QT3Do" ><div className="neVct-Ne3sFf-Bz112c"></div><div className="neVct-Ne3sFf-fmcmS">Notes you add appear here</div></div>:
      <div className="row my-3" >

    
      {props.path==="reminders" && <Reminders notes={notes} key={note._id} updateNote={updateNote} setBackground={setBackground} isExpanded={isExpanded} ></Reminders>}
        {props.path=="/" && notes.map((note) => {
          return <NoteItem note={note} key={note._id} updateNote={updateNote} setBackground={setBackground} isExpanded={isExpanded}/>;
        })}
      </div>}
    </div>
  );
};

export default Notes;

