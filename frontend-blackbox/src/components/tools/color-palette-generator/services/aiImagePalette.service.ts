import { apiClient } from "../api/apiClient";

export async function extractPaletteFromImage(file: File) {
  const formData = new FormData();
  formData.append("image", file);

  const res = await apiClient.post("/ai/image-palette", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data.palette;
}
