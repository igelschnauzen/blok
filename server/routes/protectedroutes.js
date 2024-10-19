const express = require("express");
const verifyToken = require("../middleware/authMiddleware");

const router = express.Router();

router.all('*', verifyToken);

module.exports = router;