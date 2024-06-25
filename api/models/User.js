const mongoose = require('mongoose');
const {Schema, model} = mongoose;

mongoose.connect('mongodb://127.0.0.1:27017/blog', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const UserSchema = new Schema({
  username: {type: String, required: true, min: 4, unique: true},
  password: {type: String, required: true},
});

const UserModel = model('User', UserSchema);

module.exports = UserModel;