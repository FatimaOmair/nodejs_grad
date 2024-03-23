import { Router } from "express";
import { createSection, deleteSection, getHeadSections, updateHeadSections } from "./head.controller.js";
import { auth } from "../../middleWare/auth.js";
import { role } from "../../services/role.js";
import { editProfile, viewProfile } from "../../services/profile.js";
const router = Router();
router.get('/getHeadSections',auth([role.headOfDepartment,role.student]),getHeadSections)
router.post('/addSection',auth([role.headOfDepartment]),createSection)
router.get('/getHeadSections',auth([role.headOfDepartment]),getHeadSections)
router.delete('/deleteSection/:id',auth([role.headOfDepartment]),deleteSection)
router.get('/profile',auth([role.headOfDepartment]), viewProfile);
router.patch('/editProfile', auth([role.headOfDepartment]), editProfile);
router.patch('/updateSection/:sectionId', auth([role.headOfDepartment]), updateHeadSections);
router.use(auth([role.headOfDepartment]));
router.post('/addSection',createSection)
router.delete('/deleteSection/:id',deleteSection)
router.get('/profile', viewProfile);
router.patch('/editProfile', editProfile);
router.patch('/updateSection', updateHeadSections);

export default router;
