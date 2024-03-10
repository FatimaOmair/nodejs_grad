import { model, Schema, Types } from "mongoose";
const sectionSchema = new Schema(
  {
    num: {
      type: String,
      required: true,
    },
    depId: {
      type: Types.ObjectId,
      ref: "department",
    },
    userId: {
      type: Types.ObjectId,
      ref: "user",
    },
    students:{
        type:[{type: Types.ObjectId,ref:"student"}],
        required:false,
    }
  },
  { timestamps: true }
);
export const sectionModel = model("section", sectionSchema);
