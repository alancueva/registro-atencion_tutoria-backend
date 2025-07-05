import multer from 'multer';

/**
 * Middleware para manejar la carga de archivos de imagen.
 * Utiliza multer para almacenar la imagen en memoria.
 * Limita el tamaño del archivo a 10 MB.
 * 
 */
const storage = multer.memoryStorage();

const upload = multer({ 
  storage,
  limits: { fileSize: 10 * 1024 * 1024 } 
});

export default upload;