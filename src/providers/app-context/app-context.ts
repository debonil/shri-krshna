//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ChantCountModel } from '../../models/chant-count-model';

/*
  Generated class for the AppContextProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AppContextProvider {
  
  CHANT_HIST_TABLE_NAME='chantHistory';
  CHANT_TABLE_NAME='chant';

  chant :ChantCountModel;
  chantHistory :Array<ChantCountModel>;

  constructor(private storage: Storage) {
    //this.chant=new ChantCountModel();
    storage.ready().then(() => {
      this.loadValues();
      //this.storage.set('name', 'Mr. Ionitron');
      setInterval(()=>{this.persistAll()}, 10000);
    });

  }

  persistAll(): void{
    console.log("Trying to persist all data....");
    console.log(this.CHANT_HIST_TABLE_NAME, JSON.stringify(this.chantHistory));
    console.log(this.CHANT_TABLE_NAME, JSON.stringify(this.chant));
    if(this.storage){
      this.storage.set(this.CHANT_HIST_TABLE_NAME,
         this.chantHistory.map((chants:ChantCountModel)=>JSON.stringify(chants)));
      this.storage.set(this.CHANT_TABLE_NAME, JSON.stringify(this.chant));
      console.log("Successfully persisted!!");
    }
  }

  loadValues(): void {
    
    /* this.storage.get('name').then((val) => {
      console.log(this.CHANT_HIST_TABLE_NAME, val);
      if(val){
        this.chantHistory=val.map((chants:string)=>JSON.parse(chants));
      }else{
        this.chantHistory=new Array<ChantCountModel>();
      }
    }); */
    this.storage.get(this.CHANT_HIST_TABLE_NAME).then((val) => {
      console.log(this.CHANT_HIST_TABLE_NAME, val);
      if(val){
        this.chantHistory=val.map((chants:string)=>new ChantCountModel(chants));
      }else{
        this.chantHistory=new Array<ChantCountModel>();
      }
    });
    this.storage.get(this.CHANT_TABLE_NAME).then((val) => {
      console.log(this.CHANT_TABLE_NAME, val);
      if(val){
        this.chant=new ChantCountModel(val);;
      }else{
        //this.chant=new ChantCountModel();
      }
    });
  }


  removeFromChantHistory(itemIndex:number){
    if(itemIndex<this.chantHistory.length&&itemIndex>-1){
      this.chantHistory.splice(itemIndex, 1);
    }
  }
}
