const express = require('express');

const app = express();
app.use(express.json());

app.get('/',(req,res)=>{
    res.status(200).send('API is running...');
})

module.exports = app;
