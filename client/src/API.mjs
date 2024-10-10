const SERVER_URL='http://localhost:3001';

const getTicket = async (service_id) => {
    try {
      const response = await fetch(`${SERVER_URL}/api/tickets/${service_id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ service_id })
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      return data.current_number;
    } catch (error) {
      throw error;
    }
  }
  
const API ={getTicket};
export default API;