export const generateRegistrationErrorESP = (user) => {
  return `Una o mas propiedades fueron enviadas incompletas o no son  válidas.
    Lista de propiedades requeridas:
     - first_name: type String, recibido: ${user.first_name}
     - last_name: type String, recibido: ${user.last_name}
     - emai: type String, recibido: ${user.email}
     - password: type String, recibido ${user.password}
    `;
};

export const generateRegistrationErrorENG = (user) => {
  return `One or more properties were sent incomplete or are not valid.
      List of required properties:
       - first_name: type String, received: ${user.first_name}
       - last_name: type String, received: ${user.last_name}
       - email: type String, received: ${user.email}
       - password: type String, received: ${user.password}
      `;
};

export const generatelEmailExistsError = ({ email }) => {
  return `Another user alredy exists with that email
     - email: ${email}
    `;
};

export const generateLoginError = (user) => {
  return `Invalid Credentials
    List of received credentials:
     - email: ${user.email}
     - password: ${user.password}
    `;
};
