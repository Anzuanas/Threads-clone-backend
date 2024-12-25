import express from 'express'

import { getConversation, getMessages, sendMessage } from '../controllers/messageController.js';
import protectRoute from '../middlewares/protectRoute.js';
const router = express.Router();


router.get("/conversations",protectRoute,getConversation)
router.post("/",protectRoute,sendMessage)
router.get("/:otherUserId",protectRoute,getMessages)
export default router   