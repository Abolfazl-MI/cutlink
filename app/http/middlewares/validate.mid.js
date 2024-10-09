

const { validationResult } = require("express-validator");
const { validatorMapper } = require("../../utills/functions");

function validateRequest(req,res,next){
    console.log(req.body);
    const result=validationResult(req)
    if(result.isEmpty()){
        return next();
    }else{
        const errors=validatorMapper(result.errors)
        console.log(errors)
        return res.status(400).json({
            statusCode:res.statusCode,
            errors
        });
    }
}

module.exports={
    validateRequest
}