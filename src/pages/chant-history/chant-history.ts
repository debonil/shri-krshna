import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AppContextProvider } from '../../providers/app-context/app-context';

/**
 * Generated class for the ChantHistoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-chant-history',
  templateUrl: 'chant-history.html',
})
export class ChantHistoryPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public appCtx: AppContextProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChantHistoryPage');
  }

}
