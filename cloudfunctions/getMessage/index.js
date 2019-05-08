// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const db = cloud.database()
  const wxContext = cloud.getWXContext()
  const boxid = event.boxid;

  return db.collection('boxes').where({
    id: boxid
  }).get()
}