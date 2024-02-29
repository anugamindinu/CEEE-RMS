const referralFollowupAssignment = require("../models/followUpAssignment");
const ReferralFollowup = require("../models/ReferralFollowup");

async function addNewReferralFollowUp(req, res) {
    const {referral_id, status_id, assigned_at} = req.body;
    try {
        const newReferralFollowUp = await ReferralFollowup.create({
            referral_id,
            status_id,
            assigned_at
        });
        if (!newReferralFollowUp) {
            return res.status(400).json({error: "Error adding new referral follow up"});
        }

        // add to follow up assignment
        const newReferralFollowupAssignment = await referralFollowupAssignment.create({
            referral_id: newReferralFollowUp._id,
            status_id,
            assigned_at
        });
        if (!newReferralFollowupAssignment) {
            return res.status(400).json({error: "Error adding referral follow up assignment"});
        }

        return res.status(201).json(newReferralFollowUp);
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}

module.exports = {
    addNewReferralFollowUp
}