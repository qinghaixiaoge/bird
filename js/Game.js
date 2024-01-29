class Game{
    constructor(){
        this.sky = new Sky()
        this.land = new Land(-100)
        this.bird = new Bird()
        this.pipeProducer = new Producer(-100)
        this.tick = 16
        this.timer = null
        this.gameOver = false
    }
    start(){
        if (this.timer) {
            return
        }
        console.log(5);
        this.pipeProducer.startProduce() //开始生成柱子
        this.bird.startSwing()
        if (this.gameOver) {
            window.location.reload()
            return
        }
        this.timer = setInterval(()=>{
            const duration = this.tick / 1000
            this.sky.move(duration)
            this.land.move(duration)
            this.bird.move(duration)
            this.pipeProducer.pairs.forEach(pair=>{
                pair.move(duration)
            })
            if (this.isGameOver()) {
                this.stop()
                this.gameOver = true
                console.log("游戏结束");
            }
        },this.tick)
    }
    stop(){
        this.pipeProducer.stopProduce()
        this.bird.stopSwing()
        clearInterval(this.timer)
        this.timer = null
    }
        /**
     * 判断两个矩形是否碰撞
     * @param {*} rec1 
     * @param {*} rec2 
     * @returns 
     */
        isHit(rec1, rec2) {
            //横向：两个矩形的中心点的横向距离，是否小于矩形宽度之和的一半
            //纵向：两个矩形的中心点的纵向距离，是否小于矩形高度之和的一半
            const centerX1 = rec1.left + rec1.width / 2
            const centerX2 = rec2.left + rec2.width / 2
            const centerY1 = rec1.top + rec1.height / 2
            const centerY2 = rec2.top + rec2.height / 2
            const disX = Math.abs(centerX1 - centerX2); //中心点横向距离
            const disY = Math.abs(centerY1 - centerY2) //中心点纵向距离
            if (disX < (rec1.width + rec2.width) / 2 && disY < (rec1.height + rec2.height) / 2) {
                return true
            }
            return false
        }
        isGameOver(){
            if (this.bird.top === this.bird.maxY) {
                //鸟碰到了大地
                return true
            }
            for(let i = 0;i< this.pipeProducer.pairs.length;i++){
                const pair = this.pipeProducer.pairs[i]
                //看柱子对pair是否跟bird进行了碰撞
                if (this.isHit(this.bird,pair.upPipe) || this.isHit(this.bird,pair.downPipe)) {
                    return true
                }
            }
            return false
        }
    /**
     * 关联键盘事件
     */
    regEvent(){
        window.onkeydown = (e)=>{
            if (e.key === "Enter") {
                if (this.timer) {
                    this.stop()
                }else{
                    this.start()
                }
            }else if(e.key === " "){
                this.bird.jump()
            }
        }
    }
}

const game = new Game()
game.regEvent()