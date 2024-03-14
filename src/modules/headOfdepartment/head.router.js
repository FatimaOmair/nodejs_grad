import { Router } from "express";
import { createSection, deleteSection, getHeadSections, updateHeadSections } from "./head.controller.js";
import { auth } from "../../middleWare/auth.js";
import { role } from "../../services/role.js";
import { editProfile, viewProfile } from "../../services/profile.js";
const router = Router();
router.post('/addSection',createSection)
router.get('/getHeadSections',auth([role.headOfDepartment]),getHeadSections)
router.delete('/deleteSection/:id',auth([role.headOfDepartment]),deleteSection)
router.get('/profile',auth([role.headOfDepartment]), viewProfile);
router.patch('/editProfile', auth([role.headOfDepartment]), editProfile);
router.patch('/updateSection', auth([role.headOfDepartment]), updateHeadSections);
export default router;
