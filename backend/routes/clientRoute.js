import express from 'express';
import { decClientConnections, postClient, putClientConnections } from '../controllers/clientController.js';

const router = express.Router();

router.route('/counterUp').put(putClientConnections).post(postClient);
router.route('/counterDown').put(decClientConnections);

export default router;
