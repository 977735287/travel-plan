const app = getApp()

Component({
  options: {
    addGlobalClass: true,
  },
  data: {

  },
  attached() {
    
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