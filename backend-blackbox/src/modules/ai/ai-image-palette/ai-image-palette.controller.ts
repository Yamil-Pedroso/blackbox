import { Request, Response } from "express";
import { extractPaletteFromImage } from "./ai-image-palette.service";

export async function imagePaletteController(req: Request, res: Response) {
  try {
    const image = (req as Request & { file?: { buffer: Buffer } }).file;

    if (!image) {
      return res.status(400).json({ error: "Image is required" });
    }

    const palette = await extractPaletteFromImage(image.buffer);

    res.json({ palette });
  } catch (error) {
    res.status(500).json({ error: "Palette extraction failed" });
  }
}
