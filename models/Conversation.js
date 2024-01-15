import mongoose from "mongoose";


const conversationSchema = mongoose.Schema(
    {
        title: {
            type: String, 
            required: true,
        },
        history: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: 'Prompt'
        }, 
    }, {timestamps: true}
);

const Conversation = mongoose.model("Conversation", conversationSchema);
export default Conversation;