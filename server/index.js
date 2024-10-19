const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const protectedRoutes = require("./routes/protectedroutes");
require("dotenv").config();

const userRoutes = require("./routes/userroutes");
const chatRoutes = require("./routes/chatroutes");
const messageRoutes = require("./routes/messageroutes");

app.use(cors({
	origin: "http://95.183.12.121",
	maxAge: 86400
})); 

//allow from everywhere:
//app.use(cors());

app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/chats", protectedRoutes, chatRoutes);
app.use("/api/messages/", protectedRoutes, messageRoutes);

const port = process.env.port || 3000;
const uri = process.env.MONGO_ADDRESS;

app.listen(port, (req, res) => {
	console.log("Server running on port: " + port);
});

mongoose.connect(uri).then(()=> console.log("MongoDB connection established!"))
	.catch((error) => console.log("MongoDB connection failed!" + error.message));
