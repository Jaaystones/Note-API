import express from 'express';
import getUsers from '../controllers/Users/getUser.js';
import createNewUser from '../controllers/Users/registerUser.js';
import updateUser from '../controllers/Users/updateUser.js';
import deleteUser from '../controllers/Users/deleteUser.js';


const router = express.Router();

router.get('/', getUsers);
router.post('/create', createNewUser);
router.patch('/update', updateUser);
router.delete('/delete', deleteUser);


export default router;