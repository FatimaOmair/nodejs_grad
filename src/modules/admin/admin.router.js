import { Router } from "express";
import { createDepartment, createProject, deleteProject, deleteStudent, deleteUser, getAllProjects, getProjects, getStudents, getUsers, updateSupervisor } from "./admin.controller.js";
import { auth } from "../../middleWare/auth.js";
import { role } from "../../services/role.js";
import { HME, multerValidation, myMulter } from "../../services/multer.js";
const router = Router();
router.post("/addDepartment",auth([role.admin]), createDepartment);
router.post(
  "/addProject",auth[role.admin], 
  myMulter(multerValidation.pdf).fields([{name:"img"},{name:"thesis"}]),
  HME,
  createProject
);
router.get("/getUsers",auth([role.admin]),getUsers);
router.get("/getStudents",auth([role.admin]),getStudents);
router.get("/getprojects/:id",getProjects);
router.get("/getprojects",getAllProjects);
router.delete("/deleteUser/:id",auth([role.admin]),deleteUser);
router.delete("/deleteStudent/:id",auth([role.admin]),deleteStudent);
router.delete("/deleteProject/:id",auth([role.admin]),deleteProject);
router.patch("/updateSupervisor/:id",updateSupervisor);
export default router;
