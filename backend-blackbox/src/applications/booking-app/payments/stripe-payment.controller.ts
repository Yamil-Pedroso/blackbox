import { Request, Response } from "express";
import { asyncHandler } from "../../../core/middlewares/asyncHandler";
import { StripePaymentService } from "./stripe.service";

export const createCheckoutSession = asyncHandler(
  async (req: Request, res: Response) => {
    const { hotelId, checkIn, checkOut, guests } = req.body;

    const url = await StripePaymentService.createCheckoutSession({
      hotelId,
      checkIn,
      checkOut,
      guests,
    });

    res.json({ url });
  },
);
