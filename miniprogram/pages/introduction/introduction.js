// miniprogram/pages/introduction/introduction.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: false,
  },

  tapTabs: function(e) {
    const {index} = e.target.dataset
    let show = false
    index === 'left' ? show = false : show = true
    this.setData({
      show
    })
  },
  onLoad(options) {
    if(options.type && options.type === 'giveback') {
      console.log('give back')
      this.setData({
        show: true
      })
    }
  }
})