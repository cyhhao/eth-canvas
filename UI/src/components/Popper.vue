<template>
    <div v-if="show"
         class="ivu-poptip-popper popper"
         :style="{top:x+5+'px',left:(y-width/2)+'px',width:width+'px'}"
         x-placement="bottom">
        <div class="mask" @click="close"></div>
        <div class="ivu-poptip-content">
            <div class="ivu-poptip-arrow"></div>
            <div class="ivu-poptip-inner">
                <div class="ivu-poptip-body"
                     style="min-height:300px;font-size:1rem;padding-top:30px;padding:20px;white-space: normal;">

                    <Avatar v-if="data.item!==0" icon="person" style="background-color: #87d068"/>
                    <Avatar v-else icon="person"/>
                    <span class="addr-span" v-if="data.item!==0">
                        <span style="font-size:.7rem">{{data.lastPerson}}</span>
                        <br/>
                        has painted this point, you can buy for cover it.
                    </span>
                    <span class="addr-span" v-else>No one has painted at this point.</span>


                    <Alert v-if="data.buyPrice" show-icon style="white-space: initial;margin-top:5px">
                        It takes <span style="color:#ec6d3e">{{data.buyPrice[0]/1000000000000000000}} ETH</span> to buy
                        this point.
                        <template slot="desc">
                            <br/>
                            Charge details are as follows:
                            <Tooltip placement="top">
                                <Icon type="help-circled" color="#5cadff"></Icon>
                                <div slot="content" style="white-space: normal;">
                                    <p><b>total_price = pay_for_last + fee</b></p>
                                    <br/>
                                    <p><b>pay_for_last</b> is pay for last person who bought the point.</p>
                                    <p><b>fee</b> is pay for platform as a fee.</p>
                                    <br/>
                                    <p><b>pay_for_last</b> = (this_point_bought_times * 2 * basic_price)</p>
                                    <p><b>fee</b> = basic_price = {{fee}}</p>
                                    <br/>

                                </div>
                            </Tooltip>
                            <br/>
                            <p>
                                basic_price: <b>{{fee}} ETH</b>
                                <br/>
                                this_point_bought_times: <b>{{data.buyCnt}}</b>
                                <br/>
                                price = ({{data.buyCnt}} * 2 * {{fee}}) + {{fee}} = <span style="color:#ec6d3e">{{data.buyPrice[0]/1000000000000000000}} ETH</span>
                            </p>
                        </template>
                    </Alert>
                    <div style="overflow: scroll;">
                        <template v-for="(item,index) in colorMapping">
                            <div :key="index" class="color-tag" :style="{'background-color': item}" v-if="index!==0"
                                 @click="selectColor(index)"></div>
                        </template>
                    </div>
                    <div class="footer-box">
                        <div class="inline" v-if="selectedColor!==0">
                            Selected Color :
                            <div class="color-tag"
                                 :style="{'background-color': colorMapping[selectedColor]}"
                            ></div>

                        </div>
                        <div class="inline" v-else>Please select color first</div>

                        <Button style="float:right"
                                type="success"
                                :disabled="selectedColor===0"
                                shape="circle"
                                @click="buy">Buy
                        </Button>
                    </div>
                </div>
            </div> <!---->
        </div>
    </div>
</template>

<script>

    export default {
        name: 'Popper',
        props: ["x", "y", "show", "data", "colorMapping"],
        data() {
            return {
                width: 400,
                fee: 0.0002,
                selectedColor: 0
            }
        },

        methods: {
            selectColor(index) {
                console.log(index)
                if (index !== 0) {
                    //临时盖住一个颜色，显示用
                    let per = this.data.per
                    let color = colorMapping[index]
                    this.data.shape.graphics.beginFill(color).drawRect(this.data.x * per, this.data.y * per, per, per)
                    this.data.stage.update()

                    this.selectedColor = index

                }
            },
            close() {
                //删掉临时色块
                this.data.stage.removeChild(this.data.shape)
                this.data.stage.update()

                this.$emit('update:show', false)
            },
            async buy() {
                console.log(this.data.x, this.data.y, this.selectedColor)
                console.log({from: window.account, value: this.data.buyPrice[0], gas: 200000})
                window.buyContract
                    .buyPoint
                    .sendTransaction(this.data.x, this.data.y, this.selectedColor, {
                        from: window.account,
                        value: this.data.buyPrice[0],
                        gas: 200000
                    }, (e, ok) => {
                        console.log(e)
                        if (!e) {
                            this.$Notice.success({
                                title: 'Payment success!',
                                desc: "Wait for a while to take effect..."
                            })
                            this.close()
                            this.$emit("paysuccess", this.data.x, this.data.y, this.selectedColor)
                        }
                        else {
                            let matchMsg = e.message.match(/} (Error:.*)\n/)
                            if (matchMsg[1]) matchMsg = matchMsg[1]
                            else {
                                matchMsg = e.message
                            }
                            this.$Notice.error({
                                title: "Payment failed!",
                                desc: matchMsg
                            })
                        }
                    })
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    /*.ivu-tag.ivu-tag-checked{*/
    /**/
    /*}*/
    .mask {
        /*background-color: #000;*/
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        position: fixed;
        display: block;
        z-index: -1;
    }

    .footer-box {
        margin-top: 12px;
        height: 35px;
        line-height: 35px;
    }

    .inline {
        display: inline-block;
    }

    .color-tag {
        display: inline-block;
        height: 22px;
        line-height: 22px;
        margin: 2px 4px 2px 0;
        padding: 0 8px;
        /*border: 1px solid #e9eaec;*/
        border-radius: 3px;
        background: #f7f7f7;
        font-size: 12px;
        vertical-align: middle;
        opacity: 1;
        overflow: hidden;
        cursor: pointer;

        border: 1px #000 solid !important;
    }

    .addr-span {
        margin-left: 5px
    }

    .popper {
        position: absolute;
        will-change: top, left;
    }

    .ivu-poptip-confirm .ivu-poptip-popper {
        max-width: 300px;
    }

    .ivu-poptip-popper[x-placement^=bottom] {
        padding: 8px 0 5px 0;
    }

    .ivu-poptip-popper[x-placement^=bottom] .ivu-poptip-arrow:after {
        content: " ";
        top: 1px;
        margin-left: -5px;
        border-top-width: 0;
        border-bottom-color: #fff;
    }

    .ivu-poptip-arrow:after {
        content: "";
        border-width: 5px;
    }

    :after, :before {
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
    }

    .ivu-poptip-popper {
        min-width: 150px;
        display: block;
        visibility: visible;
        font-size: 12px;
        line-height: 1.5;
        position: absolute;
        z-index: 1060;
    }

    .ivu-poptip-inner {
        width: 100%;
        background-color: #fff;
        background-clip: padding-box;
        border-radius: 4px;
        -webkit-box-shadow: 0 1px 6px rgba(0, 0, 0, .2);
        box-shadow: 0 1px 6px rgba(0, 0, 0, .2);
        white-space: nowrap;
    }

    .ivu-poptip-popper[x-placement=bottom] .ivu-poptip-arrow {
        left: 50%;
        margin-left: -5px;
    }

    .ivu-poptip-popper[x-placement^=bottom] .ivu-poptip-arrow {
        top: 3px;
        border-width: 0 5px 5px;
        border-bottom-color: rgba(217, 217, 217, .5);
    }

    .ivu-poptip-arrow {
        border-width: 6px;
    }

    .ivu-poptip-arrow, .ivu-poptip-arrow:after {
        display: block;
        width: 0;
        height: 0;
        position: absolute;
        border-color: transparent;
        border-style: solid;
    }

    .ivu-poptip-popper[x-placement^=bottom] .ivu-poptip-arrow {
        top: 3px;
        border-width: 0 5px 5px;
        border-bottom-color: rgba(217, 217, 217, .5);
    }

    .ivu-poptip-confirm .ivu-poptip-body {
        padding: 16px 16px 8px;
    }

    .ivu-poptip-body {
        padding: 8px 16px;
    }

    .ivu-poptip-confirm .ivu-poptip-footer {
        text-align: right;
        padding: 8px 16px 16px;
    }
</style>
