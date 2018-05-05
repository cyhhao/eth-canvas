<template>
    <div class="panel-box">
        <div style="margin:10px">
            <ButtonGroup>
                <Button type="ghost" shape="circle" icon="help-circled" @click="showDoc">Help</Button>
                <Button type="ghost" shape="circle" icon="refresh" @click="onRefresh">Refresh</Button>
                <Button type="ghost" shape="circle" icon="arrow-shrink" @click="onReset">Reset</Button>
                <!--<Button type="primary" shape="circle" icon="ios-search">Search</Button>-->
            </ButtonGroup>
            <transition name="slide-fade">
                <Alert style="margin-top: 10px" v-if="showDocs">
                    <h2 style="text-align: center">Game Rules</h2>
                    <br/>
                    <p>
                        There is a 50*50 pixel canvas where everyone can fill a pixel with color.
                        <br/><br/>
                        1. For each point drawn, you need to pay 0.002 Ethereum to the platform.
                        <br/><br/>
                        2. You can cover pixels that have been drawn by others.
                        <br/><br/>
                        3. To cover the pixels of a person, you need to pay him an extra fee.
                        <br/><br/>
                        4. The fee paid to the previous person = n*2*0.002 (where n is the number of times this point
                        was
                        covered)
                        <br/><br/>
                        5. If your point is covered by others, your income will be recorded in the "My Income" in the
                        upper
                        right corner. You can click "take out" to withdraw it to your account at any time.
                    </p>
                </Alert>
            </transition>
        </div>
        <div style="margin:10px">
            <PaintBoard ref="paintBoard" :mapsIn="maps"/>

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
                <h3>My Balance:</h3>
                <Tag type="dot" color="blue">{{banlance}} Ether</Tag>

                <h3>My Income:</h3>
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
            :title="notUnlock?'Install MetaMask first':'Unlock MetaMask first'"
            v-model="noMask"
            :closable="false"
            :mask-closable="false">

            <Alert type="warning" show-icon v-if="notUnlock">
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

            <Alert type="warning" show-icon v-else>
                Please unlock metamask first
                <template slot="desc">
                    Your account is locked. Please unlock on MetaMask and reload the page.
                    <br/>
                    <img src="/static/metamask.png" style="width:50%"/>
                </template>
            </Alert>

            <div slot="footer">
                <ButtonGroup shape="circle">

                    <Button type="primary" icon="refresh" @click="reloadPage">Reload Page</Button>
                    <Button v-if="notUnlock" type="primary" icon="android-download" @click="installMetaMask">Install
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

    export default {
        name: 'HelloWorld',
        components: {PaintBoard},
        data() {
            return {
                maps: [],
                spinShow: true,
                account: null,
                banlance: 0,
                income: 0,
                noMask: false,
                notUnlock: false,
                showDocs: false
            }
        },
        beforeMount() {
            window.NUM = 50.0
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
                    this.spinShow = false
                    this.loadMaps()
                }).catch((e) => {
                    if (!window.web3) this.notUnlock = true
                    this.spinShow = false
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
            onReset() {
                this.$refs.paintBoard.refresh()

            },
            reloadPage() {
                location.reload()
            },
            installMetaMask() {
                window.open('https://chrome.google.com/webstore/detail/nkbihfbeogaeaoehlefnkodbefgpgknn')
            },
            showDoc() {
                this.showDocs = !this.showDocs
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

    .slide-fade-enter-active {
        transition: all .3s ease;
    }

    .slide-fade-leave-active {
        transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }

    .slide-fade-enter, .slide-fade-leave-to
        /* .slide-fade-leave-active for below version 2.1.8 */
    {
        transform: translateY(-20px);
        opacity: 0;
    }
</style>
