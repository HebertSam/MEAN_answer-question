import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuestionService } from '../../question.service';

@Component({
  selector: 'app-new-quest',
  templateUrl: './new-quest.component.html',
  styleUrls: ['./new-quest.component.css']
})
export class NewQuestComponent implements OnInit {

  newQuestion = {
    user:'',
    question:'',
    description:''
  }


  constructor(private _service:QuestionService, private router:Router) { }

  ngOnInit() {
    this._service.getUser()//currentUser => this.currentUser = currentUser);
    .then((data)=>{
      this.newQuestion.user = data._id
    })
    .catch((err)=>{
      console.log('could not find user', err)
    })
  }
  onSubmit(){
    this._service.createQuestion(this.newQuestion)
    .then((data)=>{
      this.newQuestion = {
        user:'',
        question:'',
        description:''
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
