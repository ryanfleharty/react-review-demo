const mongoose = require("mongoose");

const drinkSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }
})

const drink = mongoose.model('Drink', drinkSchema);

module.exports = drink;