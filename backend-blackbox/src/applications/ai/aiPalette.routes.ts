import { Router } from "express";
import { generatePalette } from "./aiPalette.controller";

const router = Router();

router.post("/palette", generatePalette);

export default router;
