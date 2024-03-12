import { Router } from "express";
import { confirm, getMySections, reject } from "./super.controller.js";
const router = Router();
router.post('/reject',reject);
router.post('/confirm',confirm);
router.get('/getSections/:id',getMySections);
export default router;