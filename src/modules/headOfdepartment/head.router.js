import { Router } from "express";
import { createSection } from "./head.controller.js";
const router = Router();
router.post('/addSection',createSection)
export default router;