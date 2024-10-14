import { WebSocket } from 'ws';

class NotificationController {
    private active: Map<number, WebSocket>;

    constructor() {
        this.active = new Map();
    }

    add(ticketNumber: number, ws: WebSocket): void {
        this.active.set(ticketNumber, ws);
    }

    remove(ticketNumber: number): boolean {
        const ws = this.active.get(ticketNumber);

        if (!ws)
            return false;
        if (ws.readyState !== ws.CLOSED && ws.readyState !== ws.CLOSING)
            ws.close();

        return this.active.delete(ticketNumber);
    }

    notify(ticketNumber: number, counter: number): boolean {
        const ws = this.active.get(ticketNumber);
        if(!ws)
            return false;

        // TODO: is this blocking?
        ws.send(`${counter}\n`);

        return true;
    }
}

const notificationController = new NotificationController()

export default notificationController;