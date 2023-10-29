import User from '../../models/User.js';
import asyncHandler from 'express-async-handler';
import bcrypt from 'bcrypt';


//update new user
//@ patch/users
// Authorized

const updateUser = asyncHandler( async(req, res) => {
    const { id, username, roles, active, password, } = req.body;
    
    // Confirm data 
    if (!id || !username || !Array.isArray(roles) || !roles.length || typeof active !== 'boolean') {
        return res.status(400).json({ message: 'All fields except password are required' });
    };

    // Does the user exist to update?
    const user = await User.findById(id).exec();

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    // Check for duplicate 
    const duplicate = await User.findOne({ username }).collation({ locale: 'en', strength: 2 }).lean().exec()
    // Allow updates to the original user with imputed id
    if (duplicate && duplicate?._id.toString() !== id) {
        return res.status(409).json({ message: 'Duplicate username' });
    }

    user.username = username;
    user.roles = roles;
    user.active = active;

    if (password) {
        // Hash password 
        user.password = await bcrypt.hash(password, 10); // salt rounds 
    }
    // update user
    const updatedUser = await user.save();

    res.json({ message: `${updatedUser.username} updated` });

});

export default updateUser;