const addToCart = (id, cart_id) => {
  console.log(`ID del producto: ${id}, ID del carrito: ${cart_id}`);
  fetch(`http://localhost:8080/api/carts/${cart_id}/product/${id}`, {
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

const deleteToCart = (productId, cartId) => {
  console.log(`ID del producto: ${productId}, ID del carrito: ${cartId}`);
  fetch(`http://localhost:8080/api/carts/${cartId}/product/${productId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error al eliminar el producto");
      }
      return response.json();
    })
    .then((data) => {
      alert("Producto eliminado");
    })
    .catch((err) => console.error("Error:", err));
};
