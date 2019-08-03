Page({
    data: {
        lists: [{
            title: '如何计费？',
            content: '采用分时计费，从借出充电宝后计时，10分钟内免费，超出免费时长按小时计费。',
            show: false,
            imgUrl: "../../img/up.png",

        }, {
            title: '押金规则？',
            content: '押金充值\n需要缴纳押金88元，账户充值不低于88元。\n押金返还\n有未归还的充电宝时，不能进行余额退还；归还充电宝完成后，余额可自动退还，无需手动提现。约0-3个工作日退还到充值账户。',
            show: false,
            imgUrl: "../../img/up.png",

        }, {
            title: '付款后充电宝没有弹出怎么办？',
            content: '请先检查是否有指示灯闪烁的弹出充电宝。如果未弹出可能是由于网络原因造成的，会在5分钟内自动发起押金退款，如果没有及时解决您的问题，请拨打客服电话: xxx-xxxx。',
            show: false,
            imgUrl: "../../img/up.png",

        }, {
            title: '充电宝取出后无法充电怎么办？',
            content: '首先按下充电宝的按键确认充电是否正常。如果您借出的充电宝仍无法充电或者出现充电线损坏的情况，请将充电宝重新插入到充电宝底座。拨打我们的客服电话: xxxxx-xxxx。',
            show: false,
            imgUrl: "../../img/up.png",
        }, {
            title: '充电宝归还后为什么显示归还失败？',
            content: '先确认充电宝是否按正确的方向插入。再确认充电宝是否成功插入底座，凹槽灯光是否正常亮起。',
            show: false,
            imgUrl: "../../img/up.png",
        }, {
            title: '充电宝归还后余额如何退还？',
            content: '充电宝归还后，余额会自动退还给您。约0-3个工作日退还到原支付账户中，如仍未到账可咨询在线客服，直接拨打我们的客服电话：xxx-xxx-xxx。',
            show: false,
            imgUrl: "../../img/up.png",
        }, {
            title: '能否一个人借多个充电宝？',
            content: '咱不支持一个人借多个充电宝。',
            show: false,
            imgUrl: "../../img/up.png",
        }, {
            title: '能否异地归还充电宝？',
            content: '支持异地归还，您可以打开美团充电小程序，在地图页查看附件网点，或使用小程序搜索功能查看您想去的地标。',
            show: false,
            imgUrl: "../../img/up.png",
        }],
    },
    onLoad: function () {

    },
    tapLists: function (e) {
        const {
            index
        } = e.target.dataset
        let {
            lists
        } = this.data

        if (lists[index].show) {
            lists[index].show = !lists[index].show
        } else {
            lists = lists.map(item => ({
                title: item.title,
                content: item.content,
                show: false,
                imgUrl: "../../img/up.png",
            }))
            lists[index].show = !lists[index].show
        }
        lists[index].show ? lists[index].imgUrl = '../../img/down.png' : lists[index].imgUrl = '../../img/up.png'
        this.setData({
            lists
        })
    }
})