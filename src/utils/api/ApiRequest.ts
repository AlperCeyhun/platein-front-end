interface ApiRequestOptions<T = any> {
    endpoint: string; //api endpoint URL
    bodyData: T; // Data to be sent
    router: any; // router obj
    successRoute: string; 
    onError?: (error: any) => void;
  }
  
  export const apiRequest = async <T = any>({
    endpoint,
    bodyData,
    router,
    successRoute,
    onError,
  }: ApiRequestOptions<T>) => {
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyData),
      });
  
      if (response.ok) {
        router.push(successRoute);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "An error occurred.");
      }
    } catch (error) {
      if (onError) onError(error);
      else console.error("API Request Error:", error);
    }
  };
  