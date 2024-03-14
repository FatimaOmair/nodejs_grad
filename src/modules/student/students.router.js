import { Router } from "express";
import { bookSection, viewProfile } from "./student.controller.js";

const router = Router();
router.post('/bookSection',bookSection);
router.get('/profile', viewProfile);
export default router;