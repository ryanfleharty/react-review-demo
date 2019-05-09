const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');

router.get("/", (req, res)=>{
    res.send("HELLO");
})
router.post('/login', async (req, res) => {
    try{
        const foundUser = await User.findOne({username : req.body.username});
        if(foundUser){
            if(bcrypt.compareSync(req.body.password, foundUser.password) === true){
                req.session.logged = true;
                req.session.username = req.body.username;
                res.json({
                           status: 200,
                           data: foundUser
                })         
            }
        }
        res.send({
            status: 500,
            data: "No such user or password"
        })
    }catch(err){
        console.log(err);
        res.send(err);
    }
})
router.post("/", async (req, res)=>{
    try{
        const hashedPassword = bcrypt.hashSync(req.body.password, 10);
        req.body.password = hashedPassword;
        const newUser = await User.create(req.body)
        newUser.password = null;
        req.session.userId = newUser._id;
        res.json({
            status: 200,
            data: newUser
        })
    }catch(err){
        console.log(err);
        res.json({
            status: 500,
            data: err
        })
    }
})
router.get("/current", async (req, res)=>{
    if(req.session.userId !== undefined){
        const user = await User.findById(req.session.userId);
        res.json({
            status: 200,
            data: user
        })
    }else{
        res.json({
            status: 404,
            data: "nobody logged in"
        })
    }
})

module.exports = router;