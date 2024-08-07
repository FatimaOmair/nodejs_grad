import { model, Schema, Types } from "mongoose";
const departmentSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    }
  },
  { timestamps: true }
);
departmentSchema.index({ name: 1 }, { unique: true });


export const departmentModel = model("department", departmentSchema);
