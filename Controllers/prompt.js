import OpenAI from "openai";
import Conversation from "../models/Conversation.js";
import Prompt from "../models/prompt.js";

export const  sendMsgToOpenAI = async(req, res) => {
  try{
    const prompt = req.body.message;
    const {id} = req.params;
    let conversation = await Conversation.findById(id);

    if(!conversation){
      await new Conversation({
        prompt,
        history:[]
      });
    }

    const message = new Prompt({
      sender: "user", 
      text: prompt
    });
    await message.save();
    conversation.history.push(message);
    
    const openai = new OpenAI({
      apiKey: process.env.API_KEY,
  });
    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-3.5-turbo",
      temperature: 0.7
    });
    const finalRes = completion.choices[0].message.content;

    const reply = new Prompt({
      sender: "assistant", 
      text: finalRes
    });
    await reply.save();
    conversation.history.push(reply);

    await conversation.save();
    
    res.status(200).json(finalRes);
  }
  catch(e){
    console.log(e);
    res.status(404).json({error: e});
  }
}

export const createConversation = async(req, res) => {
  try{
    const conversation = new Conversation({
      title: "New Conversation",
      history: []
    });
    
    await conversation.save();

    res.status(200).json({message: "Conversation created Successfully!!", conversationId: conversation._id});

  }catch(e){
    res.status(501).json(e.message);
  }
}

export const accessConversation = async(req, res) => {
  try{
    const {id} = req.params;
    const conversation = await Conversation.findById(id).populate('history');

    if(!conversation){
      return res.status(404).json({error:"Conversation Not Found"});
    }
    res.status(200).json(conversation);
  }
  catch(e){
    res.status(501).json(e.message);
  }
} 

export const fetchConversations = async(req, res) => {
  try{
    const conversations = await Conversation.find();
    res.status(201).json(conversations);
  }
  catch(e){
    res.status(500).json(e.message);
  }
}