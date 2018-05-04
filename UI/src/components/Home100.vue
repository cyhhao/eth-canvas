<template>
    <div class="panel-box">
        <div style="margin:10px">
            <ButtonGroup>
                <Button type="primary" shape="circle" icon="refresh" @click="onRefresh">Refresh</Button>
                <!--<Button type="primary" shape="circle" icon="ios-search">Search</Button>-->
            </ButtonGroup>
        </div>
        <div style="margin:10px">
            <PaintBoard ref="paintBoard" :maps="maps"/>

        </div>
        <div>
            <Card style="width:350px;margin:10px">
                <div slot="title" style="height:35px">
                    <Avatar icon="person" style="background-color: #87d068"/>

                    <div class="account-box">{{account}}</div>

                </div>
                <a href="#" slot="extra" @click.prevent="pullAccountInfos">
                    <Icon type="ios-loop-strong"></Icon>
                    Refresh
                </a>
                <h3>Banlance:</h3>
                <Tag type="dot" color="blue">{{banlance}} Ether</Tag>

                <h3>Income:</h3>
                <Tag type="dot" color="blue">{{income}} Ether</Tag>
                <Button v-if="income>0" type="success" size="small" shape="circle" @click="takeOut">Take out</Button>
            </Card>
            <!--<ButtonGroup shape="circle">-->
            <!--<Button type="ghost" icon="refresh" @click="refresh"></Button>-->
            <!--</ButtonGroup>-->
        </div>
        <Spin size="large" fix v-if="spinShow"></Spin>
        <!--<button @click="loadMaps">click</button>-->

        <Modal
            title="Install MetaMask first"
            v-model="noMask"
            :closable="false"
            :mask-closable="false">

            <Alert type="warning" show-icon>
                Please install metamask first
                <template slot="desc">
                    This application is based on Ethereum, so you need to use
                    <a href="https://www.google.com/chrome/" target="_blank">chrome</a>
                    and install the
                    <a href="https://chrome.google.com/webstore/detail/nkbihfbeogaeaoehlefnkodbefgpgknn"
                       target="_blank">MetaMask plugin</a>
                    , or use the
                    <a href="https://github.com/ethereum/mist/releases" target="_blank">Mist Browser</a>
                </template>
            </Alert>

            <div slot="footer">
                <ButtonGroup shape="circle">

                    <Button type="primary" icon="refresh" @click="reloadPage">reload page</Button>
                    <Button type="primary" icon="android-download" @click="installMetaMask">isntall
                        MetaMask
                    </Button>
                </ButtonGroup>
            </div>
        </Modal>
    </div>
</template>

<script>
    import getWeb3 from '../utils/getWeb3'
    import axios from 'axios'
    import PaintBoard from './PaintBoard'

    window.NUM = 100.0
    export default {
        name: 'HelloWorld',
        components: {PaintBoard},
        data() {
            return {
                maps: [],
                spinShow: false,
                account: null,
                banlance: 0,
                income: 0,
                noMask: false
            }
        },
        mounted() {
            this.init()
        },
        methods: {
            init() {
                getWeb3.then((res) => {
                    console.log(res)
                    window.myWeb3 = res
                    this.noMask = false
                    this.loadMaps()
                }).catch((e) => {
                    this.noMask = true
                    console.log(e)

                })


            },
            async loadMaps() {
                this.spinShow = true
                // this.maps = await this.getMap()
                this.getMap((maps) => {
                    this.maps = maps
                    this.spinShow = false
                    setInterval(() => {
                        this.pullAccountInfos()
                    }, 1000)
                })

            },
            pullAccountInfos() {
                let web3 = window.myWeb3.web3()
                let account = web3.eth.accounts
                this.account = window.account = account[0]
                web3.eth.getBalance(this.account, (e, banlance) => {
                    this.banlance = banlance.div(Math.pow(10, 18)).toFixed(5)
                    // console.log(parseInt(banlance))
                })

                if (window.buyContract && this.account) {
                    window.buyContract.payments.call(this.account, (e, income) => {
                        this.income = income.div(Math.pow(10, 18)).toFixed(6)
                    })
                }

            },


            async initContracts() {
                let web3 = window.myWeb3.web3()

                this.pullAccountInfos()


                let res = await axios.get('/static/contracts_config.json', {params: {v: Math.random()}})
                let map = res.data.Map
                let buy = res.data.BuyControler
                // console.log(map)
                // window.mapContract = new web3.eth.Contract(map.abi, map.address)
                // window.buyContract = new web3.eth.Contract(buy.abi, buy.address)

                window.mapContract = web3.eth.contract(map.abi).at(map.address)
                window.buyContract = web3.eth.contract(buy.abi).at(buy.address)

                let event = window.buyContract.BuyPointSucceed((e, data) => {
                    let res = data.args
                    console.log("event:", res)
                    if (this.maps[res.x]) {
                        let maps = Object.assign([], this.maps)
                        maps[res.x][res.y] = res.color
                        this.maps = maps
                    }


                })

            },
            async getMap(callback) {
                if (!window.mapContract)
                    await this.initContracts()
                // let f = await mapContract.methods.paintMap(1).call({from: account[0]})
                // console.log(f)
                let maps = []
                console.log(new Date())
                let count = 0
                for (let i = 0; i < NUM; i++) {
                    // maps[i] = await window.mapContract.getPaintMapRow.call(i)
                    window.mapContract.getPaintMapRow.call(i, (e, res) => {
                        maps[i] = res
                        count += 1
                        if (count === NUM) {
                            console.log(new Date())
                            console.log(maps)
                            callback(maps)
                        }
                    })
                }
            },
            takeOut() {
                window.buyContract.withdrawPayments
                    .sendTransaction({
                        from: window.account,
                        gas: 80000
                    }, (e, ok) => {
                        if (!e) {
                            this.$Notice.success({
                                title: 'Take out success!',
                                desc: ""
                            })
                        }
                        else {
                            let matchMsg = e.message.match(/} (Error:.*)\n/)
                            if (matchMsg[1]) matchMsg = matchMsg[1]
                            else {
                                matchMsg = e.message
                            }
                            this.$Notice.error({
                                title: "Take out failed!",
                                desc: matchMsg
                            })
                        }
                    })
            },
            onRefresh() {
                this.loadMaps()
                this.$refs.paintBoard.refresh()
            },
            reloadPage() {
                location.reload()
            },
            installMetaMask() {
                window.open('https://chrome.google.com/webstore/detail/nkbihfbeogaeaoehlefnkodbefgpgknn')
            }

        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .panel-box {
        display: flex;
        justify-content: space-between;
    }

    .account-box {
        width: 200px;
        vertical-align: middle;
        display: inline-block;
        padding-left: 10px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap
    }
</style>
