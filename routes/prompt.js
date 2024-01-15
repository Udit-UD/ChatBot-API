import express from "express";
import { sendMsgToOpenAI, accessConversation, createConversation, fetchConversations } from "../Controllers/prompt.js";


const router = express.Router();
// GET

router.get("/", fetchConversations);
router.get("/:id", accessConversation);

// POST
router.post("/create", createConversation);
router.post("/:id", sendMsgToOpenAI);
export default router;