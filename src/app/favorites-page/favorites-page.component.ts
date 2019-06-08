import { Component, OnInit } from '@angular/core';

import {WeatherItem} from '../Model/weatherItem';
import { ListOfFavorites } from '../Services/favoritesList';

import { mainListService } from '../Services/mainList.service';

@Component({
  selector: 'app-favorites-page',
  templateUrl: './favorites-page.component.html',
  styleUrls: ['./favorites-page.component.css']
})
export class FavoritesPageComponent implements OnInit {
  arrayOfFavorites:  Array<WeatherItem> =  ListOfFavorites;
  city: string;
  country: string;
  temp: string;
  showBool: boolean = false;
  constructor(private _mainListService: mainListService) { }

  ngOnInit() {

    //get data from local storage
    let arr:Array<any> = JSON.parse(localStorage.getItem('interpretations'));
    if (arr != null){
      ListOfFavorites.splice(0);
      arr.forEach(prd => {
      ListOfFavorites.push(prd);
    });
  }
    if (this.arrayOfFavorites != null){
      this.showBool = true;
    }
  }

  favoriteClicked(name: string) {
    this._mainListService.favoriteWasClicked(name);
  }

}
