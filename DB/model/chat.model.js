import mongoose, { Schema } from "mongoose";
import { Types } from "mongoose";
import { model } from "mongoose";
import { userChatModel } from "./userChat.model.js";
const chatSchema = new Schema(
  {
    isGroup: {
      type: Boolean,
      default: true,
    },
    users: [
      {
        type:Types.ObjectId,
        ref: "student",
      },
    ],
    letestMessage: {
      type:Types.ObjectId,
      ref: "message",
    },
    groupAdmin: {
      type: Types.ObjectId,
      ref: "user",
    },
  },
  
  { timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }}, 
);
chatSchema.virtual('populatedUsers', {
  ref: 'userChat',
  localField: 'users', // This is the field in chatSchema
  foreignField: '_id', // This is the field in userChatModel
  justOne: false,
  options: { 
    populate: [
      { path: 'populatedSuperId'},
      { path: 'populatedStudents'} 
    ]
  }
});
 
 export const chatModel = model("chat", chatSchema);
 
