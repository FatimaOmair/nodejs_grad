import { sectionModel } from "../../../DB/model/section.model.js";

export const createSection = async (req, res, next) => {
    try {
     const {num,depId,userId}=req.body;
     const section = await sectionModel.create({num,depId,userId});
     return res.status(201).json(section);
    } catch (err) {
      next(new Error(err.message, { cause: 500 }));
    }
  };