const app = getApp()

Page({
  data: {
    userInfo: {}
  },
  onLoad: function() {},

  onReady: function() {},
  onShow: function () {
    this.setData({
      userInfo: app.globalData.userInfo
    })
  },
  onHide: function() {},
  onUnload: function() {},
  onPullDownRefresh: function() {},
  onReachBottom: function() {},
  onShareAppMessage: function() {},

  bindEditPhone: function() {
    wx.navigateTo({
      url: '/pages/mine/user/phone/index',
    })
  },

  bindEditEmail: function () {
    wx.navigateTo({
      url: '/pages/mine/user/email/index',
    })
  },
})