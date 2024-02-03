const fetchFunction = async (url, method) => {
  try {
    const response = await fetch(url, {
      method: method || "GET",
    });
    if (!response.ok || !(response.status >= 200 && response.status < 300)) {
      const error = new Error(response.statusText);
      error.status = response.status;
      throw error;
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export default fetchFunction;
