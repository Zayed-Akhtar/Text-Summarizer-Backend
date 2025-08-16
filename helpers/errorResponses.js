export const successResponse =(res, message, items)=>{
    return res.status(200).json({
        success:true,
        message,
        items
    });
} 

export const badRequestResponse = (res, message)=>{
        return res.status(400).json({
        success:false,
        message,
        items: null
    });
}

export const errorResponse = (res, message)=>{
    return res.status(500).json({
        success: false,
        message,
        items:null
    })
}