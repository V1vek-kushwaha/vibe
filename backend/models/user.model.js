import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {

        type: String,
        require: true
    },
    userName:{
       type: String,
        require: true ,
         unique: true
    },
    email: {

        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    profileImg: {
        type: String,

    },
    followers: [

        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }

    ],
    folloing: [

        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }

    ],
    post: [

        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post"
        }

    ],
    savedpost: [

        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post"
        }

    ],
    Loops: [

        {
            type: mongoose.Types.ObjectId,
            ref: "Loops",
        }

    ],
    story: [

        {
            type: mongoose.Types.ObjectId,
            ref: "Story",
        }

    ]
}, { timestamps: true })

const User = mongoose.model("User", userSchema)

export default User