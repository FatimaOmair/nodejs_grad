import { Router } from "express";
import { fetchChat,getMessages,sendMessage } from "./chat.controller.js";
import { auth } from "../../middleWare/auth.js";
import { role } from "../../services/role.js";
const router = Router();
router.post("/sendmessage/:chatId", auth([role.supervisor,role.student]), sendMessage);
router.get('/fetchChat',auth([role.supervisor,role.student]),fetchChat);
router.get("/getmessages/:chatId", auth([role.supervisor,role.student]), getMessages);

export default router;