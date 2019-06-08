import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/Rx';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import {WeatherItem} from "../Model/weatherItem";

@Injectable()
export class WeatherService {

    constructor(private _http: Http) {}


    searchWeatherInfo(city: string): Observable<any> {

        const APPID = 'e501f224e67aedeb94498a2a6df77614';

        let url = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&APPID=' + APPID + '&units=metric';
        console.log(url);
        return this._http.get(url)
            .map(
                response => response.json()
            )
            .catch(
                error => {
                    return Observable.of<any>(error.json());
                }
            );
    }


    searchWeatherForecast5DayInfo(city: string): Observable<any> {

      const APPID = 'e501f224e67aedeb94498a2a6df77614';

      let url1 = 'http://api.openweathermap.org/data/2.5/forecast?q=' + city + '&APPID=' + APPID + '&units=metric' ;
      console.log(url1);
      return this._http.get(url1)
          .map(
              response => response.json()
          )
          .catch(
              error => {
                  return Observable.of<any>(error.json());
              }
          );
  }



  searchWeatherInfoBYGeolocation(latitude: string, longitude: string): Observable<any> {

    const APPID = 'e501f224e67aedeb94498a2a6df77614';
    let url = 'https://api.openweathermap.org/data/2.5/weather?lat=' + latitude + '&lon=' + longitude + '&APPID=' + APPID + '&units=metric';
    console.log(url);
    return this._http.get(url)
        .map(
            response => response.json()
        )
        .catch(
            error => {
                return Observable.of<any>(error.json());
            }
        );
}


searchWeatherForecast5DayInfoBYGeolocation(latitude: string, longitude: string): Observable<any> {

  const APPID = 'e501f224e67aedeb94498a2a6df77614';

  let url1 = 'http://api.openweathermap.org/data/2.5/forecast?lat=' + latitude + '&lon=' + longitude + '&APPID=' + APPID + '&units=metric' ;
  console.log(url1);
  return this._http.get(url1)
      .map(
          response => response.json()
      )
      .catch(
          error => {
              return Observable.of<any>(error.json());
          }
      );
}




}
