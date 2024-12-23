interface ApiRequestOptions<T = any> {
  endpoint: string;
  bodyData: T;
  router: any;
  successRoute: string;
  onError?: (error: any) => void;
}

export const apiPostRequest = async <T = any, R = any>({
  endpoint,
  bodyData,
  router,
  successRoute,
  onError,
}: ApiRequestOptions<T>): Promise<R | void> => {
  try {
    let url = new URL(endpoint);

    if (bodyData) {
      Object.keys(bodyData).forEach((key) => {
        url.searchParams.append(key, bodyData[key as keyof T] as string);
      });
    }

    const response = await fetch(endpoint, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyData),
    });

    if (response.ok) {
      const data: R = await response.json();  // Burada doğru türde veri alıyoruz
      router.push(successRoute);
      return data;  // Dönen veriyi doğru türde döndürüyoruz
    } else {
      const errorData = await response.json();
      throw new Error(errorData.message || "An error occurred.");
    }
  } catch (error) {
    if (onError) onError(error);
    else console.error("API Request Error:", error);
  }
};
