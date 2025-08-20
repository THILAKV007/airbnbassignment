const mongoose = require('mongoose')
const Owners = mongoose.model('Owners')

exports.createOwner = async (req, res) => {
  try {
    const owner = await Owners.create(req.body)
    res.status(200).json(owner)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

exports.getOwners = async (req, res) => {
  try {
    const owners = await Owners.find({})
    res.json(owners)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

exports.getOwnerById = async (req, res) => {
  try {
    const owner = await Owners.findById(req.params.id)
    res.json(owner)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
