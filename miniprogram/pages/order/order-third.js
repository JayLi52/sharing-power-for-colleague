// miniprogram/pages/order/order-third.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    message: {
      pledge: '免押金',
      borrowTime: '',
      address: ''
    }
  },
  howToGiveBack() {
    wx.navigateTo({
      url: '/pages/introduction/introduction?type=giveback',
    })
  },
  tapFeedBack() {
    wx.navigateTo({
      url: '/pages/personal/feedback',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log('third options', options)
    this.setData({
      message: {
        pledge: '免押金',
        ...options
      }
    })
    // 生成订单
    const actoken = wx.getStorageSync('actoken')['access_token']
    wx.request({
      url: 'http://localhost:3100/v1/order',
      method: "GET",
      data: {
        openid: app.globalData.openid
      },
      success(res) {
        (res.data.length === 0 || res.data.every(item => item.isReturned)) && wx.request({
          url: 'http://localhost:3100/v1/order',
          method: "POST",
          data: {
            ...options,
            openid: app.globalData.openid,
            actoken: actoken
          },
          success: res => {
            console.log(res)
          }
        })
      }
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})