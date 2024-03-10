import { Router } from "express";
import { bookSection } from "./student.controller.js";
const router = Router();
router.post('/bookSection',bookSection);
export default router;