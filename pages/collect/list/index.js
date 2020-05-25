const app = getApp()
const util = require('../../../utils/util.js')
const wxRequest = require('../../../utils/wxRequest.js')

Page({
  data: {
    MainCur: 0,
    questionList: []
  },

  onLoad: function (options) {
    var id = options.id
    wx.showLoading({
      title: 'loading',
    })
    var url = '/wechat/question/list?classification.id=' + id
    wxRequest.wxGet(url, {}, (res) => {
      this.setData({
        questionList: res
      })
      wx.hideLoading()
    }, (err) => {
      console.info(err)
    })
  },
})