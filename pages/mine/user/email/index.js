const app = getApp()

Page({
  data: {
    email: '',
    hasEmailValue: true
  },
  onLoad: function () {
    this.setData({
      email: app.globalData.userInfo.email
    })
  },

  onReady: function() {},
  onShow: function () {},
  onHide: function() {},
  onUnload: function() {},
  onPullDownRefresh: function() {},
  onReachBottom: function() {},
  onShareAppMessage: function() {},

  emailInputEdit: function(e) {
    // handle
    let eamil = e.detail.value
    if (eamil.length > 0) {
      this.setData({
        email: eamil,
        hasEmailValue: false
      })
    } else {
      this.setData({
        email: '',
        hasEmailValue: true
      })
    }
    // app.globalData.userInfo.email = e.detail.value
  },

  emailUpdate: function() {
    app.globalData.userInfo.email = this.data.email
    wx.navigateBack({})
  },
})