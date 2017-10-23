import { Component, OnInit, Input } from '@angular/core';
import { QuestionService } from '../question.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  currentUser;

  constructor(private _service:QuestionService, private router:Router) { }

  ngOnInit() {
    this._service.getUser()
    .then((data)=>{
      this.currentUser = data
    })
    .catch((err)=>{
      this.router.navigateByUrl('index')
      console.log('could not find user', err)
    })
  }
  goLogout(){
    this._service.logout().subscribe(
      (data)=>{console.log(data)},
      (err)=>{console.log(err)}
    );  
    this.router.navigateByUrl('/index')
  }

}
