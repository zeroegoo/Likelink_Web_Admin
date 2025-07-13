const get = async <T>(apiMethod: string): Promise<T> =>  {
    try {
      const response = await fetch(apiMethod);
      if (!response.ok) {
        const errorMessage = `Response status: ${response.status} - ${response.statusText}`;
        throw new Error(errorMessage);
      }
      const json = await response.json();
      return json;
    } catch (error: any) {
      console.error(`Error fetching data: ${error.message}`);
      throw error;
    }
  };

  const post = async <T>(apiMethod: string, payload: Record<string, unknown>): Promise<T> => {
    try {
      const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
      const response = await fetch(apiMethod, {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(payload),
        redirect: "follow"
      });
  
      if (!response.ok) {
        const errorData = await response.json(); // Get the JSON body
        throw new Error(errorData.message); // Only keep the message
      }
  
      const json = await response.json();
      return json;
    } catch (error) {
      console.error("Error in fetch:", error);
      if (error instanceof Error) {
        throw new Error(`${error.message}`);
      } else {
        throw new Error("An unknown error occurred during data posting.");
      }
    }
  };
  
  export default { get, post };
  