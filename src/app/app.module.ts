import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { MusicControls } from '@ionic-native/music-controls';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ChantCountPage } from '../pages/chant-count/chant-count';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ChantCountPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ChantCountPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    MusicControls,
  ]
})
export class AppModule {}
