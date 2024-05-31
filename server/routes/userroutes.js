const express = require("express");
const router = express.Router();
const {registerUser, loginUser, findUser, getUsers} = require("../controllers/userController");

//CORS
router.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', '*')
  res.setHeader('Access-Control-Allow-Headers', '*')
  res.setHeader('Access-Control-Allow-Credentials', true)
  next()
})

router.options("/*", function(req, res, next){
  console.log("options request! ");
  res.send(200);
});

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/find/:userId", findUser);
router.get("/", getUsers);

module.exports = router;
