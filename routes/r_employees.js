const express = require("express");
const router = express.Router();

// joi schema
const joi = require("joi");
const employeeJoiSchema = joi.object({
        name: joi.string().required().min(2).max(15),
        age: joi.number().required(),
        isWorking: joi.boolean()
    })
    
// post new employee
const Employee = require("../mongo_models/Employee");
router.post("/", async (req, res) => {
    try {
        // joi validation for body
        const {error} = employeeJoiSchema.validate(req.body);
        if (error) return res.status(400).send(error);
        
        // check for if body exists
        let dbEmployee = await Employee.findOne({name: req.body.name});
        if (dbEmployee) return res.status(400).send("error: entry already exists!");

        // post body in DB
        const newEmployee = new Employee(req.body);
        await newEmployee.save();

        // return res
        res.status(201).send(newFood);
        
    } catch (err) {
        res.status(400).send(err);
    }
})

// get all employees
router.get("/", async (req, res) => {
    try {
        const employees = await Employee.find();
        res.status(200).send(employees)
    } catch (err) {
        res.status().send(err)
    }
})

module.exports = router;