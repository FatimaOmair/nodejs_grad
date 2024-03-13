import { model, Schema, Types } from "mongoose";
const taskSchema = new Schema(
  {
    txt: {
      type: String,
      required: true,
    },
    file: {
      type: String,
      required: true,
    },
    sections: {
      type:[{type: Types.ObjectId,ref:"section"}],
      required: true,
    },
    
   
  },
  { timestamps: true }
);
export const taskModel = model("task",taskSchema);
