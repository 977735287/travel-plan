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
    selectImageList: [],
    checkboxStatus: {}
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
      var index = e.currentTarget.dataset.index
      var id = e.currentTarget.dataset.id
      var key = index + '-' + id
      var status = this.data.checkboxStatus
      var selectImageList = this.data.selectImageList
      if (status[key]) {
        status[key] = false
        array.remove(selectImageList, url);
      } else {
        status[key] = true
        selectImageList = selectImageList.concat(url)
      }
      this.setData({
        checkboxStatus: status,
        selectImageList: selectImageList
      })
    } else {
      wx.previewImage({
        urls: this.data.imgList,
        current: url
      })
    }
  },

  bindImageLong(e) {
    if (this.data.isSelect) {
      return
    }
    var url = e.currentTarget.dataset.url
    var index = e.currentTarget.dataset.index
    var id = e.currentTarget.dataset.id
    var key = index + '-' + id
    var status = this.data.checkboxStatus
    status[key] = true
    this.setData({
      photoWidth: wx.getSystemInfoSync().windowWidth * 0.91 / 3,
      selectStyle: {
        top: 3,
        right: 3,
        c_left: 1.5,
        c_right: 1.5
      },
      isSelect: true,
      checkboxStatus: status,
      selectImageList: this.data.selectImageList.concat(url)
    })
  },

  checkboxChange(e) {
    var url = e.currentTarget.dataset.url
    var key = e.currentTarget.id
    var status = this.data.checkboxStatus
    var selectImageList = this.data.selectImageList
    if (status[key]) {
      status[key] = false
      array.remove(selectImageList, url)
    } else {
      status[key] = true
      selectImageList = selectImageList.concat(url)
    }
    this.setData({
      checkboxStatus: status,
      selectImageList: selectImageList
    })
  },

  cancel(e) {
    this.initData()
  },

  deleteImage(e) {
    var count = this.data.selectImageList.length
    if (count == 0) {
      return
    }
    wx.showModal({
      content: '已选 ' + count +' 张照片，确定要删除吗？',
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
      pics: this.data.pics,
      checkboxStatus: {}
    })
  }
})