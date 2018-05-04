<template>
    <div>
        <Popper :x="clickpX" :y="clickpY"
                :show.sync="showMenu"
                :data="selectData"
                :colorMapping="colorMapping"
                @paysuccess="paySuccess"
        />

        <div style="cursor:pointer;">
            <canvas ref="myCanvas" :width="canHeight" :height="canHeight"
                    style="border: 1px solid black;display: block;margin:auto;"></canvas>

        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import Popper from './Popper'


    window.colorMapping = [
        "#FFFFFF",
        "#0014a5",
        "#0074D9",
        "#849aff",
        "#60aeff",
        "#7FDBFF",
        "#39CCCC",
        "#00fff9",
        "#3D9970",
        "#2ECC40",
        "#01FF70",
        "#cdff35",
        "#FFDC00",
        "#fff000",
        "#FF851B",
        "#ff0015",
        "#ff91e8",
        "#F012BE",
        "#B10DC9",
        "#d80026",
        "#85144B",
        "#ff8a99",
        "#ffbcd6",
        "#FFFFFF",
        "#DDDDDD",
        "#AAAAAA",
        "#646464",
        "#111111"]

    export default {
        name: 'PaintBoard',
        components: {Popper},
        props: ["mapsIn"],
        data() {
            console.log("innerHeight", window.innerHeight - 20, NUM)
            return {
                canHeight: window.innerHeight - 20,
                board: [],
                canvas: null,
                clickpX: 0,
                clickpY: 0,
                showMenu: false,
                selectData: {},
                colorMapping: window.colorMapping,
                tmpShape: null,
                per: (window.innerHeight - 20) / NUM,
                move_up: false,
                maps: []
            }
        },
        async mounted() {
            // let res = await axios.get('/static/maps.json')
            // this.maps = res.data
            // this.canHeight = window.innerHeight
            console.log(this.$refs)
            this.canvas = this.$refs['myCanvas']
            let stage = new createjs.Stage(this.canvas)
            // console.log(stage.getBounds().width)
            stage.scale = 1
            this.stage = stage
            createjs.Touch.enable(this.stage)
            this.stage.enableMouseOver()

            // createjs.Ticker.setFPS(60)
            // createjs.Ticker.addEventListener('tick', () => {
            //     this.stage.update()
            // })

            this.bindEvent()


        },
        watch: {
            mapsIn(val) {
                console.log('change')
                this.maps = this.mapsIn
                this.drawMap()
            }
        },
        methods: {
            refresh() {
                this.stage.scale = 1
                this.stage.regX = this.stage.regY = 0
                this.stage.update()
            },
            drawMap() {
                this.stage.removeAllChildren()
                let per = this.per
                console.log("NUM", per, NUM)
                for (let i = 0; i < NUM; i++) {
                    for (let j = 0; j < NUM; j++) {
                        let shape = new createjs.Shape()
                        let item = this.maps[i][j] - 0
                        let color = colorMapping[item]
                        //= (i + j) % 2 === 0 ? "#0ff" : "#f0f"
                        shape.graphics.beginFill(color).drawRect(i * per, j * per, per, per)

                        shape.on("mouseover", () => {
                            shape.graphics.setStrokeStyle(1).beginStroke("#000").drawRect(i * per, j * per, per, per)
                            this.stage.update()
                        })
                        shape.on("mouseout", () => {
                            shape.graphics.clear()
                            shape.graphics.beginFill(color).drawRect(i * per, j * per, per, per)
                            this.stage.update()
                        })

                        shape.on("click", (e) => {
                            console.log('bbbb', this.move_up)
                            if (this.move_up) return
                            console.log(e.nativeEvent.pageX)
                            this.clickpX = e.nativeEvent.clientY
                            this.clickpY = e.nativeEvent.clientX
                            this.showMenu = true
                            this.clickPoint(i, j, item)
                        })
                        this.stage.addChild(shape)
                    }
                }
                //添加外边框
                let outline = new createjs.Shape()
                outline.graphics
                    .setStrokeStyle(0.5, "round")
                    .setStrokeDash([10, 10], 0)
                    .beginStroke("#000").drawRect(0, 0, this.canHeight, this.canHeight)
                this.stage.addChild(outline)

                this.stage.update()
            },
            bindEvent() {
                let that = this
                let map_move = false
                let oldX, oldY
                this.stage.on("stagemousedown", function (evt) {
                    oldX = evt.stageX
                    oldY = evt.stageY
                    if (evt.nativeEvent.button === 0) {

                        map_move = true
                        that.move_up = false
                    }
                    // this.showMenu = false
                })
                this.stage.on("stagemousemove", function (evt) {
                    if (map_move) {
                        let dx = that.stage.regX + (1 / that.stage.scaleX) * (oldX - evt.stageX)
                        let dy = that.stage.regY + (1 / that.stage.scaleY) * (oldY - evt.stageY)
                        // if (dx > -10) {
                        that.stage.regX = dx
                        oldX = evt.stageX
                        // }
                        // if (dy > -10) {
                        that.stage.regY = dy
                        oldY = evt.stageY
                        // }
                        that.stage.update()
                        that.move_up = true
                    }
                })


                this.stage.on("stagemouseup", function (evt) {
                    if (map_move) {
                        console.log('aaaa')
                    }
                    map_move = false
                })

                this.canvas.addEventListener("mousewheel", (e) => {
                    e.preventDefault()
                    e.returnValue = false
                    this.resize(e)
                    // this.showMenu = false
                })
            },
            resize(event) {
                let e = event
                let delta = e.wheelDelta ? (e.wheelDelta / 120) : (-e.detail / 3)
                delta /= 100
                let num
                if (delta > 0) {
                    num = this.stage.scaleY * (1 + delta)
                } else {
                    num = this.stage.scaleY * (1 / (1 - delta))
                }
                if (num >= 1) {
                    this.stage.scaleX = this.stage.scaleY = num
                }

                this.stage.update()
            },
            async clickPoint(x, y, item) {
                console.log(x, y, item)

                //画临时框框
                let per = this.per
                this.tmpShape = new createjs.Shape()
                this.tmpShape.graphics.setStrokeStyle(1).beginStroke("#000").drawRect(x * per, y * per, per, per)
                this.stage.addChild(this.tmpShape)
                this.stage.update()

                this.selectData = {
                    buyCnt: 0,
                    lastPerson: "",
                    item: item,
                    buyPrice: 0,
                    x: x,
                    y: y,
                    per: per,
                    shape: this.tmpShape,
                    stage: this.stage
                }

                window.buyContract.getPointPrice.call(x, y, (e, buyPrice) => {
                    this.selectData.buyPrice = buyPrice
                    console.log("buyPrice", buyPrice)
                })

                if (item !== 0) {
                    window.mapContract.ownerMap.call(x, y, (e, lastPerson) => {
                        this.selectData.lastPerson = lastPerson
                    })
                    window.mapContract.cntMap.call(x, y, (e, buyCnt) => {
                        this.selectData.buyCnt = parseInt(buyCnt)
                    })
                    // console.log(lastPerson, buyCnt)
                }


                // let color=mapContract.
            },
            paySuccess(x, y, color) {
                this.maps[x][y] = color
                this.drawMap()
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .ff {
        color: #fff
    }
</style>
