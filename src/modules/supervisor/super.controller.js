import { requestModel } from "../../../DB/model/request.model.js";
import { sectionModel } from "../../../DB/model/section.model.js";
import { getUser } from "../../services/getId.js";
import { getUsers } from "../admin/admin.controller.js";

export const reject = async (req, res, next) => {
  try {
    const request = await requestModel.findByIdAndUpdate(
      req.body.requestId,
      { state: "rejected" },
      { new: true }
    );
    await sectionModel.findByIdAndUpdate(req.body.sectionId, { visible: true });
    return res.status(201).json(request);
  } catch (err) {
    next(new Error(err.message, { cause: 500 }));
  }
};

export const confirm = async (req, res, next) => {
  try {
    const { sectionId, requestId, students } = req.body;
    const arr = [];
    for (let i = 0; i < students.length; i++) {
      const user = await getUser(students[i]);
      arr.push(user._id);
    }

    const request = await requestModel.findByIdAndUpdate(
      req.body.requestId,
      { state: "accept" },
      { new: true }
    );
    await sectionModel.findByIdAndUpdate(req.body.sectionId, { students: arr });
    return res.status(201).json(request);
  } catch (err) {
    next(new Error(err.message, { cause: 500 }));
  }
};
 
export const getMySections = async (req, res, next) => {
  try {
    const section = await sectionModel.find({userId:req.userId});
    return res.status(201).json(section);
  } catch (err) {
    next(new Error(err.message, { cause: 500 }));
  }
};