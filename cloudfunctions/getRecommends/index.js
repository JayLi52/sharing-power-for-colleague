// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {

  const { location } = event
  const longitude = parseFloat(location.longitude)
  const latitude = parseFloat(location.latitude)
  console.log(longitude, latitude)
  const db = cloud.database()

  const res = await db.collection('boxes').where().get()
  console.log(res)
  const result = res.data.map(item => ({
    latitude: item.location.latitude,
    longitude: item.location.longitude
  }))

  return result
}