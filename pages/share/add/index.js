const app = getApp()
const util = require('../../../utils/util.js')
const wxRequest = require('../../../utils/wxRequest.js')

Page({
  data: {
    index: null,
    imgList: [],
    isCanPublish: false,
    defaultMaxImage: 9,
    shareInfo: {},
    wordMax: 150,
    content: '',
  },
  onLoad: function () { },

  onReady: function () { },
  onShow: function () { },
  onHide: function () { },
  onUnload: function () { },
  onPullDownRefresh: function () { },
  onReachBottom: function () { },
  onShareAppMessage: function () { },

  ChooseImage() {
    wx.chooseImage({
      count: this.data.defaultMaxImage, //默认9
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
            isCanPublish: true
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
          if (this.data.imgList.length == 0 && this.data.content.length == 0) {
            this.setData({
              isCanPublish: false
            })
          }
        }
      }
    })
  },

  bindUploadPic(e) {
    var pics = wx.getStorageSync('pics') || []
    var pic
    var date = util.formatDate(new Date(), ".");
    pics.forEach((item, index) => {
      if (item.date == date) {
        pic = item
      }
    })
    if (pic) {
      this.data.imgList.reverse()
      this.data.imgList.forEach(item => pic.imgList.unshift(item))
    } else {
      pic = {}
      pic.date = date
      pic.imgList = this.data.imgList
      // daox
      // pic.imgList.reverse() 
      pics.unshift(pic)
    }
    wx.setStorageSync('pics', pics)
    wx.navigateBack({})
  },

  contentInput (e) {
    // 获取输入框的内容
    var value = e.detail.value
    // 获取输入框内容的长度
    var len = parseInt(value.length)
    var isCanPublish = this.data.isCanPublish
    if (len == 0 && this.data.imgList.length == 0) {
      isCanPublish = false
    }else {
      isCanPublish = true
    }
    if (len <= this.data.wordMax) {
      this.setData({
        currentWordNumber: len,
        content: value,
        isCanPublish: isCanPublish
      })
    } else {
      return
    }
  },

  bindPublish (e) {
    var shareInfo = this.data.shareInfo
    shareInfo['content'] = this.data.content
    shareInfo['userId'] = app.globalData.userInfo.id
    shareInfo['address'] = '上海市青浦区上海汉得信息技术股份有限公司'
    shareInfo['isShowLocation'] = true
    this.setData({
      shareInfo: shareInfo
    })
    console.info(shareInfo)
    var url = '/v1/share/info'
    wxRequest.wxPost(url, shareInfo, (res) => {
      console.info(res)
      wx.navigateBack({})
    }, (err) => {
      console.info(err)
    })
  }
})