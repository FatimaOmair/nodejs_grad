import { model, Schema, Types } from "mongoose";
const projectSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    group:{
        type:[String],
        required: true,
    },
    supervisorName:{
        type:String,
        required: true,
    },
    thesis:String,
    img: {
      type: String,
    },
    depId: {
      type: Types.ObjectId,
      ref: "department",
    },
    
  },
  { timestamps: true }
);
export const projectModel = model("project", projectSchema);
