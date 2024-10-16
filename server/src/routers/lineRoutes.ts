import { Router, Response } from 'express';
import LineController from '../controllers/lineController';
import { validateRequest } from '../errorHandlers';
import { param } from 'express-validator'

const router = Router();
const lineController = new LineController();


router.post('/line/next-customer/:counter',[
        param("counter").exists().isInt({min: 0}),
    ],
    validateRequest,
    async (req: any, res: Response) => {
        const counter = Number(req.params.counter);
        lineController.getNextCustomer(req, res, counter);
    }
);


export default router;