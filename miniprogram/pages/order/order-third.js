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
    wx.cloud.callFunction({
      name: 'generateOrder',
      data: {
        ...options,
        token: app.globalData.actoken.access_token
      }
    }).then(res => {
      console.log(res)
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