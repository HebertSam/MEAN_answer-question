const mongoose = require('mongoose');
const uniqueVal = require('mongoose-unique-validator');
const bcrypt = require('bcrypt');
let Schema = mongoose.Schema;

let UserSchema = new mongoose.Schema({
    first_name: {type: String, required: [true, "First name can not be empty"],},
    last_name: {type: String, required: [true, "Last name can not be empty"],},
    email: {type: String, unique:true, required: [true, "Email can not be empty"], validate:{
        validator: function(value){
            return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value);
        },
        message: "Invalid email"
    }
    },
    password: {type: String, required: [true, "Password can not be empty"],},
    password_confirmation:{type: String, required: [true, "Password confirmation must not be empty"], validate:{
        validator:function(value){
            return value == this.password;
        },
        message: "Password and password confirmation must match"
        }
    },
    _bikes: [{type: mongoose.Schema.Types.ObjectId, ref:'Bike'}]
},
    {timestamps:true});
UserSchema.plugin(uniqueVal);
UserSchema.methods.hash = function(password){
    return bcrypt.hashSync(password,bcrypt.genSaltSync(8));
}
    
UserSchema.methods.match = function(formPass,password){
    return bcrypt.compareSync(formPass,password);
}

UserSchema.pre("save", function(done){
    console.log('pre');
    this.password = this.hash(this.password);
    this.password_confirmation = undefined;
    done();
})
mongoose.model('User', UserSchema);

let AnswerSchema = new mongoose.Schema({
    answer: {type:String, required:[true, "Answer is required"]},
    description: {type:String},
    vote: {type:Number},
    user: [{type: Schema.Types.ObjectId, ref:"User"}]
})
mongoose.model('Answer', AnswerSchema);

let QuestionSchema = new mongoose.Schema({
    question: {type:String, required: [true, 'Question is required']},
    description: {type:String},
    user: [{type: Schema.Types.ObjectId, ref:"User"}],
    answer: [AnswerSchema]
    
}, {timestamps:true})

mongoose.model("Question", QuestionSchema);
