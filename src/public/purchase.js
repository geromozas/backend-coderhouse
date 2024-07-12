// document.addEventListener("DOMContentLoaded", () => {
//   const purchaseButton = document.getElementById("purchaseButton");

//   if (purchaseButton) {
//     purchaseButton.addEventListener("click", async () => {
//       const cartId = purchaseButton.getAttribute("data-cart-id");
//       const purchaser = purchaseButton.getAttribute("data-purchaser-email");

//       console.log("Cart ID:", cartId);
//       console.log("Purchaser Email:", purchaser);

//       if (!purchaser) {
//         alert("Error: No hay un usuario autenticado.");
//         return;
//       }

//       try {
//         const response = await fetch(`/api/carts/${cartId}/purchase`, {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ purchaser }),
//         });

//         if (!response.ok) {
//           const errorData = await response.json();
//           throw new Error(errorData.message);
//         }

//         const result = await response.json();
//         alert(
//           `Compra realizada con éxito. Código: ${result.code}, Monto: U$S${result.amount}`
//         );
//         console.log(result);
//         // Redireccionar o actualizar la vista según sea necesario
//       } catch (error) {
//         alert(`Error en la compra: ${error.message}`);
//         console.error(error);
//       }
//     });
//   }
// });
document
  .getElementById("purchaseButton")
  .addEventListener("click", async () => {
    const cartId = document
      .getElementById("purchaseButton")
      .getAttribute("data-cart-id");
    const purchaser = document
      .getElementById("purchaseButton")
      .getAttribute("data-purchaser-email");

    console.log("Cart ID:", cartId);
    console.log("Purchaser Email:", purchaser);

    if (!purchaser) {
      alert("Error: No hay un usuario autenticado.");
      return;
    }

    try {
      const response = await fetch(`/api/carts/${cartId}/purchase`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ purchaser }),
      });

      if (response.ok) {
        const data = await response.json();
        alert(
          `Compra realizada con éxito. Código: ${data.code}, Monto: U$S${data.amount}`
        );
        window.location.reload();
      } else {
        const errorData = await response.json();
        alert(`Error en la compra: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Ocurrió un error al realizar la compra.");
    }
  });
