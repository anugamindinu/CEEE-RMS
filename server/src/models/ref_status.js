const mongoose = require("mongoose");

const refStatusSchema = new mongoose.Schema({
    name: String
})

const refStatus = mongoose.model('RefStatus', refStatusSchema)

module.exports = refStatus
