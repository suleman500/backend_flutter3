const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
      default:0
    },
  
  image: {
    type: String,
    required: true
    },
  
    images: [{ type: String, }],

    category: {
        // هنا بنستخدم نوع خاص من المونقوز وهو objectId عشان نربط بين البرودكت والكتيجوري
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Category' // هنا بنحدد اسم الموديل اللي بنربط بيه
    },
    // هنا بنستخدم نوع خاص من المونقوز وهو objectId عشان نربط بين البرودكت والبراند
    numberInStock: {
        type: Number,
       
        min: 0,
            max: 1000
    },
    date: {
        type: Date,
        default: Date.now,

    }
  
});

const Product = mongoose.model('Product', productSchema);
 module.exports= Product;