import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { GetJsonDataService } from './get-json-data.service';
import { HttpClientModule } from '@angular/common/http';

import { NativeAudio } from '@ionic-native/native-audio/ngx'
import { WordModelPage } from './word-model/word-model.page';
import { Vibration } from '@ionic-native/vibration/ngx';


@NgModule({
  declarations: [AppComponent, WordModelPage],
  entryComponents: [WordModelPage],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    GetJsonDataService,
    NativeAudio,
    Vibration,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
