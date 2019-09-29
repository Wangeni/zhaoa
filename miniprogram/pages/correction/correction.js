import Toast from '../../vant/toast/toast';
const db = wx.cloud.database();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    showModalStatus: false,
    quesid : '',
    key: '',
    index: '',
    items: [
      { name: 'ask', value: '问题', checked: 'true' },
      { name: 'choice', value: '选项'},
      { name: 'answer', value: '答案' },
    ],
    choice: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log("index", options.index)
    this.setData({
      quesid: options.quesid,
      key: options.key,
      index: options.quesid
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

  },
  bindFormSubmit: function (e) {
    var input = e.detail.value.errorDetail;
    var choiceValue = e.currentTarget.dataset.choice;
    // console.log(choiceValue)
    if (choiceValue == '') choiceValue = 'ask';
    if (choiceValue && input) {
      db.collection('correction').add({
        data: {
          ques_id: e.currentTarget.dataset.quesid,
          randomKey: e.currentTarget.dataset.key,
          errorType: choiceValue,
          // errorType: e.detail.value.errorType,
          errorDetail: input,
          date: new Date(),
        },
        success: res => {
          // Toast.success('错误反馈提交成功！');
          wx.showToast({
            title: 'Success',
          })

          setTimeout(() => {
            wx.navigateBack({
              url: '../../pages/index/index?back=' + e.currentTarget.dataset.mark,
            })
          }, 500)
        },
        fail: e => {
          // Toast.fail('出错，请联系开发人员');
          wx.showToast({
            title: '提交意见/建议失败',
            icon: 'none'
          })
        }
      })
    }else{
      wx.showToast({
        title: '必填项不能为空!',
        icon: 'none',
        duration: 2000
      }) 
    }

  },
  radioChange: function (e) {
    // console.log('radio发生change事件，携带value值为：', e.detail.value)
    this.setData({
      choice: e.detail.value,     
    })
  }


})