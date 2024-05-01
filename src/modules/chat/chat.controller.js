import {chatModel} from "../../../DB/model/chat.model.js";
import { messageModel } from "../../../DB/model/message.model.js";
import { studentModel } from "../../../DB/model/student.model.js";
import { userModel } from "../../../DB/model/user.model.js";
import { userChatModel } from "../../../DB/model/userChat.model.js";

// Update the fetchChat function
export const fetchChat = async (req, res, next) => {
  try {
    let chats=null
    chats = await chatModel.find({
      users: { $elemMatch: { $eq: req.userId } }
    }).populate("users","-password").populate("groupAdmin","-password")
    if(!chats){
      chats = await chatModel.find({
        groupAdmin:req.userId
      }).populate("users","-password").populate("groupAdmin","-password")
    }
    return res.status(200).json(chats);
  } catch (err) {
    next(new Error(err.message, { cause: 500 }));
  }
};



export const sendMessage = async (req, res, next) => {
  try {
    let newMessage = null;
    const { content } = req.body;
        const senderField = req.role === 'student' ? 'senderStd' : 'senderSuper';

    newMessage = {
      [senderField]: req.userId,
      content,
      chat: req.params.chatId,
    };
  let currMessage = await messageModel.create(newMessage);
  currMessage = await messageModel.findById(currMessage._id).populate(senderField).populate('chat');
  currMessage = await studentModel.populate(currMessage, {
    path: "chat.users",
  });
  currMessage = await userModel.populate(currMessage, {
    path: "chat.groupAdmin",
  });
    await chatModel.findByIdAndUpdate(req.params.chatId, {
      latestMessage: currMessage,
    });
    
    return res.status(200).json(currMessage);
  } catch (err) {
    console.error("Error in sendMessage:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};


export const getMessages = async (req, res, next) => {
  try {
    const senderField = req.role === 'student' ? 'senderStd' : 'senderSuper';
    let messages = await messageModel.find({ chat: req.params.chatId })
      .populate(senderField, "name img email")
      .populate("chat");
    messages = await studentModel.populate(messages, {
        path: "chat.users",
      });
    messages = await userModel.populate(messages, {
        path: "chat.groupAdmin",
      });
    res.status(200).json(messages);
  } catch (err) {
    next(new Error(err.message, { cause: 500 }));
  }
};