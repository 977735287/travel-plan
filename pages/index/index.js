const app = getApp()
const wxRequest = require('../../utils/wxRequest.js')

Page({
  data: {
    PageCur: 'home',
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
  },
  onLoad: function() {
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 登录
          wx.login({
            success: res => {
              var url = '/v1/oauth/user/openid?jsCode=' + res.code
              wxRequest.wxGet(url, {}, (res) => {
                var url_1 = '/v1/oauth/user/openid/info?openId=' + res
                wxRequest.wxGet(url_1, {}, (res) => {
                  app.globalData.userInfo = res
                }, (err) => {
                  console.info(err)
                })
              }, (err) => {
                console.info(err)
              })
            }
          })
        } else {
          wx.navigateTo({
            url: '/pages/auth/wechat/index',
          })
        }
      }
    })
  },
  NavChange(e) {
    this.setData({
      PageCur: e.currentTarget.dataset.cur
    })
  },

})