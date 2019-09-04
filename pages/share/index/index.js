const app = getApp()
const util = require('../../../utils/util.js')

Component({
  options: {
    addGlobalClass: true,
  },
  data: {
    onePhotoWidth: wx.getSystemInfoSync().windowWidth * 0.88 * 0.85 * 0.8,
    twoPhotoWidth: (wx.getSystemInfoSync().windowWidth * 0.88 * 0.85 - 20) * 0.9 / 2,
    threePhotoWidth: (wx.getSystemInfoSync().windowWidth * 0.88 * 0.85 - 35) / 3,
    circleList: [],
    userInfo: {},
    previewImageList: []
  },
  attached() {
    this.setData({
      userInfo: app.globalData.userInfo
    })
    wx.showLoading({
      title: 'loading',
    })
    wx.request({
      url: 'https://easy-mock.com/mock/5d6cd16f0f2596069bb1b409/v1/share/list',
      success: res => {
        this.setData({
          circleList: res.data
        })
        wx.hideLoading()
      }
    })
  },
  detached() {
    wx.hideLoading()
  },
  methods: {
    loadMoreData (e) {
      wx.showLoading({
        title: 'loading',
      })
      wx.request({
        url: 'https://easy-mock.com/mock/5d6cd16f0f2596069bb1b409/v1/share/list',
        success: res => {
          this.setData({
            circleList: this.data.circleList.concat(res.data)
          })
          wx.hideLoading()
        }
      })
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