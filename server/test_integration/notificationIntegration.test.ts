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
    const serviceId = 3;
    const counter = 3;

    const response = await request(server).get(`/api/tickets/${serviceId}`);
    const ticketNumber = Number((response.body as string).split('-')[1]);
    const ws = await request(server).ws(`/api/tickets/notification/${serviceId}/${ticketNumber}`);

    ws.on('message', (data: WebSocket.RawData, isBinary: boolean) => {
      expect(isBinary).toBe(false);
      expect(data).toStrictEqual(Buffer.from(`${counter}\n`))
    });

    const ret = notificationController.notify(serviceId, ticketNumber, counter);
    expect(ret).toBe(true);
  });

  it('2 - negative ticket number', async () => {
    const serviceId = 3;
    const ticketNumber = -3;

    try {
      await request(server).ws(`/api/tickets/notification/${serviceId}/${ticketNumber}`);
    } catch (error) {
      expect((error as Error).message).toContain('422');
    }
  });

  it('3 - non numeric ticket number', async () => {
    const serviceId = 3;
    const ticketNumber = "hello";

    try {
      await request(server).ws(`/api/tickets/notification/${serviceId}/${ticketNumber}`);
    } catch (error) {
      expect((error as Error).message).toContain('422');
    }
  });
});