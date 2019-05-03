// pages/component/searchBox/index.js
import {
  debounce
} from '../../../utils/util.js'
const app = getApp()

Component({

  /**
   * 组件的初始数据
   */
  data: {
    showCancel: false,
    detailItems: []
  },

  /**
   * 组件的方法列表
   */
  methods: {
    searchFocus() {
      this.setData({
        showCancel: true
      })
    },
    searchBlur() {
      this.setData({
        showCancel: false
      })
    },
    searchChange(e) {
      const {
        value: keyword
      } = e.detail
      const {
        location
      } = app.globalData
      this.searchRequest(keyword, location, this)
    },
    searchRequest: debounce((keyword, location, context) => {
      console.log(keyword, location, context)
      let keywords = wx.getStorageSync('history')
      keywords === "" ? keywords = [] : keywords = keywords
      if (keyword !== '' && keywords.indexOf(keyword) === -1) {
        keywords.push(keyword)
        wx.setStorageSync('history', keywords)
      }
      // 根据关键词搜索 附近10km相关门店
      wx.request({
        url: 'https://apis.map.qq.com/ws/place/v1/search',
        data: {
          keyword,
          boundary: `nearby(${location.latitude},${location.longitude},10000)`,
          key: 'O67BZ-I2X3X-YTY4Z-ZJHDT-YV3XZ-C2B3Z'
        },
        success: res => {
          if (res.data.data) {
            context.setData({
              detailItems: res.data.data.map(item => ({
                ...item,
                img: 'https://thumbs.dreamstime.com/z/%E8%A1%97%E6%99%AF%E7%94%BB%E5%9C%A8%E5%8F%B0%E5%8C%97%EF%BC%8C%E5%8F%B0%E6%B9%BE%EF%BC%8C%E4%B8%AD%E5%9B%BD-117183333.jpg',
                borrow: parseInt(Math.random() * 10),
                returnNum: parseInt(Math.random() * 10)
              }))
            })
          }
        }
      })
    }, 1500),
    cancel() {
      wx.navigateBack({
        delta: 1
      })
    }
  }
})