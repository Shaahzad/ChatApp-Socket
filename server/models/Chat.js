import { Mongoose } from "mongoose";


const ChatSchema = new Mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    groupChat: {
        type: Boolean,
        default: false
    },
    creator: {
       type: Mongoose.Schema.Types.ObjectId,
       ref: 'User',
    },
    members: [
        {
            type: Mongoose.Schema.Types.ObjectId,
            ref: 'User',
        }
    ]
},
{
    timestamps: true
}
)


export default Mongoose.model('Chat', ChatSchema)