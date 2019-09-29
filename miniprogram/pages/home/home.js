//index.js
import Notify from '../../vant/notify/notify';
import Toast from '../../vant/toast/toast';
import Dialog from '../../vant/dialog/dialog';
//获取应用实例
const app = getApp()
// const db = cloud.database()
const db = wx.cloud.database();

Page({
  data: {
    motto: '',
    userInfo: '',
    hasUserInfo: false,
    progress: 1,
    dialogShow: false,
    buttons: [{ text: '误触' }, { text: '可' }],
    // currentRate: 1,
    // gradientColor: {
    //   '0%': '#3fecff',
    //   '100%': '#6149f6'
    // },
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    wx.getStorage({
      key: 'userInfo',
      success: function (res) {
        console.log('onShow')
        var hasBoo = true;
        if (typeof (res.data) == 'undefined') hasBoo = false;
        console.log(res.data)
        that.setData({
          userInfo: res.data,
          canIUse: true,
          hasUserInfo: hasBoo
        });
      },
    })

    db.collection('cheer').doc('WaneGi').get().then(res => {
      // console.log(res.data.value) 
      this.setData({
        progress: res.data.value
    });
    })

    // var userInfo = app.userInfo;
    // this.setData({
    //   userInfo: userInfo
    // });
  },
  onLoad: function () {   
    console.log('onLoad')

    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        },
        fail: res => {
          // app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: '',
            hasUserInfo: false
          })
        }
      })
    }
  },
  getUserInfo: function (e) {

    wx.cloud.callFunction({
      name: 'login',
      data: {

      },
      success: function (res) {
        wx.setStorage({
          key: 'openId',
          data: res.result.openid,
          success: function () {
            console.log(res.result.openid);
          }
        });
      },
      fail: console.error
    })
    // if (!userInfo && !hasUserInfo) {

      if (e.detail.userInfo != null) {
        db.collection('user').add({
          data: {
            // openId: res.result.openid,
            nickName: e.detail.userInfo.nickName,
            gender: e.detail.userInfo.gender,
            country: e.detail.userInfo.country,
            city: e.detail.userInfo.city,
            province: e.detail.userInfo.province,
            avatarUrl: e.detail.userInfo.avatarUrl,
            date: new Date()
          },
          success: res => {
            console.log('loginin success')
            // wx.setStorageSync('userInfo', e.detail.userInfo);
            wx.setStorage({
              key: 'userInfo',
              data: e.detail.userInfo,
              success: function () {
                console.log(e);
              }
            });
          },
          fail: e => {
            console.log('loginin fail')
          }
        })
      }
      // console.log(e.detail.userInfo)
      // wx.setStorageSync('_openid', res.result.openid);
      // wx.setStorageSync('loginBoo', e.detail.userInfo);
      app.globalData.userInfo = e.detail.userInfo;    

    // }
    
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      }),
        setTimeout(function () {
          wx.navigateTo({
            url: '../../pages/index/index',
          })
        }, 500)
      app.userInfo = e.detail.userInfo;
      console.log('loginin')
    } else {
      this.setData({
        userInfo: '',
        hasUserInfo: false
      })
    }

  },
  startQues: function (e) {
    console.log('startQues')
    wx.navigateTo({
      url: '../../pages/index/index',
    })
  },
  takeAdvice: function (e) {
    // Dialog.confirm({
    //   title: '标题',
    //   message: '弹窗内容'
    // }).then(() => {
    //   // on confirm
    // }).catch(() => {
    //   // on cancel
    // });
    this.setData({
      dialogShow: true
    })
  },
  tapDialogButton(e) {
    this.setData({
      dialogShow: false,
      showOneButtonDialog: false,
    })
    if (e.detail.index == 1){    
      // console.log(this.progress)
      // this.setData({
      //   progress: this.progress + 0.5
      // })
      wx.cloud.callFunction({
        name: 'cheer',
        data: {

        },
        success: function (res) {
          
        },
        fail: console.error
      })
      db.collection('cheer').doc('WaneGi').get().then(res => {
        // console.log(res.data.value) 
        this.setData({
          progress: res.data.value
        });
      })
    }
   

  }

})
