const mongoose = require('mongoose');
const session = require('express-session')
const User = mongoose.model('User');
const Question = mongoose.model('Question')
const Answer = mongoose.model('Answer')


module.exports = {
    create: function (req, res){
            console.log(req.body);
            let user = new User(req.body);
            console.log(user);
            user.save((errs)=>{
                if(errs){
                    console.log(user.errors)
                    res.status(500).json(user.errors)
                }
                else{
                    req.session._id = user._id;
                    res.json(true);
                }
            });
    },
    login: function (req, res){
        User.findOne({email:req.body.email}, function(err, user){
            if(err || !user){
                console.log("Could not find", err)
                return res.status(500).json("Could not find match")
            }
            if(!user.match(req.body.password, user.password)){
                res.status(500).json("Invalid email or password");
            }
            else{
                console.log("this is the user id", user._id)
                req.session._id = user._id
                res.json(true);
            }
        });
    },
    getUser:function(req, res){
        let {_id} = req.session
        User.findById({_id}, (err, auth)=>{
            if(err){
                return res.status(500).json("cant find user")
            }
            res.json(auth)
        })
    },
    logout: function(req, res){
        console.log("GOT TO CONTROLLER:",req.session._id)
        if(req.session._id){
            req.session._id = undefined;
            console.log("Controller clearing session:",req.session._id)
            res.json(true)
        }
        res.json(false)
    },
    findAll: function(req, res){
        Question.find({}, (err, questions)=>{
            if(err){
                return res.status(500).json("cant find questions")
            }
            res.json(questions)
        })
    },
    newQuest: function(req, res){
        let question = new Question(req.body);
        question.user = req.body.user
        question.save((err)=>{
            if(err){
                return res.status(500).json("could not create question")
            }
            console.log("question successful!")
            res.json(true)
        })
    },
    thisQuest: function(req, res){
        console.log("made it to control")

        Question.findById({_id:req.params.id}).populate('user').populate('answer.user').exec(function(err, question){
            if(err){
                return res.status(500).json("could not find question")
            }
            res.json(question)
        })
    },
    newAnswer: function(req, res){
        Question.findById({_id:req.params.id}, function(err, question){
            if(err){
                return res.status(500).json('could not find question')
            }
            let answer = new Answer(req.body)
            question.answer.push(answer)
            question.save(function(err){
                if(err){
                    console.log('something went wrong', err)
                }
                res.json(true)
            })
        })
    },
    vote: function(req, res){
        console.log(req.body)
        Question.findById({_id:req.params.id}, function(err, question){
            console.log("made it to forLoop")
            for(answer of question.answer){
                console.log("in for loop", typeof(answer._id))
                console.log("in for loop", typeof(req.body.id))
                if (String(answer._id) === req.body.id){
                    console.log("tripped if")
                    answer.vote += 1;
                    console.log("added 1 to vote", answer.vote)
                }
            }
            question.save(function(err){
                if(err){
                    return console.log("could not save", err)
                }
                res.json(question)
            })
        })
    },
    findThis:function(req, res){
        let search = req.body.search;
        console("find this", search)
        Question.$where('question.toUpperCase.includes(search.toUpperCase)', function(err, question){
            if(err){
                console.log("something went wrong")
                return res.json(false)
            }
            res.json(question)
        })
    }
}