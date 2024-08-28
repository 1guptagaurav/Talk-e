import { Router } from "express";
import {
  accessChat,
  fetchChats,
  createGroupChat,
  renameGroupName,
  removeUser,
  addNewUser,
} from "../controllers/chat.controller.js";
import { verifyJWT } from "../middleware/user.middleware.js";

const router = Router();

router.route("/").post(verifyJWT, accessChat);
router.route("/").get(verifyJWT, fetchChats);
router.route("/group").post(verifyJWT, createGroupChat);
router.route("/rename").put(verifyJWT, renameGroupName);
router.route("/add").put(verifyJWT, addNewUser);
router.route("/remove").put(verifyJWT, removeUser);

export { router };
