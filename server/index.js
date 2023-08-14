const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();


app.use(bodyParser.json());
app.use(cors());

const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
    apiKey: "OPENAI API KEY",
});
const openai = new OpenAIApi(configuration);


app.post("/",async(req,res)=>{
   
    const {message} = req.body;
    console.log(message);
    const response = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: `${message}`}],
        max_tokens:500,
        temperature:0.5
    });
    console.log(response.data.choices[0].message.content);
    res.json({
        // data:response.data,
        // data:message,
        message:response.data.choices[0].message.content
    })
})

app.listen(4000,()=>{
    console.log("Server Started");
})