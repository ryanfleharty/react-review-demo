const router = require('express').Router();
const Drink = require('../models/Drink');
const User = require('../models/User');

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

router.post("/", async (req, res) => {
    console.log(req.body);
    const newDrink = await Drink.create(req.body);
    const user = await User.findById(req.session.userId);
    user.drinksCreated.push(newDrink._id);
    await user.save()
    res.json({
        status: 200,
        data: newDrink
    })
})

module.exports = router;