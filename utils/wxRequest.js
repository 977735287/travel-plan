const urlPre = 'http://47.102.122.186'
// const urlPre = 'http://127.0.0.1:18080'

/**
 * 封装wx.request请求
 * method： 请求方式
 * url: 请求地址
 * data： 要传递的参数
 * callback： 请求成功回调函数
 * errFun： 请求失败回调函a数
 **/
const wxRequest = (method, url, data, callback, errFun) => {
  wx.request({
    url: urlPre + url,
    method: method,
    data: data,
    header: {
      'content-type': 'application/json',
      'Accept': 'application/json'
    },
    dataType: 'json',
    success: res => {
      callback(res.data)
    },
    fail: err => {
      errFun(res)
    }
  })
}

const wxGet = (url, data, callback, errFun) => {
  wxRequest('GET', url, data, callback, errFun)
}

const wxPost = (url, data, callback, errFun) => {
  wxRequest('POST', url, data, callback, errFun)
}

const wxPut = (url, data, callback, errFun) => {
  wxRequest('PUT', url, data, callback, errFun)
}

const wxDelete = (url, data, callback, errFun) => {
  wxRequest('DELETE', url, data, callback, errFun)
}

module.exports = {
  wxGet: wxGet,
  wxPost: wxPost,
  wxPut: wxPut,
  wxDelete: wxDelete
}