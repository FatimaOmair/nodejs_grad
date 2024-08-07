import { Router } from "express";
import { bookSection, checkSubmissionForTask, editSubmission, getStudentSection, getStudentTask, submitTask} from "./student.controller.js";
import { auth } from "../../middleWare/auth.js";
import { role } from "../../services/role.js";
import { editProfile, editProfileImg, viewProfile } from "../../services/profile.js";
import { HME, multerValidation, myMulter } from "../../services/multer.js";
const router = Router();
router.post('/bookSection',auth([role.student]),bookSection);
router.get('/profile',auth([role.student]), viewProfile);
router.patch('/editProfile',auth([role.student]), editProfile);
router.patch('/editProfileImg',auth([role.student]),myMulter(multerValidation.pdf).single("img"),
HME, editProfileImg);
router.post('/submitTask/:sectionId/:taskId', myMulter(multerValidation.pdf).single("task"),
HME,submitTask);
router.patch('/editSubmission/:sectionId/:taskId', myMulter(multerValidation.pdf).single("task"),
HME,editSubmission);
router.get("/section",auth([role.student]), getStudentSection);
router.get("/getMyTask",auth([role.student]),getStudentTask);
router.get("/getSubmission",auth([role.student]),checkSubmissionForTask);
export default router;