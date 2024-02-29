const mongoose = require('mongoose')

const referralFollowupSchema = new mongoose.Schema({
    referral_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Referral'},
    refree_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Refree'},
    ref_status_id: {type: mongoose.Schema.Types.ObjectId, ref: 'ReferralStatus'},
    comment: String,
    date: Date
})

const Referral_Followup = mongoose.model('Referral_Followup', referralFollowupSchema)

module.exports = Referral_Followup