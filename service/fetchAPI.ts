const get = async (apiMethod: string): Promise<any> => {
    try {
      const response = await fetch(apiMethod);
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

  const post = async (apiMethod: string, payload: Record<string, unknown>): Promise<unknown> => {
    try {
      const response = await fetch(apiMethod, {
        method: "POST",
        credentials: 'include', // Match with AllowCredentials() on server
        headers: {
          'Content-Type': 'application/json', // Change from '*' to 'application/json'
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload),
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
  