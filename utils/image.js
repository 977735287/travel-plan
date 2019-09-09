const imageSize = (originalWidth, originalHeight) => {
  var imageSize = {};
  //图片高宽比
  var originalScale = originalHeight / originalWidth;
  //获取屏幕宽高 
  wx.getSystemInfo({
    success: function(res) {
      var windowWidth = res.windowWidth;
      var windowHeight = res.windowHeight;
      //屏幕高宽比 
      var windowscale = windowHeight / windowWidth;
      //图片高宽比小于屏幕高宽比 
      if (originalScale < windowscale) {
        //图片缩放后的宽为屏幕宽 
        imageSize.imageWidth = windowWidth;
        imageSize.imageHeight = (windowWidth * originalHeight) / originalWidth;
      } else { //图片高宽比大于屏幕高宽比 
        //图片缩放后的高为屏幕高 
        imageSize.imageHeight = windowHeight;
        imageSize.imageWidth = (windowHeight * originalWidth) / originalHeight;
      }
    }
  })
  return imageSize;
}

module.exports = { 
  imageSize: imageSize
}