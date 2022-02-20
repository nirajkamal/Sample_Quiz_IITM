import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../service/question.service'

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {

  public questionList : any = [];
  public currentQuestion : number =0;
  public points : number = 0;
  counter = 60;
  public answers : object = {};
  public progress : string = '0';


  constructor(private questionService: QuestionService) { }

  ngOnInit(): void {
    this.getAllQuestions();
  }

  getProgressPercent(){
    this.progress = (((this.currentQuestion+1)/this.questionList.length)*100).toString();
    return this.progress;
  }

  getAllQuestions(){
    this.questionService.getQuestionJson()
    .subscribe(response=>{
      this.questionList = response;
      console.log(response[0])
    })
    this.getProgressPercent();
  }
  nextQuestion(){
    this.currentQuestion++;
    this.getProgressPercent();
  }
  previousQuestion(){
    this.currentQuestion--;
    this.getProgressPercent();
  }

  

  // answerMCQ(currentQno:number,option:any){
  //   if (option)

  // }

}
