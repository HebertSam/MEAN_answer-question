import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LogRegComponent } from './log-reg/log-reg.component';
import { MainComponent } from './main/main.component';
import { ListComponent } from './main/list/list.component';
import { QuestComponent } from './main/quest/quest.component';
import { NewQuestComponent } from './main/new-quest/new-quest.component';
import { AnswerComponent } from './main/answer/answer.component';

const routes: Routes = [
  {path:'', pathMatch:'full', component:MainComponent},
  {path:'new', component:NewQuestComponent},
  {path:'index', component:LogRegComponent},
  {path:'detail/:id', component:QuestComponent},
  {path:'answer/:id', component:AnswerComponent},
  {path:'detail/:id/answer/:id', redirectTo:'answer/:id'},
  {path:'**', redirectTo:''}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
