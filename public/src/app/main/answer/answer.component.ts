import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { QuestionService } from '../../question.service';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.css']
})
export class AnswerComponent implements OnInit {

  currentUser;
  id;
  question;
  newAnswer = {
    user: '',
    answer:'',
    description:'',
    vote:0
  }
  constructor(private _service:QuestionService, private router:Router, private _actRoute: ActivatedRoute) { }

  ngOnInit() {
    this._actRoute.paramMap.subscribe((params)=>{
      this.id = params.get('id')
    })
    this._service.getQuestion(this.id)
    .then((data)=>{
      console.log( 'this is the question data' ,data)
      this.question = data

    })
    .catch((err)=>{
      console.log("cant find question", err)
    })
    this._service.getUser()//currentUser => this.currentUser = currentUser);
    .then((data)=>{
      this.currentUser = data
      this.newAnswer.user = this.currentUser._id
    })
    .catch((err)=>{
      this.router.navigateByUrl('/')
      console.log('could not find user', err)
    })
  }
  onSubmit(){
    this._service.createAnswer(this.id, this.newAnswer)
    .then((data)=>{
      this.newAnswer = {
        user:'',
        answer:'',
        description:'',
        vote:0
      }
      this.router.navigateByUrl('/')
    })
    .catch((err)=>{
      console.log("could not create", err)
    })
  }
  goLogout(){
    this._service.logout().subscribe(
      (data)=>{console.log(data)},
      (err)=>{console.log(err)}
    );
    window.location.reload();    
    this.router.navigateByUrl('/index')
  }


}
