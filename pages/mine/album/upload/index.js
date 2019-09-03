const app = getApp()

Page({
  data: {
    index: null,
    imgList: [],
    noImage: true
  },
  onLoad: function () {},

  onReady: function () { },
  onShow: function () { },
  onHide: function () { },
  onUnload: function () { },
  onPullDownRefresh: function () { },
  onReachBottom: function () { },
  onShareAppMessage: function () { },

  ChooseImage() {
    wx.chooseImage({
      count: 9, //默认9
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album'], //从相册选择
      success: (res) => {
        if (this.data.imgList.length != 0) {
          this.setData({
            imgList: this.data.imgList.concat(res.tempFilePaths)
          })
        } else {
          this.setData({
            imgList: res.tempFilePaths,
            noImage: false
          })
        }
      }
    });
  },

  ViewImage(e) {
    wx.previewImage({
      urls: this.data.imgList,
      current: e.currentTarget.dataset.url
    });
  },

  DelImg(e) {
    wx.showModal({
      title: '米粒',
      content: '确定要删除吗？',
      cancelText: '再看看',
      confirmText: '再见',
      success: res => {
        if (res.confirm) {
          this.data.imgList.splice(e.currentTarget.dataset.index, 1);
          this.setData({
            imgList: this.data.imgList
          })
          if(this.data.imgList.length == 0) {
            this.setData({
              noImage: true
            })
          }
        }
      }
    })
  },

  bindUploadPic(e) {
    var pics = wx.getStorageSync('pics') || []
    var pic = {}
    pic.date = '2019.09.03'
    pic.imgList = this.data.imgList
    pics.unshift(pic)
    wx.setStorageSync('pics', pics)
    wx.navigateBack({})
  },
})