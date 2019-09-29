// pages/feedback/feedback.js

var util = require('../../utils/util.js'); //参数是util.js所在的路径，参照自个儿的
const db = wx.cloud.database();
import Toast from '../../vant/toast/toast';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    text: '',
    username: "",
    password: "",
    showCBtn: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  // textareaHandler: function (e) {
  //   this.setData({
  //     text: e.detail.value
  //   })
  // },
  // isfouce: function () {
  //   this.setData({
  //     hiddenmodalput: false
  //   })
  // },

  // textarea: function (e) {
  //   this.setData({
  //     textareaVal: e.detail.dataset.value
  //   })
  // },
  bindFormSubmit: function (e) {
    var input = e.detail.value.textarea;
    if (input) {
      db.collection('feedback').add({
        data: {
          content: input,
          date: new Date(),
          // openId: wx.getStorageSync('openId')
        },
        success: res => {
          wx.showToast({
            title: 'Success',
          })

          setTimeout(() => {
            wx.switchTab({
              url: '../../pages/my/my',
            })
          }, 500)
        },
        fail: e => {
          wx.showToast({
            title: '提交意见/建议失败',
            icon: 'none'
          })
        }
      })
    } else {
      wx.showToast({
        title: '提交不能为空!',
        icon: 'none',
        duration: 2000
      }) 
    }


  },
  // onClickButtonSubmit: function (e, content, contact) {
  //   console.log(e)
  //   console.log(content)
  //   console.log(contact)
  // },

  // complete: function () {
    
  //   var that = this;
  //   console.log(that.data.text)
  //   if (this.data.text) {
     
  //   }
  // }

})