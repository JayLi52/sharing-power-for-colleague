//app.js
App({
  onLaunch() {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
    // 小程序云端能力初始化
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
      })
    }

    wx.cloud.callFunction({
      name: 'getOpenId',
      complete: res => {
        console.log('云函数获取到的openid: ', res.result.openId)
        var openid = res.result.openId;
        this.globalData.openid = openid
        // 查询是否有未完成订单
        wx.request({
          url: 'http://localhost:3100/v1/order',
          data: {
            openid: this.globalData.openid
          },
          success: res => {
            const result = res.data
            if (result.length > 0 && !result[0].isReturned) {
              setTimeout(() => {
                wx.navigateTo({
                  url: `../order/order-third?boxid=${result[0].boxid}&address=${result[0].address}&borrowTime=${result[0].borrowTime}`,
                })
              }, 1000)

            }
          }
        })
      }
    })
    // 获取 access_token 若过期 再重新获取
    const actoke = wx.getStorageSync('actoken')
    if (actoke && Date.now() < actoke.expireTimes) {
      console.log('actoken 未过期')
    } else {
      wx.cloud.callFunction({
        name: 'getAccessToken',
        complete: res => {
          wx.setStorageSync('actoken', Object.assign({}, JSON.parse(res.result.body), {
            expireTimes: Date.now() + JSON.parse(res.result.body)['expires_in'] * 1000
          }))
        }
      })
    }
    // 请求地理位置
    wx.getLocation({
      type: 'gcj02',
      success: res => {
        this.globalData.location = {
          latitude: res.latitude,
          longitude: res.longitude
        }
      },
    })
  },
  onShow() {
    // 场景处理
    // const res = wx.getLaunchOptionsSync()
    // if (res.scene === 1011) {
    //   setTimeout(() => {
    //     wx.navigateTo({
    //       url: 'pages/search/search',
    //     })
    //   }, 1000)
    // }
  },
  globalData: {
    userInfo: null
  }
})