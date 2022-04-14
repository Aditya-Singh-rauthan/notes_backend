const { TypeModel, StatusModel } = require("../models/FieldModels");


exports.addType = async(req,res)=>{
    const { name } = req.body || {}
    try{
        const result = await TypeModel.create({name})
        return res.status(200).json({message:'OK',type:result})
    }catch(error){
        return res.status(500).json({message:'Internal Server Error'})
    }
}

exports.addStatus = async(req,res)=>{
    const { name } = req.body || {}
    try{
        const result = await StatusModel.create({name})
        return res.status(200).json({message:'OK',status:result})
    }catch(error){
        return res.status(500).json({message:'Internal Server Error'})
    }
}

exports.getAllTypes = async (req,res) => {
    try{
        const allTypes = await TypeModel.find()
        if(allTypes){
            return res.status(200).json({message:'OK',types:allTypes})
        }
    }catch(error){
        return res.status(500).json({message:'Internal Server Error'})
    }
};

exports.getAllStatuses = async (req,res) => {
    try{
        const allStatuses = await StatusModel.find()
        if(allStatuses){
            return res.status(200).json({message:'OK',statuses:allStatuses})
        }
    }catch(error){
        return res.status(500).json({message:'Internal Server Error'})
    }
};