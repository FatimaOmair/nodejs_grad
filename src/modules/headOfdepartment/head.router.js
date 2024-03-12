import { Router } from "express";
import { createSection, deleteSection, getHeadSections } from "./head.controller.js";
import { auth } from "../../middleWare/auth.js";
import { role } from "../../services/role.js";
const router = Router();
router.post('/addSection',createSection)
router.get('/getHeadSections',auth([role.headOfDepartment]),getHeadSections)
router.delete('/deleteSection/:id',auth([role.headOfDepartment]),deleteSection)
export default router;