// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    recommends: ['五道口','五彩城','学清路','清华大学'],
    historys: ['五道口','五彩城','学清路','清华大学'],
    showCancel: false
  },
  fireSearch() {
    const keywords = wx.getStorageSync('keywords')
    console.log(keywords)
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