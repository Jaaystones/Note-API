import User from '../../models/User.js';
import Note from '../../models/Note.js';
import asyncHandler from 'express-async-handler';

//delete user
//@ delete/users
// Authorized

const deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.body

    // Confirm data
    if (!id) {
        return res.status(400).json({ message: 'User ID Required' })
    }

    // Does the user still have assigned notes?
    const haveNote = await Note.findOne({ user: id }).lean().exec()
    if (haveNote) {
        return res.status(400).json({ message: 'User has assigned notes' })
    }

    // Does the user exist to delete?
    const user = await User.findById(id).exec()

    if (!user) {
        return res.status(400).json({ message: 'User not found' });
    }

    const result = await user.deleteOne();

    res.json(`Username ${result.username} with ID ${result._id} deleted`)
});

export default deleteUser;