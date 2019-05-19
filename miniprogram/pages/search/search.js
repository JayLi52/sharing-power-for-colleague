const app = getApp()
// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    recommends: [],
    history: [],
    showCancel: false
  },
  onLoad() {
    const history = wx.getStorageSync('history')
    this.setData({
      history
    })
    this.getRecommends()

  },
  clearHistory() {
    wx.clearStorage()
    this.setData({
      history: []
    })
  },
  getRecommends() {
    this.setData({
      recommends: ['丹青楼','锦绣楼']
    })
    return
    wx.cloud.callFunction({
      name: 'getRecommends',
      data: {
        location: {
          longitude: 111,
          latitude: 23
        }
      },
    })
    .then(res =>
      res.result.map(item => wx.request({
        url: `https://apis.map.qq.com/ws/geocoder/v1/?location=${item.latitude},${item.longitude}`,
        data: {
          key: 'O67BZ-I2X3X-YTY4Z-ZJHDT-YV3XZ-C2B3Z'
        },
        success: res => {
          const result = this.data.recommends.slice()
          result.push(res.data.result.address)
          this.setData({
            recommends: result
          })
        }
      }))
    )
  },
  tapRecommendText(e) {
    const searchText = e.target.dataset.text ? e.target.dataset.text : ""
    const context = this.selectComponent("#search-box")
    const {
      location
    } = app.globalData
    context.searchRequest(searchText, location, context)
  },
  inputFocus() {
    this.setData({
      showCancel: true
    })
  },
  inputBlur() {
    this.setData({
      showCancel: false
    })
  }
})