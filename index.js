const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config/config').get(process.env.NODE_ENV);
const routes = require('./routes')
const app = express();

mongoose.Promise = global.Promise;
mongoose.connect(config.DATABASE)

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json({limit: '10mb', extended: true}))
app.use('/api', routes);
const port = process.env.PORT || 3001;
app.listen(port,()=>{
    console.log(`SERVER RUNNNING at port=${port}`);
    
})

