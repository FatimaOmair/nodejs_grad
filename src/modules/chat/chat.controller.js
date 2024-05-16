import { response } from "express";
import { chatModel } from "../../../DB/model/chat.model.js";
import { messageModel } from "../../../DB/model/message.model.js";
import { studentModel } from "../../../DB/model/student.model.js";
import { userModel } from "../../../DB/model/user.model.js";
import { sectionModel } from "../../../DB/model/section.model.js";

export const fetchChat = async (req, res, next) => {
  try {
    let chats = null;
    chats = await chatModel
      .find({
        users: { $elemMatch: { $eq: req.userId } },
      })
      .populate("users", "name email universityNum")
      .populate("groupAdmin", "name email phoneNumber");

    if (chats.length === 0) {
      chats = await chatModel
        .find({ groupAdmin: req.userId })
        .populate("users", "name email universityNum")
        .populate("groupAdmin", "name email phoneNumber");
    }

    if (chats.length === 0) {
      return res.status(404).json({ message: "chat not found" });
    }

    let section = null;
    section = await sectionModel.find({ userId: req.userId }).select("num");

    if (!section || section.length === 0) {
      const users = chats[0].users.map((user) => user._id);
      section = await sectionModel
        .findOne({ students: { $in: users } })
        .select("num");
      section = [section];
    }
    const role = req.role;
    return res.status(200).json({ chats, section, role });
  } catch (err) {
    next(new Error(err.message, { cause: 500 }));
  }
};

export const sendMessage = async (req, res, next) => {
  try {
    let newMessage = null;
    const { content } = req.body;
    const role = [req.role];
    const senderField = role.includes("student") ? "senderStd" : "senderSuper";
    newMessage = {
      [senderField]: req.userId,
      content,
      chat: req.params.chatId,
    };

    let currMessage = await messageModel.create(newMessage);
    currMessage = await messageModel.findById(currMessage._id).populate([
      {
        path: "chat",
      },
      {
        path: senderField,
      },
    ]);
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
    return res.status(500).json({ error: err.stack });
  }
};

export const getMessages = async (req, res, next) => {
  try {
    let messages = await messageModel
      .find({ chat: req.params.chatId })
    for(let msg of messages) {
      messages = await studentModel.populate(messages, {
        path: "senderStd",
        select:"_id name email"
      });
      messages = await userModel.populate(messages, {
        path: "senderSuper",
        select:"_id name email"
      });
    }
    return res.status(200).json({message:"success", messages});
  } catch (err) {
    next(new Error(err.message, { cause: 500 }));
  }
};


export const getSectionChatMapping = async (req, res) => {
  try {
    // Fetch sections where userId matches req.userId
    const sections = await sectionModel.find({ userId: req.userId }).populate('students').populate('userId');
    
    // Initialize sectionChatMapping as an array
    const sectionChatMapping = [];

    // Iterate through sections and build the mapping
    for (const section of sections) {
      // Map student IDs
      const allStudents = section.students.map(student => student._id);
      
      // Find chat where groupAdmin matches userId and users match all students
      const chat = await chatModel.findOne({
        groupAdmin: section.userId._id,
        users: { $all: allStudents }
      });

      // If chat found, add the mapping
      if (chat) {
        sectionChatMapping.push({ sectionNum: section.num, chatId: chat._id });
      }
    }

    // Respond with the sectionChatMapping array
    return res.json(sectionChatMapping);
  } catch (error) {
    console.error('Error fetching section chat mapping:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};



