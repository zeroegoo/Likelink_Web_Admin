
import { getApiBaseUrl } from '~/config/api'

const get = async <T>(apiMethod: string): Promise<T> =>  {
    try {
      const baseURL = getApiBaseUrl()
      const response = await fetch(baseURL + apiMethod);
      if (!response.ok) {
        const errorMessage = `Response status: ${response.status} - ${response.statusText}`;
        throw new Error(errorMessage);
      }
      const json = await response.json();
      console.log(json);
      return json;
    } catch (error: any) {
      console.error(`Error fetching data: ${error.message}`);
      throw error;
    }
  };

  const post = async <T>(apiMethod: string, payload: Record<string, unknown>): Promise<T> => {
    try {
      console.log(baseURL)
      const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
      const response = await fetch(baseURL + apiMethod, {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(payload),
        redirect: "follow"
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        console.error(`Response error: ${errorText}`);
        throw new Error(`HTTP error! status: ${response.status}, ${response.statusText}, Details: ${errorText}`);
      }
  
      const json = await response.json();
      return json;
    } catch (error) {
      console.error("Error in fetch:", error);
      if (error instanceof Error) {
        throw new Error(`Failed to post data: ${error.message}`);
      } else {
        throw new Error("An unknown error occurred during data posting.");
      }
    }
  };
  
  export default { get, post };
  