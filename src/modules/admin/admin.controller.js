import { departmentModel } from "../../../DB/model/department.model.js";
import { userModel } from "../../../DB/model/user.model.js";
import { studentModel } from "../../../DB/model/student.model.js";
import { projectModel } from "../../../DB/model/project.model.js";
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
      const { name,group,supervisorName,depId} = req.body;
      const project = new projectModel({ name,group,supervisorName,depId});
      const savedProject = await project.save();
      res.status(200).json({ message: "success", savedProject});
    } catch (err) {
      next(new Error(err.message, { cause: 500 }));
    }
};
export const getProjects = async (req, res, next) => {
    try {
      const {id} = req.params;
      const projects = await projectModel.find({ depId: id});
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
  
