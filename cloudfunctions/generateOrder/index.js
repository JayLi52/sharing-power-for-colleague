// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const db = cloud.database()

  return db.collection('records').add({
    // data 字段表示需新增的 JSON 数据
    data: {
      boxid: event.boxid,
      time: {
        borrowTime: event.borrowTime,
        returnTime: '',
        usingTime: ''
      },
      userToken: event.token
    }
  })
}