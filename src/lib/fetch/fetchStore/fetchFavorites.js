const fetchFavorites = async (productId, method) => {

    const response = await fetch(
      `/api/user-page/favorites?productId=${productId}`,
      {
        method
      }
    );
    
 const data =  await response.json();
    if (!response.ok || !(response.status >= 200 && response.status < 300)) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return data;
};


export default fetchFavorites;
