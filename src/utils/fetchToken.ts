import { URI_SETTINGS } from "./config";

  // Function to fetch a token from the /auth endpoint
  export const fetchToken = async () => {
    try {
      const raw = await fetch(URI_SETTINGS.auth()); // Adjust method if your /auth uses POST
      const res = await raw.json();
      const newToken = res.access_token;
      return newToken;
    } catch (error) {
      console.log(error);
    }
  };