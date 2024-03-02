import { Router } from "express";
import { signIn, studentSignUp, userSignUp } from "./auth.controller.js";
const router = Router();
router.post("/registerUser", userSignUp);
router.post("/registerStudent", studentSignUp);
router.post("/signIn", signIn);
export default router;
