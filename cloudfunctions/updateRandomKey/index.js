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
    return await db.collection('java').where({
       _id: event.id
      // randomKey : 1
    }).update({
      data: { 
        randomKey: _.set(event.key)
      },
    })
  } catch (e) {
    console.error(e)
  }
}