import Notify from '../../vant/notify/notify';
import Toast from '../../vant/toast/toast';
import Dialog from '../../vant/dialog/dialog';

const app = getApp()
const db = wx.cloud.database();

Page({
  data: {
    motto: '',
    userInfo: '',
    hasUserInfo: false,
    openId : '',
    // loginBoo: wx.getStorageSync('loginBoo'),
    // show: false,
    // modalHidden: true,
    // imgUrls: [],//预览用的
    // dataList: '',//后台接口返回的数据  暂存区
    imglist: ['https://img-blog.csdnimg.cn/20190916194638896.png'],
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    var that = this;
   
    // 查看是否授权
    // wx.getSetting({
    //   success(res) {
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称
    //       wx.getUserInfo({
    //         success: function (res) {
    //           console.log(res.userInfo)
    //         }
    //       })
    //     }
    //   }
    // })
    this.setData({
      userInfo: '',
      hasUserInfo: false,
      canIUse: wx.canIUse('button.open-type.getUserInfo')
    })
    // console.log(app.globalData.userInfo)
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
        }
      })
    }
  },
  onShow: function () {
    console.log('my onShow')
    var that = this;
    // wx.getStorage({
    //   key: 'userInfo',
    //   success: function (res) {
    //     that.setData({
    //       userInfo: res.data,
    //       canIUse: true,
    //       hasUserInfo: true
    //     });
    //   },
    // })
    wx.getStorage({
      key: 'userInfo',
      success: function (res) {
        
        var mark = true;
        if (typeof (res.data) == "undefined") mark = false;
        console.log(mark)
        that.setData({
          userInfo: res.data,
          canIUse: true,
          hasUserInfo: mark
        });
      },
    })
    // this.onLoad();
    wx.getStorage({
      key: 'openId',
      success: function (res) {
        console.log(res.data)
        that.setData({
          openId: res.data
        });
      },
    })
  },
  getUserInfo: function (e) {
    var that = this;
    wx.cloud.callFunction({
      name: 'login',
      data: {

      },
      success: function (res) {
        wx.setStorage({
          key: 'userInfo',
          data: e.detail.userInfo,
          success: function () {
            console.log('xixi');
          }
        });
        that.setData({
          openId: res.result.openid
        })
      },
      fail: console.error
    })

    wx.setStorageSync('userInfo', e.detail.userInfo);
    // wx.setStorageSync('_openid', res.result.openid);
    app.globalData.userInfo = e.detail.userInfo;

    // if(e.detail.userInfo != null){
    //   db.collection('user').add({
    //     data: {
    //       // openId: res.result.openid,
    //       nickName: e.detail.userInfo.nickName,
    //       gender: e.detail.userInfo.gender,
    //       country: e.detail.userInfo.country,
    //       province: e.detail.userInfo.province,
    //       avatarUrl: e.detail.userInfo.avatarUrl,
    //       date: new Date()
    //     },
    //     success: res => {
    //       console.log('loginin success')
    //     },
    //     fail: e => {
    //       console.log('loginin fail')
    //     }
    //   })

    // }

    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else {
      this.setData({
        userInfo: '',
        hasUserInfo: false
      })
    }
  },
  aboutThis : function(){
    Dialog.alert({
      message: '本小程序的内容均来源于网络,如有侵权,请联系开发人员673684441@qq.com'
    }).then(() => {
      
    });
  },
  feedback: function () {
    wx.navigateTo({
      url: '../../pages/feedback/feedback',
    })
  },
  // reward : function() {
    // Toast({
    //   message: 'Custom Image',
    //   icon: '../../images/reward.png'
    // });
    // Dialog.confirm({
    //   message: '本小程序的内容由网络爬虫获取,如有侵权,请联系开发人员673684441@qq.com'
    //   image: "../../images/reward.png"
    // }).then(() => {

    // });
  // },

  previewImage: function (e) {
    var current = e.target.dataset.src;
    // console.log(current)
    wx.previewImage({
      current: current, // 当前显示图片的http链接 
      urls: this.data.imglist // 需要预览的图片http链接列表 
    })
  },

  history: function (e) {
    // var that = this;
    // wx.cloud.callFunction({
    //   name: 'login',
    //   data: {

    //   },
    //   success: function (res) {
    //     wx.setStorage({
    //       key: 'userInfo',
    //       data: e.detail.userInfo,
    //       success: function () {
    //         that.setData({
    //           openId: res.result.openid
    //         })
    //       }
    //     });        
    //   },
    //   fail: console.error
    // })
    
    var openid = e.currentTarget.dataset.openid;
    console.log(openid)
    console.log(this.data.hasUserInfo)
    console.log(this.data.canIUse)
    if (!this.data.hasUserInfo && this.data.canIUse) openid = 'null';
    console.log(openid)
    wx.navigateTo({
      url: '../../pages/historyList/historyList?openid=' + openid
    })
  },
  // buttonTap: function () {
  //   this.setData({
  //     modalHidden: false
  //   })
  // },

  // modalCandel: function () {
  //   // do something
  //   this.setData({
  //     modalHidden: true
  //   })
  // },

  // modalConfirm: function () {
  //   // do something
  //   this.setData({
  //     modalHidden: true
  //   })
  // }


})
