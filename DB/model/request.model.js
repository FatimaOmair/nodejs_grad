import { model, Schema, Types } from "mongoose";
const requestSchema = new Schema(
  {
    text: {
      type: String,
      required: true,
    },
    sectionId: {
      type: Types.ObjectId,
      ref: "department",
    },
    studentId: {
      type: Types.ObjectId,
      ref: "user",
    },
   
    
  },
  { timestamps: true }
);
export const requestModel = model("request", requestSchema);
