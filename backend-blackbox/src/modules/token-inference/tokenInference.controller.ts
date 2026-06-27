import { Request, Response } from "express";
import {
  generateTokenInference,
  tokenizeText,
} from "./tokenInference.service";
import {
  TokenInferenceValidationError,
  validateGenerateTokenInferenceDto,
  validateTokenizeTextDto,
} from "./tokenInference.validators";

function sendError(
  res: Response,
  error: unknown,
  message: string,
) {
  if (error instanceof TokenInferenceValidationError) {
    return res.status(400).json({
      message: "Invalid token inference request",
      error: error.message,
    });
  }

  console.error(`${message}:`, error);
  return res.status(500).json({
    message,
    error:
      error instanceof Error
        ? error.message
        : "An unexpected error occurred",
  });
}

function sendSseEvent(
  res: Response,
  event: string,
  data: unknown,
) {
  res.write(`event: ${event}\n`);
  res.write(`data: ${JSON.stringify(data)}\n\n`);
}

function wait(milliseconds: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

export async function generateTokenInferenceController(
  req: Request,
  res: Response,
) {
  try {
    const dto = validateGenerateTokenInferenceDto(req.body);
    return res.status(200).json(await generateTokenInference(dto));
  } catch (error) {
    return sendError(res, error, "Failed to generate token inference");
  }
}

export function tokenizeTextController(req: Request, res: Response) {
  try {
    const dto = validateTokenizeTextDto(req.body);
    return res.status(200).json(tokenizeText(dto));
  } catch (error) {
    return sendError(res, error, "Failed to tokenize text");
  }
}

export async function streamTokenInferenceController(
  req: Request,
  res: Response,
) {
  let connectionClosed = false;

  req.on("close", () => {
    connectionClosed = true;
  });

  try {
    const dto = validateGenerateTokenInferenceDto(req.query);

    res.status(200);
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache, no-transform");
    res.setHeader("Connection", "keep-alive");
    res.flushHeaders();

    const result = await generateTokenInference(dto);

    for (const [index, token] of result.tokens.entries()) {
      if (connectionClosed) {
        return;
      }

      sendSseEvent(res, "token", {
        token,
        index: index + 1,
      });
      await wait(180);
    }

    if (!connectionClosed) {
      sendSseEvent(res, "done", {
        fullText: result.generatedText,
        tokenCount: result.tokenCount,
        provider: result.provider,
        model: result.model,
      });
      res.end();
    }
  } catch (error) {
    if (!res.headersSent) {
      return sendError(res, error, "Failed to stream token inference");
    }

    sendSseEvent(res, "error", {
      message:
        error instanceof Error
          ? error.message
          : "Token stream failed",
    });
    res.end();
  }
}
