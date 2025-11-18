require("dotenv").config();
const { InferenceClient } = require("@huggingface/inference");
const imageModel = require('../models/image-model');
const { successResponse, badRequestResponse } = require('../helpers/errorResponses');
const client = new InferenceClient(process.env.HUGGINGFACE_API_KEY);

module.exports.generateImage = async(req, res)=>{
    try{        
        let {prompt, userInfo} = req.body;
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
        const imageBuffer = Buffer.from(arrayBuffer);
        const base64Image = imageBuffer.toString("base64");
        
        await imageModel.create({
            image:imageBuffer,
            user:userInfo.id
        });

        res.status(200).json({image_url: "data:image/png;base64," +  base64Image});
    }
    catch (error){
            return badRequestResponse(res, error.message);
    }
};

module.exports.getExistingImages = async(req, res)=>{
    try{
        let userInfo = req.query.userInfo;        
        let images = await imageModel.find({user:userInfo.id});
        if(images.length){
          let image_datas = images.map((ele)=> ["data:image/png;base64," + ele.image.toString("base64"), ele.createdAt]);
          return successResponse(res, 'success', image_datas)
        }
        return badRequestResponse(res, 'no existing items, start generating')
    }catch(err){
        badRequestResponse(res, err.message);
    }
}