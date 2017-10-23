import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class QuestionService {

  constructor(private _http: Http) { }

  create(user){
    console.log(user);
    return this._http.post('/api/registration', user)
    .map((response: Response) => response.json())
    .toPromise();
  }
  login(user){
    console.log("service");
    return this._http.post('/api/login', user)
    .map((response:Response) => {
     //  this.currentUser = response.json()
      response.json()
     })
    .toPromise()
  }
  getUser(){
    return this._http.get('/api/user').map((response:Response) => response.json()).toPromise();
   // cb(this.currentUser);
  }
  logout(){
    //  this.currentUser = undefined
    // alert("@ Service")
    return this._http.get('/api/logout')
    // .map()
   }
   allQuestion(){
     return this._http.get('/api/questions').map((res) => res.json()).toPromise();
   }
   createQuestion(question){
     console.log(question)
     return this._http.post('/api/newquest', question).map((res)=> res.json()).toPromise();
   }
   getQuestion(id){
     console.log("made it to service",id)
     return this._http.get(`/api/question/${id}`).map((res)=> res.json()).toPromise();
   }

   createAnswer(id, answer){
     return this._http.post(`/api/newanswer/${id}`, answer).map((res)=> res.json()).toPromise();
   }
   vote(id, vote){
     return this._http.post(`/api/vote/${id}`, vote).map((res)=> res.json()).toPromise();
   }
   findThis(search){
     console.log("search ran")
     return this._http.get('/api/search', search).map((res)=> res.json()).toPromise();
   }
}
