import { describe, test } from "@jest/globals"
import notificationController from "../src/controllers/notificationController";
import { WebSocket } from "ws";

jest.mock("ws");
const ws = new WebSocket("");
const ticketNumber = 4;

jest.mock("")
describe("NotificationController unit tests", () => {
    beforeEach(() => {
        notificationController.removeAll();
    })
    afterAll(() => {
        jest.clearAllMocks();
    })

    test("1 - normal usage", () => {
        const res = notificationController.addTicket(ticketNumber);

        expect(res).toStrictEqual(true);
    })
    test("2 - add already existing ticket", () => {
        notificationController.addTicket(ticketNumber);
        const res = notificationController.addTicket(ticketNumber);

        expect(res).toStrictEqual(false);
    })
    test("3 - add connection", () => {
        notificationController.addTicket(ticketNumber);
        const res = notificationController.addConnection(ticketNumber, ws);

        expect(res).toStrictEqual(true);
    })
    test("4 - add connection for non-existing ticket", () => {
        const res = notificationController.addConnection(ticketNumber, ws);

        expect(res).toStrictEqual(false);
    })
    test("5 - remove connection", () => {
        notificationController.addTicket(ticketNumber);
        notificationController.addConnection(ticketNumber, ws);
        const res = notificationController.removeConnection(ticketNumber);

        expect(res).toStrictEqual(true);
        expect(ws.close).toHaveBeenCalled();
    })
    test("6 - remove non-existing connection", () => {
        const res = notificationController.removeConnection(ticketNumber);

        expect(res).toStrictEqual(false);
        expect(ws.close).toHaveBeenCalled();
    })
    test("7 - remove ticket", () => {
        notificationController.addTicket(ticketNumber);
        const res = notificationController.removeTicket(ticketNumber);

        expect(res).toStrictEqual(true);
    })
    test("8 - remove non-existing ticket", () => {
        const res = notificationController.removeTicket(ticketNumber);

        expect(res).toStrictEqual(false);
    })
    test("9 - notify", () => {
        notificationController.addTicket(ticketNumber);
        notificationController.addConnection(ticketNumber, ws);
        const res = notificationController.notify(ticketNumber, 1);

        expect(res).toStrictEqual(true);
    })
    test("10 - notify non-existing connection", () => {
        notificationController.addTicket(ticketNumber);
        const res = notificationController.notify(ticketNumber, 1);

        expect(res).toStrictEqual(false);
    })
    test("10 - notify non-existing ticket", () => {
        const res = notificationController.notify(ticketNumber, 1);

        expect(res).toStrictEqual(false);
    })
});