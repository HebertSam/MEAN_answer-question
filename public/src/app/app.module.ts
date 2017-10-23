import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { QuestionService } from './question.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { LogRegComponent } from './log-reg/log-reg.component';
import { QuestComponent } from './main/quest/quest.component';
import { NewQuestComponent } from './main/new-quest/new-quest.component';
import { AnswerComponent } from './main/answer/answer.component';
import { ListComponent } from './main/list/list.component';
import { FilterPipe } from './filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    LogRegComponent,
    QuestComponent,
    NewQuestComponent,
    AnswerComponent,
    ListComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule
  ],
  providers: [QuestionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
