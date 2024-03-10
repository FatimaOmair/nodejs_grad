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
// Create unique index on the 'userId' field
departmentSchema.index({ userId: 1 }, { unique: true });
departmentSchema.index({ name: 1 }, { unique: true });


export const departmentModel = model("department", departmentSchema);
