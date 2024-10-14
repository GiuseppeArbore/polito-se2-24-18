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

  
  const getAllServices = async () => {
   
    const response = await fetch(`${SERVER_URL}/api/services`);
    if (response.ok) {
        const services = await response.json()
        return services;
    } else {
        const errDetail = await response.json();
        if (errDetail.error)
            throw errDetail.error
        if (errDetail.message)
            throw errDetail.message
        throw new Error("Error. Please reload the page")
    }
}

const API ={ getTicket, getAllServices };
export default API;