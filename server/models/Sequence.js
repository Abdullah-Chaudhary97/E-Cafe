const mongoose = require('mongoose');

const sequenceSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  seq: {
    type: Number,
    default: 0,
  },
});

const Sequence = mongoose.model('Sequence', sequenceSchema);

/**
 * Get next sequence number for a collection
 * @param {string} collectionName - Name of the collection
 * @returns {Promise<number>} - Next sequence number
 */
async function getNextSequence(collectionName) {
  const sequence = await Sequence.findByIdAndUpdate(
    collectionName,
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );
  return sequence.seq;
}

module.exports = { Sequence, getNextSequence };
