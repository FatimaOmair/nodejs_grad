import { departmentModel } from "../../../DB/model/department.model.js";
import { userModel } from "../../../DB/model/user.model.js";
import { studentModel } from "../../../DB/model/student.model.js";
import { projectModel } from "../../../DB/model/project.model.js";
import bcrypt from "bcryptjs";
import { uploadFile } from "../../services/uploadFile.js";
export const createDepartment = async (req, res, next) => {
  try {
    const { name} = req.body;
    const department = new departmentModel({name});
    const savedDepartment = await department.save();
    return res.status(200).json({ message: "success", savedDepartment });
  } catch (err) {
    next(new Error(err.message, { cause: 500 }));
  }
};

export const getUsers = async (req, res, next) => {
  try {
    const users = await userModel.find();
    res.status(200).json({ message: "success", users });
  } catch (err) {
    next(new Error(err.message, { cause: 500 }));
  }
};

export const getStudents = async (req, res, next) => {
  try {
    const users = await studentModel.find();
    res.status(200).json({ message: "success", users });
  } catch (err) {
    next(new Error(err.message, { cause: 500 }));
  }
};

export const createProject = async (req, res, next) => {
  try {
    const { name, group, supervisorName, depId } = req.body;
    const img = await uploadFile(req.files["img"][0].path);
    const thesis = await uploadFile(req.files["thesis"][0].path);
    const existingDepartment = await departmentModel.findById(depId);
    if (!existingDepartment) {
      return next(new Error("Department does not exist", { cause: 500 }));
    }
    const project = new projectModel({
      thesis,
      img,
      name,
      group,
      supervisorName,
      depId,
    });
    const savedProject = await project.save();
    res.status(200).json({ message: "success", savedProject });
  } catch (err) {
    next(new Error("stack", { cause: 500 }));
  }
};
export const getProjects = async (req, res, next) => {
  try {
    const { id } = req.params;
    const dep = await departmentModel.findById(id);
    if(!dep){
      return res.json({message :"No department"});
    }
    const projects = await projectModel.find({ depId: id });
    res.status(200).json({ message: "success", projects });
  } catch (err) {
    next(new Error(err.message, { cause: 500 }));
  }
};
export const getAllProjects = async (req, res, next) => {
  try {
    const projects = await projectModel.find();
    res.status(200).json({ message: "success", projects });
  } catch (err) {
    next(new Error(err.message, { cause: 500 }));
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await userModel.deleteOne({ _id: id });
    if (!user.deletedCount) {
      res.status(200).json({ message: "user not found" });
    }
    res.status(200).json({ message: "success", user });
  } catch (err) {
    next(new Error(err.message, { cause: 500 }));
  }
};
export const deleteStudent = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await studentModel.deleteOne({ _id: id });
    if (!user.deletedCount) {
      res.status(200).json({ message: "student not found" });
    }
    res.status(200).json({ message: "success", user });
  } catch (err) {
    next(new Error(err.message, { cause: 500 }));
  }
};
export const deleteProject = async (req, res, next) => {
  try {
    const { id } = req.params;
    const project = await projectModel.deleteOne({ _id: id });
    if (!project.deletedCount) {
      res.status(200).json({ message: "project not found" });
    }
    res.status(200).json({ message: "success", project });
  } catch (err) {
    next(new Error(err.message, { cause: 500 }));
  }
};
export const updateSupervisor = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {name,email,depId,role,officeHours,phoneNumber, password } = req.body;
    const hash = await bcrypt.hash(password, parseInt(process.env.SALTROUND));
    const supervisor = await userModel.updateOne(
      { _id: id },
      {name,email,depId,role,officeHours,phoneNumber, password: hash}
    );
    if(!supervisor.modifiedCount){
      return res.json({message:"user not found"})
    }
    res.status(200).json({ message: "success", supervisor });
  } catch (err) {
    next(new Error(err.message, { cause: 500 }));
  }
};
export const updateStudent = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {name,email,depId,phoneNumber,password} = req.body;
    const hash = await bcrypt.hash(password, parseInt(process.env.SALTROUND));
    const student = await studentModel.updateOne(
      { _id: id },
      {name,email,depId,phoneNumber, password: hash}
    );
    if(!student.modifiedCount){
      return res.json({message:"user not found"})
    }
    res.status(200).json({ message: "success", student });
  } catch (err) {
    next(new Error(err.message, { cause: 500 }));
  }
};
export const deleteDepartment = async (req, res, next) => {
  try {
    const { id } = req.params;
    const dep = await departmentModel.deleteOne({ _id: id });
    if (!dep.deletedCount) {
      res.status(200).json({ message: "department not found" });
    }
    res.status(200).json({ message: "success", dep });
  } catch (err) {
    next(new Error(err.message, { cause: 500 }));
  }
};
