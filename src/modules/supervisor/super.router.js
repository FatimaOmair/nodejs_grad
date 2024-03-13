import { Router } from "express";
import { assignTask, confirm, getMySections, reject } from "./super.controller.js";
import { role } from "../../services/role.js";
import { auth } from "../../middleWare/auth.js";
import { HME, multerValidation, myMulter } from "../../services/multer.js";
const router = Router();
router.post('/reject',reject);
router.post('/confirm',confirm);
router.get('/getSections',auth([role.supervisor]),getMySections);
router.post('/assignTask', myMulter(multerValidation.pdf).single("task"),
HME,assignTask);
export default router;