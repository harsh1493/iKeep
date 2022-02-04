import React,{useContext} from 'react';
import alertContext from '../context/Alert/AlertContext';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddAlertIcon from '@mui/icons-material/AddAlert';
import ColorLensOutlinedIcon from '@mui/icons-material/ColorLensOutlined';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import { IconButton } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
const NoteActions = () => {
    
    const {showAlert} = useContext(alertContext);

  return (
    <div className='row'>
    <div className='col-md-2 '>
        <Tooltip title="Remind me">
            <IconButton disableTouchRipple="true" size="small">
                <AddAlertIcon fontSize='inherit' />
            </IconButton>
        </Tooltip>
    </div>
    {/* <div className='col-md-2'>
        <Tooltip title="Collaborate">
            <IconButton disableTouchRipple="true" size="small">
                <PersonAddOutlinedIcon fontSize='inherit' />
            </IconButton>
        </Tooltip>
    </div> */}
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
            <IconButton disableTouchRipple="true" size="small" onClick={()=>{showAlert("Note Deleted","warning")}}>
                <DeleteIcon fontSize='inherit' />
            </IconButton>
        </Tooltip>
    </div>
    <div className='col-md-2'>
        <Tooltip title="Edit">
            <IconButton disableTouchRipple="true" size="small"  >

                <EditIcon fontSize='inherit' />
            </IconButton>
        </Tooltip>
    </div>
</div>
  );
};

export default NoteActions;
