const {body}=require('express-validator');




function validateLink(){
    return [
        body('link').custom((link,ctx)=>{
            if(!link) throw "link should not be empty"
            const urlPattern = /^(https?:\/\/)?([a-zA-Z0-9.-]+)(\.[a-zA-Z]{2,6})([\/\w .-]*)*\/?$/;
            if(!urlPattern.test(link)){
                throw "provided link is not valid provide valid one"
            }
            return true
        })
    ]
}

module.exports=validateLink