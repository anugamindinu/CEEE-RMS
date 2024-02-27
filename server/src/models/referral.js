const mongoose = require("mongoose");

const referralSchema = new mongoose.Schema({
  date: Date,
  course_id: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
  branch_id: { type: mongoose.Schema.Types.ObjectId, ref: "Branch" },
  student_id: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
  refree_id: { type: mongoose.Schema.Types.ObjectId, ref: "Refree" },
  ref_status_id: { type: mongoose.Schema.Types.ObjectId, ref: "RefStatus" },
  reference_number: {
    type: Number,
    unique: true,
  },
});

const Referral = mongoose.model("Referral", referralSchema);

module.exports = Referral;
