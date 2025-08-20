const Reservations = require('mongoose').model('Reservations')

exports.createReservation = async (req, res) => {
  try {
    const reservation = await Reservations.create(req.body)
    res.status(200).json(reservation)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

exports.getReservations = async (req, res) => {
  try {
    const reservations = await Reservations.find()
      .populate('propertyId')
      .populate('userId')
      .populate('ownerId')
    res.json(reservations)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

exports.getReservationById = async (req, res) => {
  try {
    const reservation = await Reservations.findById(req.params.id)
      .populate('propertyId')
      .populate('userId')
      .populate('ownerId')
    res.json(reservation)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
