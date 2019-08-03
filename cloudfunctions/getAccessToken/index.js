// 云函数入口文件
const cloud = require('wx-server-sdk')
const request = require('request')

cloud.init()
const APPID = 'wxb06b5e4b0d872672',
  SECRET = '85045231028364703317cbf3b1f47a0d'

// 云函数入口函数
exports.main = async(event, context) => {
  // 获取accessToken
  return new Promise((reslove, reject) => {
    request(`https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${APPID}&secret=${SECRET}`, function(err, res, body) {
      console.log(err, res, body)
      if (err) {
        reject(err)
      }
      reslove(res)
    })
  })
}