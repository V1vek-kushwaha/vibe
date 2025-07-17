import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
name:{

    type:String,
    require:true
},
email:{

    type:String,
    require:true,
    unique:true
},
password:{
    type:String,
    require:true
},
profileImg:{
    type:String,
    
},
followers:[

    {type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }

],
folloing:[

    {type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }

]
},{timestamps:true})

const User = mongoose.model("User",userSchema)

export default User