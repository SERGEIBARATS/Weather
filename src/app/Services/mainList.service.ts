import { Injectable } from '@angular/core';
import { WeatherService } from './weatherList.service';
import {WeatherItem} from '../Model/weatherItem';
import { Observable } from 'rxjs/Observable';
import {Router, Routes} from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { WEATHER_ITEMS } from './searchList';
import { ListOf5Forecast } from './Listof5Forecast';
import { ListOfFavorites } from './favoritesList';
declare var $: any;
@Injectable()
export class mainListService {

  public id1: string ='';
  private city1: string = '' ;
  public country1: string = '' ;
  public temp1: string = '';
  public description1: string ='';
  public myDate1: Date = new Date();
  item: WeatherItem;
  startString : string = 'Tel Aviv';
  userInput: string = '';

  public lat;
  public lng;
  public checkError = 'a';



  constructor(private _WeatherService: WeatherService, private _router: Router) {
  }

 //gets Current weather data from api by name//
  getCurrentWeather(){

    WEATHER_ITEMS.splice(0);

    this._WeatherService.searchWeatherInfo(this.startString)
		.subscribe((data: any) =>
       {


        this.city1 = data.name;
        this.country1 = data.sys.country;
        this.temp1 = data.main.temp;
        this.description1 = data.weather[0].description;
        this.id1 = data.id;
        this.myDate1 = new Date();
        this.item = { city: this.city1, country: this.country1, temp: this.temp1, description: this.description1 , date: null, id:  this.id1};
        WEATHER_ITEMS.push(this.item);
       },
            error => {     });

  }

//gets 5 day / 3 hour forecast data from api by name//
  get5DayForecastWeather(){
    ListOf5Forecast.splice(0);
    let check: boolean ;
    this._WeatherService.searchWeatherForecast5DayInfo(this.startString)
		 .subscribe((data: any) =>
       {

        const ecity = data.city.name;
        const ecountry = data.city.country;
        data.list.forEach(prd => {
          const etemp = prd.main.temp;
          const edescription = prd.weather[0].description;
          const edata = prd.dt_txt;

          this.item = { city: ecity, country: ecountry, temp: etemp, description: edescription , date: edata, id: null};
          ListOf5Forecast.push(this.item);
          check = true;
        });

       },
       error => { $('#errorModal').modal();
       this._router.navigate(["/"]);});
  }
//gets 5 day / 3 hour forecast data from api by By geographic coordinates//
  getCurrentWeatherBYGeolocation() {
    this.getLocation();

    this._WeatherService.searchWeatherInfoBYGeolocation(this.lat, this.lng)
    .subscribe((data: any) =>
       {
        this.city1 = data.name;
        this.country1 = data.sys.country;
        this.temp1 = data.main.temp;
        this.description1 = data.weather[0].description;
        this.id1 = data.id;
        this.myDate1 = new Date();
        this.item = { city: this.city1, country: this.country1, temp: this.temp1, description: this.description1 , date: null, id:  this.id1};
        WEATHER_ITEMS.push(this.item);
       },
           /* error => alert('No data to display')*/);
  }
 //gets 5 day / 3 hour forecast data from api by name//
  get5DayForecastWeatherBYGeolocation(){

      this._WeatherService.searchWeatherForecast5DayInfoBYGeolocation(this.lat, this.lng)
      .subscribe((data: any) =>
        {

         const dcity = data.city.name;
         const dcountry = data.city.country;
         data.list.forEach(prd => {
           const dtemp = prd.main.temp;
           const ddescription = prd.weather[0].description;
           const ddate = prd.dt_txt;

           this.item = { city: dcity, country: dcountry, temp: dtemp, description: ddescription , date: ddate, id: null};
           ListOf5Forecast.push(this.item);
         });

        },
          /*error => alert('No data to display')*/);
  }

  addFavorite(item: WeatherItem) {
    ListOfFavorites.push(item);
    let myItem = {
      city: item.city,
      country: item.country,
      temp: item.temp
    }
    localStorage.setItem('interpretations',
    JSON.stringify(ListOfFavorites));
  }

  deleteFavorite(item: WeatherItem) {
    let cntr: number = -1;
    let myItem = {
      city: item.city,
      country: item.country,
      temp: item.temp
    }

    ListOfFavorites.forEach(prd => {
      cntr++;
      if (prd.id == item.id)
      ListOfFavorites.splice(cntr, 1);

    });
    localStorage.setItem('interpretations',
    JSON.stringify(ListOfFavorites));
  }

 //check if wheather item is favorite//
public isExists = (item: WeatherItem): boolean => {
  let myItem = {
    city: item.city,
    country: item.country,
    temp: item.temp
  }
  return ListOfFavorites.every(data => {
      return data.id !== item.id
  });
}


  favoriteWasClicked(name: string){
    this.startString = name;
    this.getCurrentWeather();
    this.get5DayForecastWeather();
  }


  getLocation() {

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position: Position) => {
        if (position) {
          this.lat = position.coords.latitude;
          this.lng = position.coords.longitude;

        }
      },
        (error: PositionError) => console.log(error));
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

}
