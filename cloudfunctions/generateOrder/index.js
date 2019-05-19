// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async(event, context) => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database()

  const res = await db.collection('orders').where({
    boxid: event.boxid,
    openid: event.openid,
    chargerid: event.chargerid
  }).get()

  if (res.data.length > 0) {
    return {
      _id: res.data[0]._id,
      errMsg: "collection.add:exist:boxid",
      boxid: res.data[0].boxid,
      isreturned: res.data[0].isreturned
    }
  }


  return db.collection('orders').add({
    // data 字段表示需新增的 JSON 数据
    data: {
      boxid: event.boxid,
      time: {
        borrowTime: event.borrowTime,
        returnTime: '',
        usingTime: ''
      },
      openid: event.openid,
      isreturned: false,
      chargerid: event.chargerid,
      actoken: event.actoken,
      formid: event.formid,
      address: event.address
    }
  })
}