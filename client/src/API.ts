const SERVER_URL='http://localhost:3001';

const getTicket = async (service_id:number) => {
  const response = await fetch(`${SERVER_URL}/api/tickets/${service_id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  return data;
  }

  const getNextCustomer = async (service_ids: number[]) => {
    const response = await fetch(`${SERVER_URL}/api/line/next-customer`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ service_ids })
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data.nextCustomerId;
  };
  
const API ={getTicket,getNextCustomer};
export default API;