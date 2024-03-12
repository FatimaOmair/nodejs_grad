import { sectionModel } from "../../../DB/model/section.model.js";

export const createSection = async (req, res, next) => {
  try {
    const { num, depId, userId } = req.body;
    const section = await sectionModel.create({ num, depId, userId });
    return res.status(201).json(section);
  } catch (err) {
    next(new Error(err.message, { cause: 500 }));
  }
};

export const getHeadSections = async (req, res, next) => {
  try {
    const section = await sectionModel.find({ depId: req.depId });
    return res.status(201).json(section);
  } catch (err) {
    next(new Error(err.message, { cause: 500 }));
  }
};
export const deleteSection = async (req, res, next) => {
  try {
    const {sectionId} = req.params;
    const section = await sectionModel.findOneAndDelete({ depId: req.depId },{sectionId: sectionId});
    return res.status(201).json(section);
  } catch (err) {
    next(new Error(err.message, { cause: 500 }));
  }
};
