import { Router } from "express";
import { assignTask, confirm,getMySections, getSectionNum, getSupervisorTask, giveFeedback, reject, supervisorRequests, updateTask} from "./super.controller.js";
import { role } from "../../services/role.js";
import { auth } from "../../middleWare/auth.js";
import { HME, multerValidation, myMulter } from "../../services/multer.js";
import { editProfile, viewProfile } from "../../services/profile.js";
const router = Router();
router.post('/reject',reject);
router.post('/confirm',confirm);
router.get('/getSections',auth([role.supervisor]),getMySections);
router.get('/getSectionNum/:id',auth([role.supervisor]),getSectionNum);
router.post('/assignTask', myMulter(multerValidation.pdf).single("task"),
HME,auth([role.supervisor]),assignTask);
router.post('/feedback/:id', giveFeedback);
router.get('/profile',auth([role.supervisor]), viewProfile);
router.patch('/editProfile', auth([role.supervisor]), editProfile);
router.get('/requests', auth([role.supervisor]),supervisorRequests);
router.get('/getSuperTask', auth([role.supervisor]),getSupervisorTask);
router.patch('/editTask/:id',myMulter(multerValidation.pdf).single("task"),
HME, auth([role.supervisor]),updateTask);
export default router;