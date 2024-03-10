import { Router } from "express";
import { confirm, reject } from "./super.controller.js";
const router = Router();
router.post('/reject',reject);
router.post('/confirm',confirm);

export default router;