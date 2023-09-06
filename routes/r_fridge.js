const express = require("express");
const router = express.Router();

// joi food schema
// const joi = require("joi");
// const foodJoiSchema = joi.object({
//         name: joi.required().string().min(2).max(15),
//         cost: joi.required().number(),
//         isHealthy: joi.boolean()
//     })
    
// post new food
const Food = require("../mongo_models/Food");
router.post("/post", async (req, res) => {
    try {
        // joi validation for body
        // const {error} = foodJoiSchema.validate(req.body);
        // if (error) return res.status(400).send(error);
        
        // check for if body exists
        let resFood = await Food.findOne({email: req.body.name});
        if (resFood) return res.status(400).send("error: entry already exists");

        // post body in DB
        const newFood = new Food(req.body);
        await newFood.save();

        // return res
        res.status(201).send(newFood);
        
    } catch (err) {
        res.status(400).send(err);
    }
})

module.exports = router;