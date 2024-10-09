const {body}=require('express-validator')


function authenticationValidator(){
    return[
        body('email').isEmail().withMessage('Invalid email address,please provide valid'),
        body('password').isStrongPassword({
            minLength:8,
            minLowercase:2,
            minNumbers:2
        }).withMessage('provided password should min 8 at length,min 2 lowercasw min 2 numbers')
    ]
}

module.exports={
    authenticationValidator
}