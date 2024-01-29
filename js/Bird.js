const birdDom = document.querySelector(".bird")
const birdStyle = getComputedStyle(birdDom) //拿到天空的所有样式
const birdWidth = parseFloat(birdStyle.width) //变成小数
const birdHeight = parseFloat(birdStyle.height)
const birdtop = parseFloat(birdStyle.top)
const birdLeft = parseFloat(birdStyle.left)

class Bird extends Skill {
    constructor() {
        super(birdWidth, birdHeight, birdLeft, birdtop, 0, 0, birdDom)
        this.g = 1500 //向下的加速度，单位：像素/秒²
        this.maxY = gameHeight - landHeight - this.height//最大的y坐标
        this.swingStatus = 1 //小鸟的翅膀状态
        this.timer = null //翅膀煽动的计时器
        this.render()
    }
    //开启煽动翅膀
    startSwing() {
        if (this.timer) {
            return
        }
        this.timer = setInterval(() => {
            /* this.swingStatus = (this.swingStatus+1) % 3 + 1 */
            this.swingStatus++
            if (this.swingStatus === 4) {
                this.swingStatus = 1
            }
            this.render()
        }, 300)
    }
    render() {
        super.render() //重用父类渲染逻辑
        this.dom.className = `bird swing${this.swingStatus}`
    }
    //停止煽动翅膀
    stopSwing() {
        clearInterval(this.timer)
        this.timer = null
    }
    move(duration) {
        super.move(duration) //调用父类方法
        //根据加速度改变速度
        this.ySpeed += this.g * duration
    }
    onMove() {
        //控制坐标范围
        if (this.top < 0) {
            this.top = 0
        } else if (this.top > this.maxY) {
            this.top = this.maxY
        }
    }
    //向上跳，直接给一个向上的速度
    jump() {
        this.ySpeed = -350
    }
}

/* const bird = new Bird()
bird.startSwing()
setInterval(()=>{
    bird.move(16/1000) //16ms移动一次
},16) */