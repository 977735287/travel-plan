const app = getApp()

Component({
  options: {
    addGlobalClass: true,
  },
  data: {
    userInfo: {}
  },
  attached() {
    this.setData({
      userInfo: app.globalData.userInfo
    })
  },
  methods: {
    bindImgPreview(e) {
      wx.previewImage({
        urls: [this.data.userInfo.avatarUrl],
      })
    }
  },
})