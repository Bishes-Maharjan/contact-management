import express from "express";
import { createContact, getContacts, updateContact, } from "../controllers/contacts.controller";
import { authMiddleware } from "../libs/authmiddleware";
const router = express.Router();
router.get("/", authMiddleware, getContacts);
router.post("/", authMiddleware, createContact);
router.patch("/:id", authMiddleware, updateContact);
router.delete("/:id", authMiddleware, updateContact);
export default router;
