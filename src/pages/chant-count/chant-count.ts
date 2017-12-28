import { Component, NgZone  } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MusicControls } from '@ionic-native/music-controls';
import { AppContextProvider } from '../../providers/app-context/app-context';
import { ChantCountModel } from '../../models/chant-count-model';

/**
 * Generated class for the ChantCountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chant-count',
  templateUrl: 'chant-count.html',
})
export class ChantCountPage {
  //cache : number=0;
  count : number=0;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private musicControls: MusicControls, private zone:NgZone,public appCtx: AppContextProvider) {

    if(!this.appCtx.chant){
      let target=this.navParams.data.target?this.navParams.data.target:108;
      this.appCtx.chant=new ChantCountModel(target,()=>{alert("targetReached")},()=>{alert("rollIncreased")},);
    }
  }


  ionViewDidEnter(){

    this.musicControls.create({
      track       : 'HARE KRSHNA',        // optional, default : ''
      artist      : 'Shri Chaitanya',                       // optional, default : ''
      cover       : 'assets/imgs/lsk1.jpg',      // optional, default : nothing
      // cover can be a local path (use fullpath 'file:///storage/emulated/...', or only 'my_image.jpg' if my_image.jpg is in the www folder of your app)
      //           or a remote url ('http://...', 'https://...', 'ftp://...')
      isPlaying   : false,                         // optional, default : true
      dismissable : true,                         // optional, default : false
    
      // hide previous/next/close buttons:
      hasPrev   : true,      // show previous button, optional, default: true
      hasNext   : true,      // show next button, optional, default: true
      hasClose  : true,       // show close button, optional, default: false
    
    // iOS only, optional
      album       : 'Absolution'  ,   // optional, default: ''
      duration : 60, // optional, default: 0
      elapsed : 10, // optional, default: 0
      hasSkipForward : true,  // show skip forward button, optional, default: false
      hasSkipBackward : true, // show skip backward button, optional, default: false
      skipForwardInterval: 15, // display number for skip forward, optional, default: 0
      skipBackwardInterval: 15, // display number for skip backward, optional, default: 0
    
      // Android only, optional
      // text displayed in the status bar when the notification (and the ticker) are updated
      ticker    : 'Now playing "Time is Running Out"'
     });
    //alert(JSON.stringify(this.musicControls));
     this.musicControls.subscribe().subscribe(action => {
    //alert(JSON.stringify(action));
         const message = JSON.parse(action).message;
             switch(message) {
                 case 'music-controls-headset-unplugged':
                     alert("Disconnected!!");
                     break;
                 case 'music-controls-headset-plugged':
                      alert("Connected!!");
                     break;
                 default:
                  this.zone.run(() => {
                     this.count++;
                     this.appCtx.chant.count++;
                  });
                break;
             }
    
  });

// Start listening for events
// The plugin will run the events function each time an event is fired

     this.musicControls.listen(); // activates the observable above
    
     this.musicControls.updateIsPlaying(false);


}

}
