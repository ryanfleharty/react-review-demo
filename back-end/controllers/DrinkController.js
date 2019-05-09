const router = require('express').Router();
const Drink = require('../models/Drink');

router.get("/", async (req, res)=>{
    try{
        const drinks = await Drink.find();
        res.json({
            data: drinks,
            status: 200
        })
    }catch(err){
        res.json({
            status: 500,
            data: err
        })
    }

})

module.exports = router;