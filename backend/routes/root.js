import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
const router =  express.Router();

// Extracts the file name path and directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

router.get('^/$|/index(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'index.html'));
});

export default router;