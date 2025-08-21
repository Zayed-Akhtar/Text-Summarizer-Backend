const axios = require('axios');
const { badRequestResponse, successResponse } = require('../helpers/errorResponses');
require("dotenv").config();


module.exports.generateText = async (req, res) => {
    try {
        console.log('reached backend');
        
        const { prompt, model } = req.body;
        const url = 'https://api.perplexity.ai/chat/completions';
        const data = {
            model: model,
            messages: [
                { role: "system", content: "Be precise and concise."},
                {role: "user", content: prompt}]
        };
        const config = {
            headers: {
                Authorization: `Bearer ${process.env.PERPLEXITY_API_KEY}`,
                'Content-Type': 'application/json' }
        };

        const response = await axios.post(url, data, config);
        console.log('here is the text response', response.data);

        return successResponse(res, 'success', response.data.choices[0].message);
    } catch (err) {
        console.log('error is', err.message);
        
        badRequestResponse(res, err.message);
    }
}