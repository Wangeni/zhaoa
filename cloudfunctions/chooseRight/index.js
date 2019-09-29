// 使用了 async await 语法
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
const _ = db.command

cloud.init({
  env: "cloud-tirp-89b834"
})

exports.main = async (event, context) => {
  console.log(event.id)
  try {
    // return await db.collection('java').where({
    //   _id: event.id
    // })
    return await db.collection('java').doc(event.id)
    .update({
        data: {
          right: _.inc(1)
        },
      })
  } catch (e) {
    console.error(e)
  }
}