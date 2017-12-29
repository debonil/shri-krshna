import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { MusicControls } from '@ionic-native/music-controls';
import { Vibration } from '@ionic-native/vibration';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ChantCountPageModule } from '../pages/chant-count/chant-count.module';
import { AdMobFree} from '@ionic-native/admob-free';
import { IonicStorageModule } from '@ionic/storage';
import { AppContextProvider } from '../providers/app-context/app-context';
import { ChantHistoryPage } from '../pages/chant-history/chant-history';
import { AboutPage } from '../pages/about/about';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AboutPage,
    ChantHistoryPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    ChantCountPageModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AboutPage,
    ChantHistoryPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    MusicControls,
    Vibration,
    AdMobFree,
    AppContextProvider,
  ]
})
export class AppModule {}
