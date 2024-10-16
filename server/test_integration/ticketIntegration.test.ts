import request from 'supertest';
import { server } from '../index';
import TicketDao from '../src/dao/ticketDao'; // Import the DAO

const ticketDao = new TicketDao();

// Function to reset counters for all services
const resetServiceCounters = async () => {
  await ticketDao.resetServiceCounters();
};

describe('Ticket API Integration Tests', () => {
  beforeEach(async () => {
    await resetServiceCounters(); // Reset counters before each test
  });

  // Test to check if the API returns a ticket for a given service_id
  it('1 - should return ticket for a given service_id', async () => {
    const serviceId = 3;

    const response = await request(server).get(`/api/tickets/${serviceId}`);

    expect(response.status).toBe(200);
    expect(response.body).toBe("S3-1");
  });

  // Test to check if the API returns 400 when service_id is not provided
  it('2 - should return 400 if service_id is not provided', async () => {
    const response = await request(server).get('/api/tickets/');

    expect(response.status).toBe(404);
  });

  // Test to check if the API returns 500 when there is a database error
  it('3 - should return 400 if there is an invalid parameter', async () => {
    const invalidServiceId = 'invalid';

    const response = await request(server).get(`/api/tickets/${invalidServiceId}`);

    expect(response.status).toBe(400);
  });

  // Test to check if current_number and queue_length are incremented for a valid service_id
  it('4 - should increment current_number and queue_length for a valid service_id', async () => {
    const serviceId = 3;

    // First request
    let response = await request(server).get(`/api/tickets/${serviceId}`);
    expect(response.status).toBe(200);
    expect(response.body).toBe("S"+serviceId + "-" + 1);

    // Second request
    response = await request(server).get(`/api/tickets/${serviceId}`);
    expect(response.status).toBe(200);
    expect(response.body).toBe("S"+serviceId + "-" + 2);
  });

  // Test to check if the API returns 404 for a non-existent service_id
  it('5 - should return 404 for a non-existent service_id', async () => {
    const nonExistentServiceId = 999;

    const response = await request(server).get(`/api/tickets/${nonExistentServiceId}`);

    expect(response.status).toBe(404);
  });

  // Test to check if counters are reset for all services
  it('6 - should reset counters for all services', async () => {
    const serviceId = 3;

    // Increment counters
    await request(server).get(`/api/tickets/${serviceId}`);
    await request(server).get(`/api/tickets/${serviceId}`);

    // Reset counters
    await resetServiceCounters();

    // Verify counters are reset
    const response = await request(server).get(`/api/tickets/${serviceId}`);
    expect(response.status).toBe(200);
    expect(response.body).toBe("S"+serviceId + "-" + 1);
  });

  // Test to check if multiple services are handled independently
  it('7 - should handle multiple services independently', async () => {
    const serviceId1 = 3;
    const serviceId2 = 4;

    // Increment counters for the first service
    await request(server).get(`/api/tickets/${serviceId1}`);
    await request(server).get(`/api/tickets/${serviceId1}`);

    // Increment counters for the second service
    await request(server).get(`/api/tickets/${serviceId2}`);

    // Verify counters for the first service
    let response = await request(server).get(`/api/tickets/${serviceId1}`);
    expect(response.status).toBe(200);
    expect(response.body).toBe("S"+ serviceId1 + "-" + 3);

    // Verify counters for the second service
    response = await request(server).get(`/api/tickets/${serviceId2}`);
    expect(response.status).toBe(200);
    expect(response.body).toBe("S"+serviceId2+ "-" + 2);
  });

  // Test to check if the API returns 200 and correct ticket number after reset
  it('8 - should return 200 and correct ticket number after reset', async () => {
    const serviceId = 3;

    // Increment counters
    await request(server).get(`/api/tickets/${serviceId}`);
    await request(server).get(`/api/tickets/${serviceId}`);

    // Reset counters
    await resetServiceCounters();

    // Verify counters are reset
    const response = await request(server).get(`/api/tickets/${serviceId}`);
    expect(response.status).toBe(200);
    expect(response.body).toBe("S"+serviceId + "-" + 1);
  });

  // Test to check if counters are not incremented for an invalid service_id
  it('9 - should not increment counters for invalid service_id', async () => {
    const invalidServiceId = 'invalid';

    const response = await request(server).get(`/api/tickets/${invalidServiceId}`);
    expect(response.status).toBe(400);
  });

  // Test to check if the API handles concurrent requests correctly
  it('10 - should handle concurrent requests correctly', async () => {
    const serviceId = 3;

    // Perform concurrent requests
    const promises = [
      request(server).get(`/api/tickets/${serviceId}`),
      request(server).get(`/api/tickets/${serviceId}`),
      request(server).get(`/api/tickets/${serviceId}`)
    ];

    const responses = await Promise.all(promises);

    responses.forEach(response => {
      expect(response.status).toBe(200);
    });

    // Verify final ticket number
    const finalResponse = await request(server).get(`/api/tickets/${serviceId}`);
    expect(finalResponse.status).toBe(200);
    expect(finalResponse.body).toBe("S"+ serviceId + "-" + 4);
  });

  // Test to check if the API returns 200 and correct ticket number for different services
  it('11 - should return 200 and correct ticket number for different services', async () => {
    const serviceId1 = 3;
    const serviceId2 = 4;

    // Increment counters for the first service
    await request(server).get(`/api/tickets/${serviceId1}`);
    await request(server).get(`/api/tickets/${serviceId1}`);

    // Increment counters for the second service
    await request(server).get(`/api/tickets/${serviceId2}`);

    // Verify counters for the first service
    let response = await request(server).get(`/api/tickets/${serviceId1}`);
    expect(response.status).toBe(200);
    expect(response.body).toBe("S"+serviceId1 + "-" + 3);

    // Verify counters for the second service
    response = await request(server).get(`/api/tickets/${serviceId2}`);
    expect(response.status).toBe(200);
    expect(response.body).toBe("S"+serviceId2 + "-" + 2);
  });

  // Test to check if the API returns 200 and correct ticket number after multiple resets
  it('12 - should return 200 and correct ticket number after multiple resets', async () => {
    const serviceId = 3;

    // Increment counters
    await request(server).get(`/api/tickets/${serviceId}`);
    await request(server).get(`/api/tickets/${serviceId}`);

    // Reset counters
    await resetServiceCounters();

    // Increment counters again
    await request(server).get(`/api/tickets/${serviceId}`);
    await request(server).get(`/api/tickets/${serviceId}`);

    // Verify final ticket number
    const response = await request(server).get(`/api/tickets/${serviceId}`);
    expect(response.status).toBe(200);
    expect(response.body).toBe("S"+ serviceId + "-" + 3);
  });

  // Test to check if the API returns 200 and correct ticket number for multiple services after reset
  it('13 - should return 200 and correct ticket number for multiple services after reset', async () => {
    const serviceId1 = 3;
    const serviceId2 = 4;

    // Increment counters for both services
    await request(server).get(`/api/tickets/${serviceId1}`);
    await request(server).get(`/api/tickets/${serviceId2}`);

    // Reset counters
    await resetServiceCounters();

    // Verify counters for the first service
    let response = await request(server).get(`/api/tickets/${serviceId1}`);
    expect(response.status).toBe(200);
    expect(response.body).toBe("S"+serviceId1 + "-" + 1);

    // Verify counters for the second service
    response = await request(server).get(`/api/tickets/${serviceId2}`);
    expect(response.status).toBe(200);
    expect(response.body).toBe("S"+serviceId2 + "-" + 1);
  });

  // Test to check if the API returns 200 and correct ticket number after reset and concurrent requests
  it('14 - should return 200 and correct ticket number after reset and concurrent requests', async () => {
    const serviceId = 3;

    // Increment counters
    await request(server).get(`/api/tickets/${serviceId}`);
    await request(server).get(`/api/tickets/${serviceId}`);

    // Reset counters
    await resetServiceCounters();

    // Perform concurrent requests
    const promises = [
      request(server).get(`/api/tickets/${serviceId}`),
      request(server).get(`/api/tickets/${serviceId}`),
      request(server).get(`/api/tickets/${serviceId}`)
    ];

    const responses = await Promise.all(promises);

    responses.forEach(response => {
      expect(response.status).toBe(200);
    });

    // Verify final ticket number
    const finalResponse = await request(server).get(`/api/tickets/${serviceId}`);
    expect(finalResponse.status).toBe(200);
    expect(finalResponse.body).toBe("S"+serviceId + "-" + 4);
  });

  // Test to check if the API returns 200 and correct ticket number for multiple services with concurrent requests
  it('15 - should return 200 and correct ticket number for multiple services with concurrent requests', async () => {
    const serviceId1 = 3;
    const serviceId2 = 4;

    // Perform concurrent requests for the first service
    const promises1 = [
      request(server).get(`/api/tickets/${serviceId1}`),
      request(server).get(`/api/tickets/${serviceId1}`),
      request(server).get(`/api/tickets/${serviceId1}`)
    ];

    const responses1 = await Promise.all(promises1);

    responses1.forEach(response => {
      expect(response.status).toBe(200);
    });

    // Perform concurrent requests for the second service
    const promises2 = [
      request(server).get(`/api/tickets/${serviceId2}`),
      request(server).get(`/api/tickets/${serviceId2}`),
      request(server).get(`/api/tickets/${serviceId2}`)
    ];

    const responses2 = await Promise.all(promises2);

    responses2.forEach(response => {
      expect(response.status).toBe(200);
    });

    // Verify final ticket number for the first service
    let finalResponse = await request(server).get(`/api/tickets/${serviceId1}`);
    expect(finalResponse.status).toBe(200);
    expect(finalResponse.body).toBe("S"+serviceId1 + "-" + 4);

    // Verify final ticket number for the second service
    finalResponse = await request(server).get(`/api/tickets/${serviceId2}`);
    expect(finalResponse.status).toBe(200);
    expect(finalResponse.body).toBe("S"+ serviceId2 + "-" + 4);
  });
});