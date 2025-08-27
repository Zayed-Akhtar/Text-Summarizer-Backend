const mongoose = require('mongoose');

const textQuerySetSchema = mongoose.Schema({
    queries:[{
        question: String,
        answer: String
    }],
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }
}, {timestamps:true});

module.exports = mongoose.model('textqueryset', textQuerySetSchema);