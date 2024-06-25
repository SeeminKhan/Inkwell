const mongoose = require('mongoose');
const {Schema,model} = mongoose;

mongoose.connect('mongodb://127.0.0.1:27017/blog', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const PostSchema = new Schema({
  title:String,
  summary:String,
  content:String,
  cover:String,
  author:{type:Schema.Types.ObjectId, ref:'User'},
}, {
  timestamps: true,
});

const PostModel = model('Post', PostSchema);

module.exports = PostModel;