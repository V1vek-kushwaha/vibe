import mongoose from "mongoose";

const storySchema = new mongoose.Schema({
    auther: {

        type: mongoose.Types.ObjectId,
        ref: "User",
        require: true,

    },
    mediaType: {
        type: String,
        enum: ["image", "video"],
        require: true,
    },
    media: {
        type: String,
        require: true,
    },
    captions: {
        type: String,

    },

    viewers: [

        {
            type: mongoose.Types.ObjectId,
            ref: "User",
        }

    ],

    likes: [

        {
            type: mongoose.Types.ObjectId,
            ref: "User",
        }

    ],
    comments: [

        {
            type: mongoose.Types.ObjectId,
            ref: "User",
        }

    ],
    createdAt: {
        type: Date,
        default: Date.now(),
        expires: 86400
    }




}, { timestamps: true })

const Story = mongoose.model("Story", storySchema)

export default Story