import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { QuestionService } from '../../question.service';


@Component({
  selector: 'app-quest',
  templateUrl: './quest.component.html',
  styleUrls: ['./quest.component.css']
})
export class QuestComponent implements OnInit, OnChanges {
  currentUser;
  id;
  question;

  constructor(private _service:QuestionService, private router:Router, private _actRoute: ActivatedRoute) { }

  ngOnInit() {
    this._actRoute.paramMap.subscribe((params)=>{
      this.id = params.get('id')
    })
    this._service.getQuestion(this.id)
    .then((data)=>{
      console.log( 'this is the question data' ,data)
      this.question = data
      this.sortVotes()
    })
    .catch((err)=>{
      console.log("cant find question", err)
    })
    this._service.getUser()
    .then((data)=>{
      this.currentUser = data
    })
    .catch((err)=>{
      this.router.navigateByUrl('index')
      console.log('could not find user', err)
    })

  }
  ngOnChanges(changes:SimpleChanges){
    console.log('ngOnchanges fired')
    this.sortVotes()

  }

  like(idx){
    // this.question.answer[idx].vote += 1
    console.log(this.question.answer[idx]._id)
    this._service.vote(this.id, {id:this.question.answer[idx]._id})
    .then((data)=>{
      this.question = data
      this.sortVotes()
      console.log('success')
    })
    .catch((err=>{
      console.log("failure")
    }))
  }
  goLogout(){
    this._service.logout().subscribe(
      (data)=>{console.log(data)},
      (err)=>{console.log(err)}
    ); 
    this.router.navigateByUrl('/index')
  }
  sortVotes(){
    this.question.answer.sort((a, b)=>{
      console.log('sort runningS')
      return b.vote - a.vote
    })
  }
}