const pipeDom = document.querySelector('.pipe')
const pipeWidth = 52
function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min) + min)
}
class Pipe extends Skill {
    constructor(height, top, speed, dom) {
        super(pipeWidth, height, gameWidth, top, speed, 0, dom)
    }
    onMove() {
        if (this.left < -this.width) {
            this.dom.remove()
        }
    }
}
/**
 * 一对柱子对
 */
class PipePare {
    constructor(speed) {
        //创建dom对象
        const upDom = document.createElement('div')
        const downDom = document.createElement('div')
        upDom.className = "pipe up"
        downDom.className = "pipe down"
        this.spaceHeight = 150 //空隙位置的高度
        this.minHeight = 80 //水管最小高度
        this.maxHeight = landTop - this.minHeight - this.spaceHeight
        const upHeight = getRandom(this.minHeight,this.maxHeight)
        this.upPipe = new Pipe(upHeight, 0, speed,upDom) //上水管
        const downHeight = landTop - upHeight - this.spaceHeight
        const downTop = landTop - downHeight
        this.downPipe = new Pipe(downHeight,downTop, speed,downDom) //下水管
        gameDom.appendChild(upDom)
        gameDom.appendChild(downDom)
    }
    move(duration){
        this.upPipe.move(duration)
        this.downPipe.move(duration)
    }
    /**
     * 该柱子对是否已经移出了视野
     */
    get useLess(){
        return this.upPipe.left < -this.upPipe.width
    }
}
/**
 * 用于不断的产生柱子对
 */
class Producer{
    constructor(speed){
        this.speed = speed
        this.pairs = []
        this.timer = null
        this.tick = 1500
    }
    startProduce(){
        if (this.timer) {
            return
        }
        this.timer = setInterval(()=>{
            this.pairs.push(new PipePare(this.speed))
            //移除掉用不到的柱子
            for(let i = 0;i < this.pairs.length;i++){
                const pair = this.pairs[i]
                if (pair.useLess) {
                    this.pairs.splice(i,1)
                    i--
                }
            }
        },this.tick)
    }
    stopProduce(){
        clearInterval(this.timer)
        this.timer = null
    }
}

/* const producer = new Producer(-100)
producer.startProduce()//开始产生柱子对
setInterval(()=>{ 
    producer.pairs.forEach(pair=>{
        pair.move(16/1000)
    })
},16) */
/* const pair = new PipePare(-100)
setInterval(()=>{
    pair.move(16/1000) //移动时间16毫秒
},16) //每16毫秒执行一次 */