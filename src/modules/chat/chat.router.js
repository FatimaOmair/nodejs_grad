import { Router } from "express";
import { fetchChat,getMessages,getSectionChatMapping,sendMessage } from "./chat.controller.js";
import { auth } from "../../middleWare/auth.js";
import { role } from "../../services/role.js";
const router = Router();
router.post("/sendmessage/:chatId", auth([role.supervisor,role.student]), sendMessage);
router.get('/fetchChat',auth([role.supervisor,role.student]),fetchChat);
router.get('/fetchSectionChat',auth([role.supervisor]),getSectionChatMapping);
router.get("/getmessages/:chatId", auth([role.supervisor,role.student]), getMessages);
//router.get("/getothermessages/:chatId", auth([role.supervisor,role.student]), getOtherMessages);

export default router;