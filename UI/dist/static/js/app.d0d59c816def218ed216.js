webpackJsonp([1],{"+skl":function(t,e){},EEbw:function(t,e){t.exports={version:"0.20.6"}},EJkY:function(t,e){},NHnr:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=n("7+uW"),o={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{attrs:{id:"app"}},[e("router-view")],1)},staticRenderFns:[]};var s=n("VU/8")({name:"App"},o,!1,function(t){n("lDRL")},null,null).exports,i=n("/ocq"),r=n("woOf"),c=n.n(r),p=n("Xxa5"),l=n.n(p),u=n("exGp"),d=n.n(u),m=n("//Fk"),f=n.n(m),v=n("8k0n"),h=n.n(v),y=new f.a(function(t,e){var n=window.web3;if(void 0!==n){var a=new h.a(n.currentProvider);t({web3:function(){return a}})}else e(new Error("Unable to connect to Metamask"))}).then(function(t){return new f.a(function(e,n){t.web3().version.getNetwork(function(a,o){a?n(new Error("Unable to retrieve network ID")):(t=c()({},t,{networkId:o}),e(t))})})}).then(function(t){return new f.a(function(e,n){t.web3().eth.getCoinbase(function(a,o){a?n(new Error("Unable to retrieve coinbase")):(t=c()({},t,{coinbase:o}),e(t))})})}).then(function(t){return new f.a(function(e,n){t.web3().eth.getBalance(t.coinbase,function(a,o){a?n(new Error("Unable to retrieve balance for address: "+t.coinbase)):(t=c()({},t,{balance:o}),e(t))})})}),w=n("mtWM"),g=n.n(w),b={name:"Popper",props:["x","y","show","data","colorMapping"],data:function(){return{width:400,fee:2e-4,selectedColor:0}},methods:{selectColor:function(t){if(console.log(t),0!==t){var e=this.data.per,n=colorMapping[t];this.data.shape.graphics.beginFill(n).drawRect(this.data.x*e,this.data.y*e,e,e),this.data.stage.update(),this.selectedColor=t}},close:function(){this.data.stage.removeChild(this.data.shape),this.data.stage.update(),this.$emit("update:show",!1)},buy:function(){var t=this;return d()(l.a.mark(function e(){return l.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:console.log(t.data.x,t.data.y,t.selectedColor),console.log({from:window.account,value:t.data.buyPrice[0],gas:2e5}),window.buyContract.buyPoint.sendTransaction(t.data.x,t.data.y,t.selectedColor,{from:window.account,value:t.data.buyPrice[0],gas:2e5},function(e,n){if(console.log(e),e){var a=e.message.match(/} (Error:.*)\n/);a=a[1]?a[1]:e.message,t.$Notice.error({title:"Payment failed!",desc:a})}else t.$Notice.success({title:"Payment success!",desc:"Wait for a while to take effect..."}),t.close()});case 3:case"end":return e.stop()}},e,t)}))()}}},_={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return t.show?n("div",{staticClass:"ivu-poptip-popper popper",style:{top:t.x+5+"px",left:t.y-t.width/2+"px",width:t.width+"px"},attrs:{"x-placement":"bottom"}},[n("div",{staticClass:"mask",on:{click:t.close}}),t._v(" "),n("div",{staticClass:"ivu-poptip-content"},[n("div",{staticClass:"ivu-poptip-arrow"}),t._v(" "),n("div",{staticClass:"ivu-poptip-inner"},[n("div",{staticClass:"ivu-poptip-body",staticStyle:{"min-height":"300px","font-size":"1rem","padding-top":"30px",padding:"20px","white-space":"normal"}},[0!==t.data.item?n("Avatar",{staticStyle:{"background-color":"#87d068"},attrs:{icon:"person"}}):n("Avatar",{attrs:{icon:"person"}}),t._v(" "),0!==t.data.item?n("span",{staticClass:"addr-span"},[n("span",{staticStyle:{"font-size":".7rem"}},[t._v(t._s(t.data.lastPerson))]),t._v(" "),n("br"),t._v("\n                    has painted this point, you can buy for cover it.\n                ")]):n("span",{staticClass:"addr-span"},[t._v("No one has painted at this point.")]),t._v(" "),t.data.buyPrice?n("Alert",{staticStyle:{"white-space":"initial","margin-top":"5px"},attrs:{"show-icon":""}},[t._v("\n                    It takes "),n("span",{staticStyle:{color:"#ec6d3e"}},[t._v(t._s(t.data.buyPrice[0]/1e18)+" ETH")]),t._v(" to buy\n                    this point.\n                    "),n("template",{slot:"desc"},[n("br"),t._v("\n                        Charge details are as follows:\n                        "),n("Tooltip",{attrs:{placement:"top"}},[n("Icon",{attrs:{type:"help-circled",color:"#5cadff"}}),t._v(" "),n("div",{staticStyle:{"white-space":"normal"},attrs:{slot:"content"},slot:"content"},[n("p",[n("b",[t._v("total_price = pay_for_last + fee")])]),t._v(" "),n("br"),t._v(" "),n("p",[n("b",[t._v("pay_for_last")]),t._v(" is pay for last person who bought the point.")]),t._v(" "),n("p",[n("b",[t._v("fee")]),t._v(" is pay for platform as a fee.")]),t._v(" "),n("br"),t._v(" "),n("p",[n("b",[t._v("pay_for_last")]),t._v(" = (this_point_bought_times * 2 * basic_price)")]),t._v(" "),n("p",[n("b",[t._v("fee")]),t._v(" = basic_price = "+t._s(t.fee))]),t._v(" "),n("br")])],1),t._v(" "),n("br"),t._v(" "),n("p",[t._v("\n                            basic_price: "),n("b",[t._v(t._s(t.fee)+" ETH")]),t._v(" "),n("br"),t._v("\n                            this_point_bought_times: "),n("b",[t._v(t._s(t.data.buyCnt))]),t._v(" "),n("br"),t._v("\n                            price = ("+t._s(t.data.buyCnt)+" * 2 * "+t._s(t.fee)+") + "+t._s(t.fee)+" = "),n("span",{staticStyle:{color:"#ec6d3e"}},[t._v(t._s(t.data.buyPrice[0]/1e18)+" ETH")])])],1)],2):t._e(),t._v(" "),n("div",{staticStyle:{overflow:"scroll"}},[t._l(t.colorMapping,function(e,a){return[0!==a?n("div",{key:a,staticClass:"color-tag",style:{"background-color":e},on:{click:function(e){t.selectColor(a)}}}):t._e()]})],2),t._v(" "),n("div",{staticClass:"footer-box"},[0!==t.selectedColor?n("div",{staticClass:"inline"},[t._v("\n                        Selected Color :\n                        "),n("div",{staticClass:"color-tag",style:{"background-color":t.colorMapping[t.selectedColor]}})]):n("div",{staticClass:"inline"},[t._v("Please select color first")]),t._v(" "),n("Button",{staticStyle:{float:"right"},attrs:{type:"success",disabled:0===t.selectedColor,shape:"circle"},on:{click:t.buy}},[t._v("Buy\n                    ")])],1)],1)])])]):t._e()},staticRenderFns:[]};var k=n("VU/8")(b,_,!1,function(t){n("EJkY")},"data-v-e12bd44e",null).exports;window.colorMapping=["#FFFFFF","#0014a5","#0074D9","#849aff","#60aeff","#7FDBFF","#39CCCC","#00fff9","#00fff9","#3D9970","#2ECC40","#01FF70","#cdff35","#FFDC00","#fff000","#FF851B","#FF4136","#ff3877","#F012BE","#B10DC9","#85144B","#ff8a99","#ffbcd6","#FFFFFF","#AAAAAA","#DDDDDD","#111111"];var x={name:"PaintBoard",components:{Popper:k},props:["maps"],data:function(){return{canHeight:window.innerHeight-20,board:[],canvas:null,clickpX:0,clickpY:0,showMenu:!1,selectData:{},colorMapping:window.colorMapping,tmpShape:null,per:(window.innerHeight-20)/NUM,move_up:!1}},mounted:function(){var t=this;return d()(l.a.mark(function e(){var n;return l.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:console.log(t.$refs),t.canvas=t.$refs.myCanvas,(n=new createjs.Stage(t.canvas)).scale=1,t.stage=n,createjs.Touch.enable(t.stage),t.stage.enableMouseOver(),t.bindEvent();case 8:case"end":return e.stop()}},e,t)}))()},watch:{maps:function(t){console.log("change"),this.drawMap()}},methods:{refresh:function(){this.stage.scale=1,this.stage.regX=this.stage.regY=0,this.stage.update()},drawMap:function(){var t=this;this.stage.removeAllChildren();var e=this.per;console.log(e);for(var n=function(n){for(var a=function(a){var o=new createjs.Shape,s=t.maps[n][a]-0,i=colorMapping[s];o.graphics.beginFill(i).drawRect(n*e,a*e,e,e),o.on("mouseover",function(){o.graphics.setStrokeStyle(1).beginStroke("#000").drawRect(n*e,a*e,e,e),t.stage.update()}),o.on("mouseout",function(){o.graphics.clear(),o.graphics.beginFill(i).drawRect(n*e,a*e,e,e),t.stage.update()}),o.on("click",function(e){console.log("bbbb",t.move_up),t.move_up||(console.log(e.nativeEvent.pageX),t.clickpX=e.nativeEvent.clientY,t.clickpY=e.nativeEvent.clientX,t.showMenu=!0,t.clickPoint(n,a,s))}),t.stage.addChild(o)},o=0;o<NUM;o++)a(o)},a=0;a<NUM;a++)n(a);var o=new createjs.Shape;o.graphics.setStrokeStyle(.5,"round").setStrokeDash([10,10],0).beginStroke("#000").drawRect(0,0,this.canHeight,this.canHeight),this.stage.addChild(o),this.stage.update()},bindEvent:function(){var t=this,e=this,n=!1,a=void 0,o=void 0;this.stage.on("stagemousedown",function(t){a=t.stageX,o=t.stageY,0===t.nativeEvent.button&&(n=!0,e.move_up=!1)}),this.stage.on("stagemousemove",function(t){if(n){var s=e.stage.regX+1/e.stage.scaleX*(a-t.stageX),i=e.stage.regY+1/e.stage.scaleY*(o-t.stageY);e.stage.regX=s,a=t.stageX,e.stage.regY=i,o=t.stageY,e.stage.update(),e.move_up=!0}}),this.stage.on("stagemouseup",function(t){n&&console.log("aaaa"),n=!1}),this.canvas.addEventListener("mousewheel",function(e){e.preventDefault(),e.returnValue=!1,t.resize(e)})},resize:function(t){var e=t,n=e.wheelDelta?e.wheelDelta/120:-e.detail/3,a=void 0;(a=(n/=100)>0?this.stage.scaleY*(1+n):this.stage.scaleY*(1/(1-n)))>=1&&(this.stage.scaleX=this.stage.scaleY=a),this.stage.update()},clickPoint:function(t,e,n){var a=this;return d()(l.a.mark(function o(){var s;return l.a.wrap(function(o){for(;;)switch(o.prev=o.next){case 0:console.log(t,e,n),s=a.per,a.tmpShape=new createjs.Shape,a.tmpShape.graphics.setStrokeStyle(1).beginStroke("#000").drawRect(t*s,e*s,s,s),a.stage.addChild(a.tmpShape),a.stage.update(),a.selectData={buyCnt:0,lastPerson:"",item:n,buyPrice:0,x:t,y:e,per:s,shape:a.tmpShape,stage:a.stage},window.buyContract.getPointPrice.call(t,e,function(t,e){a.selectData.buyPrice=e,console.log("buyPrice",e)}),0!==n&&(window.mapContract.ownerMap.call(t,e,function(t,e){a.selectData.lastPerson=e}),window.mapContract.cntMap.call(t,e,function(t,e){a.selectData.buyCnt=parseInt(e)}));case 9:case"end":return o.stop()}},o,a)}))()}}},M={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("Popper",{attrs:{x:t.clickpX,y:t.clickpY,show:t.showMenu,data:t.selectData,colorMapping:t.colorMapping},on:{"update:show":function(e){t.showMenu=e}}}),t._v(" "),n("div",{staticStyle:{cursor:"pointer"}},[n("canvas",{ref:"myCanvas",staticStyle:{border:"1px solid black",display:"block",margin:"auto"},attrs:{width:t.canHeight,height:t.canHeight}})])],1)},staticRenderFns:[]};var C=n("VU/8")(x,M,!1,function(t){n("YbtM")},"data-v-4c4eb0f7",null).exports;window.NUM=50;var S={name:"HelloWorld",components:{PaintBoard:C},data:function(){return{maps:[],spinShow:!1,account:null,banlance:0,income:0,noMask:!1}},mounted:function(){this.init()},methods:{init:function(){var t=this;y.then(function(e){console.log(e),window.myWeb3=e,t.noMask=!1,t.loadMaps()}).catch(function(e){t.noMask=!0,console.log(e)})},loadMaps:function(){var t=this;return d()(l.a.mark(function e(){return l.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:t.spinShow=!0,t.getMap(function(e){t.maps=e,t.spinShow=!1,setInterval(function(){t.pullAccountInfos()},1e3)});case 2:case"end":return e.stop()}},e,t)}))()},pullAccountInfos:function(){var t=this,e=window.myWeb3.web3(),n=e.eth.accounts;this.account=window.account=n[0],e.eth.getBalance(this.account,function(e,n){t.banlance=n.div(Math.pow(10,18)).toFixed(5)}),window.buyContract&&this.account&&window.buyContract.payments.call(this.account,function(e,n){t.income=n.div(Math.pow(10,18)).toFixed(6)})},initContracts:function(){var t=this;return d()(l.a.mark(function e(){var n,a,o,s;return l.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return n=window.myWeb3.web3(),t.pullAccountInfos(),e.next=4,g.a.get("/static/contracts_config.json",{params:{v:Math.random()}});case 4:a=e.sent,o=a.data.Map,s=a.data.BuyControler,window.mapContract=n.eth.contract(o.abi).at(o.address),window.buyContract=n.eth.contract(s.abi).at(s.address),window.buyContract.BuyPointSucceed(function(e,n){var a=n.args;if(console.log("event:",a),t.maps[a.x]){var o=c()([],t.maps);o[a.x][a.y]=a.color,t.maps=o}});case 10:case"end":return e.stop()}},e,t)}))()},getMap:function(t){var e=this;return d()(l.a.mark(function n(){var a,o,s,i;return l.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:if(window.mapContract){n.next=3;break}return n.next=3,e.initContracts();case 3:for(a=[],console.log(new Date),o=0,s=function(e){window.mapContract.getPaintMapRow.call(e,function(n,s){a[e]=s,(o+=1)===NUM&&(console.log(new Date),console.log(a),t(a))})},i=0;i<NUM;i++)s(i);case 8:case"end":return n.stop()}},n,e)}))()},takeOut:function(){var t=this;window.buyContract.withdrawPayments.sendTransaction({from:window.account,gas:8e4},function(e,n){if(e){var a=e.message.match(/} (Error:.*)\n/);a=a[1]?a[1]:e.message,t.$Notice.error({title:"Take out failed!",desc:a})}else t.$Notice.success({title:"Take out success!",desc:""})})},onRefresh:function(){this.loadMaps(),this.$refs.paintBoard.refresh()},reloadPage:function(){location.reload()},installMetaMask:function(){window.open("https://chrome.google.com/webstore/detail/nkbihfbeogaeaoehlefnkodbefgpgknn")}}},P={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"panel-box"},[n("div",{staticStyle:{margin:"10px"}},[n("ButtonGroup",[n("Button",{attrs:{type:"primary",shape:"circle",icon:"refresh"},on:{click:t.onRefresh}},[t._v("Refresh")])],1)],1),t._v(" "),n("div",{staticStyle:{margin:"10px"}},[n("PaintBoard",{ref:"paintBoard",attrs:{maps:t.maps}})],1),t._v(" "),n("div",[n("Card",{staticStyle:{width:"350px",margin:"10px"}},[n("div",{staticStyle:{height:"35px"},attrs:{slot:"title"},slot:"title"},[n("Avatar",{staticStyle:{"background-color":"#87d068"},attrs:{icon:"person"}}),t._v(" "),n("div",{staticClass:"account-box"},[t._v(t._s(t.account))])],1),t._v(" "),n("a",{attrs:{slot:"extra",href:"#"},on:{click:function(e){return e.preventDefault(),t.pullAccountInfos(e)}},slot:"extra"},[n("Icon",{attrs:{type:"ios-loop-strong"}}),t._v("\n                Refresh\n            ")],1),t._v(" "),n("h3",[t._v("Banlance:")]),t._v(" "),n("Tag",{attrs:{type:"dot",color:"blue"}},[t._v(t._s(t.banlance)+" Ether")]),t._v(" "),n("h3",[t._v("Income:")]),t._v(" "),n("Tag",{attrs:{type:"dot",color:"blue"}},[t._v(t._s(t.income)+" Ether")]),t._v(" "),t.income>0?n("Button",{attrs:{type:"success",size:"small",shape:"circle"},on:{click:t.takeOut}},[t._v("Take out")]):t._e()],1)],1),t._v(" "),t.spinShow?n("Spin",{attrs:{size:"large",fix:""}}):t._e(),t._v(" "),n("Modal",{attrs:{title:"Install MetaMask first",closable:!1,"mask-closable":!1},model:{value:t.noMask,callback:function(e){t.noMask=e},expression:"noMask"}},[n("Alert",{attrs:{type:"warning","show-icon":""}},[t._v("\n            Please install metamask first\n            "),n("template",{slot:"desc"},[t._v("\n                This application is based on Ethereum, so you need to use\n                "),n("a",{attrs:{href:"https://www.google.com/chrome/",target:"_blank"}},[t._v("chrome")]),t._v("\n                and install the\n                "),n("a",{attrs:{href:"https://chrome.google.com/webstore/detail/nkbihfbeogaeaoehlefnkodbefgpgknn",target:"_blank"}},[t._v("MetaMask plugin")]),t._v("\n                , or use the\n                "),n("a",{attrs:{href:"https://github.com/ethereum/mist/releases",target:"_blank"}},[t._v("Mist Browser")])])],2),t._v(" "),n("div",{attrs:{slot:"footer"},slot:"footer"},[n("ButtonGroup",{attrs:{shape:"circle"}},[n("Button",{attrs:{type:"primary",icon:"refresh"},on:{click:t.reloadPage}},[t._v("reload page")]),t._v(" "),n("Button",{attrs:{type:"primary",icon:"android-download"},on:{click:t.installMetaMask}},[t._v("isntall\n                    MetaMask\n                ")])],1)],1)],1)],1)},staticRenderFns:[]};var B=n("VU/8")(S,P,!1,function(t){n("ktod")},"data-v-09625dc8",null).exports;window.NUM=100;var F={name:"HelloWorld",components:{PaintBoard:C},data:function(){return{maps:[],spinShow:!1,account:null,banlance:0,income:0,noMask:!1}},mounted:function(){this.init()},methods:{init:function(){var t=this;y.then(function(e){console.log(e),window.myWeb3=e,t.noMask=!1,t.loadMaps()}).catch(function(e){t.noMask=!0,console.log(e)})},loadMaps:function(){var t=this;return d()(l.a.mark(function e(){return l.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:t.spinShow=!0,t.getMap(function(e){t.maps=e,t.spinShow=!1,setInterval(function(){t.pullAccountInfos()},1e3)});case 2:case"end":return e.stop()}},e,t)}))()},pullAccountInfos:function(){var t=this,e=window.myWeb3.web3(),n=e.eth.accounts;this.account=window.account=n[0],e.eth.getBalance(this.account,function(e,n){t.banlance=n.div(Math.pow(10,18)).toFixed(5)}),window.buyContract&&this.account&&window.buyContract.payments.call(this.account,function(e,n){t.income=n.div(Math.pow(10,18)).toFixed(6)})},initContracts:function(){var t=this;return d()(l.a.mark(function e(){var n,a,o,s;return l.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return n=window.myWeb3.web3(),t.pullAccountInfos(),e.next=4,g.a.get("/static/contracts_config.json",{params:{v:Math.random()}});case 4:a=e.sent,o=a.data.Map,s=a.data.BuyControler,window.mapContract=n.eth.contract(o.abi).at(o.address),window.buyContract=n.eth.contract(s.abi).at(s.address),window.buyContract.BuyPointSucceed(function(e,n){var a=n.args;if(console.log("event:",a),t.maps[a.x]){var o=c()([],t.maps);o[a.x][a.y]=a.color,t.maps=o}});case 10:case"end":return e.stop()}},e,t)}))()},getMap:function(t){var e=this;return d()(l.a.mark(function n(){var a,o,s,i;return l.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:if(window.mapContract){n.next=3;break}return n.next=3,e.initContracts();case 3:for(a=[],console.log(new Date),o=0,s=function(e){window.mapContract.getPaintMapRow.call(e,function(n,s){a[e]=s,(o+=1)===NUM&&(console.log(new Date),console.log(a),t(a))})},i=0;i<NUM;i++)s(i);case 8:case"end":return n.stop()}},n,e)}))()},takeOut:function(){var t=this;window.buyContract.withdrawPayments.sendTransaction({from:window.account,gas:8e4},function(e,n){if(e){var a=e.message.match(/} (Error:.*)\n/);a=a[1]?a[1]:e.message,t.$Notice.error({title:"Take out failed!",desc:a})}else t.$Notice.success({title:"Take out success!",desc:""})})},onRefresh:function(){this.loadMaps(),this.$refs.paintBoard.refresh()},reloadPage:function(){location.reload()},installMetaMask:function(){window.open("https://chrome.google.com/webstore/detail/nkbihfbeogaeaoehlefnkodbefgpgknn")}}},E={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"panel-box"},[n("div",{staticStyle:{margin:"10px"}},[n("ButtonGroup",[n("Button",{attrs:{type:"primary",shape:"circle",icon:"refresh"},on:{click:t.onRefresh}},[t._v("Refresh")])],1)],1),t._v(" "),n("div",{staticStyle:{margin:"10px"}},[n("PaintBoard",{ref:"paintBoard",attrs:{maps:t.maps}})],1),t._v(" "),n("div",[n("Card",{staticStyle:{width:"350px",margin:"10px"}},[n("div",{staticStyle:{height:"35px"},attrs:{slot:"title"},slot:"title"},[n("Avatar",{staticStyle:{"background-color":"#87d068"},attrs:{icon:"person"}}),t._v(" "),n("div",{staticClass:"account-box"},[t._v(t._s(t.account))])],1),t._v(" "),n("a",{attrs:{slot:"extra",href:"#"},on:{click:function(e){return e.preventDefault(),t.pullAccountInfos(e)}},slot:"extra"},[n("Icon",{attrs:{type:"ios-loop-strong"}}),t._v("\n                Refresh\n            ")],1),t._v(" "),n("h3",[t._v("Banlance:")]),t._v(" "),n("Tag",{attrs:{type:"dot",color:"blue"}},[t._v(t._s(t.banlance)+" Ether")]),t._v(" "),n("h3",[t._v("Income:")]),t._v(" "),n("Tag",{attrs:{type:"dot",color:"blue"}},[t._v(t._s(t.income)+" Ether")]),t._v(" "),t.income>0?n("Button",{attrs:{type:"success",size:"small",shape:"circle"},on:{click:t.takeOut}},[t._v("Take out")]):t._e()],1)],1),t._v(" "),t.spinShow?n("Spin",{attrs:{size:"large",fix:""}}):t._e(),t._v(" "),n("Modal",{attrs:{title:"Install MetaMask first",closable:!1,"mask-closable":!1},model:{value:t.noMask,callback:function(e){t.noMask=e},expression:"noMask"}},[n("Alert",{attrs:{type:"warning","show-icon":""}},[t._v("\n            Please install metamask first\n            "),n("template",{slot:"desc"},[t._v("\n                This application is based on Ethereum, so you need to use\n                "),n("a",{attrs:{href:"https://www.google.com/chrome/",target:"_blank"}},[t._v("chrome")]),t._v("\n                and install the\n                "),n("a",{attrs:{href:"https://chrome.google.com/webstore/detail/nkbihfbeogaeaoehlefnkodbefgpgknn",target:"_blank"}},[t._v("MetaMask plugin")]),t._v("\n                , or use the\n                "),n("a",{attrs:{href:"https://github.com/ethereum/mist/releases",target:"_blank"}},[t._v("Mist Browser")])])],2),t._v(" "),n("div",{attrs:{slot:"footer"},slot:"footer"},[n("ButtonGroup",{attrs:{shape:"circle"}},[n("Button",{attrs:{type:"primary",icon:"refresh"},on:{click:t.reloadPage}},[t._v("reload page")]),t._v(" "),n("Button",{attrs:{type:"primary",icon:"android-download"},on:{click:t.installMetaMask}},[t._v("isntall\n                    MetaMask\n                ")])],1)],1)],1)],1)},staticRenderFns:[]};var D=n("VU/8")(F,E,!1,function(t){n("n9vV")},"data-v-617f18d2",null).exports;a.default.use(i.a);var A=new i.a({routes:[{path:"/",name:"HelloWorld",component:B},{path:"/100",name:"Home100",component:D}]}),R=(n("+skl"),n("BTaQ")),I=n.n(R);a.default.use(I.a),a.default.config.productionTip=!1,new a.default({el:"#app",router:A,components:{App:s},template:"<App/>"})},"R/pS":function(t,e){t.exports=[{constant:!0,inputs:[{name:"_owner",type:"address"}],name:"name",outputs:[{name:"o_name",type:"bytes32"}],type:"function"},{constant:!0,inputs:[{name:"_name",type:"bytes32"}],name:"owner",outputs:[{name:"",type:"address"}],type:"function"},{constant:!0,inputs:[{name:"_name",type:"bytes32"}],name:"content",outputs:[{name:"",type:"bytes32"}],type:"function"},{constant:!0,inputs:[{name:"_name",type:"bytes32"}],name:"addr",outputs:[{name:"",type:"address"}],type:"function"},{constant:!1,inputs:[{name:"_name",type:"bytes32"}],name:"reserve",outputs:[],type:"function"},{constant:!0,inputs:[{name:"_name",type:"bytes32"}],name:"subRegistrar",outputs:[{name:"",type:"address"}],type:"function"},{constant:!1,inputs:[{name:"_name",type:"bytes32"},{name:"_newOwner",type:"address"}],name:"transfer",outputs:[],type:"function"},{constant:!1,inputs:[{name:"_name",type:"bytes32"},{name:"_registrar",type:"address"}],name:"setSubRegistrar",outputs:[],type:"function"},{constant:!1,inputs:[],name:"Registrar",outputs:[],type:"function"},{constant:!1,inputs:[{name:"_name",type:"bytes32"},{name:"_a",type:"address"},{name:"_primary",type:"bool"}],name:"setAddress",outputs:[],type:"function"},{constant:!1,inputs:[{name:"_name",type:"bytes32"},{name:"_content",type:"bytes32"}],name:"setContent",outputs:[],type:"function"},{constant:!1,inputs:[{name:"_name",type:"bytes32"}],name:"disown",outputs:[],type:"function"},{anonymous:!1,inputs:[{indexed:!0,name:"_name",type:"bytes32"},{indexed:!1,name:"_winner",type:"address"}],name:"AuctionEnded",type:"event"},{anonymous:!1,inputs:[{indexed:!0,name:"_name",type:"bytes32"},{indexed:!1,name:"_bidder",type:"address"},{indexed:!1,name:"_value",type:"uint256"}],name:"NewBid",type:"event"},{anonymous:!1,inputs:[{indexed:!0,name:"name",type:"bytes32"}],name:"Changed",type:"event"},{anonymous:!1,inputs:[{indexed:!0,name:"name",type:"bytes32"},{indexed:!0,name:"addr",type:"address"}],name:"PrimaryChanged",type:"event"}]},UIsv:function(t,e){t.exports=[{constant:!0,inputs:[{name:"_name",type:"bytes32"}],name:"owner",outputs:[{name:"",type:"address"}],type:"function"},{constant:!1,inputs:[{name:"_name",type:"bytes32"},{name:"_refund",type:"address"}],name:"disown",outputs:[],type:"function"},{constant:!0,inputs:[{name:"_name",type:"bytes32"}],name:"addr",outputs:[{name:"",type:"address"}],type:"function"},{constant:!1,inputs:[{name:"_name",type:"bytes32"}],name:"reserve",outputs:[],type:"function"},{constant:!1,inputs:[{name:"_name",type:"bytes32"},{name:"_newOwner",type:"address"}],name:"transfer",outputs:[],type:"function"},{constant:!1,inputs:[{name:"_name",type:"bytes32"},{name:"_a",type:"address"}],name:"setAddr",outputs:[],type:"function"},{anonymous:!1,inputs:[{indexed:!0,name:"name",type:"bytes32"}],name:"Changed",type:"event"}]},YbtM:function(t,e){},ktod:function(t,e){},lDRL:function(t,e){},n9vV:function(t,e){},oPsS:function(t,e){t.exports=[{constant:!1,inputs:[{name:"from",type:"bytes32"},{name:"to",type:"address"},{name:"value",type:"uint256"}],name:"transfer",outputs:[],type:"function"},{constant:!1,inputs:[{name:"from",type:"bytes32"},{name:"to",type:"address"},{name:"indirectId",type:"bytes32"},{name:"value",type:"uint256"}],name:"icapTransfer",outputs:[],type:"function"},{constant:!1,inputs:[{name:"to",type:"bytes32"}],name:"deposit",outputs:[],payable:!0,type:"function"},{anonymous:!1,inputs:[{indexed:!0,name:"from",type:"address"},{indexed:!1,name:"value",type:"uint256"}],name:"AnonymousDeposit",type:"event"},{anonymous:!1,inputs:[{indexed:!0,name:"from",type:"address"},{indexed:!0,name:"to",type:"bytes32"},{indexed:!1,name:"value",type:"uint256"}],name:"Deposit",type:"event"},{anonymous:!1,inputs:[{indexed:!0,name:"from",type:"bytes32"},{indexed:!0,name:"to",type:"address"},{indexed:!1,name:"value",type:"uint256"}],name:"Transfer",type:"event"},{anonymous:!1,inputs:[{indexed:!0,name:"from",type:"bytes32"},{indexed:!0,name:"to",type:"address"},{indexed:!1,name:"indirectId",type:"bytes32"},{indexed:!1,name:"value",type:"uint256"}],name:"IcapTransfer",type:"event"}]}},["NHnr"]);
//# sourceMappingURL=app.d0d59c816def218ed216.js.map