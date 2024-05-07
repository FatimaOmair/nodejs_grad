import { Router } from "express";
import { fetchChat, getMessages, sendMessage, sectionDetails, newSendMessages, newGetMessages } from "./chat.controller.js";
import { auth } from "../../middleWare/auth.js";
import { role } from "../../services/role.js";
import { HME, multerValidation, myMulter } from "../../services/multer.js";
import { validation } from "../../middleWare/validation.js";
import { getMessagesSchema, sectionDetailsSchema, sendMessageSchema } from "./chat.validation.js";
import { asyncHandler } from "../../services/errorHandling.js";

const router = Router();
router.post("/sendmessage/:chatId", auth([role.supervisor, role.student]), sendMessage);
router.get('/fetchChat', auth([role.supervisor, role.student]), fetchChat);
router.get("/getmessages/:chatId", auth([role.supervisor, role.student]), getMessages);





router.post('/sendMessage', auth([role.supervisor, role.student]), myMulter(multerValidation.pdf).single("img"),
    HME, validation(sendMessageSchema), asyncHandler(newSendMessages));
router.get('/getMessages', auth([role.supervisor, role.student]), validation(getMessagesSchema), asyncHandler(newGetMessages));
router.get('/sectionDetails', auth([role.supervisor, role.student]), validation(sectionDetailsSchema), asyncHandler(sectionDetails));
export default router;