import { apiClient } from "../api/apiClient";

type PaletteResponse = {
  palette: string[];
};

export async function generateAIPalette(prompt: string): Promise<string[]> {
  try {
    const res = await apiClient.post<PaletteResponse>("/ai/palette", {
      prompt,
    });

    return res.data.palette;
  } catch (error) {
    console.error("AI palette generation failed:", error);
    throw new Error("Failed to generate palette");
  }
}
