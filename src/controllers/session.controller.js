import { MongoUserManager } from "../dao/mongoManagers/mongoUserManager.js";
import { UserDTO } from "../dao/dto/user.dto.js";
import jwt from "jsonwebtoken";
import { transporter } from "../config/nodemailer.js";
import { createHash, isValidatePassword } from "../utils/bcrypt.js";

export const mongoUserManager = new MongoUserManager();

export const register = async (req, res) => {
  try {
    const newUser = await mongoUserManager.register(req.body);
    req.session.user = newUser.toObject();
    // res.redirect("http://localhost:8080/views/login");
    res.status(200).json(newUser);
  } catch (error) {
    req.logger.error(`${error} - ${new Date().toLocaleString()}`);
    console.log(error);
    res.status(500).json({ error: error.code, message: error.message });
  }
};

// export const login = async (req, res) => {
//   try {
//     const user = await mongoUserManager.login(req.body);
//     req.session.user = user;
//     // req.session.user = user.toObject();
//     res.redirect("http://localhost:8080/views/profile");
//     return;
//   } catch (error) {
//     req.logger.error(`${error} - ${new Date().toLocaleString()}`);
//     console.log(error);
//     res.status(500).json({ error: error.code, message: error.message });
//   }
// };

export const login = async (req, res) => {
  try {
    const user = await mongoUserManager.login(req.body);
    console.log("Usuario logueado:", user);
    req.session.user = user;
    res.redirect("http://localhost:8080/views/profile");
    return;
  } catch (error) {
    req.logger.error(`${error} - ${new Date().toLocaleString()}`);
    console.log(error);
    res.status(500).json({ error: error.code, message: error.message });
  }
};

export const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log("Error en logout:", err);
      res.status(500).send("Error en logout");
    }
  });
  res.redirect("http://localhost:8080/views/login");
};

export const recoverPassword = async (req, res) => {
  try {
    const { email } = req.body;
    console.log("Email recibido para recuperación:", email); //verificar el mail
    const user = await mongoUserManager.findOne({ email });
    if (!user) {
      return res.status(404).send("Usuario no encontrado");
    }

    console.log("Usuario encontrado:", user); //para verificar que el usuario fue encontrado

    const token = jwt.sign({ userId: user._id }, "secretKey", {
      expiresIn: "1h",
    });

    console.log("Token generado:", token); //verificar el token generado

    const resetLink = `http://localhost:8080/views/resetPassword?token=${token}`;

    console.log("Enlace de restablecimiento:", resetLink); //verificar el enlace de restablecimiento

    await transporter.sendMail({
      to: email,
      subject: "Recuperación de Contraseña",
      html: `<p>Haz clic en el siguiente enlace para restablecer tu contraseña:</p><p><a href="${resetLink}">Restablecer Contraseña</a></p>`,
    });

    console.log("Correo de restablecimiento enviado a:", email); //confirmar el envío del correo

    res.send("Correo de restablecimiento enviado");
  } catch (error) {
    console.error("Error al enviar el correo de restablecimiento:", error);
    res.status(500).send("Error al enviar el correo de restablecimiento");
  }
};

export const resetPassword = async (req, res) => {
  const { token, password } = req.body;

  try {
    console.log("Token recibido:", token); //verificar el token recibido

    const decoded = jwt.verify(token, "secretKey");
    console.log("Token decodificado:", decoded); //verificar el token decodificado

    const user = await mongoUserManager.findById(decoded.userId);

    if (!user) {
      return res.status(404).send("Usuario no encontrado");
    }

    console.log("Usuario encontrado para restablecer contraseña:", user); //verificar el usuario encontrado

    const isSamePassword = await mongoUserManager.comparePassword(
      user,
      password
    );
    if (isSamePassword) {
      return res
        .status(400)
        .send("La nueva contraseña no puede ser la misma que la anterior");
    }

    user.password = createHash(password);
    await user.save();
    res.send("Contraseña restablecida con éxito");
    console.log(token);
  } catch (error) {
    res.status(400).send("Token inválido o expirado");
  }
};

export const getCurrentUser = async (req, res) => {
  const userDTO = new UserDTO(req.session.user);
  res.render("current", { user: userDTO });
};

export const changeRole = async (req, res) => {
  try {
    const { uid } = req.params;
    const user = await mongoUserManager.findById(uid);
    if (!user) {
      res.status(404).send("Usuario no encontrado");
    }

    if (user.role === "user") {
      const requiredDocuments = [
        "identificación",
        "comprobante de domicilio",
        "comprobante de estado de cuenta",
      ];
      const uploadedDocuments = user.documents.map((doc) => doc.name);

      const hasAllDocuments = requiredDocuments.every((doc) =>
        uploadedDocuments.includes(doc)
      );

      if (!hasAllDocuments) {
        return res
          .status(400)
          .send("El usuario no ha terminado de procesar su documentación.");
      }
    }

    user.role = user.role === "premium" ? "user" : "premium";
    await user.save();
    res.send("Rol de usuario cambiando con exito");
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const uploadDocuments = async (req, res) => {
  try {
    const user = await mongoUserManager.findById(req.params.uid);

    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado." });
    }

    // Actualizar el estado del usuario con los documentos subidos
    req.files.forEach((file) => {
      user.documents.push({
        name: file.originalname,
        reference: file.path,
      });
    });

    await user.save();

    res.status(200).json({ message: "Documentos subidos exitosamente.", user });
  } catch (error) {
    console.error("Error al subir documentos:", error);
    res.status(500).json({ error: "Error interno del servidor." });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await mongoUserManager.getAll();
    const usersDTO = users.map((user) => ({
      name: `${user.first_name} ${user.last_name}`,
      email: user.email,
      role: user.role,
    }));
    res.status(200).send(usersDTO);
  } catch (error) {
    console.error("Error al intentar obtener todos los usuarios");
    res.status(500).send(error.message);
  }
};

export const deleteInactiveUsers = async (req, res) => {
  try {
    const now = new Date();
    const threshold = new Date(now.getTime() - 30 * 60 * 1000);

    const inactiveUsers = await mongoUserManager.findInactiveSince(threshold);

    await Promise.all(
      inactiveUsers.map(async (user) => {
        await transporter.sendMail({
          to: user.email,
          subject: "Cuenta eliminada por inactividad",
          html: `<p>Tu cuenta ha sido eliminada debido a inactividad.</p>`,
        });
        await user.remove();
      })
    );
    console.log("Usuarios eliminados:", inactiveUsers);

    res.status(200).send("Usuarios inactivos eliminados y notificados.");
  } catch (error) {
    res.status(500).send(error.message);
  }
};
