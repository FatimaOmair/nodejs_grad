import { Router } from "express";
import {
  createDepartment,
  createProject,
  deleteDepartment,
  deleteProject,
  deleteStudent,
  deleteUser,
  getAllProjects,
  getDepartments,
  getPerson,
  getProjects,
  getStudent,
  getStudents,
  getUser,
  getUsers,
  technicalSupport,
  updateStudent,
  updateSupervisor,
} from "./admin.controller.js";
import { auth } from "../../middleWare/auth.js";
import { role } from "../../services/role.js";
import { HME, multerValidation, myMulter } from "../../services/multer.js";
import { validation } from "../../middleWare/validation.js";
import {
  createDepValidation,
  createProjectValidation,
} from "./admin.validation.js";
const router = Router();
router.post(
  "/addDepartment",
  validation(createDepValidation),
  auth([role.admin]),
  createDepartment
);
router.get("/getDep", getDepartments);
router.post(
  "/addProject",
  auth([role.admin]),
  myMulter(multerValidation.pdf).fields([{ name: "img" }, { name: "thesis" }]),
  HME,
  createProject
);
router.get("/getUser/:id",auth([role.admin,role.student,role.headOfDepartment,role.supervisor]), getUser);
router.get("/getUsers", auth([role.admin,role.headOfDepartment]), getUsers);
router.get("/getStudent/:id",auth([role.admin,role.headOfDepartment,role.supervisor,role.student]), getStudent);
router.get("/getPerson", auth([role.headOfDepartment]), getPerson);
router.get("/getStudents", auth([role.admin]), getStudents);
router.get("/getprojects/:id", getProjects);
router.get("/getprojects", getAllProjects);
router.delete("/deleteUser/:id", auth([role.admin]), deleteUser);
router.delete("/deleteStudent/:id", auth([role.admin]), deleteStudent);
router.delete("/deleteProject/:id", auth([role.admin]), deleteProject);
router.patch("/updateSupervisor/:id", auth([role.admin]), updateSupervisor);
router.patch("/updateStudent/:id", auth([role.admin]), updateStudent);
router.delete("/deleteDep/:id", auth([role.admin]), deleteDepartment);
router.post("/technicalSupport", technicalSupport);
export default router;
