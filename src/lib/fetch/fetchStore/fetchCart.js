 const fetchCart = async ( productId, method) => {

    const response = await fetch(
      `/api/user-page/cart?productId=${productId}`,
      {
        method: method || 'GET'
      }
    );

    const data = await response.json();
 if (!response.ok || !(response.status >= 200 && response.status < 300)) {
   throw new Error(`HTTP error! Status: ${response.status}`);
 }
    return data.cart;


};


export default fetchCart;