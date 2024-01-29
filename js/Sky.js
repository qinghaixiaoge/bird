const skyDom = document.querySelector(".sky")
const skyStyle = getComputedStyle(skyDom) //拿到天空的所有样式
const skyWidth = parseFloat(skyStyle.width) //变成小数
const skyHeight = parseFloat(skyStyle.height) 
class Sky extends Skill{
    constructor(){
        super(skyWidth,skyHeight,0,0,-50,0,skyDom)
    }
    onMove(){
        if (this.left <= -skyWidth / 2) {
            this.left = 0
        }
    }
}
/* const sky = new Sky()
setInterval(()=>{
    sky.move(16/1000) //16ms移动一次
},16) */