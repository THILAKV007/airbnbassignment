const Properties = require('mongoose').model('Properties');

exports.createProperty = async (req, res) => {
  try {
    const property = await Properties.create(req.body);
    res.status(200).json(property);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getProperties = async (req, res) => {
  try {
    const properties = await Properties.find().populate('ownerid', 'name email');
    res.json(properties);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getPropertyById = async (req, res) => {
  try {
    const property = await Properties.findById(req.params.id).populate('ownerid', 'name email');
    res.json(property);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
