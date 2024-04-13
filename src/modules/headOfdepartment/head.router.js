import { Router } from "express";
import { createSection, deleteSection, getHeadSections, updateHeadSections } from "./head.controller.js";
import { auth } from "../../middleWare/auth.js";
import { role } from "../../services/role.js";
import { editProfile, editProfileImg, viewProfile } from "../../services/profile.js";
import { HME, multerValidation, myMulter } from "../../services/multer.js";
const router = Router();
router.get('/getHeadSections',auth([role.headOfDepartment,role.student,role.supervisor]),getHeadSections)
router.use(auth([role.headOfDepartment]));
router.post('/addSection',createSection)
router.delete('/deleteSection/:id',deleteSection)
router.get('/profile', viewProfile);
router.patch('/editProfile', editProfile);
router.patch('/editProfileImg',auth([role.headOfDepartment]),myMulter(multerValidation.pdf).single("img"),
HME, editProfileImg);
router.patch('/updateSection', updateHeadSections);

export default router;
