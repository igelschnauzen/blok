const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const userRoutes = require("./routes/userroutes");
const chatRoutes = require("./routes/chatroutes");

app.use(express.json());
app.use(cors());

app.use("/api/users", userRoutes);
app.use("/api/chats", chatRoutes);

const port = process.env.port || 3000;
const uri = process.env.MONGO_ADDRESS;

app.listen(port, (req, res) => {
	console.log("Server running on port: " + port);
});

mongoose.connect(uri).then(()=> console.log("MongoDB connection established!"))
	.catch((error) => console.log("MongoDB connection failed!" + error.message));
