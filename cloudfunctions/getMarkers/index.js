// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {

  const { location } = event
  const longtitude = parseFloat(location.longtitude)
  const latitude = parseFloat(location.latitude)
  console.log(longtitude, latitude)
  const db = cloud.database()
  // const {command: _} = db
  // const res = await db.collection('boxes').where({
  //     'location.longtitude': _.gt(longtitude - 0.3).and(_.lt(longtitude + 0.3)),
  //     'location.latitude': _.gt(latitude - 0.3).and(_.lt(latitude + 0.3))
  // }).get()

  const res = await db.collection('boxes').where().get()

  return res
}