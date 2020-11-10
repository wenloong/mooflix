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
   genre: [{
      type: String,
      required: true
   }]
})


module.exports = mongoose.models.Movie || mongoose.model('Movie', MovieSchema);