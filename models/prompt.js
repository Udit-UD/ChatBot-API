import mongoose from "mongoose";

const promptSchema = mongoose.Schema(
    {
        sender: {
            type: String, 
            required: true,
        },
        text: {
            type: String, 
            required: true,
        }, 
    }, {timestamps: true}
);

const Prompt = mongoose.model("Prompt", promptSchema);
export default Prompt;