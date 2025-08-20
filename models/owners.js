const mongoose = require('mongoose')

const ownersSchema = new mongoose.Schema(
  {
    name: { type: String, default: '' },
    email: { type: String, default: '' },
  },
  {
    timestamps: true
  }
)

const model = mongoose.model('Owners', ownersSchema, 'Owners')
module.exports = model
