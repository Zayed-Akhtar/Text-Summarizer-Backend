const axios = require('axios');
const { badRequestResponse, successResponse, errorResponse } = require('../helpers/errorResponses');
const textquerysetModel = require('../models/textqueryset-model');
const { mongoose } = require('mongoose');
const userModel = require('../models/user-model');
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
        return badRequestResponse(res, err);
    }
}


module.exports.saveQueries = async(req, res)=>{
    let {queries, stackId, userInfo} = req.body;
    let parsedUserInfo = JSON.parse(userInfo);    
    try{        
        if(stackId){            
            let objectStackId = new mongoose.Types.ObjectId(stackId);
            let updatedTextQueryStack = await textquerysetModel.findOneAndUpdate({_id:objectStackId}, {queries}, {new:true});
            return successResponse(res, 'queries updated successfully', updatedTextQueryStack);
        }
        const newTextQueryStack = await textquerysetModel.create({queries, user:parsedUserInfo.id});
        const user = await userModel.findOne({_id:parsedUserInfo.id});
        user.querySets.push(newTextQueryStack._id);
        await user.save();
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
        let userInfo = JSON.parse(req.query.userInfo);
        let user = await userModel.findById(userInfo.id).populate("querySets");
        let userQueryStack = user.querySets;
        if(userQueryStack){
            return  successResponse(res, 'Success', userQueryStack);
        }
        return badRequestResponse(res, 'cart contains no items');
    }catch(err){
        return errorResponse(res, err.message);
    }
}