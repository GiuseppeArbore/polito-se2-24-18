import { WebSocket } from 'ws';

class NotificationController {
    private active: Map<string, WebSocket | null>;

    constructor() {
        this.active = new Map();
    }

    hasTicket(serviceType: number, ticketNumber: number): boolean {
        return this.active.has(`${serviceType}-${ticketNumber}`);
    }

    /**
     * To be called when delivering the ticket number to the customer.
     * @returns `false` if the ticket already exists, `true` otherwise
     */
    addTicket(serviceType: number, ticketNumber: number): boolean {
        if (this.hasTicket(serviceType, ticketNumber))
            return false;
        this.active.set(`${serviceType}-${ticketNumber}`, null);
        return true;
    }

    /**
     * To be called when a the user connects to the endpoint corresponding to the ticket.
     * If a connection already exists, it is overridden.
     * @returns `false` if the ticket does not exist, `true` otherwise
     */
    addConnection(serviceType: number, ticketNumber: number, ws: WebSocket): boolean {
        if (!this.removeConnection(serviceType, ticketNumber))
            return false;

        this.active.set(`${serviceType}-${ticketNumber}`, ws);
        return true;
    }

    /**
     * Removes a ticket from the active tickets. To be called when an user has been served.
     * @returns `false` if the ticket does not exist, `true` otherwise
     */
    removeTicket(serviceType: number, ticketNumber: number): boolean {
        if (!this.removeConnection(serviceType, ticketNumber))
            return false;

        return this.active.delete(`${serviceType}-${ticketNumber}`);
    }

    /**
     * Closes an existing connection for a specific ticket.
     * To be called in case the connection is interrupted.
     * @returns `false` if the ticket does not exist, `true` otherwise
     */
    removeConnection(serviceType: number, ticketNumber: number): boolean {
        const curr = this.active.get(`${serviceType}-${ticketNumber}`);
        if (curr === undefined)
            return false;
        if (curr && curr.readyState !== curr.CLOSED && curr.readyState !== curr.CLOSING) {
            curr.close();
        }

        this.active.set(`${serviceType}-${ticketNumber}`, null);
        return true;
    }

    /**
     * Notifies the user corresponding to the `ticketNumber`
     * @returns `false` if the ticket does not exist, `true` otherwise
     */
    notify(serviceType: number, ticketNumber: number, counter: number): boolean {
        const ws = this.active.get(`${serviceType}-${ticketNumber}`);
        if(!ws)
            return false;

        // TODO: is this blocking?
        ws.send(`${counter}\n`);

        return true;
    }

    removeAll(): void {
        this.active.forEach((value) => {
            if (value && value.readyState !== value.CLOSED && value.readyState !== value.CLOSING) {
                value.close();
            }
        });
        this.active.clear();
    }
}

const notificationController = new NotificationController()

export default notificationController;