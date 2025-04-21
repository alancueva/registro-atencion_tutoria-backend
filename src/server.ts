// ---------- src/server.ts ----------
import app from './app';
import config from './config/config';

const PORT = config.app.port;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});