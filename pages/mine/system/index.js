const app = getApp()

Page({
  data: {
    systemInfo: {}
  },
  onLoad: function () {
    this.setData({
      systemInfo: app.globalData.systemInfo
    })
  },

  onReady: function () { },
  onShow: function () { },
  onHide: function () { },
  onUnload: function () { },
  onPullDownRefresh: function () { },
  onReachBottom: function () { },
  onShareAppMessage: function () { }
})