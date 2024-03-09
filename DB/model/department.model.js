import { model, Schema, Types } from "mongoose";
const departmentSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    userId: {
      type: Types.ObjectId,
      ref: "user",
    },
  },
  { timestamps: true }
);
export const departmentModel = model("department", departmentSchema);
