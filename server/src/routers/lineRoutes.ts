import { Router } from 'express';
import LineController from '../controllers/lineController';

const router = Router();
const lineController = new LineController();


router.post('/line/next-customer', (req, res) =>{
    lineController.getNextCustomer(req, res)});


export default router;