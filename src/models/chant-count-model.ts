export class ChantCountModel {
  

  count: number=0;
  residue: number;
  roll: number=0;
  target: number;
  startTime: Date;
  endTime: Date;
  targetReached: () => any;
  rollIncreased: () => any;


  constructor(stringyfiedValues?:string,target?:number,
    targetReached?: () => any, rollIncreased?: () => any) {
    //this.navCtrl.push(ChantCountPage);
    let obj=JSON.parse(stringyfiedValues);
    this.count=obj.count?obj.count:0;
    this.residue=obj.residue?obj.residue:0;
    this.roll=obj.roll?obj.roll:0;
    this.target=obj.target?obj.target:target;
    this.startTime=obj.startTime?obj.startTime:new Date();
    this.endTime=obj.endTime?obj.endTime:new Date();
    this.targetReached=targetReached;
    this.rollIncreased=rollIncreased;
    console.log(this);

  }

  rollset(inc:boolean){
    if(this.target>0){
      this.roll=Math.floor(this.count/this.target);
      this.residue=this.count%this.target;
      
      if(this.roll>0&&this.residue==0){
        if(this.roll==1)this.targetReached();
        this.rollIncreased();
      }
    }
  }

  incr(){
    this.count++;
    this.rollset(true);
  }
  decr(){
    if(this.count>0){
      this.count--;
      this.rollset(false);
    }
  }
  reset(){
    this.count=0;
  }

  get duration(){
    //return this.endTime.getTime()-this.startTime.getTime();
    return new Date(this.endTime).getTime()-new Date(this.startTime).getTime();
  }
}