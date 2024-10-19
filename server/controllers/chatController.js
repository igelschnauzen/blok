const chatModel = require("../models/chatModel");
const userModel = require("../models/userModel");

const createChat = async(req, res) => {
    const {firstId, name} = req.body;

    let secondId = await userModel.findOne({
        name: name
    })

    if(firstId === secondId) return res.status(400).json("You can't create chat with yourself");
    if(firstId !== req.user["_id"] && secondId !== req.user["_id"]) return res.status(401).json("Unauthenticated");

    try {
        const chat = await chatModel.findOne({
            members: {$all: [firstId, secondId]}
        });

        if(chat) return res.status(200).json(chat);

        const newChat = new chatModel({
            members: [firstId, secondId]
        });

        const response = await newChat.save();
        res.status(200).json(response);
    } catch(error) {
        console.log(error);
        res.status(500).json(error);
    }
}

const findUserChats = async(req, res) => {
    const userId = req.params.userId;
    if(userId !== req.user["_id"]) return res.status(401).json("Unauthenticated");

    try {
        const chats = await chatModel.find({
            members: {$in: [userId]}
        });

        res.status(200).json(chats);
    } catch(error) {
        console.log(error);
        res.status(500).json(error);
    }
}

const findChat = async(req, res) => {
    const {firstId, secondId}= req.params;
    if(firstId !== req.user["_id"] && secondId !== req.user["_id"]) return res.status(401).json("Unauthenticated");

    try {
        const chat = await chatModel.findOne({
            members: {$all: [firstId, secondId]}
        });

        res.status(200).json(chat);
    } catch(error) {
        console.log(error);
        res.status(500).json(error);
    }
}

module.exports = {createChat, findUserChats, findChat};
