const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: String,
    drinksCreated: [{type: mongoose.Schema.Types.ObjectId, ref: "Drink"}]
})

const User = mongoose.model('User', userSchema);

module.exports = User;