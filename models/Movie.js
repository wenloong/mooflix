const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
   title: {
      type: String,
      required: [true, 'Required to have a movie title']
   },
   description: {
      type: String,
      required: true
   },
   release_date: {
      type: Date,
      required: true
   },
   duration: {
      type: Number,
      required: true
   },
   likeCount: {
      type: Number,
      default: 0
   },
   likes: [{
      type: String
   }],
   dislikeCount: {
      type: Number,
      default: 0
   },
   dislikes: [{
      type: String
   }],
   views: {
      type: Number,
      default: 0
   },
   studio: {
      type: String,
      required: true
   },
   genre: [{
      type: String,
      required: true
   }],
   comments: [{
      username: String,
      userImage: String,
      comment: String,
      createdOn: Date
   }]
})


module.exports = mongoose.models.Movie || mongoose.model('Movie', MovieSchema);