import { badRequestResponse, errorResponse, successResponse } from "../helpers/errorResponses";
import userModel from "../models/user-model";
import { generateToken } from "../utils/generateToken";
const bcrypt = require('bcrypt');

export const signup = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return badRequestResponse(res, 'email already in use');
        }
        let createdUser;
        bcrypt.genSalt(12, function(err, salt) {
        bcrypt.hash(password, salt, async function(err, hash) {
           createdUser = await userModel.create({firstName, lastName, email, password:hash});
        });
    });
        const token = generateToken(createdUser);

        return res.status(201).json({
            success: true,
            message: "Signup successful",
            token,
            user: { id: createdUser._id, name: createdUser.name, email: createdUser.email }
        });
    } catch (err) {
        console.error(err);
        return errorResponse(res, `Server error: ${err}`)
    }
};


export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await userModel.findOne({ email });
        if (!user) {
            return badRequestResponse(res, 'Invalid Credential');
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return badRequestResponse(res, 'Invalid Credential');
        }

        const token = generateToken(user);

        return res.json({
            success: true,
            message: "Login successful",
            token,
            user: { id: user._id, name: user.name, email: user.email }
        });
    } catch (err) {
        console.error(err);
        return errorResponse(res, `Server Error ${err}`);
    }
};


export const logout = (req, res)=>{
      try{
    if(req.cookies.token){
      res.clearCookie("token", {
        httpOnly: true,
        secure: true,
        sameSite: "None",
      });
      return successResponse(res, 'Logged out successfully')
    }else{
      return errorResponse(res, 'user mused be logged in first')
    }
}
catch(err){
 return errorResponse(res, err.message);
}
}
