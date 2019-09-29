// pages/updateData/updateData.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    wx.cloud.callFunction({
      name: 'data',
      data: {

      },
      success: function (res) {

        console.log(res.result)
        console.log(res.result.count)
        for (let i = 150; i < 206; i++) {
          var id = res.result.data[i]._id;
          console.log(id)
          console.log(i + 1)
          wx.cloud.callFunction({
            name: 'updateRandomKey',
            data: {
              id: id,
              key: i + 1
            },
            success: function (res) {
              console.log('success')
            },
            fail: console.error
          })
        }

        //

      },
      fail: console.error
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

  }
})