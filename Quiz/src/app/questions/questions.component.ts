import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
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
  public counter = 60;
  public totalTime = 60;
  public answers :  any =  [];
  public givenAnswers : any = {};
  public progress : string = '0';
  interval$: any;
  correctAnswer: Array<any> = [];


  constructor(private questionService: QuestionService) { }

  ngOnInit(): any {
    this.getAllQuestions();
    this.startCounter();
  }

  getProgressPercent(){
    this.progress = (((this.currentQuestion)/this.questionList.length)*100).toString();
    return this.progress;
  }

  getAllQuestions(){
    this.questionService.getQuestionJson()
    .subscribe(response=>{
      this.questionList = response;
      //set total time
      let fullTime = 0;
      for(let aquestion of response){
      fullTime += aquestion['time'];
      }
      this.counter = fullTime;
      this.totalTime = fullTime;
        //get all answers
        let i = 1;
        for(let aquestion of this.questionList)
        {
          if (aquestion.type=='MCQ'){this.answers[i]=aquestion.answer}
          if (aquestion.type=='MAQ'){this.answers[i]=aquestion.answers}
          if (aquestion.type=='FITB1'){this.answers[i]=aquestion.answers}
          if (aquestion.type=='FITB2'){this.answers[i]=aquestion.answers}
          if (aquestion.type=='MTF')
          {
            let legends:any = [];
            let keys:any = [];
            let option:any;
            for (option of aquestion.answer_options)
            {
              legends.push(option[Object.keys(option)[0]]);
              keys.push(option[Object.keys(option)[1]]);
            };
            let shuffledkeys:any = [];
            shuffledkeys = keys;
            shuffledkeys.sort(() => Math.random() - 0.5);
            // for (let k = keys.length - 1; k > 0; k--) {
            //   const j = Math.floor(Math.random() * (k + 1));
            //   [shuffledkeys[k], shuffledkeys[j]] = [keys[j], keys[k]];}
            this.answers[i]=[legends, shuffledkeys, keys]
          }
          i+=1;
        }
        console.log(this.answers)
    })
  }
  nextQuestion(){
    this.currentQuestion++;
    this.getProgressPercent();
  }
  previousQuestion(){
    this.currentQuestion--;
    this.getProgressPercent();
  }


  // setTotalTime(){
  //   this.getAllQuestions();
  //   let fullTime = 0;
  //   for(let aquestion of this.questionList){
  //     fullTime += aquestion['time'];
  //   }
  //   this.counter = fullTime;
  //   this.totalTime = fullTime;
  //   console.log(this.totalTime);
  //   return(fullTime);
  // }

  answerMCQ(currentQno:number,option:any){
      this.givenAnswers[currentQno]=option;
      console.log(this.givenAnswers)
  }

  answerMAQ(currentQno:number, option:any){
    //check if array exists
      if(this.givenAnswers[currentQno])
      {//if the option already exists then remove it from the answer array
      // if (this.givenAnswers[currentQno].indexOf(option))
      // {
      // let rindex = this.givenAnswers[currentQno].indexOf(option);
      // if (rindex > -1) {
      // this.givenAnswers[currentQno].splice(rindex, 1); // 2nd parameter means remove one item only
      // }
      // }//else if it is a new option then add it to the answer array
      // else{
        this.givenAnswers[currentQno].push(option);
      //s}
      }
    //else create a new one
      else{
      this.givenAnswers[currentQno] = [];
      this.givenAnswers[currentQno].push(option);
      }
    //sort the array after modifying
    var set = new Set(this.givenAnswers[currentQno]);
    this.givenAnswers[currentQno] = Array.from(set);
    this.givenAnswers[currentQno].sort()

    console.log(this.givenAnswers)
  }



  startCounter(){
    this.interval$ = interval(1000)
    .subscribe(val=>{this.counter--})
  }

}
