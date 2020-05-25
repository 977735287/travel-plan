const app = getApp()
const util = require('../../../utils/util.js')
const wxRequest = require('../../../utils/wxRequest.js')
const array = require('../../../utils/array.js')

Component({
  options: {
    addGlobalClass: true,
  },
  data: {
    classificationList: [],
    CustomBar: app.globalData.CustomBar,
  },
  attached() {
    this.setData({
      userInfo: app.globalData.userInfo
    })
    wx.showLoading({
      title: 'loading',
    })
    var url = '/wechat/classification/list?type=QUESTION'
    wxRequest.wxGet(url, {}, (res) => {
      this.setData({
        classificationList: res
      })
      wx.hideLoading()
    }, (err) => {
      console.info(err)
    })
  },
  ready: function() {

  },
  detached() {
    wx.hideLoading()
  },
  pageLifetimes: {
    show: function() {
      // 页面被展示
      wx.showLoading({
        title: 'loading',
      })
      var url = '/wechat/classification/list?type=QUESTION'
      wxRequest.wxGet(url, {}, (res) => {
        this.setData({
          classificationList: res
        })
        wx.hideLoading()
      }, (err) => {
        console.info(err)
      })
    },
    hide: function() {
      // 页面被隐藏
      // console.info('hide')
    },
    resize: function(size) {
      // 页面尺寸变化
      // console.info('resize')
    }
  },
  methods: {
    toChild(e) {
      var id = e.currentTarget.dataset.id
      console.info(id)
      wx.navigateTo({
        url: '/pages/collect/list/index?id=' + id,
      })
    },
    bindImgPreview(e) {
      
    },
    bindEdit(e) {
      var id = e.currentTarget.dataset.id
      wx.navigateTo({
        url: '/pages/share/edit/index?id=' + id,
      })
    },
  },
})