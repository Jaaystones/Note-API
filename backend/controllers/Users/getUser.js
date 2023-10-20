import User from '../../models/User.js';
import asyncHandler from 'express-async-handler';


//Get all users
//@ get/users
// Authorized


const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find().select('-password').lean();

    //error handling
    if (!users?.length){
        return res.status(404).json({ message: "Users not found" });
    }
    res.status(200).json(users);

});

export default getUsers;