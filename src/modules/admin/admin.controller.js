import { departmentModel } from "../../../DB/model/department.model.js";
import { userModel } from "../../../DB/model/user.model.js";
import { studentModel } from "../../../DB/model/student.model.js";
import { projectModel } from "../../../DB/model/project.model.js";
import bcrypt from "bcryptjs";
import cloudinary from "../../services/cloudinary.js";
import { uploadFile } from "../../services/uploadFile.js";
export const createDepartment = async (req, res, next) => {
  try {
    const { name } = req.body;
    const department = new departmentModel({ name });
    const savedDepartment = await department.save();
    res.status(200).json({ message: "success", savedDepartment });
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
    const { phoneNumber, password } = req.body;
    const hash = await bcrypt.hash(password, parseInt(process.env.SALTROUND));
    const supervisor = await userModel.updateOne(
      { _id: id },
      { phoneNumber: phoneNumber, password: hash }
    );
    res.status(200).json({ message: "success", supervisor });
  } catch (err) {
    next(new Error(err.message, { cause: 500 }));
  }
};
