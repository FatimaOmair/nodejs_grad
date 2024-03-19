import { sectionModel } from "../../../DB/model/section.model.js";

import { studentModel } from "../../../DB/model/student.model.js";
import { userModel } from "../../../DB/model/user.model.js";

export const createSection = async (req, res, next) => {
  try {
    const { num, userId } = req.body;
    const section = await sectionModel.create({ num, depId:req.depId, userId });
    return res.status(200).json({message:"success",section});
  } catch (err) {
    next(new Error(err.message, { cause: 500 }));
  }
};

export const getHeadSections = async (req, res, next) => {
  try {

    const sections = await sectionModel.find({ depId: req.depId });

    if (sections.length === 0) {
      return res.status(404).json({ message: "There are no sections available for your department." });
    }
    
    return res.status(200).json(sections);
  } catch (err) {
    next(new Error(err.message)); 
  }
};


export const deleteSection = async (req, res, next) => {
  try {
    const { id } = req.params;
  
    const section = await sectionModel.findOneAndDelete({_id:id},{ depId: req.depId});
    if (!section) {
      return res.status(404).json({ message: 'Section not found' });
    }
    return res.status(200).json(section);
  } catch (err) {
    next(new Error(err.message, { cause: 500 }));
  }
};




export const updateHeadSections = async (req, res, next) => {
  try {
    const { supervisorId, studentIdsToAdd, studentIdsToDelete } = req.body;
    const sectionId = req.params.sectionId; 
    const section = await sectionModel.findById(sectionId);

    if (!section) {
      return res.status(404).json({ message: "Section not found" });
    }

    if (supervisorId) {
      const supervisor = await userModel.findById(supervisorId);
      if (!supervisor) {
        return res.status(400).json({ message: "Supervisor with the provided ID does not exist" });
      }
      section.userId = supervisorId;
    }

    if (studentIdsToAdd && studentIdsToAdd.length > 0) {
      const existingStudents = await studentModel.find({ _id: { $in: studentIdsToAdd } });
      
      if (existingStudents.length !== studentIdsToAdd.length) {
        return res.status(400).json({ message: "One or more provided student IDs do not exist" });
      }

      const studentsToAdd = studentIdsToAdd.filter(studentId => !section.students.includes(studentId));
      
      if (studentsToAdd.length === 0) {
        return res.status(400).json({ message: "One or more provided students already exist in the section" });
      }

      section.students.push(...studentsToAdd);
    }

    if (studentIdsToDelete && studentIdsToDelete.length > 0) {
      for (let i = 0; i < studentIdsToDelete.length; i++) {
        const studentIdToDelete = studentIdsToDelete[i];
        
        if (!section.students.includes(studentIdToDelete)) {
          return res.status(400).json({ message: `Student with ID ${studentIdToDelete} does not exist in this section` });
        }
        
        const index = section.students.indexOf(studentIdToDelete);
        section.students.splice(index, 1);
      }
    }

    await section.save();

    const mySections = await sectionModel.find({ depId: req.depId });
    
    res.status(200).json({ 
      message: "Section updated successfully", 
      section,
      mySections
    });
    
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};























