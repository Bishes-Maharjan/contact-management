import express from "express";
import { getAllUsers, getMe, loginUser, registerUser, } from "../controllers/user.controllers";
import { authMiddleware } from "../libs/authmiddleware";
const router = express.Router();
router.get("/", getAllUsers);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", authMiddleware, getMe);
export default router;
