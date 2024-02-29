const express = require("express");
const refereesController = require("../controllers/refereesController");

const router = express.Router();

router.get("/referees", refereesController.getUsers);
router.post("/referees/add-new", refereesController.createUser);
router.post("/login", refereesController.login);
router.get("/referees/:id", refereesController.getUserById);
router.put("/update-referee-password/:id", refereesController.updatePassword);
router.post("/verifyCode", refereesController.verifyCode);
// requestResetPassword
router.post("/requestResetPassword", refereesController.requestResetPassword);
// resetPassword
router.post("/resetPassword", refereesController.resetPassword);
// resend verification code
router.post("/resendVerificationCode", refereesController.resendVerificationCode);

module.exports = router;
