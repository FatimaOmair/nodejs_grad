import { Router } from "express";
import { signIn, signUp } from "./auth.controller.js";
const router = Router();
router.post("/register", signUp);
router.post("/signIn", signIn);
export default router;
