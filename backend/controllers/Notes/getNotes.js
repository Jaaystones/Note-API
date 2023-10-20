import Note from "../../models/Note.js";
import User from "../../models/User.js";
import asyncHandler from "express-async-handler";


//@ get method
// Gets all notes
// Access Private

const getNotes = asyncHandler( async(req, res) => {
    const notes = await Note.find().lean();

    //error handling
    if (!notes?.length){
        return res.status(400).json({ message: "No notes found" });
    };
    //add username to each note before sending the response
    const noteWithUsername = await Promise.all(notes.map( async(note) => {
        const user = await User.findById(note.user).lean().exec();
        return { ...note, username: user.username }
    }));

    // return result
    res.json(noteWithUsername);

});

export default getNotes;