import express from 'express';
import {
  decClientConnections,
  getClients,
  postClient,
  putClientConnections,
} from '../controllers/clientController.js';

const router = express.Router();

router.route('/counterUp').put(putClientConnections).post(postClient);
router.route('/counterDown').put(decClientConnections);
router.route('/').get(getClients);

export default router;
