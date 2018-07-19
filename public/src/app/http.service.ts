import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http: HttpClient) { }
  getRouteAllCakes(){
    let obs = this._http.get('/cakes');
    return obs;
  }
  postRouteCake(postCake){
    let obs = this._http.post('/cakes',postCake);
    return obs;
  }
  postRouteRate(postRating,cakeId : String){
    let route = "/rating/" + cakeId;
    console.log("postRoute Rating: ",postRating,cakeId,route);
    let obs = this._http.post(route,postRating);
    return obs;
  }
  getRouteCake(cakeId : String){
    let route = "/cake/" + cakeId;
    let obs = this._http.get(route);
    return obs; 
  }
}
