import { openai } from "../../../core/config/openai.client";

export async function extractPaletteFromImage(buffer: Buffer) {
  const base64 = buffer.toString("base64");

  const response = await openai.responses.create({
    model: "gpt-4.1",
    input: [
      {
        role: "user",
        content: [
          {
            type: "input_text",
            text: `
You are a professional colorist and UI designer.

Analyze the image and extract the most visually dominant colors.

Return exactly 6 HEX colors.

Only return a JSON array.

Example:
["#1E1E2F","#F9C80E","#F86624","#EA3546","#43BCCD","#662E9B"]
`,
          },
          {
            type: "input_image",
            image_url: `data:image/png;base64,${base64}`,
            detail: "auto",
          },
        ],
      },
    ],
  });

  const text = response.output_text;

  return JSON.parse(text);
}
