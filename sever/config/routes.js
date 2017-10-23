const mongoose = require('mongoose');
const User = mongoose.model("User");
const Question = mongoose.model("Question");
const control = require('../controllers/control.js');
const path = require('path')

module.exports = function(app){
    app.post('/api/registration', control.create)
    app.post('/api/login', control.login)
    app.get('/api/user', control.getUser)
    app.get('/api/logout', control.logout)
    app.post('/api/newquest', control.newQuest)
    app.get('/api/questions', control.findAll)
    app.get('/api/question/:id', control.thisQuest)
    app.post('/api/newanswer/:id', control.newAnswer)
    app.post('/api/vote/:id', control.vote)
    app.get('/api/search', control.findThis)

    app.all('*', (req, res)=>{
        res.sendFile(path.resolve('./public/dist/index.html'))
    })
    
}