const app = getApp()
Page({
  data: {

  },
  onLoad: function() {

  },

  onReady: function() {},
  onShow: function() {},
  onHide: function() {},
  onUnload: function() {},
  onPullDownRefresh: function() {},
  onReachBottom: function() {},
  onShareAppMessage: function() {},

  getUserInfo: function (e) {
    app.globalData.userInfo = e.detail.userInfo
    app.globalData.isWechatAuth = true;
    wx.navigateBack({
      url: '/pages/index/index'
    })
  },
})