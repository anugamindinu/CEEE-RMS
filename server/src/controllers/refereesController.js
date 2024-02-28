require("dotenv").config();
const Referee = require("../models/referee");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const moment = require("moment");
// const mongoose = require("mongoose");

async function getUsers(req, res) {
  // fetch all users with user_type populated
  try {
    const users = await Referee.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

const verificationDataStore = {};
const VERIFICATION_CODE_EXPIRATION_TIME = 5 * 60 * 1000; 
const RESET_PASSWORD_CODE_EXPIRATION_TIME = 5 * 60 * 1000;

async function getVerificationData(phoneNumber) {
  const verificationData = verificationDataStore[phoneNumber];
  if (!verificationData) return null;

  // Check if verification code has expired
  if (
    Date.now() - verificationData.timestamp >
    VERIFICATION_CODE_EXPIRATION_TIME
  ) {
    delete verificationDataStore[phoneNumber]; // Remove expired verification data
    return null;
  }

  return verificationData;
}

async function clearVerificationData(phoneNumber) {
  delete verificationDataStore[phoneNumber];
}

async function createUser(req, res) {
  try {
    const {
      name,
      password,
      phoneNumber,
      account_name,
      account_number,
      bank_name,
      branch,
      NIC,
      profilePicture,
      email,
    } = req.body;

    // Check if user with the provided email already exists
    const existingUser = await Referee.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "User with this email already exists" });
    }

    // Generate a verification code
    const verificationCode = generateVerificationCode();

    // Send the verification code via SMS (assuming you have this function implemented)
    await sendVerificationCode(phoneNumber, verificationCode);

    // Store the verification code and user data temporarily
    verificationDataStore[phoneNumber] = {
      name,
      password: await bcrypt.hash(password, 10),
      phoneNumber,
      verificationCode,
      account_name,
      account_number,
      bank_name,
      branch,
      NIC,
      profilePicture,
      email, // Include email in verification data
    };

    // Send response with instructions to verify code
    res.status(202).json({
      message:
        "Verification code sent to your phone number. Please enter the code to complete registration.",
    });
  } catch (error) {
    console.error(error); // Log error for debugging purposes
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function verifyCode(req, res) {
  try {
    const { phoneNumber, verificationCode } = req.body;

    // Retrieve temporary user data based on phone number
    const verificationData = await getVerificationData(phoneNumber);

    if (!verificationData) {
      return res
        .status(400)
        .json({ error: "Invalid or expired verification code" });
    }

    if (verificationData.verificationCode !== verificationCode) {
      return res.status(400).json({ error: "Incorrect verification code" });
    }

    // Code verified, proceed to save user details
    await saveUserDetails(verificationData);

    // Clear temporary verification data
    await clearVerificationData(phoneNumber);

    res.status(201).json({ message: "User created successfully!" });
  } catch (error) {
    console.error(error); // Log error for debugging purposes
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function saveUserDetails(verificationData) {
  try {
    const user = new Referee({
      full_name: verificationData.name,
      password: verificationData.password,
      contact_number: verificationData.phoneNumber,
      email: verificationData.email,
      account_name: verificationData.account_name || null,
      account_number: verificationData.account_number || null,
      bank_name: verificationData.bank_name || null,
      branch: verificationData.branch || null,
      NIC: verificationData.NIC || null,
      profilePicture: verificationData.profilePicture || null,
    });
    await user.save();
  } catch (error) {
    throw error;
  }
}

// Function to generate a unique verification code
function generateVerificationCode() {
  const digits = "0123456789";
  let code = "";
  for (let i = 0; i < 4; i++) {
    code += digits[Math.floor(Math.random() * digits.length)];
  }
  console.log("Generated verification code:", code);
  return code;
}

// Function to send the verification code via SMS (replace with your preferred method)
async function sendVerificationCode(phoneNumber, verificationCode) {
  const url = "https://richcommunication.dialog.lk/api/sms/send";
  const apiKey = process.env.SMS_API_KEY;

  const data = {
    messages: [
      {
        clientRef: "0934345",
        number: phoneNumber,
        mask: "SLTC", // Update the mask if necessary
        text: `This is a test message 2`,
        campaignName: "rmstest",
      },
    ],
  };

  // Get the current date time in the required format
  const currentDateTime = moment().format("YYYY-MM-DDTHH:mm:ss");
  console.log("Current date time:", currentDateTime);

  try {
    const response = await axios.post(url, data, {
      headers: {
        "Content-Type": "application/json",
        "USER": "user_slt",
        "DIGEST": "23383276670a8227dc53f93a952ccfa6",
        "CREATED": currentDateTime,
        "Authorization": `Bearer ${apiKey}`,
      },
    });

    // Log the response status
    console.log("Response status:", response.status);

    // Check if response data exists
    const responseData = response.data;
    console.log("Response data:", responseData);

    // Check if response status is OK
    if (response.status === 200) {
      console.log("Verification code sent successfully");
    } else {
      console.error("SMS sending failed:", responseData);
      throw new Error(`SMS sending failed with status code: ${response.status}`);
    }
  } catch (error) {
    console.error("Error sending verification code:", error.message);
    throw error;
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;

    // Find the user with the given email
    const user = await Referee.findOne({ email });

    // Check if the user exists
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Compare the provided password with the stored hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Extract relevant information for the token payload
    const { _id, full_name: userName, email: userEmail } = user;

    // Create JWT token with user information
    const token = jwt.sign(
      { userId: _id, userName, userEmail },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // Return the token along with success message and user data
    res.status(200).json({
      message: "Login successful",
      token,
      _id,
      userName,
      userEmail,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function generateResetPasswordCode() {
  const digits = "0123456789";
  let code = "";
  for (let i = 0; i < 4; i++) {
    code += digits[Math.floor(Math.random() * digits.length)];
  }
  console.log("Generated reset password code:", code);
  return code;
}

async function sendResetPasswordCode(phoneNumber, code) {
  // Implementation to send reset password code via SMS
  console.log(`Sending reset password code ${code} to ${phoneNumber}`);
  // Actual implementation to send SMS would go here
}

async function getUserByPhoneNumber(phoneNumber) {
  // Example implementation to retrieve user by phone number from database
  return await Referee.findOne({ contact_number: phoneNumber });
}

async function storeResetPasswordData(phoneNumber, code) {
  verificationDataStore[phoneNumber] = {
    code,
    timestamp: Date.now(),
  };
}

async function verifyResetPasswordCode(phoneNumber, code) {
  const resetData = verificationDataStore[phoneNumber];
  if (!resetData) return false;

  // Check if reset password code has expired
  if (Date.now() - resetData.timestamp > RESET_PASSWORD_CODE_EXPIRATION_TIME) {
    delete verificationDataStore[phoneNumber]; // Remove expired reset password data
    return false;
  }

  return resetData.code === code;
}

async function resetPassword(req, res) {
  try {
    const { phoneNumber, code, newPassword } = req.body;

    // Verify reset password code
    const isCodeValid = await verifyResetPasswordCode(phoneNumber, code);
    if (!isCodeValid) {
      return res
        .status(400)
        .json({ error: "Invalid or expired reset password code" });
    }

    // Reset password for the user
    const user = await getUserByPhoneNumber(phoneNumber);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    // Clear temporary reset password data
    delete verificationDataStore[phoneNumber];

    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    console.error(error); // Log error for debugging purposes
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function requestResetPassword(req, res) {
  try {
    const { phoneNumber } = req.body;

    // Check if user with the provided phone number exists
    const user = await getUserByPhoneNumber(phoneNumber);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Generate a reset password code
    const resetCode = await generateResetPasswordCode();

    // Send the reset password code via SMS
    await sendResetPasswordCode(phoneNumber, resetCode);

    // Store the reset password code temporarily
    await storeResetPasswordData(phoneNumber, resetCode);

    res.status(200).json({
      message: "Reset password code sent to your phone number",
    });
  } catch (error) {
    console.error(error); // Log error for debugging purposes
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function getUserById(req, res) {
  try {
    const { id } = req.params;

    // check if the id is valid object id
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ error: "Invalid id" });
    }

    const user = await Referee.findById(id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// update password
async function updatePassword(req, res) {
  try {
    const { id } = req.params;
    const { password } = req.body;

    // check if the id is valid object id
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ error: "Invalid id" });
    }

    // Hash the password before updating
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update the user by ID
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        password: hashedPassword,
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ user: updatedUser, message: "User updated!" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = {
  getUsers,
  createUser,
  login,
  getUserById,
  updatePassword,
  verifyCode,
  requestResetPassword,
  resetPassword,
};
