import Note from "../../models/Note.js";
import asyncHandler from "express-async-handler";


// @desc Update a note
// @route PATCH /notes
// @access Private
const updateNote = asyncHandler(async (req, res) => {
    const { id, user, title, text, completed } = req.body;

    // Confirm data
    if (!id) {
        return res.status(400).json({ message: 'Note ID is required' });
    }

    // Confirm the note exists to update
    const note = await Note.findById(id).exec();

    if (!note) {
        return res.status(400).json({ message: 'Note not found' });
    }

    if (user) {
        note.user = user;
    }

    if (title) {
        // Check for duplicate title
        const duplicate = await Note.findOne({ title }).lean().exec();

        if (duplicate && duplicate._id.toString() !== id) {
            return res.status(409).json({ message: 'Duplicate note title' });
        }

        note.title = title;
    }

    if (text) {
        note.text = text;
    }

    if (typeof completed === 'boolean') {
        note.completed = completed;
    }

    // Update the note
    const updatedNote = await note.save();

    res.json(`'${updatedNote.title}' updated`);
});

export default updateNote;
