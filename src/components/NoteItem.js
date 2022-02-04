import React, { useContext, useState } from 'react';
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

const NoteItem = (props) => {


    //context to change state of note
    const context = useContext(noteContext);
    const { deleteNote } = context;
    const { note, updateNote } = props;

    const { showAlert } = useContext(alertContext);


    //add fade-away animation on delete note
    const [isVisible, setIsVisible] = useState(true);

    const transition = useTransition(isVisible, {
        from: { x: 0, y: 0, opacity: 0 },
        enter: { x: 0, y: 0, opacity: 1 },
        leave: { x: 0, y: 0, opacity: 0 },
    });


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


    return (
        <div className='col-md-3 showhim' >
            {transition((style, item) => item ?
                <animated.div style={style}>
                    <div className="card" style={{ width: "18rem", margin: "10px" }}>
                        <div className="card-body">
                            <div >
                                <div className='row '>
                                    <div className='col-md-10 '>
                                        <h5 className="card-title">{note.title}</h5>
                                    </div>
                                    <div className='col-md-2 '>
                                        {/* <IconButton disableTouchRipple="true" size="small" aria-haspopup="true" aria-expanded="false">
                                <MoreVertOutlinedIcon fontSize='inherit' />
                            </IconButton> */}
                                        <div className='App'>
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
                                <p className="card-text"> {note.description}</p>
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
                                            <IconButton disableTouchRipple="true" size="small">
                                                <ColorLensOutlinedIcon fontSize='inherit' />
                                            </IconButton>
                                        </Tooltip>
                                    </div>
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
                                            <IconButton disableTouchRipple="true" size="small" onClick={() => { updateNote(note) }} >
                                                <EditIcon fontSize='inherit' />
                                            </IconButton>
                                        </Tooltip>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </animated.div> : "")}
        </div>

    );



}

export default NoteItem;


