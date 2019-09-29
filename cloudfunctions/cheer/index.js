// 使用了 async await 语法
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
const _ = db.command

cloud.init({
  env: "cloud-tirp-89b834"
})

exports.main = async (event, context) => {
  // console.log(event.id)
  // console.log(event.key)
  try {
    return await db.collection('cheer').where({
      _id: 'WaneGi'
    }).update({
      data: {
        value: _.inc(0.1)
      },
    })
  } catch (e) {
    console.error(e)
  }
}