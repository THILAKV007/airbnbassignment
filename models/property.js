const mongoose = require('mongoose')

const propertiesSchema = new mongoose.Schema(
  {
    name: { type: String, default: '' },
    about: { type: String, default: '' },
    ownerid: { type: mongoose.Schema.Types.ObjectId, ref: 'Owners' },
    location: { type: String, default: '' },
    review: { type: String, default: '' },
    pricePerDay: { type: String, default: '' }
  },
  {
    timestamps: true
  }
)

const model = mongoose.model('Properties', propertiesSchema, 'Properties')
module.exports = model
