// 云函数入口文件
const cloud = require('wx-server-sdk')
const request = require('axios')

cloud.init()

// 云函数入口函数
exports.main = async(event, context) => {
  // 发送模板消息
  const actoken = event.actoken
  const postData = {
    "touser": event.openid,
    "weapp_template_msg": {
      "template_id": "4KKjb-m4hCXTGVQGQJkkEfA-ZkgDLIyOIAVcsBkQs3w",
      "page": "pages/order/order-forth",
      "form_id": event.formid,
      "data": {
        "keyword1": {
          "value": event._id
        },
        "keyword2": {
          "value": "免押金"
        },
        "keyword3": {
          "value": event.date
        },
        "keyword4": {
          "value": "校园充电服务"
        }
      },
      "emphasis_keyword": "keyword1.DATA"
    },
    "mp_template_msg": {
      "appid": "APPID ",
      "template_id": "TEMPLATE_ID",
      "url": "http://weixin.qq.com/download",
      "miniprogram": {
        "appid": "xiaochengxuappid12345",
        "pagepath": "index?foo=bar"
      },
      "data": {
        "first": {
          "value": "恭喜你购买成功！",
          "color": "#173177"
        },
        "keyword1": {
          "value": "巧克力",
          "color": "#173177"
        },
        "keyword2": {
          "value": "39.8元",
          "color": "#173177"
        },
        "keyword3": {
          "value": "2014年9月22日",
          "color": "#173177"
        },
        "remark": {
          "value": "欢迎再次购买！",
          "color": "#173177"
        }
      }
    }
  }
  const res = await request.post(`https://api.weixin.qq.com/cgi-bin/message/wxopen/template/uniform_send?access_token=${actoken}`,{
    ...postData
  })
  return res
}