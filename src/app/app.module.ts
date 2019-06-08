import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageComponent } from './main-page/main-page.component';
import { FavoritesPageComponent } from './favorites-page/favorites-page.component';
import { WeatherService} from './Services/weatherList.service';
import { mainListService } from './Services/mainList.service';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    FavoritesPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule
  ],
  providers: [WeatherService, mainListService],
  bootstrap: [AppComponent]
})
export class AppModule { }
