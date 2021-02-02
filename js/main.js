var field = document.getElementById("field");
var ctx = field.getContext("2d");
ctx.fillRect(0,0,field.width,field.height);
//this width canvas field
const width = 140;
//this height canvas field
const height = 100;
// pixels unit
const psize = 8;
var a_field = createArray(100,140)
class Worm{
  world = null
  constructor(world) {
    this.world=  world
    this.head.point.x = randInt(101)
    this.head.point.y = randInt(141)
    this.world[this.head.point.x][this.head.point.y] = 1
  }
  head = {
    direction:0,
    point:{x:0,y:0}
  }
  life = 100
  StartLife(){
    var delay = 250
    self = this
    var t = setTimeout(function JustDoit (){
      self.Move()
      if(self.life>0)
        t = setTimeout(JustDoit,delay)
    },delay)
  }
  Move(){
    this.world[this.head.point.x][this.head.point.y] = 0
    this.UpdateWorm(this.head.point.x,this.head.point.y)
    switch (this.head.direction) {
      case 0:
        if(this.head.point.x>0) this.head.point.x--
        break
      case 1:
        if(this.head.point.y<width) this.head.point.y ++
        break
      case 2:
        if (this.head.point.y>0)this.head.point.y --
        break
      case 3:
        if(this.head.point.x<height)this.head.point.x ++
        break
    }
    console.log(this.head.direction)
    if(Math.random()>0.95){
     this.head.direction = this.ChangeDirection(this.head.direction)
    }
    this.world[this.head.point.x][this.head.point.y] = 1
    this.UpdateWorm(this.head.point.x,this.head.point.y)
    this.life--
  }
  UpdateWorm(x,y){
    let psize = 8
    var point = this.world[x][y] //apple point
    switch(point) {
      case 1:
        ctx.fillStyle = "#cd1866"
        break;
      case 5:
        ctx.fillStyle = "#18650a";
        break;
      default:
        ctx.fillStyle = "#f1f199";
    }
    ctx.fillRect(y*psize,x*psize,psize,psize)
  }
  ChangeDirection(dir){
    let r = dir
    do {
      r = randInt(4)
    }while(dir==r)
    return r
  }
}


ctx.fillRect(0,0,psize*width,psize*height)

ResetField(a_field); //fill white color
var worm = new Worm(a_field)

AppleField(a_field);
UpdateCanvas(a_field);
worm.StartLife()

//======================================================================================================================
function randInt(max){
  return Math.floor(Math.random() * Math.floor(max))
}

function createArray(length) {
  var arr = new Array(length || 0),
      i = length;

  if (arguments.length > 1) {
    var args = Array.prototype.slice.call(arguments, 1);
    while(i--) arr[length-1 - i] = createArray.apply(this, args);
  }

  return arr;
}

function UpdateCanvas(field){
  for(var row=0;row<height;row++){
    for(var col=0;col<width;col++){
      var point = field[row][col] //apple point
      switch(point) {
        case 1:
          ctx.fillStyle = "#cd1866"
          break;
        case 5:
          ctx.fillStyle = "#18650a";
          break;
        default:
          ctx.fillStyle = "#f1f199";
      }
      ctx.fillRect(col*psize,row*psize,psize,psize)

    }
  }
}
function ResetField(field){
  for(var row=0;row<height;row++){
    for(var col=0;col<width;col++){
        field[row][col] = 0 //empty point
    }
  }
}
function AppleField(field){
  for(var row=0;row<height;row++){
    for(var col=0;col<width;col++){
      var r = Math.random();
      if(r<0.008) {
        field[row][col] = 5 //apple point
      }else{
        field[row][col] = 0 // empty
      }
    }
  }
}
