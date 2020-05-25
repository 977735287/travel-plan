const app = getApp()
const wxRequest = require('../../../utils/wxRequest.js')

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
    // 登录
    wx.login({
      success: res => {
        var url = '/wechat/user/openid?jsCode=' + res.code
        wxRequest.wxGet(url, {}, (res) => {
          app.globalData.userInfo.openId = res
          var url_1 = '/wechat/user'
          wxRequest.wxPost(url_1, app.globalData.userInfo, (res) => {}, (err) => {
            console.info(err)
          })
        }, (err) => {
          console.info(err)
        })
      }
    })
    wx.navigateBack({
      url: '/pages/index/index'
    })
  },
})