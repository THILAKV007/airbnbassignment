const mongoose = require('mongoose')

const reserveSchema = new mongoose.Schema(
  {
    name: { type: String, default: '' },
    checkInDate: { type: Date, default: Date.now },
    checkOutDate: { type: Date, default: null },
    propertyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Properties' },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
    ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Owners' },
    totalPrice: { type: Number, default: 0 },
    numberOfGuests: { type: Number, default: 0 },
    numberOfRooms: { type: Number, default: 0 },
    contactNumber: { type: String, default: '' },
    paymentStatus: { type: Number, default: 3 }, //1: Paid, 2: Unpaid, 3: Pending, 4: Refunded,5: Failed,6: Null
    status: { type: Number, default: 4 }, // 1: Confirmed, 2: Cancelled, 3: Pending, 4: null
    cancellationReason: { type: String, default: '' },
    specialRequests: { type: String, default: '' }
  },
  {
    timestamps: true
  }
)

const model = mongoose.model('Reservations', reserveSchema, 'Reservations')
module.exports = model
