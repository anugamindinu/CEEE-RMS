require("dotenv").config();
const Referee = require("../models/referee");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
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

async function createUser(req, res) {
  try {
    const { name, password, email } = req.body;

    // check if the email already exists
    const userAvailable = await Referee.findOne({ email });

    if (userAvailable) {
      return res.status(400).json({ error: "Email already exists" });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Assign the user_type _id and hashed password to the user before saving
    const user = new Referee({
      name,
      password: hashedPassword,
      email,
    });

    // Save and return user with success message
    await user.save();
    res.status(201).json({ user, message: "User created!" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;

    // Find the user with the given email and populate the 'user_type' field
    const user = await Referee.findOne({ email }).populate({
      path: "user_type",
      model: "User_type",
    });

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
    const { _id, name: userName, email: userEmail, user_type: userType } = user;

    // Extract permissions from user_type
    const permissions = userType
      ? {
          lead: userType.lead,
          user: userType.user,
          student: userType.student,
          branch: userType.branch,
          course: userType.course,
          settings: userType.course,
        }
      : {};
    // Create JWT token with user information and permissions
    const token = jwt.sign(
      { userId: _id, userName, userEmail, userType, permissions },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // Attach the decoded user information to the req object
    req.user = jwt.decode(token);

    // Return the token along with success message and user data
    res.status(200).json({
      message: "Login successful",
      token,
      _id,
      userName,
      userEmail,
      userType,
      permissions,
    });
  } catch (error) {
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
};
