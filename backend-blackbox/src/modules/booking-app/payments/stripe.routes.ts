import express from "express";
import { stripeWebhookController } from "./stripe.controller";
import { createCheckoutSession } from "./stripe-payment.controller";

const router = express.Router();

router.post("/webhook", stripeWebhookController);

router.post("/create-checkout-session", createCheckoutSession);

export default router;
