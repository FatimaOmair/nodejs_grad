import { model, Schema } from "mongoose";
const departmentSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
export const departmentModel = model("department", departmentSchema);
