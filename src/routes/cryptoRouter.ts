import { Router } from "express";
import { CryptoController } from "../controllers/cryptoController";

const router = Router();
const cryptoController = new CryptoController();

router.post("/encrypt", cryptoController.encryptData);
router.post("/decrypt", cryptoController.decryptData);

export default router;
