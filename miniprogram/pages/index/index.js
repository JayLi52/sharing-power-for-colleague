//index.js
//获取应用实例
const app = getApp()
const defaultScale = 14;
const mapId = 'myMap'
const db = wx.cloud.database()
import {
  urlParse,
  formatDistance
} from '../../utils/util.js'

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    longitude: '116',
    latitude: '39.9',
    //地图缩放级别
    scale: defaultScale,
    markers: [],
    //地图高度
    mapHeight: '300px',
    // 箱柜详情
    item: {
      name: '东北林业大学丹青楼',
      distance: '16m',
      detail: '和兴路26号',
      borrow: 5,
      returnNum: 5,
      location: {
        longitude: 126.6356,
        latitude: 45.7224
      }
    },
    isShow: false
  },
  onLoad: function() {
    this.setData({
      isShow: true
    })
    this.selfLocationClick()
    this.getMarkers()
    // 初始化用户信息
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    // 获取设备信息
    wx.getSystemInfo({
      success: res => {
        console.log('wx.getSystemInfo', res)
        this.setData({
          mapHeight: res.windowHeight - 35 + 'px'
        })
      }
    })
  },
  /**
   * 获取markers
   */
  getMarkers() {
    const {
      latitude,
      longitude
    } = this.data
    wx.request({
      url: 'http://localhost:3100/v1/box',
      success: res => {
        const markers = res.data.map((item, index) => ({
          latitude: item.location.latitude,
          longitude: item.location.longitude,
          desc: item.address,
          iconPath: '../../img/marker-location.png',
          width: 30,
          height: 30,
          id: index + 1,
          count: item.count,
          returnNum: item.count - item.remainingNum
        }))
        this.setData({
          markers
        })
      }
    })
  },
  /**
   * 回到定位点
   */
  selfLocationClick: function() {
    var that = this;
    //还原默认缩放级别
    that.setData({
      scale: defaultScale
    })
    //必须请求定位，改变中心点坐标
    that.requestLocation();
  },
  //请求地理位置
  requestLocation: function() {
    var that = this;
    wx.getLocation({
      type: 'gcj02',
      success: function(res) {
        that.setData({
          latitude: res.latitude,
          longitude: res.longitude,
        })
        app.globalData.location = {
          latitude: res.latitude,
          longitude: res.longitude
        }
        that.moveTolocation();
      },
    })
  },
  moveTolocation: function() {
    var mapCtx = wx.createMapContext(mapId);
    mapCtx.moveToLocation();
  },
  // 充电柜地图定位 callback
  bindMakertap: function(e) {
    //TODO: 选中时的marker 增加hover样式
    let curItem = null
    this.data.markers.forEach(item => {
      if (item.id === e.markerId) {
        curItem = {
          borrow: item.count - item.returnNum,
          returnNum: item.returnNum,
          location: {
            latitude: item.latitude,
            longitude: item.longitude
          }
        }
      }
    })

    // curItem.location
    const query = `${curItem.location.latitude},${curItem.location.longitude}`
    // 根据location 逆地址解析
    wx.request({
      url: 'https://apis.map.qq.com/ws/geocoder/v1/?location=' + query,
      data: {
        key: 'O67BZ-I2X3X-YTY4Z-ZJHDT-YV3XZ-C2B3Z'
      },
      success: res => {
        console.log(res)
        curItem.name = res.data.result.formatted_addresses.recommend
        curItem.detail = res.data.result.address
        this.setData({
          item: curItem
        })
      }
    })

    const fromLocation = `${this.data.latitude},${this.data.longitude}`
    const toLocation = query
    // 计算from-to的distance
    wx.request({
      url: 'https://apis.map.qq.com/ws/distance/v1/?parameters',
      data: {
        mode: 'driving', // driving:驾车 walking:步行
        from: fromLocation,
        to: toLocation,
        key: 'O67BZ-I2X3X-YTY4Z-ZJHDT-YV3XZ-C2B3Z'
      },
      success: res => {
        let distance = res.data.result.elements[0].distance
        distance = formatDistance(distance)
        curItem.distance = distance
        this.setData({
          item: curItem
        })
      }
    })

    this.setData({
      isShow: true,
      item: curItem
    })
  },
  // 扫一扫
  richScan: function() {
    // 
    wx.scanCode({
      success: function(e) {
        console.log('s', e)
        const urlObj = urlParse(e.result)
        if (urlObj.origin === 'https://wx.qq.com/mp' && urlObj.queryObj.id === '1234') {
          wx.navigateTo({
            url: `../order/order-first?${urlObj.query}`
          })
        }
      },
      fail: function(e) {
        console.log('f', e)

      },
      complete: function(e) {
        console.log('c', e)

      }
    })
  },
  // 客服
  customService: function() {
    wx.showActionSheet({
      itemList: ['常见问题', '使用说明', '电话客服'],
      success: function(e) {
        console.log('s', e)
        switch (e.tapIndex) {
          case 0:
            {
              wx.navigateTo({
                url: '/pages/question/question'
              })
              break;
            }
          case 1:
            {
              wx.navigateTo({
                url: '/pages/introduction/introduction'
              })
              break
            }
          case 2:
            {
              wx.makePhoneCall({
                phoneNumber: '123456789'
              })
              break
            }
          case 3:
            {

            }
        }
      },
      fail: function(e) {
        console.log('f', e)
      },
      complete: function(e) {
        console.log('c', e)

      }
    })
  },
  // 点击地图空白处
  bindMapTap: function() {
    console.log('click map')
    this.setData({
      isShow: false
    })
  },
  // 点击输入框
  bindInputTap: function(e) {
    console.log('点击输入框', e)
  },
  // 个人页面
  goPersonal: function() {
    wx.navigateTo({
      url: '/pages/personal/person'
    })
  },
  // 箱柜详情页面
  goBoxes: function() {
    wx.navigateTo({
      url: '/pages/boxes/boxes'
    })
  },
  // search页面
  goSearch: function() {
    wx.navigateTo({
      url: '/pages/search/search'
    })
  },
  // 到这去
  tapGoThere: function() {
    const {
      longitude,
      latitude
    } = this.data.item.location
    wx.openLocation({
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
      scale: defaultScale,
    })
  }
})