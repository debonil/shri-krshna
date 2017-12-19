//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ChantCountModel } from '../../models/chant-count-model';

/*
  Generated class for the AppContextProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AppContextProvider {

  chant :ChantCountModel;

  constructor() {
    //this.chant=new ChantCountModel();
    console.log('Hello AppContextProvider Provider');
  }

}
