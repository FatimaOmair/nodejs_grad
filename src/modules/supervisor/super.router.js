import { Router } from "express";
import { assignTask, confirm,deleteTask,getMySections, getRequestById, getSectionNum, getSupervisorSubmissions, getSupervisorTask, getTaskById, giveFeedback, reject, supervisorRequests, updateTask} from "./super.controller.js";
import { role } from "../../services/role.js";
import { auth } from "../../middleWare/auth.js";
import { HME, multerValidation, myMulter } from "../../services/multer.js";
import { editProfile, editProfileImg, viewProfile } from "../../services/profile.js";
const router = Router();
router.post('/reject',reject);
router.post('/confirm',auth([role.supervisor]),confirm);
router.get('/getTask/:id',auth([role.supervisor,role.student]),getTaskById);
router.get('/getSections',auth([role.supervisor]),getMySections);
router.get('/getSectionNum/:id',auth([role.supervisor]),getSectionNum);
router.post('/assignTask', myMulter(multerValidation.pdf).single("task"),
HME,auth([role.supervisor]),assignTask);
router.post('/feedback', giveFeedback);
router.get('/profile',auth([role.supervisor]), viewProfile);
router.patch('/editProfile', auth([role.supervisor]), editProfile);
router.patch('/editProfileImg',auth([role.headOfDepartment]),myMulter(multerValidation.pdf).single("img"),
HME, editProfileImg);
router.get('/requests', auth([role.supervisor]),supervisorRequests);
router.get('/getSuperTask', auth([role.supervisor]),getSupervisorTask);
router.patch('/editTask/:id',myMulter(multerValidation.pdf).single("task"),
HME, auth([role.supervisor]),updateTask);
router.delete('/DeleteTask/:id',auth([role.supervisor]),deleteTask);
router.get('/getRequestById/:id',auth([role.supervisor]),getRequestById);
router.get('/getTaskSubmission',auth([role.supervisor]),getSupervisorSubmissions);
export default router;