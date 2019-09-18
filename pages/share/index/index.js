const app = getApp()
const util = require('../../../utils/util.js')
const wxRequest = require('../../../utils/wxRequest.js')

Component({
  options: {
    addGlobalClass: true,
  },
  data: {
    onePhotoWidth: wx.getSystemInfoSync().windowWidth * 0.88 * 0.85 * 0.8,
    twoPhotoWidth: (wx.getSystemInfoSync().windowWidth * 0.88 * 0.85 - 20) * 0.9 / 2,
    threePhotoWidth: (wx.getSystemInfoSync().windowWidth * 0.88 * 0.85 - 35) / 3,
    circleList: [],
    shareInfoList: [],
    userInfo: {},
    previewImageList: [],
    page: 0,
    isMoreData: true
  },
  attached() {
    console.info('attached')
    this.setData({
      userInfo: app.globalData.userInfo
    })
    wx.showLoading({
      title: 'loading',
    })
    var url = '/v1/share/info?page=' + this.data.page
    wxRequest.wxGet(url, {}, (res) => {
      this.setData({
        shareInfoList: res,
        isMoreData: res.length < 10 ? false : true
      })
      wx.hideLoading()
    }, (err) => {
      console.info(err)
    })
    // wx.request({
    //   url: 'https://easy-mock.com/mock/5d6cd16f0f2596069bb1b409/v1/share/list',
    //   success: res => {
    //     this.setData({
    //       circleList: res.data
    //     })
    //     wx.hideLoading()
    //   }
    // })
  },
  ready: function () {
    
  },
  detached() {
    wx.hideLoading()
  },
  pageLifetimes: {
    show: function () {
      this.setData({
        page: 0
      })
      // 页面被展示
      wx.showLoading({
        title: 'loading',
      })
      var url = '/v1/share/info?page=' + this.data.page
      wxRequest.wxGet(url, {}, (res) => {
        this.setData({
          shareInfoList: res,
          isMoreData: res.length < 10 ? false : true
        })
        wx.hideLoading()
      }, (err) => {
        console.info(err)
      })
    },
    hide: function () {
      // 页面被隐藏
      console.info('hide')
    },
    resize: function (size) {
      // 页面尺寸变化
      console.info('resize')
    }
  },
  methods: {
    loadMoreData(e) {
      if(!this.data.isMoreData) {
        return
      }
      var page = this.data.page + 1;
      this.setData({
        page: page
      })
      wx.showLoading({
        title: 'loading',
      })
      var url = '/v1/share/info?page=' + page
      wxRequest.wxGet(url, {}, (res) => {
        this.setData({
          shareInfoList: this.data.shareInfoList.concat(res),
          isMoreData: res.length < 10 ? false : true
        })
        wx.hideLoading()
      }, (err) => {
        console.info(err)
      })
      // wx.request({
      //   url: 'https://easy-mock.com/mock/5d6cd16f0f2596069bb1b409/v1/share/list',
      //   success: res => {
      //     this.setData({
      //       circleList: this.data.circleList.concat(res.data)
      //     })
      //     wx.hideLoading()
      //   }
      // })
    },
    bindImgPreview(e) {
      let currentPicture = e.target.dataset.url
      let index = e.target.dataset.index
      if (this.data.circleList[index].pictureList) {
        this.setData({
          previewImageList: this.data.circleList[index].pictureList
        })
      }
      wx.previewImage({
        current: currentPicture,
        urls: this.data.previewImageList
      })
    }
  },
})