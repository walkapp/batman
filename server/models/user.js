import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';


var schema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  created: {
    type: Date,
    required: true
  },
  full_name: {
    type: String
  },
  image_url: {
    type: String,
    default: '/images/default_avatar.jpg'
  }
});

schema.pre('save', function (next) {
  if (!this.isModified('password') && !this.isNew) {
    return next();
  }

  var salt = bcrypt.genSaltSync(10);
  this.password = bcrypt.hashSync(this.password, salt);
  next();
});

schema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

schema.methods.toJSON = function () {
  var json = this.toObject();
  delete json.password;

  return json;
}

export default mongoose.model('User', schema);
