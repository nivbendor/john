import { URI_SETTINGS } from "./config";

export const fetchData = async (searchParams: URLSearchParams, token) => {
  if (!token) {
    return
  }
  // else

  const url = new URL(URI_SETTINGS.quote());
  url.search = searchParams.toString();

  // Await the fetch call and assign its result to 'response'
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`
    },
  });

  // Check if the response is not ok
  if (!response.ok) {
    console.log('status', response.status, response);
    // You can add additional handling for a 401 status here
    if (response.status === 401) {
      console.error("Token expired or unauthorized");
      // Optionally, throw an error or handle token refresh logic here
    }
    throw new Error('Something went wrong ' + response.status + ' : ' + response.statusText);
  }

  // Parse the JSON from the response
  const res = await response.json();

  // If the API returns a 201 status in the JSON, return the data.
  // Note: response.status is already checked; if your API includes a status in the JSON body,
  // adjust accordingly.
  if (response.status === 201) {
    return res.data;
  }
  
  // Otherwise, return the whole JSON object or handle as needed.
  return res;
};
