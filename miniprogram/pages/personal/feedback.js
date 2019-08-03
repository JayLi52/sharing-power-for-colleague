// miniprogram/pages/personal/feedback.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: ['产品意见', '损坏信息', '异常订单'],
    index: 0,
    orderDisabled: true
  },
  bindPickerChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    const index = e.detail.value
    this.setData({
      index
    })
    if (index == 2) {
      this.setData({
        orderDisabled: false
      })
    } else {
      this.setData({
        orderDisabled: true
      })
    }
  },
  formSubmit(e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    const formData = e.detail.value
    if (formData.feedbackType == 2 && formData.feedbackOrder === "") {
      wx.showToast({
        title: '请输入单号',
        icon: 'none',
        duration: 1000
      })
    } else if (formData.feedbackContent === "") {
      wx.showToast({
        title: '反馈内容为空',
        icon: 'none',
        duration: 1000
      })
    } else {
      const array = ['产品意见', '损坏信息', '异常订单']
      wx.request({
        url: 'http://localhost:3100/v1/feedback',
        method: "POST",
        data: {
          type: array[formData.feedbackType],
          content: formData.feedbackContent,
          orderId: formData.feedbackOrder,
          commitTime: new Date().toString(),
          openId: app.globalData.openid
        },
        success(res) {
          wx.showToast({
            title: '提交反馈信息成功',
            icon: 'success',
            duration: 1000
          })
        }
      })

    }
  },
  formReset() {
    console.log('form发生了reset事件')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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