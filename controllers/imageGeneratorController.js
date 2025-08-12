const axios = require('axios');
require("dotenv").config();
const { InferenceClient } = require("@huggingface/inference");
const client = new InferenceClient(process.env.HUGGINGFACE_API_KEY);

module.exports.generateImage = async(req, res)=>{
    try{        
        let {prompt} = req.body;
          if (!prompt) {
                return res.status(400).json({ error: "Prompt is required" });
            }
        const imageBlob = await client.textToImage({
                            provider: "nebius",
                            model: "black-forest-labs/FLUX.1-dev",
                            inputs: prompt,
                            parameters: { num_inference_steps: 5 },
                        }); 
        const arrayBuffer = await imageBlob.arrayBuffer();
        const base64Image = Buffer.from(arrayBuffer).toString("base64");
        res.json({image_url: "data:image/png;base64," +  base64Image});
    }
    catch (error){
            res.status(500).json({ error: error.message });
    }
};