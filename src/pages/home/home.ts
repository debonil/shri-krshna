import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ChantCountPage } from '../chant-count/chant-count';
import { AdMobFree, AdMobFreeBannerConfig } from '@ionic-native/admob-free';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  //private chantCountPage:ChantCountPage;
  constructor(public navCtrl: NavController,private admobFree: AdMobFree) {
    //this.navCtrl.push(ChantCountPage);
  }

  ionViewDidEnter(){
    let bannerConfig: AdMobFreeBannerConfig = {
        autoShow: true,
        id: 'ca-app-pub-1527462316825728/5928560906',//id: Your Ad Unit ID goes here
    };

    this.admobFree.banner.config(bannerConfig);

    this.admobFree.banner.prepare().then(() => {
        // success
    }).catch(e => console.log(e));
  }
  goToChantCountPage(){
    this.navCtrl.push(ChantCountPage);
  }
  
  showBanner() {
    
           let bannerConfig: AdMobFreeBannerConfig = {
               autoShow: true,
               id: 'ca-app-pub-1527462316825728/5928560906',//id: Your Ad Unit ID goes here
           };
    
           this.admobFree.banner.config(bannerConfig);
    
           this.admobFree.banner.prepare().then(() => {
               // success
           }).catch(e => console.log(e));
    
       }
    
}
