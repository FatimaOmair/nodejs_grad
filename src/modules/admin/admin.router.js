import { Router } from "express";
import { createDepartment } from "./admin.controller.js";
import { auth } from "../../middleWare/auth.js";
import { role } from "../../services/role.js";
const router = Router();
router.post("/add",auth([role.admin]), createDepartment);
export default router;
