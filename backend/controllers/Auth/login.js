import User from '../../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';


// @desc Login
// @route POST /auth
// @access Public
const login = asyncHandler(async (req, res) => {
    //deconstructure body
    const { username, password } = req.body;
    //error handling
    if (!username || !password) {
        return res.status(400).json({ message: 'All fields are required' })
    };
    //find a user in the database.
    const user = await User.findOne({ username }).exec()

    if (!user || !user.active) {
        return res.status(401).json({ message: 'Unauthorized' })
    };

    //Match password with that stored in the database
    const match = await bcrypt.compare(password, user.password);
    console.log(match);

    if (!match) return res.status(401).json({ message: 'Unauthorized credentials' });

    //tokens generated for the server
    const accessToken = jwt.sign(
        {
            "UserInfo": {
                "username": user.username,
                "roles": user.roles
            }
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '10m' }
    );

    const refreshToken = jwt.sign(
        { "username": user.username },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: '7d' }
    );

    // Create secure cookie with refresh token 
    res.cookie('jwt', refreshToken, {
        httpOnly: true, //accessible only by web server 
        secure: true, //https
        sameSite: 'None', //cross-site cookie 
        maxAge: 7 * 24 * 60 * 60 * 1000 //cookie expiry: set to match rT
    });

    // Send accessToken containing username and roles 
    res.json({ accessToken });
})

export default login;