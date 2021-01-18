const express = require('express');
require("dotenv").config();


const todos = require('./routes/todos');

const app = express();

app.use(express.json());


app.get("/", (req, res)=>{
	res.status(200).send("Server is live. Read Readme for usage");
})


app.use('/todos', todos);




app.listen(3030, ()=>{
	console.log("Listening @", 3030);
})