import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../../question.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  questions;
  search= {
    search:""
  };

  constructor(private _service:QuestionService, private router:Router) { }

  ngOnInit() {
    this._service.allQuestion()
    .then((data)=>{

      this.questions = data;
      console.log("these are my questions", this.questions)
    })
    .catch((err)=>{
      console.log("Could not get questions", err)
    })
  }
  find(){
    console.log("find ran")
    this._service.findThis(this.search)
    .then((data)=>{
      this.questions = data;
      console.log("searched questions", this.questions)
    })
    .catch((err)=>{
      console.log("could not find")
    })
  }

}


