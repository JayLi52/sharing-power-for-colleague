//index.js
//获取应用实例
const app = getApp()
const defaultScale = 14;
const mapId = 'myMap'

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
      name: '青年民宿',
      distance: '426m',
      detail: '学清路26号',
      borrow: 5,
      returnNum: 5,
      location: {
        longtitude: 116,
        latitude: 39.9
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
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
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
      longtitude
    } = this.data
    wx.cloud.callFunction({
      name: 'getMarkers',
      data: {
        location: {
          longtitude,
          latitude
        }
      }
    }).then(res => {
      const markers = res.result.data.map((item, index) => ({
        latitude: item.location.latitude,
        longitude: item.location.longitude,
        desc: item.address,
        iconPath: '../../img/marker-location.png',
        width: 30,
        height: 30,
        id: index + 1,
        // name: item.name,
        count: item.count,
        returnNum: item.returnNum
      }))
      this.setData({
        markers
      })
    }).catch(err => {
      console.error(err)
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
    console.log(e)
    // 通过e.markerId 从后端获取该定位点相关信息
    //TODO: 选中时的marker 增加hover样式

    let curItem = null
    this.data.markers.forEach(item => {
      if (item.id === e.markerId) {
        curItem = {
          // name: item.name,
          distance: '426m',
          detail: 'item.detail',
          borrow: item.count - item.returnNum,
          returnNum: item.returnNum,
          location: {
            latitude: item.latitude,
            longitude: item.longitude
          }
        }
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
      itemList: ['常见问题', '使用说明', '在线客服', '电话客服'],
      success: function(e) {
        console.log('s', e)
        switch (e.tapIndex) {
          case 0: {
            wx.navigateTo({url: '/pages/question/question'})
            break;
          }
          case 1: {
            wx.navigateTo({url: '/pages/introduction/introduction'})
            break
          }
          case 2: {
            // TODO: 在线客服
          }
          case 3: {
            wx.makePhoneCall({
              phoneNumber: '123456789'
            })
            break
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
    const {longitude, latitude} = this.data.item.location
    wx.openLocation({
      latitude,
      longitude,
      scale: defaultScale,
    })
  }
})