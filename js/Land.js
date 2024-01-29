const landDom = document.querySelector(".land")
const landStyle = getComputedStyle(landDom) //拿到天空的所有样式
const landWidth = parseFloat(landStyle.width) //变成小数
const landHeight = parseFloat(landStyle.height) 
const landTop = parseFloat(landStyle.top)
class Land extends Skill{
    constructor(speed){
        super(landWidth,landHeight,0,landTop,speed,0,landDom)
    }
    onMove(){
        if (this.left <= -landWidth / 2) {
            this.left = 0
        }
    }
}
/* const land = new Land(-100)
setInterval(()=>{
    land.move(16/1000) //16ms移动一次
},16) */