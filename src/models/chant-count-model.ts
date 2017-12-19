export class ChantCountModel {
  

  count: number=0;
  residue: number;
  roll: number=0;
  target: number;
  startTime: Date;
  endTime: Date;
  targetReached: () => any;
  rollIncreased: () => any;


  constructor(target:number, targetReached?: () => any, rollIncreased?: () => any) {
    //this.navCtrl.push(ChantCountPage);
    //console.log(appCtx);
    this.startTime=new Date();
    this.targetReached=targetReached;
    this.rollIncreased=rollIncreased;
  }

  rollset(inc:boolean){
    if(this.target>0){
      this.roll=this.count/this.target;
      this.residue=this.count%this.target;
    }
  }

  incr(){
    this.count++;
    this.rollset(true);
  }
  decr(){
    this.count--;
    this.rollset(false);
  }
  reset(){
    this.count=0;
  }

}