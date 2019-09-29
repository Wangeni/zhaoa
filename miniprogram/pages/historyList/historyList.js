const app = getApp()
const db = wx.cloud.database();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // loading: false,
    // finished: false,
    // error: false,
    sourceList: [],
    sourceList2: [],
    // quesIdList: [],
    answer : '',
    activeNames: ['1'],
    activeNames2: ['1']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('onLoad'); 
    // console.log(options.openid)
    var optionsOpenid = options.openid;
    console.log(optionsOpenid)
    var that = this;

    wx.cloud.callFunction({
      name: 'openid',
      data: {

      },
      success: function (res) {
        console.log(res.result.OPENID)
      },
      fail: console.error
    })
    if (optionsOpenid == '' || typeof (optionsOpenid) == 'undefined'){
        wx.cloud.callFunction({
        name: 'openid',
        data: {

        },
        success: function (res) {
          console.log(res.result.OPENID)
          db.collection('quesHistory').orderBy('date', 'desc')
            .where({
              _openid: res.result.OPENID,
              course: 'java'
            })
            .limit(20)
            .get({
              success: res => {
                that.setData({
                  sourceList: res.data,
                })
              }
            })

          db.collection('quesHistory').orderBy('date', 'desc')
            .where({
              _openid: res.result.OPENID,
              course: 'java',
              status: 1
            })
            .limit(20)
            .get({
              success: res => {
                that.setData({
                  sourceList2: res.data,
                })
              }
            })
        },
        fail: console.error
      })
    }
    else{
      db.collection('quesHistory').orderBy('date', 'desc')
        .where({
          _openid: optionsOpenid,
          course: 'java'
        })
        .limit(20)
        .get({
          success: res => {
            that.setData({
              sourceList: res.data,
            })
          }
        })

      db.collection('quesHistory').orderBy('date', 'desc')
        .where({
          _openid: optionsOpenid,
          course: 'java',
          status: 1
        })
        .limit(20)
        .get({
          success: res => {
            that.setData({
              sourceList2: res.data,
            })
          }
        })
    }   

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
    var that = this;
    wx.getStorage({
      key: 'userInfo',
      success: function (res) {
        console.log(res.data)
        // console.log(hasUserInfo)
        that.setData({
          userInfo: res.data,
          canIUse: true,
          hasUserInfo: true
        });
      },
      fail: function (res) {
        console.log(res.data)
        that.setData({
          userInfo: '',
          hasUserInfo: false
        });
      }
    })
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

  onChange(event) {
    // console.log(event.currentTarget.dataset.id)
    var ans = '';
    db.collection('java').doc(event.currentTarget.dataset.id).get().then(res => {
      // console.log(res.data.answer)
      if (res.data.answer == 'A') ans = res.data.A;
      if (res.data.answer == 'B') ans = res.data.B;
      if (res.data.answer == 'C') ans = res.data.C;
      if (res.data.answer == 'D') ans = res.data.D;
      // console.log(ans)
      this.setData({
        activeNames: event.detail,
        answer: ans
      });
    })
    
  },

  onChange2(event) {
    var ans = '';
    db.collection('java').doc(event.currentTarget.dataset.id).get().then(res => {
      if (res.data.answer == 'A') ans = res.data.A;
      if (res.data.answer == 'B') ans = res.data.B;
      if (res.data.answer == 'C') ans = res.data.C;
      if (res.data.answer == 'D') ans = res.data.D;
      this.setData({
        activeNames2: event.detail,
        answer: ans
      });
    })

  },

//   mounted() {
//     this.loadTableData()
//   },
//   methods: {
//     loadTableData() {
//       this.listQuery.current = 1
//       this.sourceList = []
//       this.getList()
//     },
//     onLoad() {
//       this.listQuery.current += 1
//       this.getList()
//     },
//     getList() {
//       getSupplierComparisonList(this.listQuery).then(res => {
//         let ret = res.data;
//         if (ret && ret.code === 1) {
//         this.loading = false
//           this.sourceList.push(ret.data.records)
//           if (ret.data.records.length < 10) {
//         this.finished = true
//       } else {
//         this.finished = false
//       }
//     }
//   }).catch(error => {
//     this.error = true
//   })
//   }  
// }

})