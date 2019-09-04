const app = getApp()
const util = require('../../../../utils/util.js')

Page({
  data: {
    photoWidth: wx.getSystemInfoSync().windowWidth * 0.99 / 3, //图片宽度
    pics: [],
    imgList: [],
    isSelect: false,
    selectStyle: {
      top: 0.5,
      right: 0.5,
      c_left: 0,
      c_right: 0
    }
  },
  onLoad: function() {},
  onReady: function() {},
  onShow: function() {
    var pics = wx.getStorageSync('pics') || []
    this.setData({
      pics: pics
    })
    for (var i = 0; i < pics.length; i++) {
      this.setData({
        imgList: this.data.imgList.concat(pics[i].imgList)
      })
    }
  },
  onHide: function() {},
  onUnload: function() {},
  onPullDownRefresh: function() {},
  onReachBottom: function() {},
  onShareAppMessage: function() {},

  ViewImage(e) {
    if (this.data.isSelect) {

    } else {
      wx.previewImage({
        urls: this.data.imgList,
        current: e.currentTarget.dataset.url
      })
    }
  },

  bindImageLong(e) {
    this.setData({
      photoWidth: wx.getSystemInfoSync().windowWidth * 0.91 / 3,
      selectStyle: {
        top: 3,
        right: 3,
        c_left: 1.5,
        c_right: 1.5
      },
      isSelect: true
    })
  },

})