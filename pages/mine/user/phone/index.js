const app = getApp()

Page({
  data: {
    phone: '',
    hasPhoneValue: true
  },
  onLoad: function () {
    this.setData({
      phone: app.globalData.userInfo.phone
    })
  },

  onReady: function () { },
  onShow: function () { },
  onHide: function () { },
  onUnload: function () { },
  onPullDownRefresh: function () { },
  onReachBottom: function () { },
  onShareAppMessage: function () { },

  phoneInputEdit: function (e) {
    // handle
    let phone = e.detail.value
    if (phone.length > 0) {
      this.setData({
        phone: phone,
        hasPhoneValue: false
      })
    } else {
      this.setData({
        phone: '',
        hasPhoneValue: true
      })
    }
  },

  phoneUpdate: function () {
    app.globalData.userInfo.phone = this.data.phone
    wx.navigateBack({})
  },
})