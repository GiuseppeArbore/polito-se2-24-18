

const baseURL = "http://localhost:3001/group18/"

/** ------------------- Services APIs ------------------------ */

async function getAllServices() {
    const response = await fetch(baseURL + 'services');
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


const API = { getAllServices }
export default API