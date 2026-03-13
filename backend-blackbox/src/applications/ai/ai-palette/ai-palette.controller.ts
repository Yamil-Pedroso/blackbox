import { Request, Response } from "express";
import { openai } from "../../../core/config/openai.client";

export const generatePalette = async (req: Request, res: Response) => {
  try {
    const { prompt } = req.body;

    const completion = await openai.chat.completions.create({
      model: "gpt-4.1-mini",
      temperature: 0.7,
      messages: [
        {
          role: "system",
          content: `
You are a professional color designer and UI design specialist.

Your task is to generate high quality color palettes for user interfaces, design systems and digital products.

Rules:
- Always return exactly 5 colors
- Colors must be harmonious and balanced
- Colors must work well for modern UI design
- Return only HEX color codes
- Do not include explanations
- Respond ONLY with a JSON array

Example output:
["#1A1A2E","#16213E","#0F3460","#E94560","#F4F1DE"]

If an image is provided, analyze the dominant colors and extract a visually balanced palette.

If a text prompt is provided, generate a palette that reflects the mood, theme or style described.
`,
        },
        {
          role: "user",
          content: `Generate a color palette for: ${prompt}`,
        },
      ],
    });

    const content = completion.choices[0].message.content;

    const palette = JSON.parse(content || "[]");

    res.json({
      palette,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to generate palette",
    });
  }
};
