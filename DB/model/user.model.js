import { model, Schema, Types } from "mongoose";

const userSchema = new Schema(
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
    role: {
      type: [{ type: String, enum: ["admin", "headOfDepartment", "supervisor"] }],
      required: true,
    },
    officeHours: {
      type: String,
      required: false,
    }
  },
  { timestamps: true }
);

export const userModel = model("user", userSchema);
