import { Router } from "express";
import { changePassword, sendCode, signIn, studentSignUp, userSignUp, veriFyCode } from "./auth.controller.js";
import { auth } from "../../middleWare/auth.js";
import { role } from "../../services/role.js";
import { validation } from "../../middleWare/validation.js";
import { signInValidation, signupValidation } from "./auth.validation.js";
import { HME, multerValidation, myMulter } from "../../services/multer.js";
const router = Router();
router.post("/registerUser",auth([role.admin]),myMulter(multerValidation.pdf).single("img"),
HME,validation(signupValidation), userSignUp);
router.post("/registerStudent",myMulter(multerValidation.pdf).single("img"),
HME,auth([role.admin]), studentSignUp);
router.post("/signIn",validation(signInValidation), signIn);
router.post("/changePassword", changePassword);
router.post("/verify", veriFyCode);
router.post("/sendCode", sendCode);
export default router;
