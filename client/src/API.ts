const SERVER_URL='http://localhost:3001';

const getTicket = async (service_id:number) => {
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
  }

  
  const getAllServices = async () => {
    console.log("TH");
    const response = await fetch(`${SERVER_URL}/api/services`);
    console.log("services: ", response);
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