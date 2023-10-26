import express from "express";
import login from "../controllers/Auth/login.js";
import logout from "../controllers/Auth/logout.js";
import refresh from "../controllers/Auth/refresh.js";
import loginLimiter from "../middleware/loginLimiter.js"

const router = express.Router();


router.post('/login', loginLimiter, login);
router.get('/refresh',  refresh);
router.post('/logout',  logout);


export default router;