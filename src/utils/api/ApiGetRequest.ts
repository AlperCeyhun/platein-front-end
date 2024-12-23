interface ApiRequestOptions<T = any> {
  endpoint: string;
  bodyData?: T;
  router: any;
  successRoute: string;
  onError?: (error: any) => void;
}

export const apiGetRequest = async <T = any>({
  endpoint,
  bodyData,
  router,
  successRoute,
  onError,
}: ApiRequestOptions<T>): Promise<T | void> => {  // API'den dönecek veriyi Promise olarak belirttik
  try {
    let url = new URL(endpoint);

    if (bodyData) {
      Object.keys(bodyData).forEach((key) => {
        url.searchParams.append(key, bodyData[key as keyof T] as string);
      });
    }

    const response = await fetch(url.toString(), {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const data = await response.json();
      router.push(successRoute);
      return data;
    } else {
      const errorData = await response.json();
      throw new Error(errorData.message || "An error occurred.");
    }
  } catch (error) {
    if (onError) onError(error);
    else console.error("API Request Error:", error);
  }
};
