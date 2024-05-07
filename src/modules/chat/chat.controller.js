import { chatModel } from "../../../DB/model/chat.model.js";
import { messageModel } from "../../../DB/model/message.model.js";
import { sectionModel } from "../../../DB/model/section.model.js";
import { studentModel } from "../../../DB/model/student.model.js";
import { userModel } from "../../../DB/model/user.model.js";
import { getPagination } from "../../services/pagination.js";
import { uploadFile } from "../../services/uploadFile.js";

export const fetchChat = async (req, res, next) => {
	try {
		let chats = null
		chats = await chatModel.find({
			users: { $elemMatch: { $eq: req.userId } }
		}).populate("users", "-password").populate("groupAdmin", "-password")
		if (!chats) {
			chats = await chatModel.find({
				groupAdmin: req.userId
			}).populate("users", "-password").populate("groupAdmin", "-password")
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



////////////////////////////////////



export const newSendMessages = async (req, res, next) => {
		let section;
		let isImage = false;
		let { content } = req.body;
		if (req.file) {
			isImage = true;
			content = await uploadFile(req.file.path);
		}
		if (req.role == 'student') {
			section = await sectionModel.findOne({ students: { $in: req.userId } });
		} else {
			req.role = 'supervisor'
			const { sectionId } = req.query;
			section = await sectionModel.findById(sectionId);
		}
		const newMessage = await messageModel.create({ senderId: req.userId, content, sectionId: section._id, senderRole: req.role, isImage });
		return res.status(201).json({ message: 'success', newMessage });
}

export const newGetMessages = async (req, res, next) => {
	const { page, perPage } = req.query;
	const { limit, offset } = getPagination(page, perPage);
	let section;
	if (req.role == 'student') {
		section = await sectionModel.findOne({ students: { $in: req.userId } }).populate('students').populate('userId');
	} else {
		req.role = 'supervisor'
		const { sectionId } = req.query;
		section = await sectionModel.findById(sectionId).populate('userId').populate('students');
	}
	const students = section.students;
	const supervisor = section.userId;
	const messages = await messageModel.paginate({ sectionId: section._id }, {
		limit,
		offset,
		sort: { createdAt: -1 }
	});
	if (!messages.totalDocs) {
		return res.status(404).json({ message: 'No messages found' });
	}

	const messagesArray = JSON.parse(JSON.stringify(messages.docs));
	messagesArray.map(message => {
		if (message.senderRole == 'student') {
			for (const student of students) {
				if (message.senderId == student._id) {
					message.senderName = student.name;
				}
			}
		} else {
			message.senderName = supervisor.name;
		}
	})

	return res.status(200).json({
		message: 'success',
		messagesArray,
		page: messages.page,
		totalPages: messages.totalPages,
		totalMessages: messages.totalDocs
	});
}

export const sectionDetails = async (req, res, next) => {
	let section;
	if (req.role == 'student') {
		section = await sectionModel.findOne({ students: { $in: req.userId } }).populate('students').populate('userId');
	} else {
		req.role = 'supervisor'
		const { sectionId } = req.query;
		section = await sectionModel.findById(sectionId).populate('userId').populate('students');
	}
	const students = section.students;
	const supervisor = section.userId;
	return res.status(200).json({ message: 'success', students, supervisor, sectionNumber: section.num });
}