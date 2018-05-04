<template>
    <div>
        <Popper :x="clickpX" :y="clickpY" :show.sync="showMenu" :data="selectData" :colorMapping="colorMapping"/>
        <ButtonGroup shape="circle">
            <Button type="ghost" icon="refresh" @click="refresh"></Button>
        </ButtonGroup>
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
        "#001F3F",
        "#0074D9",
        "#7FDBFF",
        "#39CCCC",
        "#3D9970",
        "#2ECC40",
        "#01FF70",
        "#FFDC00",
        "#FF851B",
        "#FF4136",
        "#F012BE",
        "#B10DC9",
        "#85144B",
        "#FFFFFF",
        "#AAAAAA",
        "#DDDDDD",
        "#111111"]

    export default {
        name: 'PaintBoard',
        components: {Popper},
        props: ["maps"],
        data() {
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
                move_up: false
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
            maps(val) {
                this.drawMap()
            }
        },
        methods: {
            refresh() {
                this.stage.scale = 1
                this.stage.regX = this.stage.regY = 0
                this.stage.update()
                // this.drawMap()
            },
            drawMap() {
                this.stage.removeAllChildren()
                let per = this.per
                console.log(per)
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
                let buyCnt = 0
                let lastPerson
                let buyPrice = await window.buyContract.methods.getPointPrice(x, y).call()
                console.log("buyPrice", buyPrice)
                if (item === 0) {

                }
                else {
                    lastPerson = await window.mapContract.methods.ownerMap(x, y).call()
                    buyCnt = await window.mapContract.methods.cntMap(x, y).call()
                    console.log(lastPerson, buyCnt)
                }
                let per = this.per
                this.tmpShape = new createjs.Shape()
                this.tmpShape.graphics.setStrokeStyle(1).beginStroke("#000").drawRect(x * per, y * per, per, per)
                this.stage.addChild(this.tmpShape)
                this.stage.update()

                this.selectData = {
                    buyCnt: buyCnt,
                    lastPerson: lastPerson,
                    item: item,
                    buyPrice: buyPrice,
                    x: x,
                    y: y,
                    per: per,
                    shape: this.tmpShape,
                    stage: this.stage
                }

                // let color=mapContract.
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
