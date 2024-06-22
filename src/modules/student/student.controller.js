import { requestModel } from "../../../DB/model/request.model.js";
import { sectionModel } from "../../../DB/model/section.model.js";
import { submitModel } from "../../../DB/model/submit.model.js";
import { taskModel } from "../../../DB/model/task.model.js";
import { getUser } from "../../services/getId.js";
import { uploadFile } from "../../services/uploadFile.js";

export const bookSection = async (req, res, next) => {
  try {
      const { students, studentId, sectionId } = req.body;
      const studentObjectIds = [];
      for (let i = 0; i < students.length; i++) {
        const student = await getUser(students[i]);

        if (student) {
              studentObjectIds.push(student._id);
          } else {
              return res.status(400).json({ message: `Student with university number ${students[i]} not found` });
          }
      }
      // Check if any of the students are already in another section
      for (let i = 0; i < studentObjectIds.length; i++) {
          const studentExists = await sectionModel.findOne({
              students: { $in: [studentObjectIds[i]] },
              _id: { $ne: sectionId } 
          });
          if (studentExists) {
              return res.status(400).json({ message: `Student with university number ${students[i]} is already in another section` });
          }
      }
     const check = await requestModel.findOne({studentId:req.userId})
     if(check){
      return res.json({ message: `Student is already send a request`})
     }
      const request = await requestModel.create({ students: studentObjectIds, studentId, sectionId });
      await sectionModel.findByIdAndUpdate(sectionId, { visible: false });
      return res.status(201).json({ message: "success", request });
  } catch (err) {
      next(new Error(err.message, { cause: 500 }));
  }
};

  export const getStudentSection = async (req, res, next) => {
    try {
      const section = await sectionModel.findOne({ students: req.userId });
  
      if (!section) {
        return res.status(404).json({ message: "Section not found for this student" });
      }
      return res.status(200).json({ section });
    } catch (err) {
      next(new Error(err.message, { cause: 500 }));
    }
  }

  export const getStudentTask = async (req,res,nex) => {
    try {
      const studentId= req.userId;
      const section = await sectionModel.findOne({ students: studentId });
      if (!section) {
        return res.json('Student is not assigned to any section');
      }
      const tasks = await taskModel.find({ sections: section._id });
      return res.json({message:"success",tasks}) ;
    } catch (error) {
      next(new Error(err.message, { cause: 500 }));
    }
  };
  export const submitTask = async (req, res, next) => {
    try {
        const { txt } = req.body;
        const {sectionId, taskId} = req.params;
        let fileTask;
        if (req.file) {
          fileTask = await uploadFile(req.file.path);
        }
        const submission = await submitModel.create({
            txt,
            section: sectionId,
            taskId,
            file: fileTask
        });
        return res.status(201).json({ message: "success", submission });
    } catch (err) {
        next(new Error(err.message, { cause: 500 }));
    }
};

export const checkSubmissionForTask = async (req, res, next) => {
    try {
        const { sectionId, taskId } = req.query;
        const submission = await submitModel.findOne({ section: sectionId, taskId });
        console.log(submission);
        if (submission) {
            return res.status(200).json({ message: true, submission });
        } else {
            return res.status(200).json({ message: false });
        }
    } catch (err) {
        next(new Error(err.message, { cause: 500 }));
    }
};
export const editSubmission = async (req, res, next) => {
  try {
      const { txt } = req.body;
      const {sectionId, taskId} = req.params;
      let fileTask;
      if (req.file) {
        fileTask = await uploadFile(req.file.path);
      }
      const submission = await submitModel.create({
          txt,
          section: sectionId,
          taskId,
          file: fileTask
      });
      return res.status(201).json({ message: "success", submission });
  } catch (err) {
      next(new Error(err.message, { cause: 500 }));
  }
};


  
  
  

