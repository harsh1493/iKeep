import { useState } from "react";
import NoteContext from "./NoteContext";
const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = []
  const [notes, setNotes] = useState(notesInitial);



  //Get all notes
  const getNotes = async () => {
    console.log("Fetching all note");
    //API call
    const response = await fetch(`${host}/api/notes/fetchAllNotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFjYjRlNzA0MDY5NWYwMTAwNWJhZjg4In0sImlhdCI6MTY0MjE1NTM1MH0.lhUiJZ966QDtEx4NTvn9M2DpVmlF9Tf92Nzy9mLaFA8'
      },
    });
    const json = await response.json()
    console.log(json);
  
    setNotes(json)
  }

  //Add a note
  const addNote = async (title, description,tag) => {
    console.log("Adding a new note");
    //API call
    const response = await fetch(`${host}/api/notes/addNote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFjYjRlNzA0MDY5NWYwMTAwNWJhZjg4In0sImlhdCI6MTY0MjE1NTM1MH0.lhUiJZ966QDtEx4NTvn9M2DpVmlF9Tf92Nzy9mLaFA8'
      },
      body: JSON.stringify({title, description,tag})
    });

    const note = await response.json()
    console.log(note);
    setNotes(notes.concat(note));
    console.log(notes);
  }

  //Delete a note
  const deleteNote = async (id) => {
   // console.log("Note Deleted:" + id);
        //API call
        const response = await fetch(`${host}/api/notes/deleteNote/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFjYjRlNzA0MDY5NWYwMTAwNWJhZjg4In0sImlhdCI6MTY0MjE1NTM1MH0.lhUiJZ966QDtEx4NTvn9M2DpVmlF9Tf92Nzy9mLaFA8'
          },
        });
    const json = response.json();
    console.log(json); 
    const newNotes = notes.filter((note) => { return note._id !== id; });
    setNotes(newNotes);
  }

  //Edit a note
  const editNote = async (id, title, description, tag) => {
    //API call
    const response = await fetch(`${host}/api/notes/updateNote/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFjYjRlNzA0MDY5NWYwMTAwNWJhZjg4In0sImlhdCI6MTY0MjE1NTM1MH0.lhUiJZ966QDtEx4NTvn9M2DpVmlF9Tf92Nzy9mLaFA8'
      },
      body: JSON.stringify({ title, description, tag })
    });
    const json = response.json();
    console.log(json);

    //logic to edit on client side
    for (let index = 0; index < notes.length; index++) {
      const note = notes[index];
      if (note._id === id) {
        note.title = title;
        note.description = description;
        note.tag = tag;
      }

    }
  }


  return (

    <NoteContext.Provider value={{ notes, setNotes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}

    </NoteContext.Provider>
  );
}

export default NoteState;
