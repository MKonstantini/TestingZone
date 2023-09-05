const mongoose = require("mongoose");

// create schema
const foodSchema = new mongoose.Schema({
    name: {
        required: true,
        unique: true,
        type: String,
        minlength: 2,
        maxlength: 15       
    },
    cost: {
        required: true,
        type: Number
    },
    isHealthy: {
        type: Boolean
    }
});

// create model (schema + correlating collection)
const Food = mongoose.model("fridge", foodSchema);

// export model
module.exports = Food;