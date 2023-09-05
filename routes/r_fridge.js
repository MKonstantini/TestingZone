const express = require("express");
const router = express.Router();

router.post("/post", async (req, res) => {
    try {
        // joi validation for body

        // check for if body exists

        // post body in DB

        // return res
        
    } catch (err) {
        res.status(400).send(err)
    }
})

module.exports = router;