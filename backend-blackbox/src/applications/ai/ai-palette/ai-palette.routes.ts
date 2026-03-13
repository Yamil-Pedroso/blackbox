import { Router } from "express";
import { generatePalette } from "./ai-palette.controller";

const router = Router();

router.post("/palette", generatePalette);

export default router;
