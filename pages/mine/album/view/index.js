const app = getApp()
const util = require('../../../../utils/util.js')
const image = require('../../../../utils/image.js')
let touchStartTime = 0;

Page({
  data: {
    photoWidth: wx.getSystemInfoSync().windowWidth / 3,
    imgList: [],
    image: {},
    index: 12,
    timer: '',
    isExt: false,
    isStop: false,
    isPreview: false,
    imagewidth: 0,
    imageheight: 0,
    selectImageUrl: '',
    olddistance: 0
  },
  onLoad: function() {},
  onReady: function() {},
  onShow: function() {
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
      } else if (time == 75) {
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
  onHide: function() {},
  onUnload: function() {
    clearInterval(this.data.timer)
  },
  onPullDownRefresh: function() {},
  onReachBottom: function() {},
  onShareAppMessage: function() {},

  // bindDoubleClick(e) {
  //   if (e.timeStamp - this.touchStartTime < 300) {
  //     this.setData({
  //       isExt: !this.data.isExt
  //     })
  //   }
  //   this.touchStartTime = e.timeStamp;
  // },

  ViewImage(e) {
    var url = e.currentTarget.dataset.url
    // this.callback(url, () => {})
    this.setData({
      selectImageUrl: url,
      isPreview: true
    })
  },

  callback(url, callback) {
    wx.previewImage({
      urls: [url],
    })
  },

  imageLoad(e) {
    var imageSize = image.imageSize(e.detail.width, e.detail.height)
    this.setData({
      imagewidth: imageSize.imageWidth,
      imageheight: imageSize.imageHeight
    })
  },

  hide() {
    this.setData({
      isPreview: false
    })
  },

  scroll(e) {
    console.info(e)
    if (e.touches.length == 2) { //两个手指滑动的时候
      var xMove = e.touches[1].clientX - e.touches[0].clientX; //手指在x轴移动距离
      var yMove = e.touches[1].clientY - e.touches[0].clientY; //手指在y轴移动距离
      var distance = Math.sqrt(xMove * xMove + yMove * yMove); //根据勾股定理算出两手指之间的距离
      console.info(distance - this.data.olddistance)
      if (this.data.olddistance == 0) {
        this.data.olddistance = distance; //要是第一次就给他弄上值，什么都不操作  
      }else {
        if (distance - this.data.olddistance > 100) {
          this.setData({
            isExt: true
          })
        } else if(distance - this.data.olddistance < -100) {
          this.setData({
            isExt: false
          })
        }
      }
      // if (this.data.olddistance == 0) {
      //   this.data.olddistance = distance; //要是第一次就给他弄上值，什么都不操作  
      // }else {
      //   console.info(distance - this.data.olddistance)
      //   if (distance - this.data.olddistance > 10) {
      //     this.setData({
      //       isExt: true
      //     })
      //   } else if(distance - this.data.olddistance < -10) {
      //     this.setData({
      //       isExt: false
      //     })
      //   }
      // }
    }
  },

  //手指离开屏幕
  endTou(e) {
    this.data.olddistance = 0 //重置
  }
})