
const express = require('express');
const route = express.Router();
const userModel = require("../model/user_model");



route.post('/', async (req, res) => {
    const newUser = new userModel({
        name: req.body.name,
        mobile: req.body.major,

    });
    newUser.save().then((creatUser) => {
        res.status(201).json(creatUser);
    }
    ).catch((err) => {
        res.status(201).json({
            messge: "error"
        })
    });

});
route.get('/', async(req, res) => {
    const usersList = await User.find();
        res.status(200).json(usersList);

})
 moule.exports = route;