import asyncHandler from 'express-async-handler';
import Client from '../models/clientModel.js';
// Fetch all commercials
//@route GET /api/commercials
//@access public
export const putClientConnections = asyncHandler(async (req, res) => {
  await Client.findOneAndUpdate(
    { _id: process.env.CONNECT },
    { $inc: { counter: 1 } }
  ).then(function (message) {
    res.send(message);
  });
});

export const decClientConnections = asyncHandler(async (req, res) => {
  await Client.findOneAndUpdate(
    { _id: process.env.CONNECT },
    { $inc: { counter: -1 } }
  ).then(function (message) {
    res.send(message);
  });
});

export const postClient = asyncHandler(async (req, res) => {
  const commercial = await Client.create({ counter: 0 });
  res.status(201).json(commercial);
});

// router.put('/:id/like', function (req, res, next) {
//   Message.findOneAndUpdate({ _id: req.params.id }, { $inc: { likes: 1 } })
//     .then(function (message) {
//       res.send(message);
//     })
//     .catch(next);
// });
