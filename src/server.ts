// ---------- src/server.ts ----------
import app from './app';
import config from './config/config';

const PORT = config.app.port;

app.listen(PORT, () => {
  console.log(`Servidor está corriendo en el puerto:  ${PORT}`);
});