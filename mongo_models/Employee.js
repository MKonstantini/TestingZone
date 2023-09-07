const mongoose = require("mongoose");

// create schema
const employeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        minlength: 2,
        maxlength: 15       
    },
    age: {
        type: Number
    },
    isWorking: {
        type: Boolean
    }
});

// create model (correlating collection + schema)
const Employee = mongoose.model("employees", employeeSchema);

// export model
module.exports = Employee;