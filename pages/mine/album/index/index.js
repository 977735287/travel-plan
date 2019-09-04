const app = getApp()
const util = require('../../../../utils/util.js')
const array = require('../../../../utils/array.js')

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
    },
    defaultSelectPic: '',
    selectImageList: []
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
    var url = e.currentTarget.dataset.url;
    if (this.data.isSelect) {
      // if (this.data.defaultSelectPic == url) {
      //   this.setData({
      //     defaultSelectPic: ''
      //   })
      // }else {
      //   this.setData({
      //     defaultSelectPic: url,
      //     selectImageList: this.data.selectImageList.concat(e.currentTarget.dataset.url)
      //   })
      // }
    } else {
      wx.previewImage({
        urls: this.data.imgList,
        current: url
      })
    }
  },

  bindImageLong(e) {
    var url = e.currentTarget.dataset.url
    this.setData({
      photoWidth: wx.getSystemInfoSync().windowWidth * 0.91 / 3,
      selectStyle: {
        top: 3,
        right: 3,
        c_left: 1.5,
        c_right: 1.5
      },
      isSelect: true,
      defaultSelectPic: url,
      selectImageList: this.data.selectImageList.concat(url)
    })
  },

  checkboxChange(e) {
    this.setData({
      selectImageList: e.detail.value
    })
  },

  cancel(e) {
    this.initData()
  },

  deleteImage(e) {
    wx.showModal({
      title: '米粒',
      content: '确定要删除吗？',
      cancelText: '取消',
      confirmText: '确定',
      success: res => {
        if (res.confirm) {
          var emptyPics = []
          this.data.pics.forEach(item => {
            array.batchRemove(item.imgList, this.data.selectImageList)
            if (item.imgList.length == 0) {
              emptyPics.push(item)
            }
          })
          if (emptyPics.length != 0) {
            array.batchRemove(this.data.pics, emptyPics)
          }
          wx.setStorageSync('pics', this.data.pics)
          this.initData()
        }
      }
    })
  },

  initData() {
    this.setData({
      photoWidth: wx.getSystemInfoSync().windowWidth * 0.99 / 3,
      isSelect: false,
      selectStyle: {
        top: 0.5,
        right: 0.5,
        c_left: 0,
        c_right: 0
      },
      defaultSelectPic: '',
      selectImageList: [],
      pics: this.data.pics
    })
  }
})