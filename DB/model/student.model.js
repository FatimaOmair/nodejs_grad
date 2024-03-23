import { model, Schema, Types } from "mongoose";
const studentSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    img: {
      type: String,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    depId: {
      type: Types.ObjectId,
      ref: "department",
    },
    confirmEmail: {
      type: Boolean,
      default: false,
    },
    sendCode: {
      type: String,
      default: null,
    },
    academicYear: {
        type:Number,
        required: true,
    },
    role:{
      type: String,
      default:"student"
    },
    universityNum:{
      type: String,
      required: true,
    }
  },
  { timestamps: true }
);
export const studentModel = model("student",studentSchema);
