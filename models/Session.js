const mongoose = require('mongoose');
var ObjectId = require('mongodb').ObjectID;

const SessionSchema = new mongoose.Schema({
   userId: {
      type: ObjectId,
      required: true
   },
   expires: {
      type: Date,
      required: true
   },
   sessionToken: {
      type: String,
      required: true
   },
   accessToken: {
      type: String,
      required: true
   },
   createdAt: {
      type: Date,
      required: true
   },
   updatedAt: {
      type: Date,
      required: true
   }
})

module.exports = mongoose.models.Session || mongoose.model('Session', SessionSchema);