import { faker } from "@faker-js/faker/locale/es";
import { generateProduct } from "./product.mocks.js";

export const generateUser = () => {
  let numbOfProducts = faker.number.int({ min: 0, max: 3 });
  let products = [];
  for (let i = 0; i < numbOfProducts; i++) {
    products.push(generateProduct());
  }

  const roles = ["cliente", "vendedor", "admin", "proveedor"];
  return {
    first_name: faker.person.firstName(),
    last_name: faker.person.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    id: faker.database.mongodbObjectId(),
    role: faker.helpers.arrayElements(roles),
    products,
  };
};
