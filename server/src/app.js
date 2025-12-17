const express = require('express');
const {authRoutes} = require('./routes');

const app = express();
app.use(express.json());

app.get('/',(req,res)=>{
    res.status(200).send('API is running...');
})

app.use('/auth/',authRoutes);

module.exports = app;
