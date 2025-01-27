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
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        method: "POST",
        body: JSON.stringify(payload),
      });
  
      if (!response.ok) {
        throw new Error(`Response status: ${response.status} - ${response.statusText}`);
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      if (error instanceof Error) {
        console.error(`Error posting data: ${error.message}`);
      } else {
        console.error("An unknown error occurred:", error);
      }
      throw error;
    }
  };
  
  export default { get, post };
  