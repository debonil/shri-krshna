import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ChantCountPage } from '../chant-count/chant-count';
import { AppContextProvider } from '../../providers/app-context/app-context';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  target:number;
  constructor(public navCtrl: NavController,public appCtx: AppContextProvider) {
    //this.navCtrl.push(ChantCountPage);
    //console.log(appCtx);
    
  }

  ionViewDidEnter(){

  }
  goToChantCountPage(){
    this.navCtrl.push(ChantCountPage,{"target":this.target});
  }
  
/*   showBanner() {
    
           let bannerConfig: AdMobFreeBannerConfig = {
               autoShow: true,
               id: 'ca-app-pub-1527462316825728/5928560906',//id: Your Ad Unit ID goes here
           };
    
           this.admobFree.banner.config(bannerConfig);
    
           this.admobFree.banner.prepare().then(() => {
               // success
           }).catch(e => console.log(e));
    
       } */
    
}
