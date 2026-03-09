import Stripe from "stripe";
import { env } from "./env";

const stripe = new Stripe(env.stripe.secretKey);

export default stripe;
