const app = getApp()

Component({
  options: {
    addGlobalClass: true,
  },
  data: {
    photoWidth: (wx.getSystemInfoSync().windowWidth * 0.88 * 0.9 -30)/ 3,
    circleList: [],
    userInfo: {},
    previewImageList: []
  },
  attached() {
    this.setData({
      userInfo: app.globalData.userInfo
    })
    console.info(this.data.userInfo)
    wx.request({
      url: 'https://easy-mock.com/mock/5d6cd16f0f2596069bb1b409/v1/share/list',
      success: res => {
        this.setData({
          circleList: res.data
        })
      }
    })
  },
  methods: {
    bindImgPreview(e) {
      console.info(e.target.dataset)
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