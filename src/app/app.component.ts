import { Component, OnInit } from '@angular/core';
import { mainListService } from './Services/mainList.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'HomeAssignmentHerolo';

  constructor( private _mainListService: mainListService) {}

  ngOnInit() {

    this._mainListService.getCurrentWeatherBYGeolocation();
    this._mainListService.get5DayForecastWeatherBYGeolocation();

  }
}
