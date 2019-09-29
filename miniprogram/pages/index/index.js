import Notify from '../../vant/notify/notify';
import Toast from '../../vant/toast/toast';
import Dialog from '../../vant/dialog/dialog';

const db = wx.cloud.database()
const _ = db.command

Page({

  /**
   * 页面的初始数据
   */
  data: {
    ques_list: [],
    steps: [
      {
        text: '1',
      },
      {
        text: '2',        
      },
      {
        text: '3',        
      },
      {
        text: '4',        
      },
      {
        text: '5',       
      },
      {
        text: '6',        
      },
      {
        text: '7',        
      },
      {
        text: '8',        
      },
      {
        text: '9',       
      },
      {
        text: '10',        
      },
    ],
    choose: "",
    answer: "",
    mark : true,
    active: []

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('onLoad')
    var _this = this;
    var count = 206;

    db.collection('java')
    .where({
      randomKey: _.in([
        Math.floor(Math.random() * count), Math.floor(Math.random() * count),
        Math.floor(Math.random() * count), Math.floor(Math.random() * count),
        Math.floor(Math.random() * count), Math.floor(Math.random() * count),
        Math.floor(Math.random() * count), Math.floor(Math.random() * count),
        Math.floor(Math.random() * count), Math.floor(Math.random() * count)
        ])
      })
    // .limit(10)
    .get({
      success: res =>{
        // console.log(res.data)
        //console.log((res.data[0]))
        this.setData({
          ques_list: res.data,
          active: 0
        })
        // console.log(ques_list)
      }
    })
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
    console.log('onShow')
    // this.onLoad();
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

  nextQues: function (e) {
  //console.log(e)
  // return {
  //   active: 2
  // };
  //console.log(1)
    // console.log(e.currentTarget.dataset.index);
    var index = e.currentTarget.dataset.index;
    
    if (index + 1 >= 10){
      Dialog.alert({
        message: '已经是最后一题了，点击确定返回'
      }).then(() => {
        wx.switchTab({
          url: '../../pages/home/home'
        })
        // wx.navigateTo({
        //   url: '../../pages/home/home'
        // })
      });
    } else{
      this.setData({
        active: index + 1,
        mark : true,
        choose: "",
        answer: ""
      })
    }

  },

  // onClick: function (e) {
    // Dialog.alert({
    //   title: '标题',
    //   message: '弹窗内容'
    // }).then(() => {
    //   // on close
    // });
    
    // Notify({ type: 'primary', message: 'Notify Message' });
  // }

  checkChoice : function(e){
    var choose = e.currentTarget.dataset.choose;
    var answer = e.currentTarget.dataset.answer;
    var id = e.currentTarget.dataset.id;
    var mark = e.currentTarget.dataset.mark;
    console.log(id)
    // console.log(answer)
    if(choose == answer){
      if (mark == true){
        wx.cloud.callFunction({
          name: 'chooseRight',
          data: {
            id: id
          },
          success: function (res) {
            console.log(res.result)
          },
          fail: console.error
        })

        db.collection('quesHistory').add({
          data: {
            ques_id: e.currentTarget.dataset.id,
            ask: e.currentTarget.dataset.ask,
            course: 'java',
            status: 0, // 0 正确 ， 1 错误
            date: new Date()
          },
          success: res => {

          },
          fail: e => {

          }
        })

      }
      console.log(mark)
      this.setData({
        mark: false,
        choose: answer,
        answer: answer
      })
    }else{
      // console.log(false)
      if (mark == true) {
        wx.cloud.callFunction({
          name: 'chooseWrong',
          data: {
            id: id
          },
          success: function (res) {
            console.log(res.result)
          },
          fail: console.error
        })

        db.collection('quesHistory').add({
          data: {
            ques_id: e.currentTarget.dataset.id,
            ask: e.currentTarget.dataset.ask,
            course: 'java',
            status: 1, // 0 正确 ， 1 错误
            date: new Date()            
          },
          success: res => {
            
          },
          fail: e => {
           
          }
        })

      }
      console.log(mark)
      this.setData({
        mark: false,
        choose: choose,
        answer: answer
      })
    }
  },
  correct: function (e) {
    wx.navigateTo({
      url: '../../pages/correction/correction?quesid=' + e.currentTarget.dataset.id
        + '&key=' + e.currentTarget.dataset.key
        + '&index=' + e.currentTarget.dataset.index,
    })
  },


})

// //index.js
// const app = getApp()

// Page({
//   data: {
//     avatarUrl: './user-unlogin.png',
//     userInfo: {},
//     logged: false,
//     takeSession: false,
//     requestResult: ''
//   },

//   onLoad: function() {
//     if (!wx.cloud) {
//       wx.redirectTo({
//         url: '../chooseLib/chooseLib',
//       })
//       return
//     }

//     // 获取用户信息
//     wx.getSetting({
//       success: res => {
//         if (res.authSetting['scope.userInfo']) {
//           // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
//           wx.getUserInfo({
//             success: res => {
//               this.setData({
//                 avatarUrl: res.userInfo.avatarUrl,
//                 userInfo: res.userInfo
//               })
//             }
//           })
//         }
//       }
//     })
//   },

//   onGetUserInfo: function(e) {
//     if (!this.logged && e.detail.userInfo) {
//       this.setData({
//         logged: true,
//         avatarUrl: e.detail.userInfo.avatarUrl,
//         userInfo: e.detail.userInfo
//       })
//     }
//   },

//   onGetOpenid: function() {
//     // 调用云函数
//     wx.cloud.callFunction({
//       name: 'login',
//       data: {},
//       success: res => {
//         console.log('[云函数] [login] user openid: ', res.result.openid)
//         app.globalData.openid = res.result.openid
//         wx.navigateTo({
//           url: '../userConsole/userConsole',
//         })
//       },
//       fail: err => {
//         console.error('[云函数] [login] 调用失败', err)
//         wx.navigateTo({
//           url: '../deployFunctions/deployFunctions',
//         })
//       }
//     })
//   },

//   // 上传图片
//   doUpload: function () {
//     // 选择图片
//     wx.chooseImage({
//       count: 1,
//       sizeType: ['compressed'],
//       sourceType: ['album', 'camera'],
//       success: function (res) {

//         wx.showLoading({
//           title: '上传中',
//         })

//         const filePath = res.tempFilePaths[0]
        
//         // 上传图片
//         const cloudPath = 'my-image' + filePath.match(/\.[^.]+?$/)[0]
//         wx.cloud.uploadFile({
//           cloudPath,
//           filePath,
//           success: res => {
//             console.log('[上传文件] 成功：', res)

//             app.globalData.fileID = res.fileID
//             app.globalData.cloudPath = cloudPath
//             app.globalData.imagePath = filePath
            
//             wx.navigateTo({
//               url: '../storageConsole/storageConsole'
//             })
//           },
//           fail: e => {
//             console.error('[上传文件] 失败：', e)
//             wx.showToast({
//               icon: 'none',
//               title: '上传失败',
//             })
//           },
//           complete: () => {
//             wx.hideLoading()
//           }
//         })

//       },
//       fail: e => {
//         console.error(e)
//       }
//     })
//   },

// })
