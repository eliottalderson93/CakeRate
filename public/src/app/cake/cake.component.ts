import { Component, OnInit, Input } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-cake',
  templateUrl: './cake.component.html',
  styleUrls: ['./cake.component.css']
})
export class CakeComponent implements OnInit {
  @Input() cakeToShow:any;
  @Input() avgRating : Number;
  constructor(private _httpService:HttpService) { }

  ngOnInit() {
    
  }
}
