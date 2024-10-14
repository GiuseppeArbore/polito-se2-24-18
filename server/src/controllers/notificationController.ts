import { WebSocket } from 'ws';

class NotificationController {
    private active: Map<number, WebSocket | null>;

    constructor() {
        this.active = new Map();
    }

    hasTicket(ticketNumber: number): boolean {
        return this.active.has(ticketNumber);
    }

    /**
     * To be called when delivering the ticket number to the customer.
     * @returns `false` if the ticket already exists, `true` otherwise
     */
    addTicket(ticketNumber: number): boolean {
        if (this.hasTicket(ticketNumber))
            return false;
        this.active.set(ticketNumber, null);
        return true;
    }

    /**
     * To be called when a the user connects to the endpoint corresponding to the ticket.
     * If a connection already exists, it is overridden.
     * @returns `false` if the ticket does not exist, `true` otherwise
     */
    addConnection(ticketNumber: number, ws: WebSocket): boolean {
        if (!this.removeConnection(ticketNumber))
            return false;

        this.active.set(ticketNumber, ws);
        return true;
    }

    /**
     * Removes a ticket from the active tickets. To be called when an user has been served.
     * @returns `false` if the ticket does not exist, `true` otherwise
     */
    removeTicket(ticketNumber: number): boolean {
        if (!this.removeConnection(ticketNumber))
            return false;

        return this.active.delete(ticketNumber);
    }

    /**
     * Closes an existing connection for a specific ticket.
     * To be called in case the connection is interrupted.
     * @returns `false` if the ticket does not exist, `true` otherwise
     */
    removeConnection(ticketNumber: number): boolean {
        const curr = this.active.get(ticketNumber);
        if (curr === undefined)
            return false;
        if (curr && curr.readyState !== curr.CLOSED && curr.readyState !== curr.CLOSING) {
            curr.close();
        }

        this.active.set(ticketNumber, null);
        return true;
    }

    /**
     * Notifies the user corresponding to the `ticketNumber`
     * @returns `false` if the ticket does not exist, `true` otherwise
     */
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