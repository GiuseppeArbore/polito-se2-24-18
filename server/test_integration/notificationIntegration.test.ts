import request from 'superwstest';
import WebSocket from 'ws';
import { server } from '../index';
import notificationController from '../src/controllers/notificationController';

describe('Notification controller API tests', () => {

  beforeEach((done) => {
    server.listen(0, 'localhost', done)
  });
  afterEach((done) => {
    server.close(done)
  });

  it('1 - correct api usage', async () => {
    const ticketNumber = 3;
    const counter = 3;

    const ws = await request(server).ws(`/api/tickets/notification/${ticketNumber}`);

    ws.on('message', (data: WebSocket.RawData, isBinary: boolean) => {
      expect(isBinary).toBe(false);
      expect(data).toStrictEqual(Buffer.from(`${counter}\n`))
    });

    notificationController.notify(ticketNumber, counter);
  });

  it('2 - negative ticket number', async () => {
    const ticketNumber = -3;

    try {
      await request(server).ws(`/api/tickets/notification/${ticketNumber}`);
    } catch (error) {
      expect((error as Error).message).toContain('422');
    }
  });

  it('3 - non numeric ticket number', async () => {
    const ticketNumber = "hello";

    try {
      await request(server).ws(`/api/tickets/notification/${ticketNumber}`);
    } catch (error) {
      expect((error as Error).message).toContain('422');
    }
  });
});