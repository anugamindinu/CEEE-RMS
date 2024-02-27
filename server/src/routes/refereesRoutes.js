const express = require("express");
const refereesController = require("../controllers/refereesController");

const router = express.Router();

router.get("/referees", refereesController.getUsers);
router.post("/referees/add-new", refereesController.createUser);
router.post("/login", refereesController.login);
router.get("/referees/:id", refereesController.getUserById);
router.put("/update-referee-password/:id", refereesController.updatePassword);

module.exports = router;
