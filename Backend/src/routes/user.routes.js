import { Router } from "express";
import { registerUser, loginUser, logoutUser, getAllUser } from "../controllers/user.controller.js";
import { upload } from "../middleware/multer.middleware.js";
import { verifyJWT } from "../middleware/user.middleware.js";
const router=Router()
import { accessChat } from "../controllers/chat.controller.js";

router.route("/").get(verifyJWT,getAllUser);
router.route("/register").post(upload.single("pic"),registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(verifyJWT,logoutUser);
router.route("/chat").post(accessChat);
export {router}