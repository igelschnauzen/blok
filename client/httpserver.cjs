const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");

app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));

const port = 4000;

app.listen(port, (req, res) => {
	console.log("Server is running on port: " + port);
})
