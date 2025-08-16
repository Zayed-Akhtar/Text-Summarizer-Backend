const mongoose = require('mongoose');

const imageSchema = mongoose.Schema({
    // user:{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref:'user'
    // },
    image:Buffer,
}, { timestamps: true });

module.exports = mongoose.model('image', imageSchema);