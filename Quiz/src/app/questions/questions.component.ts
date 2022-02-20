import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../service/question.service'

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {

  constructor(private questionService: QuestionService) { }

  ngOnInit(): void {
    this.getAllQuestions();
  }

  getAllQuestions(){
    this.questionService.getQuestionJson()
    .subscribe(response=>{
      console.log(response);
    })
  }

}
