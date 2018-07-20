const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let articleSchema = new Schema({
      author: {
            type: String,
            required: true
      },
      title: {
            type: String,
            uppercase: true,
            required: true
      },
      createdOn: {
            type: Date,
            default: Date.now
      },
      image:{
        type: String   
      },
      categories: [{
            type: Schema.Types.ObjectId,
            ref: 'categories'
      }],
      text: {
            type: String,
            required: true
      }
});

module.exports = mongoose.model('articles', articleSchema);