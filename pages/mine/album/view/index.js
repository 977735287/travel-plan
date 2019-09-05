const app = getApp()
const util = require('../../../../utils/util.js')

Page({
  data: {
    photoWidth: wx.getSystemInfoSync().windowWidth / 3,
    imgList: [],
    image: {},
    index: 12,
    timer: ''
  },
  onLoad: function () { },
  onReady: function () { },
  onShow: function () {
    var pics = wx.getStorageSync('pics') || []
    var imgList = []
    for (var i = 0; i < pics.length; i++) {
      imgList = imgList.concat(pics[i].imgList)
    }
    var image = {
      'out_front': imgList[0],
      'out_back': imgList[1],
      'out_left': imgList[2],
      'out_right': imgList[3],
      'out_top': imgList[4],
      'out_bottom': imgList[5],
      'in_front': imgList[6],
      'in_back': imgList[7],
      'in_left': imgList[8],
      'in_right': imgList[9],
      'in_top': imgList[10],
      'in_bottom': imgList[11],
    }
    var time = 0
    var timer = setInterval(() => {
      time++;
      var image = this.data.image;
      var index = this.data.index
      if (time == 50) {
        image.out_top = imgList[index++]
        if (index > imgList.length - 1) {
          index = 0
        }
        image.out_bottom = imgList[index++]
        if (index > imgList.length - 1) {
          index = 0
        }
        image.in_top = imgList[index++]
        if (index > imgList.length - 1) {
          index = 0
        }
        image.in_bottom = imgList[index++]
        if (index > imgList.length - 1) {
          index = 0
        }
      }else if(time == 75) {
        image.out_front = imgList[index++]
        if (index > imgList.length - 1) {
          index = 0
        }
        image.out_back = imgList[index++]
        if (index > imgList.length - 1) {
          index = 0
        }
        image.in_front = imgList[index++]
        if (index > imgList.length - 1) {
          index = 0
        }
        image.in_back = imgList[index++]
        if (index > imgList.length - 1) {
          index = 0
        }
      } else if (time == 100) {
        image.out_left = imgList[index++]
        if (index > imgList.length - 1) {
          index = 0
        }
        image.out_right = imgList[index++]
        if (index > imgList.length - 1) {
          index = 0
        }
        image.in_left = imgList[index++]
        if (index > imgList.length - 1) {
          index = 0
        }
        image.in_right = imgList[index++]
        if (index > imgList.length - 1) {
          index = 0
        }
        time = 0;
      }
      this.setData({
        image: image,
        index: index
      })
    }, 100)
    this.setData({
      imgList: imgList,
      image: image,
      timer: timer
    })
  },
  onHide: function () { },
  onUnload: function () {
    clearInterval(this.data.timer)
  },
  onPullDownRefresh: function () { },
  onReachBottom: function () { },
  onShareAppMessage: function () { },
})