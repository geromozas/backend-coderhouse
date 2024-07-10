import multer from "multer";
import path from "path";

// Configurar destino y nombre de archivos según el tipo
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let uploadPath = "./uploads/documents/";

    // Determinar el directorio según el tipo de archivo
    if (req.body.type === "profile") {
      uploadPath = "./uploads/profiles/";
    } else if (req.body.type === "product") {
      uploadPath = "./uploads/products/";
    }

    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

// Filtrar los tipos de archivos permitidos
const fileFilter = (req, file, cb) => {
  // Permitir solo archivos PDF, por ejemplo
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(
      new Error("Formato de archivo no válido. Solo se permiten archivos PDF."),
      false
    );
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

export default upload;
