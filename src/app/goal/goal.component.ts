import { Component, OnInit } from '@angular/core';
import { Goal } from '../goals';
import { GoalService } from '../goal-service/goal.service';
import { AlertService } from '../alert-service/alert.service';
import { Quote } from '../quote-class/quote';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-goal',
  templateUrl: './goal.component.html',
  styleUrls: ['./goal.component.css']
})
export class GoalComponent implements OnInit {

  // goals:Goal[]=[
  //   {id:1, name:"Watch Finding Nemo", description:'Find an online version and watch merlin find his son'},
  //   {id:2, name:"Buy cookies", description:'I have to buy cookies for the parrot'},
  //   {id:3, name:"Get new phone case", description:'Diana has her birthday coming up soon'},
  //   {id:4, name:"Get dog food", description:'Pupper likes expensive snacks'},
  //   {id:5, name:"Solve math homework", description:'Damn Math'},
  //   {id:6, name:"Plot my world domination plan", description:'Cause I am an evil overlord'}
  // ]

  goals:Goal[];

  alertService:AlertService;

  quote!:Quote;
  

  toggleDetails(index:any){
    this.goals[index].showDescription= !this.goals[index].showDescription;
  }

  // completeGoal(isComplete:boolean, index:any){
  //   if(isComplete){
  //     this.goals.splice(index, 1)
  //   }
  // }


  deleteGoal(isComplete:boolean,index:any){
    let toDelete= confirm(`Are you sure you want to delete ${this.goals[index].name}`)

    if(toDelete){
      this.goals.splice(index, 1)
    }
    this.alertService.alertMe('This goal has been deleted!')
  }

  constructor(goalsService:GoalService, AlertService:AlertService, private http:HttpClient) {
    this.goals=goalsService.getGoals();
    this.alertService=AlertService;
   }

  ngOnInit(): void {
    interface APIResponse{
      author:string;
      quote:string;
    }

    this.http.get<APIResponse>('http://quotes.stormconsultancy.co.uk/random.json').subscribe(
      data=>{
        this.quote= new Quote(data.author, data.quote)
      }, err=>{
        this.quote= new Quote("Winston Churchill","Never never give up!")
        console.log('An error ocurred');
      }
    )
  }

}
