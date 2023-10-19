import Note from "../../models/Note.js";
import asyncHandler from "express-async-handler";


// @desc Delete a note
// @route DELETE /notes
// @access Private
const deleteNote = asyncHandler(async (req, res) => {
    const { id } = req.body

    // Confirm data
    if (!id) {
        return res.status(400).json({ message: 'Note ID required' })
    }

    // Confirm note exists to delete 
    const note = await Note.findById(id).exec()

    //error handling
    if (!note) {
        return res.status(400).json({ message: 'Note not found' })
    }

    //delete note
    const result = await note.deleteOne()

    res.json(`Note '${result.title}' with ID ${result._id} deleted`)
});

export default deleteNote;