import Note from "../../models/Note.js";
import asyncHandler from "express-async-handler";


//@ post request
// Creates a new note
//access Private

const createNewNote = asyncHandler(async (req, res) => {
    const { user, title, text } = req.body;

    //error handling
    if(!user || !title || !text){
        return res.status(400).json({ message: "All Fields Are Required!" });
    }

    // check for duplicate title
    const duplicateTitle = await Note.findOne({ title }).collation({ locale: 'en', strength: 2 }).lean().exec();

    if (duplicateTitle){
        return res.status(409).json({ message: "Duplicate Note Title Found" });
    }

    // create new note
    const note = await Note.create({ user, title, text });

    if (note){
        return res.status(201).json({ message: "New Note Created" });
    }else{
        return res.status(400).json({ message: "Invalid Note Data Received" });
    }

});

export default createNewNote;