const Referral = require("../models/referral");

// add new referral
async function addNewReferral(req, res) {
    addNewReferralToLeads();
}

// add referral to the leads table
async function addNewReferralToLeads(req, res) {
}

// get all referrals according to the user
async function getAllReferral(req, res) {
}

module.exports = {
    addNewReferral,
    getAllReferral,
  };