const axios = require('axios');
const { badRequestResponse, successResponse, errorResponse } = require('../helpers/errorResponses');
const textquerysetModel = require('../models/textqueryset-model');
const { mongoose } = require('mongoose');
require("dotenv").config();


module.exports.generateText = async (req, res) => {
    try {        
        const { prompt, model, messages } = req.body;

        var formattedMessages = [{ role: "system", content: "Be precise and concise."}];
        if(messages.length){
            messages.forEach((ele)=>{
                let user = {role:"user", content: ele.question};
                let assistant = {role:"assistant", content: ele.answer};
                let updatedMessages = [...formattedMessages, user, assistant];
                formattedMessages = updatedMessages;
            });
        }
        formattedMessages.push({role:'user', content:prompt});
        
        const url = 'https://api.perplexity.ai/chat/completions';
        const data = {
            model: model,
            messages: formattedMessages
        };
        const config = {
            headers: {
                Authorization: `Bearer ${process.env.PERPLEXITY_API_KEY}`,
                'Content-Type': 'application/json' }
        };

        const response = await axios.post(url, data, config);

        return successResponse(res, 'success', response.data.choices[0].message);
    } catch (err) {        
        return badRequestResponse(res, err.message);
    }
}


module.exports.saveQueries = async(req, res)=>{
    let {queries, stackId} = req.body;
    try{
        if(stackId){
            let objectStackId = new mongoose.Types.ObjectId(stackId);
            let updatedTextQueryStack = await textquerysetModel.findOneAndUpdate({_id:objectStackId}, {queries}, {new:true});
            return successResponse(res, 'queries updated successfully', updatedTextQueryStack);
        }
        const newTextQueryStack = await textquerysetModel.create({queries, user:'68ab5207fa590c3414b3e7f2'});
        if(newTextQueryStack){
            return successResponse(res, 'queries saved successfully', newTextQueryStack);
        }
        return badRequestResponse(res, 'some error occured while creating entity')
    }catch(err){
        errorResponse(res, err.message);
    }
}

module.exports.getRecentQueriesStack = async(req, res)=>{
    try{
        let queryStack = await textquerysetModel.find();
        if(queryStack){
            return  successResponse(res, 'Success', queryStack);
        }
        return badRequestResponse(res, 'cart contains no items');
    }catch(err){
        return errorResponse(res, err.message);
    }
}