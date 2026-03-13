import { Router } from "express";
import multer from "multer";
import { imagePaletteController } from "./ai-image-palette.controller";

const router = Router();
const upload = multer();

router.post("/image-palette", upload.single("image"), imagePaletteController);

export default router;
