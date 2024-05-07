import { Schema, Types, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const messageSchema = new Schema(
  {
    senderId: {
      type: Types.ObjectId,
    },
    senderRole: String,
    content: { type: String, trim: true },
    sectionId: { type: Types.ObjectId, ref: "section" },
    isImage: { type: Boolean, default: false } 
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);
messageSchema.plugin(mongoosePaginate);


export const messageModel = model("message", messageSchema);







// import { Schema, Types,model } from "mongoose";
// const messageSchema = new Schema(
//   {
//     senderSuper: {
//       type: Types.ObjectId,
//       ref: "user",
//     },
//     senderStd:{
//       type: Types.ObjectId,
//       ref: "student"
//     },
//     content: { type: String, trim: true },
//     chat: { type: Types.ObjectId, ref: "chat" },
//   },
//   { timestamps: true,
//     toJSON: { virtuals: true },
//     toObject: { virtuals: true }}
// );

// export const messageModel = model("message", messageSchema);
