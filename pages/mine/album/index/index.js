const app = getApp()

Page({
  data: {
    photoWidth: wx.getSystemInfoSync().windowWidth * 0.90 / 3,
    pics: [],
    imgList: []
  },
  onLoad: function () {},
  onReady: function () { },
  onShow: function () {
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
  onHide: function () { },
  onUnload: function () { },
  onPullDownRefresh: function () { },
  onReachBottom: function () { },
  onShareAppMessage: function () { },

  ViewImage(e) {
    console.info(this.data.imgList)
    wx.previewImage({
      urls: this.data.imgList,
      current: e.currentTarget.dataset.url
    });
  },
})