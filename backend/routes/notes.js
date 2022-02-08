const express = require("express");
const fetchUser = require("../middleware/fetchUser");
const router = express.Router();
const Note = require("../models/Note");
const {
  body,
  validationResult
} = require('express-validator');


//ROUTE 1 :Get all notes of logged in  user using:Get "/api/notes/getAllNotes". Require Login
router.get('/fetchAllNotes', fetchUser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server error');
  }

});

//ROUTE 2 :Add new notes for logged in  user using:POST "/api/notes/addNote". Require Login
router.post('/addNote', fetchUser, [
  body('title', 'Title cannot be blank').isLength({ min: 3 }),
  body('description', 'Description must be atleast 5 characters long').isLength({ min: 5 })
], async (req, res) => {
  try {

    const errors = validationResult(req);
    //if feilds are invalid/bad formatted
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }
    const { title, description, tag, background } = req.body;

    const note = new Note({
      title,
      description,
      tag,
      background,
      user: req.user.id
    });
    const savedNote = await note.save();
    res.json(savedNote);

  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server error');
  }
});


//ROUTE 3 :Update an existing note for logged in  user using:POST "/api/notes/updateNote/:id". Require Login
router.put('/updateNote/:id', fetchUser, async (req, res) => {
  const { title, description, tag, background } = req.body;
  //create a new note obj
  const newNote = {};
  if (title) { newNote.title = title };
  if (description) { newNote.description = description };
  if (tag) { newNote.tag = tag };
  if (background) { newNote.background = background };

  //find note to be updated and update

  let note = await Note.findById(req.params.id);

  //if note with given id don't exists
  if (!note) {
    return res.status(404).send("Note not found");
  }

  //if user is trying to update other user's note
  if (note.user.toString() != req.user.id) {
    return res.status(401).send("not allowed");
  }

  //if note exists and user is legit
  note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
  res.json({ note });


  //const note=Note.findByIdAndUpdate()


});

//ROUTE 4 :Delete an existing note for logged in  user using:POST "/api/notes/deleteNote/:id". Require Login
router.delete('/deleteNote/:id', fetchUser, async (req, res) => {


  //find note to be deleted and delete
  let note = await Note.findById(req.params.id);

  //if note with given id don't exists
  if (!note) {
    return res.status(404).send("Note not found");
  }

  //if user is trying to delete other user's note
  if (note.user.toString() != req.user.id) {
    return res.status(401).send("not allowed");
  }

  //if note exists and user is legit
  note = await Note.findByIdAndDelete(req.params.id);
  res.send("deleted");


  //const note=Note.findByIdAndUpdate()


});

module.exports = router;

