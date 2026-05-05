const mongoose = require('mongoose');



const { Schema } = mongoose;


const userSchema = new Schema({

    email: {
    
        required: true,
        type: String,
        unique: true,
        lowercase: true
    },
    password: {
        required: true,
        type: String
    }


})
// يعني اخذ يوزير سكيما وخنه في الكليكشن يوزير وهيكون عندي موديل اسمه يوزير موديل
const userModel = mongoose.model('User', userSchema);
// بعمله اكسبورت عشان اقدر استخدمه في اي مكان في الابليكشن
module.exports = userModel;