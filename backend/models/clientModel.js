import mongoose from 'mongoose';
const clientSchema = mongoose.Schema({
  counter: {
    type: Number,
    default: 0,
  },
});

const Client = mongoose.model('Client', clientSchema);

export default Client;
