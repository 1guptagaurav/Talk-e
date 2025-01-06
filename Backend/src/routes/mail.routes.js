import { Router } from "express";
import { sendOtpEmail } from "../controllers/nodemailer.controller.js";
const router = Router();

router.route("/").post(sendOtpEmail);

export default router;
