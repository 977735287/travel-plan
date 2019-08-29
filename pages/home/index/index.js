// pages/home/index/index.js
Page({
  data: {

  },

  onLoad: function(options) {},
  onReady: function() {},
  onShow: function() {},
  onHide: function() {},
  onUnload: function() {},
  onPullDownRefresh: function() {},
  onReachBottom: function() {},
  onShareAppMessage: function() {},

  bindEdit: function(e) {
    var url
    if (e.currentTarget.dataset.id) {
      url = '/pages/album/show1/index'
    } else {
      url = '/pages/album/show2/index'
    }
    wx.navigateTo({
      url: url,
    })
    // if (e.currentTarget.dataset.id) {
    //   wx.showToast({
    //     title: 'success',
    //     icon: 'success',
    //     duration: 2000 //持续的时间
    //   })
    // } else {
    //   wx.showToast({
    //     title: 'loading',
    //     icon: 'loading',
    //     duration: 2000 //持续的时间
    //   })
    // }
  },

  bindView: function(e) {
    wx.navigateTo({
      url: '/pages/album/index/index',
    })
  }
})