import React from 'react'
import AddNotes from './AddNotes';
import NoteItem from './NoteItem';
const Reminders = (props) => {
  const { notes, updateNote,setBackground,isExpanded } = props;
  return (
    <div>
      {notes.length===0?<div className="RfDI4d-neVct-Ne3sFf-haAclf fSxGw" ><div className="neVct-Ne3sFf-Bz112c"></div><div className="neVct-Ne3sFf-fmcmS">Notes with upcoming reminders appear here</div></div>:
      <div className="row my-3" >

      {/* //fetch by category using filter */}
       {notes.filter((note) => {
            return note.background==="red";
        }).map((note) => {
          return <NoteItem note={note} key={note._id} updateNote={updateNote} setBackground={setBackground} isExpanded={isExpanded}/>;
        })} 
        
      </div>}
    </div>

  )
}

export default Reminders