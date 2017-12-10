import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ChantCountPage } from '../chant-count/chant-count';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  //private chantCountPage:ChantCountPage;
  constructor(public navCtrl: NavController) {
    //this.navCtrl.push(ChantCountPage);
  }

  goToChantCountPage(){
    this.navCtrl.push(ChantCountPage);
  }
  

}
