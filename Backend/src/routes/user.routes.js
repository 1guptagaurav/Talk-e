import { Router } from "express";
import {getAllUser, registerUser, loginUser, logoutUser } from "../controllers/user.controller.js";
import { upload } from "../middleware/multer.middleware.js";
import { verifyJWT } from "../middleware/user.middleware.js";


const router = Router();

router.route("/").get(verifyJWT,getAllUser);
router.route("/register").post(upload.single("pic"),registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(verifyJWT,logoutUser);

export default router