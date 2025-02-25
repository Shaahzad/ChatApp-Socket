import { Mongoose } from "mongoose";


const requestSchema = new Mongoose.Schema({
    status:{
        type: String,
        default: 'pending',
        enum: ['pending', 'accepted', 'rejected']
    },
    sender:{
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    receiver: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
},
{
    timestamps: true
}
)

export default Mongoose.model('Request', requestSchema)