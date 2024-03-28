import { model, Schema, Types } from "mongoose";
const submitSchema = new Schema(
  {
    txt: {
      type: String,
    },
    file: {
      type: String,
    },
    section: {
      type: Types.ObjectId,
      ref:"section",
     
    },
    taskId: {
        type: Types.ObjectId,
        ref: "task",
      },
    
   
  },
  { timestamps: true }
);
export const submitModel = model("submit",submitSchema);
