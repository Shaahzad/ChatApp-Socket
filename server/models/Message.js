import { Mongoose } from "mongoose";


const MessageSchema = new Mongoose.Schema({
    content: String,
    attachments: [
        {
            public_id: {
                type: String,
                required: true
            },
            url:{
                type: String,
                required: true
            }
        }
    ],
    sender:{
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    chat: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'Chat',
        required: true
    }
},
{
    timestamps: true
}
)


export default Mongoose.model('Message', MessageSchema)