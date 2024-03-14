import { sectionModel } from "../../../DB/model/section.model.js";
import { userModel } from "../../../DB/model/user.model.js";

export const createSection = async (req, res, next) => {
  try {
    const { num, userId } = req.body;
    const section = await sectionModel.create({ num, depId:req.depId, userId });
    return res.status(200).json(section);
  } catch (err) {
    next(new Error(err.message, { cause: 500 }));
  }
};

export const getHeadSections = async (req, res, next) => {
  try {
    const sections = await sectionModel.find({ userId: req.userId });
    
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
    const mySections = await sectionModel.find({depId:req.depId});
   
  } catch (err) {
    next(new Error(err.message)); 
  }
};




