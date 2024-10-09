

const mongoose=require('mongoose')


let link_schema=new mongoose.Schema({
    original_link:{
        type:String,
        required:true,
        unique:true
    },
    // id creation would leave to logic side
    shorten_link:{
        type:String,
        required:true,
        unique:true
    },
    owner:{
        type: mongoose.Schema.ObjectId,
        ref:'user',
        required:true,
    },
    clicks:{
        type:Number,
        default:0,
    }
})

const LinkModel=mongoose.model('link',link_schema)


module.exports=LinkModel