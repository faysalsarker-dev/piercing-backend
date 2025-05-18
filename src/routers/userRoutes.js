const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.post("/", userController.createUser);

router.get("/", userController.getAllUsers);

router.get("/:uid", userController.getUserByUID);

router.put("/:uid", userController.updateUser);

router.delete("/:uid", userController.deleteUser);

module.exports = router;
