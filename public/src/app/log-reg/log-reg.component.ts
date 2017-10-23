import { Component, OnInit } from '@angular/core';
import { QuestionService } from './../question.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-reg',
  templateUrl: './log-reg.component.html',
  styleUrls: ['./log-reg.component.css']
})
export class LogRegComponent implements OnInit {

  user = {
    email:'',
    password:'',
  }

  newUser = {
    first_name:'',
    last_name:'',
    email:'',
    password:'',
    password_confirmation:''
  }
  logErrs;
  regErrs = [];

  constructor(private questService: QuestionService, private router:Router) { }

  ngOnInit() {
  }

  onLogin(){
    this.questService.login(this.user)
    .then ((data)=>{
      // window.location.reload();
      this.router.navigateByUrl('/')
    })
    .catch((err)=>{
      console.log(err)
      this.logErrs = JSON.parse(err._body);
    })
    
  }

  onRegister(){
    this.questService.create(this.newUser)
    .then ((data)=>{
      console.log(data)
      this.newUser = {
        first_name:'',
        last_name:'',
        email:'',
        password:'',
        password_confirmation:''
      }
      // this.router.navigateByUrl('/')
    })
    .catch((err)=>{
      // console.log(err)
      const errors = JSON.parse(err._body)
      // console.log(errors)
      for(let key in errors){
        // console.log(key)
        this.regErrs.push(errors[key].message)
      }
      console.log(this.regErrs)
    })
    
  }

}
