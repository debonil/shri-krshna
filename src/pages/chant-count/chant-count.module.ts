import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChantCountPage } from './chant-count';
import { MusicControls } from '@ionic-native/music-controls';

@NgModule({
  declarations: [
    ChantCountPage,
  ],
  imports: [
    IonicPageModule.forChild(ChantCountPage),
  ],
  providers: [
    MusicControls
  ]
})
export class ChantCountPageModule {}
