// const addToCart = (productId, cart_id) => {
//   console.log(`ID del producto: ${productId}, ID del carrito: ${cart_id}`);
//   fetch(`http://localhost:8080/api/carts/${cart_id}/product/${productId}`, {
//     method: "POST",
//     body: JSON.stringify({
//       quantity: 1,
//     }),
//     headers: {
//       "Content-Type": "application/json",
//     },
//   })
//     .then(() => {
//       alert("Producto agregado");
//     })
//     .catch((err) => console.log(err));
// };

// const deleteToCart = (productId, cart_id) => {
//   console.log(`ID del producto: ${productId}, ID del carrito: ${cart_id}`);
//   fetch(`http://localhost:8080/api/carts/${cart_id}/product/${productId}`, {
//     method: "DELETE",
//     headers: {
//       "Content-Type": "application/json",
//     },
//   })
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error("Error al eliminar el producto");
//       }
//       return response.json();
//     })
//     .then((data) => {
//       alert("Producto eliminado");
//     })
//     .catch((err) => console.error("Error:", err));
// };
const addToCart = (productId, cart_id) => {
  console.log(`ID del producto: ${productId}, ID del carrito: ${cart_id}`);
  fetch(`http://localhost:8080/api/carts/${cart_id}/product/${productId}`, {
    method: "POST",
    body: JSON.stringify({
      quantity: 1,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(() => {
      alert("Producto agregado");
    })
    .catch((err) => console.log(err));
};

const deleteToCart = (productId, cart_id) => {
  console.log(`ID del producto: ${productId}, ID del carrito: ${cart_id}`);
  fetch(`http://localhost:8080/api/carts/${cart_id}/product/${productId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      console.log("Response status:", response.status);
      if (!response.ok) {
        return response.json().then((errData) => {
          console.error("Error details:", errData);
          throw new Error("Error al eliminar el producto");
        });
      }
      return response.json();
    })
    .then((data) => {
      console.log("Response data:", data);
      alert("Producto eliminado");
      location.reload();
    })
    .catch((err) => console.error("Error:", err));
};
