const messageModel = require("../models/messageModel");
const chatModel = require("../models/chatModel");

const validateChatAccess = async (req, res, chatId) => {
    const chatData = await chatModel.findById(chatId);
    if(!chatData.members.includes(req.user["_id"])) return res.status(401).json("Unauthenticated");
}

const createMessage = async(req, res) => {
    const {chatId, senderId, text} = req.body;

    if(validateChatAccess(req, res, chatId)) return;

    const message = new messageModel({
        chatId, senderId, text
    });

    try {
        const response = await message.save();
        res.status(200).json(response);
    } catch {
        console.log(error);
        res.status(500).json(error);
    }
}

const getMessages = async(req, res) => {
    const {chatId} = req.params;

    if(validateChatAccess(req, res, chatId)) return;

    try {
        const messages = await messageModel.find({chatId});
        res.status(200).json(messages);
    } catch {
        console.log(error);
        res.status(500).json(error);
    }
}

module.exports = {createMessage, getMessages};