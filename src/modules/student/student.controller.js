import { requestModel } from "../../../DB/model/request.model.js";
import { sectionModel } from "../../../DB/model/section.model.js";

export const bookSection = async (req, res, next) => {
    try {
     const {text,studentId,sectionId}=req.body;
     const request = await requestModel.create({text,studentId,sectionId});
     await sectionModel.findByIdAndUpdate(sectionId,{visible:false});
     return res.status(201).json(request);
    } catch (err) {
      next(new Error(err.message, { cause: 500 }));
    }
  };