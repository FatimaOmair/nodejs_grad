import { Router } from "express";
import { confirm, getMySections, reject } from "./super.controller.js";
import { role } from "../../services/role.js";
import { auth } from "../../middleWare/auth.js";
const router = Router();
router.post('/reject',reject);
router.post('/confirm',confirm);
router.get('/getSections',auth([role.supervisor]),getMySections);
export default router;