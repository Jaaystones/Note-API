import User from '../../models/User.js';
import asyncHandler from 'express-async-handler';
import bcrypt from 'bcrypt';

//create new user
//@ post/users
// Authorized

const createNewUser = asyncHandler( async(req, res) => {
    const { username, password, roles } = req.body;

    // error handling
    if ( !username || !password ){
        return res.status(400).json({ message: 'All fields are required.'});
    }
    // check for any duplications and case sensitivity issues.
    const duplicate = await User.findOne({ username }).collation({ locale: 'en', strength: 2 }).lean().exec();

    if (duplicate){
        return res.status(409).json({ message: 'Duplicate username' });
    }
    //Check for password
    if (password.length < 6){
        return res.status(403).json({ message: "Password must not be less than 6 characters" });
    }
   // Hash password 
   const hashedPassword = await bcrypt.hash(password, 10) // salt rounds

   const userObject = (!Array.isArray(roles) || !roles.length)
       ? { username, "password": hashedPassword }
       : { username, "password": hashedPassword, roles }
    //create a new user
    const user = await User.create(userObject);
    //error handling
    if(user){
        res.status(201).json({ message: `New user ${username} created`});
    }else{
        res.status(400).json({ message: 'Invalid Data received'});
    }
});

export default createNewUser;