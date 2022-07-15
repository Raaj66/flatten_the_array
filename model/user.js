const mongoose = require('mongoose');

const usersSchema = mongoose.Schema({
    name: {
     type: String,
    },
    email: {
     type: String,
     required: true
    },
    phone: {
     type: Number,
    },
    password:{
        type:String,
        required:true
    }
   })
   //Creating the collection users
   const users = mongoose.model('users', usersSchema);
   module.exports = users;