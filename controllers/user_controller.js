


const userModel = require('../model/user_model');
const userController = require('../controllers/user_controller');

const bcrypt = require('bcrypt');
const jwt= require('jsonwebtoken');



const createUser = async (req, res) => {
    const newUser = new userModel({
        name: req.body.name,
        // عشان ما نقدر نخزن الباسورد بشكل عادي بنستخدم الهاش عشان نحوله لرمز مش مفهوم
        //  و لازم ننزل الباكيج بتاع الbcrypt عشان نقدر نستخدمه 
        
       password: bcrypt.hashSync(req.body.password, 10),
       email: req.body.email,
        phone: req.body.phone,
        
        
         storeId: req.body.storeId || null,
            avatarUrl: req.body.avatarUrl || null,
        createdAt: Date.now(),
       role: req.body.role

    });
    newUser.save().then((creatUser) => {
      return   res.status(201).json(creatUser);
    }
    ).catch((err) => {
     return    res.status(400).json({
            message: err.message
        })
    });

}
const getAllUser = async(req, res) => {
    const usersList = await userModel.find().select("-password");
     return    res.status(200).json(usersList);

}
const getUser = async (req, res) => {
    const user = await userModel.findById(req.params.id).select("-password");
    if (!user) {
        return res.status(404).json({
            message: "no user found"
        });

    }
    return res.status(200).json(user);
}

const loggin = async (req, res) => { 

    const userr = await userModel.findOne({ email: req.body.email });
    if (!userr) {
        
return res.status(404).json({
    message: "no user found, please register"
})

    }
    if (userr && bcrypt.compareSync(req.body.password, userr.password)) {
        
        const seceret = process.env.JWT_SECRET;
        const token = jwt.sign(
            {
                email: userr.email,
            },
            seceret,
            {
                expiresIn: "1w",
            },
        );
        return res.status(200).json({
            message: `login success ${userr.name}`,
                id: userr._id,
                name: userr.name,
                email: userr.email,
                role: userr.role,
                storeId: userr.storeId,
                token: token
        })
    }
    else {

return res.status(400).json("wrong password");

     }
}

const updateUser = async (req, res) => {
    try {
        const userId = req.user.id;
        const updateUser = await userModel.findByIdAndUpdate(userId, {
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            avatarUrl: req.body.avatarUrl
        },
        { new: true}
        );
        if (!updateUser) {
            return res.status(404).json({
                message: "no user found"
            });
        } else {
             return res.status(200).json({
                success: true,
                updateUser,
                massage: "the user is updated successfully"
            });
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
module.exports = { createUser, getAllUser, getUser, loggin, updateUser };



