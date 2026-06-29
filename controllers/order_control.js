const Oder = require('../model/ordermdel_model');
const OrderItem = require('../model/orderItem');
const Product = require('../model/product.model');
const User = require("../model/user_model");


const createOrder = async (req, res) => {
    
    try {
     
        const orderItem = req.body.items.map(async (item) => {
            const newOrderItem = new OrderItem({
                
                product: item.productId,
                quantity: item.quantity
            })
            const savedOrderItem = await newOrderItem.save();
            return savedOrderItem._id;
        });
    
        const newOrder = new Order({
              
           user: req.body.user,
            address: req.body.address,
            phone: req.body.phone,
            totalPrice: req.body.totalPrice,
            items:newOrderItem,      
            status: req.body.status
        })
   const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);

    }
    catch(err) {
        console.error(' Error:', err.message);
    res.status(500).json({ success: false, message: err.message });

    }
}



module.exports = {
    createOrder,
}
