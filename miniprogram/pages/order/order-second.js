import Canvas from './canvas.js'
import {
  objToParam
} from '../../utils/util.js'

Page({
  ...Canvas.options,
  /**
   * 页面的初始数据
   */
  data: {
    ...Canvas.data,
    options: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      options
    })
    let params = ''
    let newOptions = null
    wx.cloud.callFunction({
      name: 'getMessage',
      data: {
        boxid: options.boxid
      }
    }).then(res => {
      const curItem = res.result.data[0]
      // curItem.location
      const query = `${curItem.location.latitude},${curItem.location.longitude}`
      // 根据location 逆地址解析
      wx.request({
        url: 'https://apis.map.qq.com/ws/geocoder/v1/?location=' + query,
        data: {
          key: 'O67BZ-I2X3X-YTY4Z-ZJHDT-YV3XZ-C2B3Z'
        },
        success: res => {
          const date = new Date()
          newOptions = Object.assign({}, options, {
            address: res.data.result.formatted_addresses.recommend,
            borrowTime: date.toString()
          })
          params = objToParam(newOptions)
          // this.setData({
          //   message: {
          //     ...this.data.message,
          //     address: res.data.result.formatted_addresses.recommend
          //   }
          // })
        }
      })
    })
    this.draw('circle-progress', 40, 1000);
    setTimeout(() => {
      this.canvasTap(40, 100, 50, 190, 150)
    }, 1000)
    setTimeout(() => {
      wx.navigateTo({
        url: './order-third?' + params,
      })
    }, 4800)
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