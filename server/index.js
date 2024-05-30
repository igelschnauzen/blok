const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();

const userRoutes = require("./routes/userroutes");

app.use(express.json());

//CORS
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', '*')
  res.setHeader('Access-Control-Allow-Headers', '*')
  res.setHeader('Access-Control-Allow-Credentials', true)
  next()
})

app.options("/*", function(req, res, next){
  res.send(200);
});

app.use("/api/users/", userRoutes);

const port = process.env.port || 3000;
const uri = process.env.MONGO_ADDRESS;

app.listen(port, (req, res) => {
	console.log("Server running on port: " + port);
});

mongoose.connect(uri).then(()=> console.log("MongoDB connection established!"))
	.catch((error) => console.log("MongoDB connection failed!" + error.message));

