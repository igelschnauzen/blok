const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
    members: [mongoose.Types.ObjectId],
}, 
{
    timestamps:true
});

const chatModel = mongoose.model("Chat", chatSchema);
module.exports = chatModel;
