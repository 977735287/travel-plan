const app = getApp()
const util = require('../../../utils/util.js')

Component({
  options: {
    addGlobalClass: true,
  },
  data: {
    date: ''
  },
  attached() {
    this.setData({
      date: util.formatDate(new Date(), "-")
    })
  },
  methods: {

    bindEdit: function (e) {
      var url
      if (e.currentTarget.dataset.id) {
        url = '/pages/album/show1/index'
      } else {
        url = '/pages/album/show2/index'
      }
      wx.navigateTo({
        url: url,
      })
    },

    bindView(e) {
      wx.navigateTo({
        url: '/pages/album/index/index',
      })
    },

  },

})