const User = require("../models/UserModel");

exports.getAllUsers = async (req,res) => {
    console.log('>>>>>req',req)
    try{
        const allUsers = await User.find()
        if(allUsers){
            return res.status(200).json({message:'OK',users:allUsers})
        }
    }catch(error){
        return res.status(500).json({message:'Internal Server Error'})
    }
};
