<template>
    <div>
        <PaintBoard :maps="maps"/>
        <Spin size="large" fix v-if="spinShow"></Spin>
        <!--<button @click="clickme">click</button>-->
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
                spinShow: false
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
                    this.clickme()
                }).catch((e) => {
                    console.log(e)
                })


            },
            async clickme() {
                // let web3 = window.myWeb3.web3()
                // let account = await web3.eth.getAccounts()
                // console.log(account)


                // let npContract = new web3.eth.Contract(abi, '0x727789280ed612e31ce0b7ab26b85972c7bb3d0a', {
                //     from: account[0], // default from address
                //     gasPrice: '20000000000' // default gas price in wei, 20 gwei in this case
                //     , gas: 1000000
                // })
                //
                // console.log(npContract)
                //
                // let map = await npContract.methods
                //     .getContract("Map")
                //     .call()
                // console.log(map)
                this.spinShow = true
                this.maps = await this.getMap()
                this.spinShow = false
            },
            async getMap() {

                let web3 = window.myWeb3.web3()
                let account = await web3.eth.getAccounts()
                window.account = account[0]
                console.log(account)
                let res = await axios.get('/static/contracts_config.json', {params: {v: Math.random()}})
                let map = res.data.Map
                let buy = res.data.BuyControler
                // console.log(map)
                window.mapContract = new web3.eth.Contract(map.abi, map.address)
                window.buyContract = new web3.eth.Contract(buy.abi, buy.address)

                // let f = await mapContract.methods.paintMap(1).call({from: account[0]})
                // console.log(f)
                let maps = []
                console.log(new Date())
                for (let i = 0; i < NUM; i++) {
                    maps[i] = await window.mapContract.methods.getPaintMapRow(i).call()
                }
                console.log(maps)
                // maps = await mapContract.methods.getPaintMap().call()

                // for (let i = 0; i < 1000; i++) {
                //     maps[i] = []
                //     for (let j = 0; j < 1000; j++) {
                //         maps[i][j]= await mapContract.methods.paintMap(i, j).call()
                //
                //     }
                //     // console.log(maps[i][0])
                // }
                console.log(new Date())
                // console.log(JSON.stringify(maps))
                return maps
            },

        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
