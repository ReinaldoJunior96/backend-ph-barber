const mongoose = require('mongoose')

async function main () {
  try {
    //XuoMrMVAKifkRtUH
    mongoose.set('strictQuery', true)
    mongoose.connect(
      'mongodb+srv://reinaldojunior272:XuoMrMVAKifkRtUH@cluster0.zuatxy4.mongodb.net/?retryWrites=true&w=majority'
    )
  } catch (erro) {
    console.log(erro)
  }
}

module.exports = main
