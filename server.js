const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const session = require('express-session')
app.use(session({secret: "somestring"}));

const path = require('path');
app.use(express.static(path.join(__dirname, '/public/dist')))

require('./sever/config/mongoose.js');

const routes_setter = require('./sever/config/routes.js');
routes_setter(app);


app.listen(8000, function(){
    console.log("listening on port 8000")
})