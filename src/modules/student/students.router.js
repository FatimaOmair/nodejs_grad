import { Router } from "express";
import { bookSection, submitTask} from "./student.controller.js";
import { auth } from "../../middleWare/auth.js";
import { role } from "../../services/role.js";
import { editProfile, viewProfile } from "../../services/profile.js";
import { HME, multerValidation, myMulter } from "../../services/multer.js";

const router = Router();
router.post('/bookSection',auth([role.student]),bookSection);
router.get('/profile',auth([role.student]), viewProfile);
router.patch('/editProfile',auth([role.student]), editProfile);
router.post('/submitTask/:sectionId/:taskId', myMulter(multerValidation.pdf).single("task"),
HME,submitTask);
export default router;