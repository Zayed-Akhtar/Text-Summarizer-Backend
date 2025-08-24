const mongoose = require('mongoose');

const textQuerySchema = mongoose.Schema({
    answer:String,
    question: String,
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    querySet:{
        type:mongoose.Schema.Types.ObjectId,
        ref: ''
    }
}, {timestamps:true});

module.exports = mongoose.model('textquery', textQuerySchema);