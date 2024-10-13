import express from 'express';
import ServiceController from '../controllers/serviceController';

const router = express.Router();
const serviceController = new ServiceController();

router.get('/services/', (req, res, next) => {
  next();
}, (req, res) => serviceController.getAllServices(req,res));

export default router;