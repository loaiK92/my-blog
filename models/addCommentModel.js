const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const addCommentSchema = new Schema({
      name: {
            type: String,
            required: true
      },
      comment: {
            type: String,
            required: true
      },
      articleID:{
            type: Schema.Types.ObjectId,
            ref: 'articles'
      },
      createdOn:{
            type: Date,
            default: Date.now
      },
      updatedOn:{
            type: Date
      }
});
module.exports = mongoose.model('comments', addCommentSchema);