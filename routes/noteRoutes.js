import express from 'express';
import createNewNote from '../controllers/Notes/createNote.js';
import getNotes from '../controllers/Notes/getNotes.js';
import updateNote from '../controllers/Notes/updateNote.js';
import deleteNote from '../controllers/Notes/deleteNote.js';

const router = express.Router();

router.get('/', getNotes);
router.post('/create', createNewNote);
router.patch('/update', updateNote);
router.delete('/delete', deleteNote);


export default router;