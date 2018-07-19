import { Component,OnInit } from '@angular/core';
import { HttpService } from './http.service';
// var Cake = require('../../../server.js');
// var Rating = require('../../../server.js');
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor(private _httpService:HttpService){}
  allCakes : any;
  newCake : any;
  newRating :any;
  cakeToShow : any;
  avgRating : Number;
  ngOnInit(){
    this.allCakes = {Success: false, data : []};
    this.allCakesServe();
    this.newCake = {baker: "", imgUrl : ""};
    this.newRating = {score: "",comment : ""};
    this.avgRating = 0;
  }
  allCakesServe(){
    let obs = this._httpService.getRouteAllCakes();
    obs.subscribe(cakes =>{
      console.log("all Cakes: ",cakes);
      this.allCakes = cakes;
    });
  }
  postCake(){
    let obs = this._httpService.postRouteCake(this.newCake);
    obs.subscribe(cake =>{
      console.log("posted this cake:", cake);
    });
    this.newCake = {baker: "", imgUrl : ""};
  }
  postRating(posted_rating,cakeId){
    console.log("postRating componenent",posted_rating,cakeId);
    let obs = this._httpService.postRouteRate(posted_rating,cakeId);
    obs.subscribe(rate =>{
      console.log("posted this rate: ",rate);
    })
  }
  showCake(cakeId : String){
    let obs = this._httpService.getRouteCake(cakeId);
    obs.subscribe(cake => {
      console.log("got cake:",cake);
      this.cakeToShow = cake;
      var avg = 0;
      const total = this.cakeToShow.data.ratings.length;
      //console.log("start for:",avg,total);
      for(var x = 0;x<total;x++){
        avg += this.cakeToShow.data.ratings[x].score;
        //console.log("adding: ",this.cakeToShow.data.ratings[x].score);
      }
      //console.log("sum:",avg);
      if(total != 0){
        avg = avg/total;
        //console.log("avg:",avg);
        this.avgRating = avg;
      }
      //console.log("final:",this.avgRating);
    });
  }
}
