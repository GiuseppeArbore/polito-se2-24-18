import { Application } from "express";
import ticketRoutes from './routers/ticketRoutes';
import { app } from '../index';
import { Request, Response, NextFunction } from 'express';

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    const status: number = err.status || 500;
    res.status(status).json({ message: err.message });
  });

function initRoutes(app: Application) {
    app.get("/queue/number", async (req, res) => {
        res.status(200).json({ ok: "ok" });
    });

    app.use('/api', ticketRoutes);
}

export default initRoutes;