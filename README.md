# 故事
炒币快半年了，也学习了区块链的相关知识，想更深入一点地了解这个行业。于是从几周前萌生了学习以太坊 Dapp 开发的想法。由于工作繁忙，学习进度非常慢，于是请了三天年假拼了个小长假，花了6天时间从入门合约开发到做出这个小Dapp。

受[reddit论坛17年愚人节的一个活动](https://www.zhihu.com/question/57966233)的启发，想做一个人人都能在画布上画像素点的应用。基于以太坊实现有着不可或缺的优势：天然的账户系统、支付系统，**你画过的每一个像素都公开可见，永久存储在链上，无法篡改。**



# 少啰嗦，先看东西
链接：[http://dapp.zhusun.in](http://dapp.zhusun.in)

截图：

![](http://static.zhusun.in/2018-05-05-15254972048979.jpg)

**目前只上线了以太坊 Rinkeby 测试网络，测试网络的以太币都是免费的，所以你可以免费玩这个游戏~**

# 游戏规则
这里有个 `50*50` 像素的画布，每个人都可以给任意像素点填颜色。

1. 每画一个点，需要支付 0.002 个以太坊给平台。
2. 你可以覆盖别人画过的像素点。
3. 覆盖上一个人的像素点，需要额外支付给他一些费用。
4. `支付给上一个人的费用 = n*2*0.002` (其中 `n` 表示这个点被覆盖过的次数)
5. 如果你的点被别人覆盖了，你得到的收入会记在右上角的『My Income』中，你可以随时点击『take out』来提现到自己的账户中。

# 如何玩
## 准备工作
1. 使用 Chrome 浏览器或360浏览器
2. 安装 MetaMask 插件，[戳这里](https://chrome.google.com/webstore/detail/nkbihfbeogaeaoehlefnkodbefgpgknn) (google 应用商店，需科学上网)
3. 安装完成后，设置密码，创建账户。[更详细的教程参考这里](https://zhuanlan.zhihu.com/p/31720278)
4. 选择 Rinkeby 网络
    ![](http://static.zhusun.in/2018-05-05-15255049414657.jpg)

5. 如果账户没有余额的话，访问 [https://faucet.rinkeby.io](https://faucet.rinkeby.io/) 按照提示说明给自己的账户转几个以太坊。（实在不会操作的可以留下地址给你转几个）

## 开始玩
1. 访问 http://dapp.zhusun.in
2. 首次加载可能十几秒，请耐心等待
3. 直接点击画布上的像素点，选颜色，然后点击『buy』，弹出确认框点击『submit』即可。
4. 画布可缩放、拖拽
5. 右上角的『take out』可以把收益提到账户中

# 后续

在开发过程中遇到了一些技术问题，导致原计划做一个`1000*1000`的像素的画布，缩水成现在的`50*50`。另外合约设计的可能不够优秀，消耗的gas手续费比较高。算了一下如果要上线以太坊主网络，需要花人民币1500左右，因此近期不打算上线主网了，但会持续改进。

如果你对这个项目感兴趣，希望它能上线主网，也欢迎联系我。最好能有钱的出钱，有技术的出技术啦，宣传到位的话还能赚上几个以太坊~

# 项目已开源
项目源代码：https://github.com/cyhhao/eth-canvas

合约ABI接口&地址：http://dapp.zhusun.in/static/contracts_config.json

暂时没有在 rinkeby 网络以太坊浏览器验证代码。

下面是我的知识星球，欢迎加入：
![](http://static.zhusun.in/2018-05-05-15255062118138.jpg)

知乎：[https://www.zhihu.com/people/cyhhao](https://www.zhihu.com/people/cyhhao)

微博：[\__Pyth0n__](https://weibo.com/u/1587579460)

原文地址：http://cyhhao.zhusun.in/article/%E4%B8%93%E9%A2%98/blockchain/dapp/