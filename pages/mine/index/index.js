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
    console.info(app.globalData.userInfo)
  },
  methods: {

  },
})