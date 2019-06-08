import { Component, OnInit, SimpleChange , ViewChild } from '@angular/core';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';

import {WeatherItem} from '../Model/weatherItem';
import { mainListService } from '../Services/mainList.service';
import { WEATHER_ITEMS } from '../Services/searchList';
import { ListOf5Forecast } from '../Services/Listof5Forecast';
//jquary modal
declare var $: any;

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  userInput: string;

  id: string ;
  city: string ;
  country: string ;
  temp: string ;
  description: string ;
  myDate: Date ;

  arrayCurrent: Array<WeatherItem> = new Array<WeatherItem>();
  list: Array<WeatherItem> = new Array<WeatherItem>();
  favoriteItem: boolean =true;

  constructor( private _mainListService: mainListService) {}

  ngOnInit() {

    this._mainListService.getCurrentWeatherBYGeolocation();
    this._mainListService.get5DayForecastWeatherBYGeolocation();
  }

  ngAfterViewChecked(){
    //set parameters from current weather location
    if (WEATHER_ITEMS[0] != null ) {
      this.getAllParameters();
    }
  }
//when use enter to search
  userSearch(city: string) {
    this._mainListService.startString = city;
    this._mainListService.getCurrentWeather();
    this._mainListService.get5DayForecastWeather();

  }


  getAllParameters(){
    this.favoriteItem = this._mainListService.isExists(WEATHER_ITEMS[0]);
    this.city = WEATHER_ITEMS[0].city;
    this.country = WEATHER_ITEMS[0].country;
    this.temp = WEATHER_ITEMS[0].temp;
    this.description = WEATHER_ITEMS[0].description;
    this.list = ListOf5Forecast;
  }
  //adding weather item to favorites//
  add() {
    this._mainListService.addFavorite(WEATHER_ITEMS[0]);
  }
 //delete weather item to favorites//
  delete() {
    this._mainListService.deleteFavorite(WEATHER_ITEMS[0]);
  }

  isExists(){
    this.favoriteItem = this._mainListService.isExists(WEATHER_ITEMS[0]);
  }

}
