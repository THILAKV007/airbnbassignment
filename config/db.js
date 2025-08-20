const mongoose = require('mongoose')
const { ServerApiVersion } = require('mongodb')
const config = require('./developmentProd')

mongoose
  .connect(config?.db, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true
    }
  })
  .then(() => console.log('MongoDB is connected'))
  .catch(err => console.log(err))

mongoose.connection.on('connected', function () {
  console.log('Mongoose default connection open')
})
mongoose.connection.on('error', function (err) {
  console.log('Mongoose default connection error: ' + err)
})
mongoose.connection.on('disconnected', function () {
  console.log('Mongoose default connection disconnected')
})
process.on('SIGINT', function () {
  mongoose.connection.close(function () {
    console.log(
      'Mongoose default connection disconnected through app termination'
    )
    process.exit(0)
  })
})

require('fs')
  .readdirSync(__dirname + '/../models')
  .forEach(file => require(`../models/${file}`))
