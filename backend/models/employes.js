const mongoose=require("mongoose");


const employ_schema=new mongoose.Schema({

    Name:{
        type:String,
        require:true
    },
    Email:{
        type:String,
        require:true,
        unique:true
    },
    Mobileno:{
        type:Number,
        require:true,
    },
    Designation:{
        type:String,
        require:true
    },
    Gender:{
        type:String,
        require:true
    },
    Course:{
        type:String,
        require:true
    },
    created:{
        type:String
    },
    img:{
        type:String,
        require:true
    }
});

const employs=mongoose.model("employs",employ_schema);

module.exports={employs};