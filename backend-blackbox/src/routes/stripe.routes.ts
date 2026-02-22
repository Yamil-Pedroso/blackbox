import express from "express";
import { stripeWebhookController } from "../controllers/stripe.controller";
import { createCheckoutSession } from "../controllers/stripe-payment.controller";

const router = express.Router();

router.post("/stripe/webhook", stripeWebhookController);

router.post("/stripe/create-checkout-session", createCheckoutSession);

export default router;
