

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    firstName:String,
    lastName:String,
    dob:String,
    phoneNo:String,
    email: String,
    password: { type: String },
   
}, {
    timestamps: true
});

module.exports = new mongoose.model('User', UserSchema);